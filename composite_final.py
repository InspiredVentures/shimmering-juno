
import cv2
import numpy as np
from PIL import Image, ImageOps
import pillow_avif
import os

def create_composite():
    bg_path = "assets/inspired_mountains_v4.png"
    logo_path = "assets/Inspired-logo.avif"
    output_path = "assets/inspired_card_final.png"

    print(f"Loading background: {bg_path}")
    bg = Image.open(bg_path).convert("RGBA")
    
    print(f"Loading logo: {logo_path}")
    logo = Image.open(logo_path).convert("RGBA")

    # 1. Remove Black Background from Logo
    # Convert to numpy array
    data = np.array(logo)
    
    # Calculate intensity
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    
    # Simple Threshold for now (since floodfill is complex in pure numpy)
    # We assume the background is nearly black
    threshold = 40
    mask = (r < threshold) & (g < threshold) & (b < threshold)
    
    # Set alpha to 0 for dark pixels
    data[mask, 3] = 0
    
    # Create clean logo
    logo_clean = Image.fromarray(data)
    
    # 2. Resize Logo to fit nicely (e.g., 80% of bg width)
    # Background dimensions
    bg_w, bg_h = bg.size
    
    # Target logo width
    target_w = int(bg_w * 0.85)
    
    # Resize keeping aspect ratio
    ratio = target_w / logo_clean.width
    target_h = int(logo_clean.height * ratio)
    
    logo_resized = logo_clean.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # 3. Center Position
    pos_x = (bg_w - target_w) // 2
    pos_y = (bg_h - target_h) // 2
    
    # 4. Composite (Paste with alpha)
    # Use alpha_composite for correct blending
    final = Image.new("RGBA", bg.size)
    final.paste(bg, (0,0))
    final.paste(logo_resized, (pos_x, pos_y), logo_resized)
    
    # 5. Save
    final.save(output_path, "PNG")
    print(f"Saved composition to {output_path}")

if __name__ == "__main__":
    try:
        create_composite()
    except Exception as e:
        print(f"Error: {e}")
