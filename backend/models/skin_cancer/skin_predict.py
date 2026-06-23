import ssl
ssl._create_default_https_context = ssl._create_unverified_context

import torch
import os
import importlib.util
from torchvision import transforms
from PIL import Image

this_dir = os.path.dirname(os.path.abspath(__file__))

spec = importlib.util.spec_from_file_location("skin_model_def", os.path.join(this_dir, "model.py"))
skin_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(skin_module)
SkinCancerModel = skin_module.SkinCancerModel

CLASS_NAMES = ["MEL", "NV", "BCC", "AK", "BKL", "DF", "VASC", "SCC"]
CLASS_FULL_NAMES = {
    "MEL": "Melanoma",
    "NV": "Melanocytic Nevus",
    "BCC": "Basal Cell Carcinoma",
    "AK": "Actinic Keratosis",
    "BKL": "Benign Keratosis",
    "DF": "Dermatofibroma",
    "VASC": "Vascular Lesion",
    "SCC": "Squamous Cell Carcinoma"
}
BENIGN_CLASSES = ["NV", "BKL", "DF", "VASC"]
MODEL_PATH = os.path.join(this_dir, "skin_cancer_model.pth")

device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

model = SkinCancerModel(num_classes=8)
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
    short_label = CLASS_NAMES[predicted.item()]
    full_label = CLASS_FULL_NAMES[short_label]
    result = "Negative" if short_label in BENIGN_CLASSES else "Positive"
    return {
        "result": result,
        "label": full_label,
        "confidence": round(confidence.item() * 100, 2)
    }