import sys
from PIL import Image
import math

def chroma_key(path, output_path):
    try:
        img = Image.open(path).convert("RGBA")
        pixels = img.load()
        width, height = img.size
        
        # Green Screen Color (Approx 0, 255, 0)
        # We detect if Green is dominant
        
        for x in range(width):
            for y in range(height):
                r, g, b, a = pixels[x, y]
                
                # Simple Green Screen Logic
                # If Green is significantly brighter than Red and Blue
                if g > r + 20 and g > b + 20: 
                    # It's green. Make transparent.
                    # Smooth transition for anti-aliasing?
                    # Hard cut for now to avoid "messy" halos
                    pixels[x, y] = (0, 0, 0, 0)
                elif g > r and g > b:
                     # Despill: Reduce Green component to avg of R and B
                     # This removes green reflection on skin/hair
                     pixels[x, y] = (r, int((r+b)/2), b, a)
                     
        img.save(output_path)
        print(f"Processed {output_path}")

    except Exception as e:
        print(f"{path}: Error - {e}")

# Map of raw generated file to final asset name
# Note: I need the exact filenames from previous step.
# I will copy them first to a temp name, or pass full paths.

tasks = [
    ("assets/temp_steve.png", "assets/steve_cutout.png"),
    ("assets/temp_mark.png", "assets/mark_cutout.png"),
    ("assets/temp_mariel.png", "assets/mariel_cutout.png"),
    ("assets/temp_tom.png", "assets/tom_cutout.png"),
    ("assets/temp_john.png", "assets/john_cutout.png"),
    ("assets/temp_shep.png", "assets/shep_cutout.png"),
]

# I need to copy the files from brain to playground/assets as 'temp_...' first.
# This script assumes they are local. I'll handle copying in the command line.

if __name__ == "__main__":
    if len(sys.argv) > 2:
        # Single file mode for robustness
        chroma_key(sys.argv[1], sys.argv[2])
