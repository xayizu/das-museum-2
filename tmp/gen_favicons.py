from PIL import Image, ImageDraw

def generate_favicon(size, output_path):
    # Create image with transparent background (or white if requested, but transparent is better SEO-wise)
    # Actually user wants what Google sees. White background is safer as Google sometimes adds transparency issues.
    # The SVG has a white circle background.
    img = Image.new('RGBA', (size, size), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    scale = size / 32.0

    # Draw White Circle Background
    draw.ellipse([0, 0, size-1, size-1], fill=(255, 255, 255, 255))

    # Define paths (coordinates scaled)
    def s(pts):
        return [(p[0] * scale, p[1] * scale) for p in pts]

    yellow_path = s([(16.06, 2.23), (22.23, 12.92), (16.06, 16.48), (9.88, 12.92)])
    blue_path = s([(3.71, 23.67), (16.06, 23.67), (16.06, 16.48), (9.88, 12.92)])
    red_path = s([(28.4, 23.67), (22.23, 12.92), (16.06, 16.48), (16.06, 23.67)])

    # Colors from SVG
    # s1: #ffec01 (Yellow)
    # s2: #004e9b (Blue)
    # s3: #e4001b (Red)
    # stroke: #000000

    draw.polygon(yellow_path, fill=(255, 236, 1), outline=(0, 0, 0))
    draw.polygon(blue_path, fill=(0, 78, 155), outline=(0, 0, 0))
    draw.polygon(red_path, fill=(228, 0, 27), outline=(0, 0, 0))

    img.save(output_path)
    print(f"Generated {output_path}")

path_48 = r"c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public\recursos\images\index\favicon-48.png"
path_144 = r"c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public\recursos\images\index\favicon-144.png"

generate_favicon(48, path_48)
generate_favicon(144, path_144)
