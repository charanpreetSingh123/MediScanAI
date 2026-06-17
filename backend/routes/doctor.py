from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_user
from models.user import User
from models.scan import Scan

router = APIRouter()

@router.get("/dashboard")
def doctor_dashboard(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] != "doctor":
        raise HTTPException(status_code=403, detail="Access denied")

    total_scans = db.query(Scan).count()
    positive_scans = db.query(Scan).filter(Scan.result == "Positive").count()
    negative_scans = db.query(Scan).filter(Scan.result == "Negative").count()
    total_patients = db.query(User).filter(User.role == "patient").count()

    return {
        "total_scans": total_scans,
        "positive_scans": positive_scans,
        "negative_scans": negative_scans,
        "total_patients": total_patients
    }

@router.get("/patients")
def get_all_patients(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] != "doctor":
        raise HTTPException(status_code=403, detail="Access denied")
    patients = db.query(User).filter(User.role == "patient").all()
    return [{"id": p.id, "name": p.name, "email": p.email} for p in patients]

@router.get("/scans")
def get_all_scans(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] != "doctor":
        raise HTTPException(status_code=403, detail="Access denied")
    scans = db.query(Scan).all()
    return [
        {
            "id": s.id,
            "patient_id": s.patient_id,
            "disease_type": s.disease_type,
            "result": s.result,
            "confidence": s.confidence,
            "created_at": s.created_at
        } for s in scans
    ]