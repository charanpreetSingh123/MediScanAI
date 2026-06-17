from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    disease_type = Column(String, nullable=False)  # brain_tumor, diabetic_retinopathy, skin_cancer
    result = Column(String, nullable=False)         # Positive / Negative
    confidence = Column(Float, nullable=False)      # e.g. 94.5
    heatmap_path = Column(String, nullable=True)    # path to grad-cam image
    scan_path = Column(String, nullable=True)       # path to original scan
    created_at = Column(DateTime, default=datetime.utcnow)

    patient = relationship("User", foreign_keys=[patient_id])