import sys, os, json, uuid
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
import cv2
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration

# -------------------------------
# LOAD BLIP MODEL
# -------------------------------
device = "cuda" if torch.cuda.is_available() else "cpu"

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
blip_model = BlipForConditionalGeneration.from_pretrained(
    "Salesforce/blip-image-captioning-base"
).to(device)

# -------------------------------
# HELPERS
# -------------------------------

def load_image(path):
    return Image.open(path).convert("RGB")

def save_image(img, folder, prefix):
    os.makedirs(folder, exist_ok=True)
    filename = f"{prefix}_{uuid.uuid4().hex[:6]}.png"
    out_path = os.path.join(folder, filename)
    img.save(out_path)
    return out_path

def enhance_fabric(pil_img):
    img_cv = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)

    # CLAHE enhance
    lab = cv2.cvtColor(img_cv, cv2.COLOR_BGR2LAB)
    l,a,b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    l2 = clahe.apply(l)
    lab2 = cv2.merge((l2,a,b))
    clahe_img = cv2.cvtColor(lab2, cv2.COLOR_LAB2RGB)

    enhanced = Image.fromarray(clahe_img)
    enhanced = ImageEnhance.Sharpness(enhanced).enhance(1.2)
    return enhanced

def tile_texture(tex, size):
    W, H = size
    tw, th = tex.size
    canvas = Image.new("RGB", (W, H))
    for x in range(0, W, tw):
        for y in range(0, H, th):
            canvas.paste(tex, (x, y))
    return canvas

def apply_mockup(template, mask, fabric):
    W, H = template.size
    fabric_tile = tile_texture(fabric, (W, H))

    mask = mask.convert("L").resize((W, H))
    mask = mask.filter(ImageFilter.GaussianBlur(2))

    mock = Image.composite(fabric_tile, template, mask)
    return mock

def generate_caption(img):
    try:
        inputs = processor(images=img, return_tensors="pt").to(device)
        out = blip_model.generate(**inputs, max_length=50)
        cap = processor.decode(out[0], skip_special_tokens=True)
        return cap
    except:
        return "Fabric pattern"

# -------------------------------
# MAIN SCRIPT
# -------------------------------

if len(sys.argv) < 3:
    print(json.dumps({"error": "Missing arguments"}))
    sys.exit()

input_path = sys.argv[1]
output_folder = sys.argv[2]

fabric = load_image(input_path)
enhanced = enhance_fabric(fabric)

# caption
caption = generate_caption(fabric)

template_dir = os.path.join(os.path.dirname(__file__), "templates")

mockup_files = [
    ("pillow.png", "pillow_mask.png", "pillow"),
    ("tote.png", "tote_mask.png", "tote"),
    ("dress.png", "dress_mask.png", "dress"),
]

results = {"caption": caption}

# process each mockup
for tpl, mask, label in mockup_files:
    tpl_path = os.path.join(template_dir, tpl)
    mask_path = os.path.join(template_dir, mask)

    if os.path.exists(tpl_path) and os.path.exists(mask_path):
        template = load_image(tpl_path)
        mask_img = load_image(mask_path)

        out = apply_mockup(template, mask_img, enhanced)
        saved_path = save_image(out, output_folder, label)

        results[label] = saved_path

# return JSON to Node.js
print(json.dumps(results))
