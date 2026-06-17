import torch
from torchvision import transforms
from PIL import Image
from model import SkinCancerModel

CLASS_NAMES = ["MEL", "NV", "BCC", "AKIEC", "BKL", "DF", "VASC"]
CLASS_FULL_NAMES = {
    "MEL": "Melanoma",
    "NV": "Melanocytic Nevi",
    "BCC": "Basal Cell Carcinoma",
    "AKIEC": "Actinic Keratosis",
    "BKL": "Benign Keratosis",
    "DF": "Dermatofibroma",
    "VASC": "Vascular Lesion"
}
BENIGN_CLASSES = ["NV", "BKL", "DF", "VASC"]
MODEL_PATH = "skin_cancer_model.pth"

device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

model = SkinCancerModel(num_classes=7)
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