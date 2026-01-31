import sys
from PIL import Image

def analyze_bg(path):
    try:
        img = Image.open(path)
        print(f"--- {path} ---")
        print(f"Mode: {img.mode}")
        
        # Check corners
        corners = [
            (0, 0),
            (img.width-1, 0),
            (0, img.height-1),
            (img.width-1, img.height-1)
        ]
        
        for pos in corners:
            print(f"Pixel at {pos}: {img.getpixel(pos)}")
            
    except Exception as e:
        print(f"{path}: Error - {e}")

images = [
    "assets/steve_cutout.png",
    "assets/mark_cutout.png",
    "assets/mariel_cutout.png",
    "assets/tom_cutout.png",
    "assets/john_cutout.png",
    "assets/shep_cutout.png"
]

for img in images:
    analyze_bg(img)
