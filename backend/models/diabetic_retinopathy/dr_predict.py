import ssl
ssl._create_default_https_context = ssl._create_unverified_context

import torch
import os
from torchvision import transforms
from PIL import Image
from model import DiabeticRetinopathyModel

CLASS_NAMES = ["No DR", "Mild", "Moderate", "Severe", "Proliferative DR"]
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "diabetic_retinopathy_model.pth")

device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

model = DiabeticRetinopathyModel(num_classes=5)
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model.to(device)
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

def predict(image_path: str) -> dict:
    image = Image.open(image_path).convert("RGB")
    tensor = transform(image).unsqueeze(0).to(device)
    with torch.no_grad():
        outputs = model(tensor)
        probs = torch.softmax(outputs, dim=1)
        confidence, predicted = torch.max(probs, 1)
    label = CLASS_NAMES[predicted.item()]
    result = "Negative" if label == "No DR" else "Positive"
    return {
        "result": result,
        "label": label,
        "confidence": round(confidence.item() * 100, 2)
    }