from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from datetime import datetime
import os

def generate_report(patient_name, disease_type, result, confidence, scan_path, output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    c = canvas.Canvas(output_path, pagesize=letter)
    width, height = letter

    c.setFont("Helvetica-Bold", 20)
    c.drawString(200, height - 60, "MediScan AI — Medical Report")

    c.setFont("Helvetica", 12)
    c.drawString(50, height - 120, f"Patient Name   : {patient_name}")
    c.drawString(50, height - 145, f"Disease Checked: {disease_type.replace('_', ' ').title()}")
    c.drawString(50, height - 170, f"Result         : {result}")
    c.drawString(50, height - 195, f"Confidence     : {confidence}%")
    c.drawString(50, height - 220, f"Report Date    : {datetime.now().strftime('%Y-%m-%d %H:%M')}")

    if scan_path and os.path.exists(scan_path):
        c.drawImage(scan_path, 50, height - 450, width=200, height=200)

    c.setFont("Helvetica-Oblique", 10)
    c.drawString(50, 50, "This report is AI-generated. Please consult a medical professional.")

    c.save()
    return output_path