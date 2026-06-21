<div align="center">

<br/>

<img src="https://img.shields.io/badge/Python%203.13-AI%20Platform-3B6D11?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
<img src="https://img.shields.io/badge/FastAPI%20%7C%20React-Full%20Stack-534AB7?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI React"/>
<img src="https://img.shields.io/badge/PyTorch%20%7C%20EfficientNet-ML%20Powered-D85A30?style=for-the-badge&logo=pytorch&logoColor=white" alt="ML"/>
<img src="https://img.shields.io/badge/Docker-Containerized-185FA5?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
<img src="https://img.shields.io/badge/Brain%20Tumor-94%25%20Accuracy-success?style=for-the-badge" alt="Brain Tumor Accuracy"/>
<img src="https://img.shields.io/badge/Diabetic%20Retinopathy-81.5%25%20Accuracy-success?style=for-the-badge" alt="DR Accuracy"/>

<br/><br/>

# 🏥 MediScan AI

### Multi-Disease Early Detection Platform

**An end-to-end AI-powered medical diagnosis platform that detects Brain Tumors, Diabetic Retinopathy, and Skin Cancer from medical scans.**  
Built for doctors and patients who need fast, explainable, and accurate AI-assisted diagnosis.

<br/>

[![GitHub](https://img.shields.io/badge/🚀%20View%20on%20GitHub-Repository-24292e?style=for-the-badge&logo=github)](https://github.com/charanpreetSingh123/MediScanAI)
&nbsp;
[![API Docs](https://img.shields.io/badge/📖%20API%20Docs-Swagger%20UI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](http://localhost:8000/docs)

<br/>

</div>

---

## 📋 Features at a Glance

| Module | What it does |
|---|---|
| 🧠 **Brain Tumor Detection** | Analyzes MRI scans and classifies into Glioma, Meningioma, Pituitary, or No Tumor |
| 👁️ **Diabetic Retinopathy** | Detects severity levels (No DR → Proliferative DR) from eye fundus images |
| 🩺 **Skin Cancer Detection** | Identifies 7+ types of skin lesions including Melanoma and Basal Cell Carcinoma |
| 🔥 **Grad-CAM Heatmaps** | Explainable AI — highlights exactly which region the model focused on |
| 👨‍⚕️ **Doctor Dashboard** | Upload scans, view all patients, analyze reports, and track statistics |
| 🧑‍💼 **Patient Dashboard** | Upload own scans, get results in simple language, track scan history |
| 📄 **PDF Report Generation** | Auto-generates downloadable medical reports for every scan |
| 🔐 **JWT Authentication** | Secure role-based login system for Doctors and Patients |

---

## 🛠️ Tech Stack

| Layer | Tools |
|---|---|
| **Frontend** | React.js · TailwindCSS · Recharts · Lucide Icons |
| **Backend** | FastAPI · Python 3.13 · SQLAlchemy |
| **Machine Learning** | PyTorch · EfficientNet B0/B2 · ResNet50 |
| **Explainability** | Grad-CAM (pytorch-grad-cam) |
| **Database** | PostgreSQL |
| **Authentication** | JWT · bcrypt · OAuth2 |
| **PDF Reports** | ReportLab |
| **Infrastructure** | Docker · Docker Compose |

---

## 🤖 ML Models

| Disease | Model Architecture | Dataset | Classes |
|---|---|---|---|
| 🧠 Brain Tumor | EfficientNet-B0 | Brain MRI Dataset (7,200 images) | Glioma, Meningioma, Pituitary, No Tumor |
| 👁️ Diabetic Retinopathy | ResNet50 | APTOS 2019 (3,662 images) | 5 severity levels (0-4) |
| 🩺 Skin Cancer | EfficientNet-B2 | ISIC 2019 (25,000+ images) | MEL, NV, BCC, AK, BKL, DF, VASC, SCC |

---
## 🤖 ML Models & Results

| Disease | Model Architecture | Dataset | Classes | Validation Accuracy |
|---|---|---|---|---|
| 🧠 Brain Tumor | EfficientNet-B0 | Brain MRI Dataset (7,200 images) | Glioma, Meningioma, Pituitary, No Tumor | **94%** ✅ |
| 👁️ Diabetic Retinopathy | ResNet50 | APTOS 2019 (3,662 images) | 5 severity levels (0-4) | **81.56%** ✅ |
| 🩺 Skin Cancer | EfficientNet-B2 | ISIC 2019 (25,331 images) | MEL, NV, BCC, AK, BKL, DF, VASC, SCC | **In Progress** ⏳ |

> All models use transfer learning with a freeze-then-finetune strategy: classifier head trained first on frozen pretrained weights, then full network fine-tuned at a lower learning rate for better generalization.

---

## 📸 Screenshots

> Coming soon — will be added after deployment.

---

## 🚀 Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL
- Git

### Setup in 6 steps

**1. Clone the repository**
```bash
git clone https://github.com/charanpreetSingh123/MediScanAI.git
cd MediScanAI
```

**2. Setup Backend**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**3. Setup environment variables**
```bash
# Create backend/.env
DATABASE_URL=postgresql://postgres:password@localhost:5432/mediscanai
SECRET_KEY=mediscanai_super_secret_key_2024
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

**4. Setup Database**
```bash
psql postgres
CREATE DATABASE mediscanai;
CREATE USER postgres WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE mediscanai TO postgres;
\q
```

**5. Start the backend**
```bash
uvicorn main:app --reload
```

**6. Setup & start Frontend** *(new terminal)*
```bash
cd frontend
npm install
npm run dev
```

Visit **http://localhost:5173** to open the app.

---

## 🧠 Training the Models

Download datasets from Kaggle and place them in `backend/datasets/`:

| Disease | Dataset | Link |
|---|---|---|
| Brain Tumor | Brain Tumor MRI Dataset | [kaggle.com](https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset) |
| Diabetic Retinopathy | APTOS 2019 | [kaggle.com](https://www.kaggle.com/competitions/aptos2019-blindness-detection) |
| Skin Cancer | ISIC 2019 | [kaggle.com](https://www.kaggle.com/datasets/andrewmvd/isic-2019) |

Then train each model:

```bash
cd backend
source venv/bin/activate

# Brain Tumor
cd models/brain_tumor && python3 train.py

# Diabetic Retinopathy
cd ../diabetic_retinopathy && python3 train.py

# Skin Cancer
cd ../skin_cancer && python3 train.py
```

---

## 📂 Project Structure

```
MediScanAI/
├── backend/
│   ├── models/
│   │   ├── brain_tumor/
│   │   ├── diabetic_retinopathy/
│   │   └── skin_cancer/
│   ├── routes/
│   │   ├── auth.py
│   │   ├── predict.py
│   │   ├── doctor.py
│   │   └── patient.py
│   ├── utils/
│   │   ├── gradcam.py
│   │   ├── image_processor.py
│   │   └── report_generator.py
│   ├── main.py
│   ├── database.py
│   └── auth.py
├── frontend/
│   └── src/
│       ├── pages/
│       ├── components/
│       └── utils/
├── notebooks/
├── docker-compose.yml
├── README.md
└── .gitignore
```
---

## 📌 API Documentation

Once the backend is running, visit:

| Interface | URL |
|---|---|
| **Swagger UI** | http://localhost:8000/docs |
| **ReDoc** | http://localhost:8000/redoc |

### Key Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register as Doctor or Patient |
| POST | `/auth/login` | Login and get JWT token |
| POST | `/predict/brain-tumor` | Analyze brain MRI scan |
| POST | `/predict/diabetic-retinopathy` | Analyze eye fundus image |
| POST | `/predict/skin-cancer` | Analyze skin lesion image |
| GET | `/doctor/dashboard` | Doctor stats and analytics |
| GET | `/doctor/patients` | List all patients |
| GET | `/doctor/scans` | All scan reports |
| GET | `/patient/dashboard` | Patient scan history |

---

## 🌱 What This Platform Enables

✅  Detect Brain Tumors from MRI scans with high accuracy
✅ Grade Diabetic Retinopathy severity from eye images
✅ Identify cancerous skin lesions from dermoscopy images
✅  Visualize AI decisions with Grad-CAM heatmaps
✅  Role-based access for Doctors and Patients
✅  Generate downloadable PDF medical reports
✅  Track patient scan history over time
✅  Deployable with Docker in any environment

---

## 🔖 Versioning

| Version | Description |
|---|---|
| `v1.0.0` | Initial release — full pipeline: scan upload → AI diagnosis → PDF report |

---

## 👤 Author

**Charanpreet Singh**  
B.Tech CSE (AIML)

[![GitHub](https://img.shields.io/badge/GitHub-charanpreetSingh123-24292e?style=flat-square&logo=github)](https://github.com/charanpreetSingh123)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Charanpreet_Singh-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/charanpreet-singh-7358032b9/)

---

<div align="center">

**Built for Doctors · Patients · Healthcare AI Research**

<br/>

*If this project helped you, consider giving it a ⭐ on GitHub!*

</div>