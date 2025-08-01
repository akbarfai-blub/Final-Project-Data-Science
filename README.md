# Dashboard Segmentasi & Prediksi Churn Pelanggan

Dashboard interaktif yang dibangun dengan React dan FastAPI untuk menganalisis dan memprediksi churn pelanggan dari dataset e-commerce Olist.

## 🚀 Tampilan Dashboard

![Tampilan Dashboard](URL_SCREENSHOT_DASHBOARD_MU_DI_SINI)

## ✨ Fitur Utama

- **Dashboard Analisis:** Visualisasi interaktif untuk KPI utama, segmentasi pelanggan, analisis geografis & produk, serta analisis retensi.
- **Alat Prediksi Churn:** Menggunakan model Machine Learning (Random Forest) untuk memprediksi risiko churn pelanggan secara real-time.
- **Filter Dinamis:** Memungkinkan pengguna untuk memfilter data dashboard berdasarkan segmen pelanggan.

## 💻 Tech Stack

- **Backend:** Python, FastAPI, Pandas, Scikit-learn
- **Frontend:** ReactJS, Recharts
- **Database:** Flat files (.csv)
- **Model:** Random Forest Classifier (dioptimalkan dengan Optuna)

## Assets & Cara Menjalankan

Model machine learning dan dataset yang digunakan dalam proyek ini tidak disertakan di repository karena ukurannya yang besar.

1.  Download aset-aset berikut:

    - [Model (final_rf_model_tuned.joblib)](https://drive.google.com/file/d/1JXk8SvrHlC4LN4HbWp8c7TDHLa0xiMh-/view?usp=sharing)
    - [Data RFM (final_rfm_data_for_app.csv)](https://drive.google.com/file/d/1AZB-MvfrI_yvPZIpxzF-6RsBqgblWeB4/view?usp=drive_link)
    - [Data Transaksi (main_df_for_app.csv)](https://drive.google.com/file/d/10dIx2saTbb51GZJnC-SxP7zwM8IIMx-i/view?usp=drive_link)

2.  Letakkan file-file tersebut di dalam struktur folder yang sesuai:

    - `final_rf_model_tuned.joblib` -> ke dalam folder `backend/models/`
    - Kedua file `.csv` -> ke dalam folder `backend/data/`

3.  Setelah itu, ikuti instruksi setup backend dan frontend seperti biasa.
