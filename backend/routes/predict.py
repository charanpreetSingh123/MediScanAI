from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_user
from models.user import User
from models.scan import Scan
import shutil, os, uuid, sys, importlib.util

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "..", "models")

def save_file(file: UploadFile) -> str:
    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    path = os.path.join(UPLOAD_DIR, filename)
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return path

def load_predict_function(disease_folder: str, predict_filename: str):
    predict_path = os.path.join(MODELS_DIR, disease_folder, predict_filename)
    spec = importlib.util.spec_from_file_location(f"{disease_folder}_predict", predict_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.predict

@router.post("/brain-tumor")
async def predict_brain_tumor(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    path = save_file(file)
    try:
        predict = load_predict_function("brain_tumor", "brain_tumor_predict.py")
        prediction = predict(path)
    except Exception as e:
        print(f"Brain tumor prediction error: {e}")
        prediction = {"result": "Pending", "label": "Model not trained yet", "confidence": 0.0}

    user = db.query(User).filter(User.email == current_user["sub"]).first()
    scan = Scan(
        patient_id=user.id,
        disease_type="brain_tumor",
        result=prediction["result"],
        confidence=prediction["confidence"],
        scan_path=path
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    return {
        "disease": "Brain Tumor",
        "result": prediction["result"],
        "label": prediction.get("label", ""),
        "confidence": prediction["confidence"],
        "scan_id": scan.id
    }

@router.post("/diabetic-retinopathy")
async def predict_dr(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    path = save_file(file)
    try:
        predict = load_predict_function("diabetic_retinopathy", "dr_predict.py")
        prediction = predict(path)
    except Exception as e:
        print(f"DR prediction error: {e}")
        prediction = {"result": "Pending", "label": "Model not trained yet", "confidence": 0.0}

    user = db.query(User).filter(User.email == current_user["sub"]).first()
    scan = Scan(
        patient_id=user.id,
        disease_type="diabetic_retinopathy",
        result=prediction["result"],
        confidence=prediction["confidence"],
        scan_path=path
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    return {
        "disease": "Diabetic Retinopathy",
        "result": prediction["result"],
        "label": prediction.get("label", ""),
        "confidence": prediction["confidence"],
        "scan_id": scan.id
    }

@router.post("/skin-cancer")
async def predict_skin_cancer(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    path = save_file(file)
    try:
        predict = load_predict_function("skin_cancer", "skin_predict.py")
        prediction = predict(path)
    except Exception as e:
        print(f"Skin cancer prediction error: {e}")
        prediction = {"result": "Pending", "label": "Model not trained yet", "confidence": 0.0}

    user = db.query(User).filter(User.email == current_user["sub"]).first()
    scan = Scan(
        patient_id=user.id,
        disease_type="skin_cancer",
        result=prediction["result"],
        confidence=prediction["confidence"],
        scan_path=path
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    return {
        "disease": "Skin Cancer",
        "result": prediction["result"],
        "label": prediction.get("label", ""),
        "confidence": prediction["confidence"],
        "scan_id": scan.id
    }