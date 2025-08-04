import multiprocessing

# Batasi jumlah worker
# Angka 2 atau 3 biasanya aman untuk 16GB RAM di free tier
workers = 2 

# Jenis worker
worker_class = "uvicorn.workers.UvicornWorker"

# Bind ke port yang disediakan oleh Hugging Face
bind = "0.0.0.0:8000" # HF akan me-redirect dari port 80 ke sini