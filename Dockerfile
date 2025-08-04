# Gunakan base image resmi dari FastAPI
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

# Set direktori kerja di dalam container
WORKDIR /app

# Salin HANYA file-file yang dibutuhkan untuk instalasi dulu
COPY ./backend/requirements.txt .

# Install semua library Python
RUN pip install --no-cache-dir -r requirements.txt

# Salin semua aset (data dan model)
COPY ./backend/ .

# Salin folder build dari frontend ke dalam folder statis
COPY ./frontend/build ./static

# Jalankan Gunicorn dengan file konfigurasi
CMD ["gunicorn", "-c", "gunicorn_conf.py", "main:app"]