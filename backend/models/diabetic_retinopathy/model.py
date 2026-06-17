import ssl
ssl._create_default_https_context = ssl._create_unverified_context
import torch
import torch.nn as nn
from torchvision import models

class DiabeticRetinopathyModel(nn.Module):
    def __init__(self, num_classes=5):
        super(DiabeticRetinopathyModel, self).__init__()
        # Using ResNet50 for retinopathy
        self.base_model = models.resnet50(weights="IMAGENET1K_V1")
        
        # Replace final layer
        # Classes: No DR, Mild, Moderate, Severe, Proliferative
        in_features = self.base_model.fc.in_features
        self.base_model.fc = nn.Sequential(
            nn.Dropout(p=0.4),
            nn.Linear(in_features, 256),
            nn.ReLU(),
            nn.Dropout(p=0.2),
            nn.Linear(256, num_classes)
        )

    def forward(self, x):
        return self.base_model(x)