from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_user
from models.user import User
from models.scan import Scan

router = APIRouter()

@router.get("/dashboard")
def patient_dashboard(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    user = db.query(User).filter(User.email == current_user["sub"]).first()
    scans = db.query(Scan).filter(Scan.patient_id == user.id).all()
    return {
        "name": user.name,
        "total_scans": len(scans),
        "scans": [
            {
                "id": s.id,
                "disease_type": s.disease_type,
                "result": s.result,
                "confidence": s.confidence,
                "created_at": s.created_at
            } for s in scans
        ]
    }