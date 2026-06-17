import torch
import numpy as np
import cv2
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image

def generate_heatmap(model, target_layer, input_tensor, original_image_path, save_path):
    try:
        cam = GradCAM(model=model, target_layers=[target_layer])
        grayscale_cam = cam(input_tensor=input_tensor)[0]

        img = cv2.imread(original_image_path)
        img = cv2.resize(img, (224, 224))
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB) / 255.0

        visualization = show_cam_on_image(img_rgb.astype(np.float32), grayscale_cam, use_rgb=True)
        cv2.imwrite(save_path, cv2.cvtColor(visualization, cv2.COLOR_RGB2BGR))
        return save_path
    except Exception as e:
        print(f"Heatmap generation failed: {e}")
        return None