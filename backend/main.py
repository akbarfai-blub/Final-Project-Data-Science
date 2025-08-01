from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from typing import Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

# --- MEMUAT MODEL & DATA SAAT APLIKASI DIMULAI ---
model = joblib.load('models/final_rf_model_tuned.joblib')
rfm_data = pd.read_csv('data/final_customer_data.csv', index_col='customer_unique_id')

# Muat main_df dan konversi kolom tanggal
try:
    main_df_raw = pd.read_csv('data/main_df_for_app.csv')
    main_df_raw['order_purchase_timestamp'] = pd.to_datetime(main_df_raw['order_purchase_timestamp'])
    main_df_raw['order_delivered_customer_date'] = pd.to_datetime(main_df_raw['order_delivered_customer_date'])
except FileNotFoundError:
    main_df_raw = None
    
# Gabungkan label segmen ke main_df sekali saja saat startup untuk efisiensi
if main_df_raw is not None:
    main_df_with_segments = pd.merge(main_df_raw, rfm_data[['Cluster_Label']], on='customer_unique_id', how='left')
else:
    main_df_with_segments = None

# Filter
def filter_data(segment: Optional[str] = None):
    if segment and segment != 'All':
        # Filter rfm_data
        filtered_rfm = rfm_data[rfm_data['Cluster_Label'] == segment]
        
        # Filter main_df
        if main_df_with_segments is not None:
            filtered_main = main_df_with_segments[main_df_with_segments['Cluster_Label'] == segment]
        else:
            filtered_main = None
            
        return filtered_rfm, filtered_main
    else:
        # Jika tidak ada filter, kembalikan data asli
        return rfm_data, main_df_with_segments

# --- ENDPOINT PREDIKSI ---
class PredictionInput(BaseModel):
    Recency: int
    Frequency: int
    Monetary: float

@app.post("/predict")
def predict(features: PredictionInput):
    data = np.array([[features.Frequency, features.Monetary]])
    prediction = model.predict(data)
    probability = model.predict_proba(data)
    return {
        "prediction": int(prediction[0]),
        "probability_churn": float(probability[0][1]) * 100
    }

# --- ENDPOINT DASHBOARD ---

@app.get("/dashboard/kpi")
def get_kpi_data():
    total_customers = rfm_data.shape[0]
    repeat_rate = (rfm_data['Frequency'] > 1).sum() / total_customers * 100
    churn_rate = rfm_data['is_churn'].sum() / total_customers * 100 
    
    return {
        "total_customers": total_customers,
        "repeat_buyer_percent": repeat_rate,
        "churn_rate_percent": churn_rate
    }

@app.get("/dashboard/segment_distribution")
def get_segment_distribution(segment: Optional[str] = None):
    filtered_rfm, _ = filter_data(segment)
    segment_counts = rfm_data['Cluster_Label'].value_counts()
    chart_data = [{'name': index, 'value': value} for index, value in segment_counts.items()]
    return {"data": chart_data}

@app.get("/dashboard/top_geography_product")
def get_top_data(segment: Optional[str] = None):
    _, filtered_main = filter_data(segment)
    if filtered_main is None: return {"error": "main_df not found."}

    top_states = filtered_main.groupby('customer_state')['payment_value'].sum().nlargest(10)
    top_categories = filtered_main.groupby('product_category_name_english')['payment_value'].sum().nlargest(10)
    
    top_states_data = [{'name': index, 'value': value} for index, value in top_states.items()]
    top_categories_data = [{'name': index, 'value': value} for index, value in top_categories.items()]
    
    return { "top_states": top_states_data, "top_categories": top_categories_data }



@app.get("/dashboard/retention_summary")
def get_retention_summary(segment: Optional[str] = None):
    filtered_rfm, _ = filter_data(segment)
    if 'customer_type' not in filtered_rfm.columns:
         filtered_rfm['customer_type'] = filtered_rfm['Frequency'].apply(lambda x: 'Pelanggan Berulang' if x > 1 else 'Pelanggan Sekali Beli')
    
    retention_counts = filtered_rfm['customer_type'].value_counts()
    chart_data = [{'name': index, 'value': value} for index, value in retention_counts.items()]
    return {"data": chart_data}

@app.get("/dashboard/satisfaction_vs_delivery")
def get_satisfaction_vs_delivery(segment: Optional[str] = None):
    _, filtered_main_view = filter_data(segment) # Menerima hasil filter
    
    if filtered_main_view is None: 
        return {"error": "main_df not found."}

    
    # Buat salinan eksplisit untuk menghindari SettingWithCopyWarning
    filtered_main = filtered_main_view.copy()
    

    filtered_main['delivery_duration'] = (filtered_main['order_delivered_customer_date'] - filtered_main['order_purchase_timestamp']).dt.days
    
    # Hitung rata-rata durasi per skor ulasan
    avg_delivery_by_score = filtered_main.dropna(subset=['review_score', 'delivery_duration']).groupby('review_score')['delivery_duration'].mean()
    
    chart_data = [{'score': int(index), 'avg_duration': round(value, 2)} for index, value in avg_delivery_by_score.items()]
    return {"data": chart_data}