from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_user
from models.user import User
from models.scan import Scan
from utils.image_processor import process_image
import shutil, os, uuid, sys

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_file(file: UploadFile) -> str:
    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    path = os.path.join(UPLOAD_DIR, filename)
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return path

def run_prediction(disease: str, image_path: str) -> dict:
    base = os.path.dirname(os.path.abspath(__file__))
    model_dir = os.path.join(base, "..", "models", disease)
    sys.path.insert(0, model_dir)

    if disease == "brain_tumor":
        from models.brain_tumor.predict import predict
    elif disease == "diabetic_retinopathy":
        from models.diabetic_retinopathy.predict import predict
    elif disease == "skin_cancer":
        from models.skin_cancer.predict import predict
    else:
        raise HTTPException(status_code=400, detail="Unknown disease type")

    return predict(image_path)

@router.post("/brain-tumor")
async def predict_brain_tumor(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    path = save_file(file)
    try:
        prediction = run_prediction("brain_tumor", path)
    except Exception as e:
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
        prediction = run_prediction("diabetic_retinopathy", path)
    except Exception as e:
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
        prediction = run_prediction("skin_cancer", path)
    except Exception as e:
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