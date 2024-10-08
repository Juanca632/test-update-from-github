from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import subprocess

app = FastAPI()

# Configuración de CORS
origins = [
    "*",  # Permitir todas las fuentes (no recomendado en producción)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

@app.get("/commit-sha")
def get_commit_sha():
    try:
        # Ejecuta el comando `git rev-parse HEAD` para obtener el último commit
        commit_sha = subprocess.check_output(['git', 'rev-parse', 'HEAD']).strip().decode('utf-8')
        return {"commit_sha": commit_sha}
    except subprocess.CalledProcessError as e:
        return {"error": "Error al obtener el commit SHA"}
