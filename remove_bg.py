
import cv2
import numpy as np
from PIL import Image
import pillow_avif

def remove_black_background(input_path, output_path):
    try:
        # Load image with PIL (handles AVIF via plugin)
        img_pil = Image.open(input_path).convert("RGBA")
        img = np.array(img_pil)

        # Convert to BGR for OpenCV processing (optional, but standard)
        # However, since we have RGBA numpy array, we can operate directly.
        # R, G, B, A = img[:,:,0], img[:,:,1], img[:,:,2], img[:,:,3]
        
        # Define threshold for "black"
        threshold = 30
        
        # Create mask where pixels are darker than threshold
        # Condition: R < threshold AND G < threshold AND B < threshold
        mask = (img[:,:,0] < threshold) & (img[:,:,1] < threshold) & (img[:,:,2] < threshold)
        
        # Set Alpha to 0 where mask is True
        img[mask, 3] = 0
        
        # Save result
        result = Image.fromarray(img)
        result.save(output_path, "PNG")
        print(f"Successfully saved transparent logo to {output_path}")
        
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    remove_black_background("assets/Inspired-logo.avif", "assets/inspired_logo_transparent.png")
