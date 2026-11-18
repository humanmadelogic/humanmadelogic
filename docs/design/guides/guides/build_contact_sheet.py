"""contact-sheet-guides.png: every sample OG + card, the 4 category motifs, and the HTML live-text render."""
import os, sys
from PIL import Image, ImageDraw
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from make_guide_art import inter, CATEGORIES, HERE
SM = os.path.join(HERE, "samples")
samples = [("seo-vs-aeo-vs-geo", "Guide 1 (sample)"), ("what-is-llms-txt", "Stress test: file name kept lower case"),
           ("restaurant-marketing-singapore", "Stress test: longest plan title"), ("rebrand-checklist-small-brands", "Second category (Branding)")]
G = 40; ow, oh = 720, 378; cw, ch = 504, 378; rowh = oh + 60
W = G * 3 + ow + cw; H = G + len(samples) * (rowh + 20) + 324 + 440 + G
sh = Image.new("RGB", (W, H), (255, 255, 255)); d = ImageDraw.Draw(sh); f = inter(20, "SemiBold"); fs = inter(17, "Regular")
def frame(im, x, y, w, h):
    sh.paste(im.convert("RGB").resize((w, h), Image.LANCZOS), (x, y)); d.rectangle((x - 1, y - 1, x + w, y + h), outline=(225, 225, 225))
y = G
for slug, note in samples:
    d.text((G, y), f"og-guide-{slug}.png  1200x630", font=f, fill=(21, 21, 21))
    d.text((G * 2 + ow, y), f"card-guide-{slug}@2x.webp", font=fs, fill=(21, 21, 21)); d.text((G * 2 + ow, y + 26), "1280x960 (2x of 640x480)", font=fs, fill=(107, 106, 102))
    d.text((G, y + 26), note, font=fs, fill=(107, 106, 102))
    frame(Image.open(os.path.join(SM, f"og-guide-{slug}.png")), G, y + 52, ow, oh - 0)
    frame(Image.open(os.path.join(SM, f"card-guide-{slug}@2x.webp")), G * 2 + ow, y + 52, cw, ch)
    y += rowh + 20
d.text((G, y), "Category motifs (motifs/*.png, cut from the approved service hero art)", font=f, fill=(21, 21, 21)); y += 34
x = G
for cat, (label, fn) in CATEGORIES.items():
    m = Image.open(os.path.join(HERE, "motifs", fn)).convert("RGB"); m.thumbnail((290, 230))
    sh.paste(m, (x, y)); d.text((x, y + 240), f"{cat}  ({label})", font=fs, fill=(107, 106, 102)); x += 310
y += 290
d.text((G, y), "Live-text source guide-template.html rendered in Chrome (same layout, title is real text)", font=f, fill=(21, 21, 21)); y += 34
x = G
for n in ("seo", "rest", "llms"):
    p = os.path.join(HERE, "_preview", f"html-render-{n}.png")
    if os.path.exists(p):
        im = Image.open(p).convert("RGB").crop((40, 40, 1240, 1190)); im.thumbnail((400, 380)); sh.paste(im, (x, y)); x += 420
sh = sh.crop((0, 0, W, min(H, y + 400))); sh.save(os.path.join(HERE, "contact-sheet-guides.png"), optimize=True); print(sh.size)
