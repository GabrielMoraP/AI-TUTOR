# Usa una imagen base con Python
FROM python:3.8-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . /app

# Instala las dependencias de Python
RUN pip install -r requirements.txt

# Expón el puerto 8000 para que se pueda acceder
EXPOSE 8000

# Inicia el servidor Flask cuando el contenedor arranque
CMD ["python", "functions/predict.py"]