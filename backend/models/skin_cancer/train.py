import torch
import torch.nn as nn
from torch.utils.data import DataLoader, random_split, Dataset, WeightedRandomSampler
from torchvision import transforms
from PIL import Image
from model import SkinCancerModel
import pandas as pd
import numpy as np
import os

# Config
DATASET_PATH = "../../datasets/skin_cancer/archive-2"
IMG_DIR = "../../datasets/skin_cancer/archive-2/ISIC_2019_Training_Input"
CSV_PATH = "../../datasets/skin_cancer/archive-2/ISIC_2019_Training_GroundTruth.csv"
BATCH_SIZE = 32
EPOCHS = 20
LR = 0.0003
NUM_CLASSES = 8
SAVE_PATH = "skin_cancer_model.pth"

CLASS_NAMES = ["MEL", "NV", "BCC", "AK", "BKL", "DF", "VASC", "SCC"]

class HAMDataset(Dataset):
    def __init__(self, csv_file, img_dir, transform=None):
        self.data = pd.read_csv(csv_file)
        # ISIC 2019 format - get label from one-hot columns
        label_cols = ["MEL", "NV", "BCC", "AK", "BKL", "DF", "VASC", "SCC"]
        self.data["label"] = self.data[label_cols].values.argmax(axis=1)
        self.img_dir = img_dir
        self.transform = transform

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        row = self.data.iloc[idx]
        img_path = os.path.join(self.img_dir, row["image"] + ".jpg")
        image = Image.open(img_path).convert("RGB")
        label = int(row["label"])
        if self.transform:
            image = self.transform(image)
        return image, label

# Transforms
train_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomVerticalFlip(),
    transforms.RandomRotation(30),
    transforms.ColorJitter(brightness=0.3, contrast=0.3, saturation=0.2, hue=0.1),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

val_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

# Load dataset
csv_path = os.path.join(DATASET_PATH, "HAM10000_metadata.csv")
img_dir = os.path.join(DATASET_PATH, "images")

full_dataset = HAMDataset(csv_path, img_dir, transform=train_transform)
print(f"Total images: {len(full_dataset)}")

# Split
val_size = int(0.2 * len(full_dataset))
train_size = len(full_dataset) - val_size
train_data, val_data = random_split(full_dataset, [train_size, val_size])

# Handle class imbalance with WeightedRandomSampler
labels = [full_dataset.data.iloc[i]["dx"].upper() for i in range(len(full_dataset))]
class_counts = np.bincount([CLASS_TO_IDX[l] for l in labels])
class_weights = 1.0 / class_counts
sample_weights = [class_weights[CLASS_TO_IDX[labels[i]]] for i in train_data.indices]
sampler = WeightedRandomSampler(sample_weights, len(sample_weights))

train_loader = DataLoader(train_data, batch_size=BATCH_SIZE, sampler=sampler, num_workers=2)
val_loader = DataLoader(val_data, batch_size=BATCH_SIZE, shuffle=False, num_workers=2)

# Device
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
print(f"Using device: {device}")

# Model
model = SkinCancerModel(num_classes=NUM_CLASSES).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.AdamW(model.parameters(), lr=LR, weight_decay=1e-4)
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=EPOCHS)

best_val_acc = 0.0

for epoch in range(EPOCHS):
    # Train
    model.train()
    train_loss, train_correct = 0, 0
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        train_loss += loss.item()
        train_correct += (outputs.argmax(1) == labels).sum().item()

    # Validate
    model.eval()
    val_loss, val_correct = 0, 0
    with torch.no_grad():
        for images, labels in val_loader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            loss = criterion(outputs, labels)
            val_loss += loss.item()
            val_correct += (outputs.argmax(1) == labels).sum().item()

    train_acc = train_correct / train_size * 100
    val_acc = val_correct / val_size * 100
    scheduler.step()

    print(f"Epoch [{epoch+1}/{EPOCHS}] "
          f"Train Loss: {train_loss/len(train_loader):.4f} | Train Acc: {train_acc:.2f}% | "
          f"Val Loss: {val_loss/len(val_loader):.4f} | Val Acc: {val_acc:.2f}%")

    if val_acc > best_val_acc:
        best_val_acc = val_acc
        torch.save(model.state_dict(), SAVE_PATH)
        print(f"  ✅ Best model saved! Val Acc: {val_acc:.2f}%")

print(f"\n🎉 Training complete! Best Val Accuracy: {best_val_acc:.2f}%")