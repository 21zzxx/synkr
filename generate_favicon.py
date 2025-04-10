from PIL import Image
import os

def create_favicon():
    # Create the favicon directory if it doesn't exist
    os.makedirs('assets/images/favicon', exist_ok=True)
    
    # Open and convert the JPG image
    img = Image.open('assets/images/IMG_7904.JPG')
    
    # Convert to RGBA if not already
    img = img.convert('RGBA')
    
    # Create square crop of the image
    width, height = img.size
    size = min(width, height)
    left = (width - size) // 2
    top = (height - size) // 2
    right = left + size
    bottom = top + size
    img = img.crop((left, top, right, bottom))
    
    # Save as ICO and PNG
    img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
    img_32.save('assets/images/favicon/favicon.ico', format='ICO')
    img_32.save('assets/images/favicon/favicon-32x32.png', format='PNG')
    
    # Create 16x16 version
    img_16 = img.resize((16, 16), Image.Resampling.LANCZOS)
    img_16.save('assets/images/favicon/favicon-16x16.png', format='PNG')
    
    # Create 180x180 version for Apple devices
    img_180 = img.resize((180, 180), Image.Resampling.LANCZOS)
    img_180.save('assets/images/favicon/apple-touch-icon.png', format='PNG')

if __name__ == '__main__':
    create_favicon() 