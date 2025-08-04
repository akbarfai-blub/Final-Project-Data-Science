# Gunakan base image resmi dari FastAPI
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

# Set direktori kerja di dalam container
WORKDIR /app

# Salin file requirements dari backend
COPY ./backend/requirements.txt .

# Install semua library Python
RUN pip install --no-cache-dir -r requirements.txt

# Salin semua file dari folder backend ke dalam container
COPY ./backend/ .

# Salin folder build dari frontend ke dalam folder statis di backend
COPY ./frontend/build ./static