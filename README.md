---
title: Customer Churn Dashboard
emoji: 📊
colorFrom: indigo
colorTo: purple
sdk: docker
app_port: 8000
pinned: false
---

# Dashboard Segmentasi & Prediksi Churn Pelanggan

Dashboard interaktif yang dibangun dengan React dan FastAPI untuk menganalisis dan memprediksi churn pelanggan dari dataset e-commerce Olist.

## 🚀 Tampilan Dashboard

<p align="center">
  <img src="https://github.com/user-attachments/assets/669df58a-13af-455d-9fca-6c0f7e762f73" width="80%">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/b8119b39-505e-4e9e-a1d2-6c503cf3719d" width="80%">
</p>

## ✨ Fitur Utama

- **Dashboard Analisis:** Visualisasi interaktif untuk KPI utama, segmentasi pelanggan, analisis geografis & produk, serta analisis retensi.
- **Alat Prediksi Churn:** Menggunakan model Machine Learning (Random Forest) untuk memprediksi risiko churn pelanggan secara real-time.
- **Filter Dinamis:** Memungkinkan pengguna untuk memfilter data dashboard berdasarkan segmen pelanggan.

## 💻 Tech Stack

- **Backend:** Python, FastAPI, Pandas, Scikit-learn
- **Frontend:** ReactJS, Recharts
- **Database:** Flat files (.csv)
- **Model:** Random Forest Classifier (dioptimalkan dengan Optuna)

## 📁 Aset & Cara Menjalankan

> ⚠️ _Model dan dataset tidak disertakan langsung di repo karena ukuran file. Silakan unduh secara manual melalui link berikut._

### 1. Unduh Aset

- [✅ Model ML (`final_rf_model_tuned.joblib`)](https://drive.google.com/file/d/1JXk8SvrHlC4LN4HbWp8c7TDHLa0xiMh-/view?usp=sharing)
- [✅ Data RFM (`final_rfm_data_for_app.csv`)](https://drive.google.com/file/d/1AZB-MvfrI_yvPZIpxzF-6RsBqgblWeB4/view?usp=drive_link)
- [✅ Data Transaksi (`main_df_for_app.csv`)](https://drive.google.com/file/d/10dIx2saTbb51GZJnC-SxP7zwM8IIMx-i/view?usp=drive_link)

### 2. Struktur Folder

````text
project-root/
├── backend/
│   ├── data/
│   │   ├── final_rfm_data_for_app.csv
│   │   └── main_df_for_app.csv
│   ├── models/
│   │   └── final_rf_model_tuned.joblib
│   └── main.py
│
└── frontend/
    └── ...React files...


## 🔧 Cara Menjalankan Aplikasi

### ✅ Jalankan **Backend** (FastAPI)

```bash
# Masuk ke folder backend
cd backend

# Buat virtual environment
python -m venv .venv

# Aktifkan environment
# Windows:
.\.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

# Install dependensi
pip install -r requirements.txt

# Jalankan server API
uvicorn main:app --reload

# Buka terminal baru
cd frontend

# Install dependensi
npm install

# Jalankan aplikasi React
npm start
````
