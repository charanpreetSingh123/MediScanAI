# 🏥 MediScan AI — Multi-Disease Early Detection Platform

A full-stack AI-powered medical diagnosis platform that detects:
- 🧠 Brain Tumors (MRI Scans)
- 👁️ Diabetic Retinopathy (Eye Fundus Images)
- 🩺 Skin Cancer (Dermatoscopy Images)

## 🚀 Tech Stack
- **Frontend:** React.js + TailwindCSS + Recharts
- **Backend:** FastAPI + SQLAlchemy + PostgreSQL
- **ML Models:** PyTorch + EfficientNet + ResNet50
- **Explainability:** Grad-CAM Heatmaps
- **Auth:** JWT (Doctor + Patient roles)

## ⚡ Quick Start

### Backend
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm run dev
```

## 📁 Project Structure

MediScanAI/

├── backend/          # FastAPI backend

│   ├── models/       # ML models (Brain, DR, Skin)

│   ├── routes/       # API endpoints

│   └── utils/        # Grad-CAM, PDF reports

├── frontend/         # React frontend

│   └── src/

│       ├── pages/    # Login, Register, Dashboards

│       └── components/  # Doctor & Patient components

└── notebooks/        # Training notebooks

## 👨‍💻 Made by
Charanpreet Singh — B.Tech 