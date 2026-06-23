from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from routes import auth, predict, doctor, patient
from database import engine, Base
import os

load_dotenv()

# Import models so tables get created
from models import user, scan

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MediScan AI",
    description="Multi-Disease Early Detection Platform",
    version="1.0.0"
)

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Serve uploaded scans as static files
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Register all routes
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(predict.router, prefix="/predict", tags=["Predict"])
app.include_router(doctor.router, prefix="/doctor", tags=["Doctor"])
app.include_router(patient.router, prefix="/patient", tags=["Patient"])

@app.get("/")
def root():
    return {"message": "MediScan AI is running 🚀"}