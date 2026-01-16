from PIL import Image

def crop_black_borders(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    
    # Create a mask where non-black pixels are white (255) and black pixels are black (0)
    # We consider "black" as pixels with very low brightness
    threshold = 15
    def is_not_black(p):
        # p is a pixel value (integer or tuple depending on mode, but point works on bands)
        # Actually easier to act on grayscale
        return 255 if p > threshold else 0

    # Convert to grayscale to check brightness
    gray = img.convert("L")
    # Point function maps each pixel through the table
    mask = gray.point(is_not_black)
    
    # Get bounding box of the non-black content
    bbox = mask.getbbox()
    
    if bbox:
        cropped_img = img.crop(bbox)
        cropped_img.save(output_path)
        print(f"Cropped image to {bbox} and saved to {output_path}")
    else:
        print("No content found to crop.")

if __name__ == "__main__":
    crop_black_borders("assets/logo.png", "assets/logo.png")
