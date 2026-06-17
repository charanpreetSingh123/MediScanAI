import torch
import torch.nn as nn
from torchvision import models

class SkinCancerModel(nn.Module):
    def __init__(self, num_classes=7):
        super(SkinCancerModel, self).__init__()
        # Using EfficientNet B2 for skin cancer (slightly larger = better accuracy)
        self.base_model = models.efficientnet_b2(weights="IMAGENET1K_V1")

        # Classes: MEL, NV, BCC, AKIEC, BKL, DF, VASC
        in_features = self.base_model.classifier[1].in_features
        self.base_model.classifier = nn.Sequential(
            nn.Dropout(p=0.4),
            nn.Linear(in_features, 512),
            nn.ReLU(),
            nn.Dropout(p=0.2),
            nn.Linear(512, num_classes)
        )

    def forward(self, x):
        return self.base_model(x)