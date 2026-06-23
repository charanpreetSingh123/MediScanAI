import ssl
ssl._create_default_https_context = ssl._create_unverified_context

import torch
import os
import importlib.util
from torchvision import transforms
from PIL import Image

this_dir = os.path.dirname(os.path.abspath(__file__))

# Load model.py directly by file path — avoids module cache conflict
spec = importlib.util.spec_from_file_location("brain_tumor_model_def", os.path.join(this_dir, "model.py"))
brain_tumor_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(brain_tumor_module)
BrainTumorModel = brain_tumor_module.BrainTumorModel

CLASS_NAMES = ["Glioma", "Meningioma", "No Tumor", "Pituitary"]
MODEL_PATH = os.path.join(this_dir, "brain_tumor_model.pth")

device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

model = BrainTumorModel(num_classes=4)
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
    result = "Negative" if label == "No Tumor" else "Positive"
    return {
        "result": result,
        "label": label,
        "confidence": round(confidence.item() * 100, 2)
    }