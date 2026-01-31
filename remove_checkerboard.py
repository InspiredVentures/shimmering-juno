import sys
from PIL import Image

def is_bg_color(pixel):
    r, g, b = pixel[:3]
    # Check for White (near 255)
    if r > 240 and g > 240 and b > 240:
        return True
    # Check for Grey Check (near 205 or 220)
    # 205, 207, 206
    if abs(r - 205) < 25 and abs(g - 205) < 25 and abs(b - 205) < 25:
        return True
    return False

def remove_checkerboard(path):
    try:
        img = Image.open(path).convert("RGBA")
        width, height = img.size
        pixels = img.load()
        
        # Helper for flood fill
        queue = []
        visited = set()
        
        # Start from top corners
        starts = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
        
        # Filter starts to only those that look like BG
        for start in starts:
             if is_bg_color(pixels[start]):
                 queue.append(start)
                 visited.add(start)

        # Flood Fill
        while queue:
            x, y = queue.pop(0)
            pixels[x, y] = (0, 0, 0, 0) # Transparent
            
            # Check neighbors
            for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    if (nx, ny) not in visited:
                        if is_bg_color(pixels[nx, ny]):
                            visited.add((nx, ny))
                            queue.append((nx, ny))
                            
        img.save(path)
        print(f"Processed {path}")
            
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
    remove_checkerboard(img)
