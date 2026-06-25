<div align="center">

<br/>

<img src="https://img.shields.io/badge/Python%203.13-AI%20Platform-3B6D11?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
<img src="https://img.shields.io/badge/FastAPI%20%7C%20React-Full%20Stack-534AB7?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI React"/>
<img src="https://img.shields.io/badge/PyTorch%20%7C%20EfficientNet-ML%20Powered-D85A30?style=for-the-badge&logo=pytorch&logoColor=white" alt="ML"/>
<img src="https://img.shields.io/badge/Docker-Containerized-185FA5?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
<img src="https://img.shields.io/badge/Brain%20Tumor-94%25%20Accuracy-success?style=for-the-badge" alt="Brain Tumor Accuracy"/>
<img src="https://img.shields.io/badge/Diabetic%20Retinopathy-81.56%25%20Accuracy-success?style=for-the-badge" alt="DR Accuracy"/>
<img src="https://img.shields.io/badge/Skin%20Cancer-78%25%20Accuracy-success?style=for-the-badge" alt="Skin Cancer Accuracy"/>

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
| 🩺 **Skin Cancer Detection** | Identifies 8 types of skin lesions including Melanoma and Basal Cell Carcinoma |
| 🔥 **Grad-CAM Heatmaps** | Explainable AI — highlights exactly which region the model focused on |
| 👨‍⚕️ **Doctor Dashboard** | Upload scans, view all patients, analyze reports, and track statistics |
| 🧑‍💼 **Patient Dashboard** | Upload own scans, get results in simple language, track scan history |
| 📄 **PDF Report Generation** | Auto-generates downloadable medical reports for every scan |
| 🔐 **JWT Authentication** | Secure role-based login system for Doctors and Patients |
| 🐳 **Docker Deployment** | One command to start the entire platform — no manual setup needed |

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

## 🤖 ML Models & Results

| Disease | Model | Dataset | Classes | Accuracy |
|---|---|---|---|---|
| 🧠 Brain Tumor | EfficientNet-B0 | Brain MRI Dataset (7,200 images) | Glioma, Meningioma, Pituitary, No Tumor | **94%** ✅ |
| 👁️ Diabetic Retinopathy | ResNet50 | APTOS 2019 (3,662 images) | 5 severity levels (No DR → Proliferative DR) | **81.56%** ✅ |
| 🩺 Skin Cancer | EfficientNet-B2 | ISIC 2019 (25,331 images) | MEL, NV, BCC, AK, BKL, DF, VASC, SCC | **78%** ✅ |

> All models use **transfer learning** with a freeze-then-finetune strategy — classifier head trained first on frozen pretrained weights, then full network fine-tuned at a lower learning rate for better generalization.

---

## 📸 Screenshots

| Doctor Portal | Patient Portal |
|:---:|:---:|
| ![Doctor Dashboard](assets/Doctordashboard.png) | ![Patient Dashboard](assets/patient.png) |

| Analytics | Upload Section |
|:---:|:---:|
| ![Analytics](assets/analytics.png) | ![Upload Scan](assets/uploadscan.png) |

| Example Test For Brain Tumor | Test History |
|:---:|:---:|
| ![Test](assets/exampletest.png) | ![History Of Results](assets/history.png) |

| Training Accuracy | Operations Reflection |
|:---:|:---:|
| ![Accuracy of Model](assets/trainingresult.png) | ![Terminal](assets/operations.png) |

---

## 🐳 Quick Start with Docker (Recommended)

> One command starts everything — PostgreSQL + FastAPI + React — no manual setup needed!

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running

### Run in 3 steps

**1. Clone the repository**
```bash
git clone https://github.com/charanpreetSingh123/MediScanAI.git
cd MediScanAI
```

**2. Start everything**
```bash
docker compose up
```

**3. Open the app**

| Service | URL |
|---|---|
| 🎨 **App** | http://localhost:4173 |
| ⚡ **API** | http://localhost:8000 |
| 📖 **API Docs** | http://localhost:8000/docs |

**To stop:**
```bash
docker compose down
```

---

## 🛠️ Manual Setup (Without Docker)

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL
- Git

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
# Create backend/.env with:
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

**5. Start Backend**
```bash
uvicorn main:app --reload
```

**6. Setup & Start Frontend**
```bash
cd frontend
npm install
npm run dev
```

Visit **http://localhost:5173**

---

## 🧠 Training the Models

Download datasets from Kaggle and place in `backend/datasets/`:

| Disease | Dataset | Link |
|---|---|---|
| Brain Tumor | Brain Tumor MRI Dataset | [kaggle.com](https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset) |
| Diabetic Retinopathy | APTOS 2019 | [kaggle.com](https://www.kaggle.com/competitions/aptos2019-blindness-detection) |
| Skin Cancer | ISIC 2019 | [kaggle.com](https://www.kaggle.com/datasets/andrewmvd/isic-2019) |

```bash
cd backend
source venv/bin/activate

cd models/brain_tumor && python3 train.py
cd ../diabetic_retinopathy && python3 train.py
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

✅  Detect Brain Tumors from MRI scans — 94% accuracy
✅  Grade Diabetic Retinopathy severity from eye images — 81.56% accuracy
✅  Identify cancerous skin lesions from dermoscopy images — 78% accuracy
✅  Visualize AI decisions with Grad-CAM heatmaps
✅  Role-based access for Doctors and Patients
✅  Generate downloadable PDF medical reports
✅  Track patient scan history over time
✅  Deploy entire platform with a single Docker command

---

## 🔖 Versioning

| Version | Description |
|---|---|
| `v1.0.0` | Initial release — full pipeline: scan upload → AI diagnosis → PDF report |
| `v2.0.0` | All 3 models trained and integrated, UI redesign, Docker deployment working |

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
