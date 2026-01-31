from PIL import Image
import os

# Input and Output Paths
input_path = r"C:/Users/msf19/.gemini/antigravity/brain/0bd2637e-b49a-49c4-a3d7-b736b608f884/steve_green_v2_1769862641209.png"
output_path = r"c:/Users/msf19/.gemini/antigravity/playground/shimmering-juno/assets/steve_cutout.png"

def remove_green(input_file, output_file):
    print(f"Processing {input_file}...")
    try:
        img = Image.open(input_file).convert("RGBA")
        datas = img.getdata()

        new_data = []
        for item in datas:
            # Simple Green Screen Removal Logic
            # If Green is significantly brighter than Red and Blue
            if item[1] > 100 and item[1] > item[0] * 1.2 and item[1] > item[2] * 1.2:
                 new_data.append((255, 255, 255, 0)) # Transparent
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(output_file, "PNG")
        print(f"Successfully saved to {output_file}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    remove_green(input_path, output_path)
