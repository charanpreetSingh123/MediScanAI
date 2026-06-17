import torch
import torch.nn as nn
from torchvision import models

class BrainTumorModel(nn.Module):
    def __init__(self, num_classes=4):
        super(BrainTumorModel, self).__init__()
        # Load pretrained EfficientNet
        self.base_model = models.efficientnet_b0(weights="IMAGENET1K_V1")
        
        # Replace final layer for our 4 classes
        # (Glioma, Meningioma, Pituitary, No Tumor)
        in_features = self.base_model.classifier[1].in_features
        self.base_model.classifier = nn.Sequential(
            nn.Dropout(p=0.3),
            nn.Linear(in_features, num_classes)
        )

    def forward(self, x):
        return self.base_model(x)