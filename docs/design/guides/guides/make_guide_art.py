#!/usr/bin/env python3
"""HML guide art: renders the guide OG (1200x630 PNG) and the /guides hub card
(640x480 @1x and 1280x960 @2x, lossless WebP) from a title.

  python3 make_guide_art.py --title "SEO vs AEO vs GEO" --category seo-aeo-geo --slug seo-vs-aeo-vs-geo

Options: --out DIR (default ./out), --no-byline (OG without the byline),
--build-motifs (re-cut motifs/ from the service hero art; only needed once).
Needs Pillow and numpy. Fonts: Archivo variable (wdth,wght) and Inter variable;
set HML_FONTS=/path/to/dir containing Archivo/ and Inter/ if not at the default path.

Brand rules baked in: paper #FFFFFF (every edge pixel 255), ink #151515, signal
yellow #F4BD49 as the only accent and never as text on white, Archivo condensed
caps titles, Inter for everything else, live header wordmark, small H mark."""
import argparse, itertools, math, os, random, re, sys
from PIL import Image, ImageDraw, ImageFont, ImageChops
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.environ.get("HML_FONTS", "/usr/share/fonts/truetype/sand-box/google")
ARCHIVO = os.path.join(FONTS, "Archivo", "Archivo-VariableFont_wdth,wght.ttf")
INTER = os.path.join(FONTS, "Inter", "Inter-VariableFont_opsz,wght.ttf")
WHITE, INK, SLATE, YELLOW = (255, 255, 255), (21, 21, 21), (107, 106, 102), (244, 189, 73)

CATEGORIES = {   # slug: (label shown in the pill, motif file)
    "seo-aeo-geo": ("SEO/AEO/GEO", "seo-aeo-geo.png"),
    "branding": ("Branding", "branding.png"),
    "performance": ("Performance", "performance.png"),
    "social": ("Social", "social.png"),
}
ALIASES = {"seo": "seo-aeo-geo", "performance-marketing": "performance", "social-media": "social", "brand": "branding"}
BYLINE = ("By Rowan Blake", "Reviewed by Kuntal Khanapurkar, Founder")

# ---------------------------------------------------------------- type helpers
def archivo(px, wght=800, wdth=62):
    f = ImageFont.truetype(ARCHIVO, int(px)); f.set_variation_by_axes([wght, wdth]); return f
def inter(px, name="Medium"):
    f = ImageFont.truetype(INTER, int(px))
    try: f.set_variation_by_name(name)
    except Exception: pass
    return f
def tracked(d, xy, text, font, fill, track):
    """draw text with letter-spacing (track in em)."""
    x, y = xy; em = font.size
    for ch in text:
        d.text((x, y), ch, font=font, fill=fill); x += d.textlength(ch, font=font) + track * em
    return x
def tracked_len(d, text, font, track):
    return sum(d.textlength(c, font=font) for c in text) + track * font.size * len(text)

def caps(title):
    """Uppercase for the condensed-caps headline, but keep file names and URLs
    (tokens like llms.txt or robots.txt) in their real case so they stay correct."""
    out = []
    for w in title.split():
        out.append(w if re.search(r"[a-z0-9]\.[a-z]{2,4}\b", w) else w.upper())
    return " ".join(out)

WEAK = {"A", "AN", "THE", "AND", "OR", "OF", "TO", "IN", "ON", "FOR", "WITH", "VS", "YOUR", "AT", "BY", "IS"}

def fit_title(d, text, box_w, box_h, max_px, min_px, lead=0.94, max_lines=3):
    """Largest size where the title wraps into <= max_lines balanced lines inside the box.
    Good breaks first: no line ending on a small word (for, and, vs...) and no one-word last
    line. Only if no good break fits at any size does it fall back to any break."""
    words = text.split()
    for strict in (True, False):
        for px in range(int(max_px), int(min_px) - 1, -1):
            f = archivo(px); cap_h = f.getbbox("H")[3] - f.getbbox("H")[1]
            for n in range(1, min(max_lines, len(words)) + 1):
                if cap_h + (n - 1) * px * lead > box_h: break
                best = None
                for cuts in itertools.combinations(range(1, len(words)), n - 1):
                    idx = (0,) + cuts + (len(words),)
                    lines = [" ".join(words[a:b]) for a, b in zip(idx, idx[1:])]
                    if strict and n > 1 and (any(l.split()[-1].upper() in WEAK for l in lines[:-1])
                                             or (len(lines[-1].split()) == 1 and len(words) > 3)):
                        continue
                    w = max(d.textlength(l, font=f) for l in lines)
                    if w <= box_w and (best is None or w < best[0]): best = (w, lines)
                if best: return f, best[1], px, lead
    raise SystemExit(f"Title does not fit in {max_lines} lines even at {min_px}px: {text!r}. Shorten it.")

def draw_title(d, f, lines, x, top, lead):
    """top = top of the cap height of line 1."""
    off = f.getbbox("H")[1]; y = top - off
    for i, l in enumerate(lines):
        d.text((x, y + i * f.size * lead), l, font=f, fill=INK)
    cap_h = f.getbbox("H")[3] - f.getbbox("H")[1]
    return top + cap_h + (len(lines) - 1) * f.size * lead       # bottom of last caps line

def wordmark(d, x, y, scale):
    """live header wordmark: 7px yellow dot, 8px gap, Inter Medium 14px, -0.03em."""
    f = inter(14 * scale, "Medium"); bb = f.getbbox("H"); cy = y + (bb[1] + bb[3]) / 2; r = 3.5 * scale
    d.ellipse((x, cy - r, x + 2 * r, cy + r), fill=YELLOW)
    return tracked(d, (x + 2 * r + 8 * scale, y), "Human Made Logic", f, INK, -0.03)

def monogram(letter_h, col=INK, ss=4):
    """official H with underline (letter 65x73, stems 20, bar 17 at 27, underline 78x4, gap 27)."""
    k = letter_h * ss / 73.0; bar_w = 78 * k; lw = 65 * k; pad = 2 * ss
    W = int(math.ceil(bar_w + 2 * pad)); H = int(math.ceil((73 + 27 + 4) * k + 2 * pad))
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0)); dd = ImageDraw.Draw(im)
    x0 = pad + (bar_w - lw) / 2; y0 = pad
    def r(x, y, w, h): dd.rectangle([x, y, x + w - 1, y + h - 1], fill=col + (255,))
    r(x0, y0, 20 * k, 73 * k); r(x0 + lw - 20 * k, y0, 20 * k, 73 * k); r(x0, y0 + 27 * k, lw, 17 * k)
    r(pad, y0 + 100 * k, bar_w, 4 * k)
    return im.resize((max(1, round(W / ss)), max(1, round(H / ss))), Image.LANCZOS)

def pill(d, x, y, label, px):
    """category label: ink Inter SemiBold caps on a yellow pill (yellow only behind ink)."""
    f = inter(px, "SemiBold"); t = label.upper(); tr = 0.06
    w = tracked_len(d, t, f, tr) - tr * px; bb = f.getbbox("H"); ch = bb[3] - bb[1]
    ph, pw = ch + px * 0.9, px * 0.85
    d.rounded_rectangle((x, y, x + w + 2 * pw, y + ph), radius=ph / 2, fill=YELLOW)
    tracked(d, (x + pw, y + (ph - ch) / 2 - bb[1]), t, f, INK, tr)
    return x + w + 2 * pw, y + ph

def eyebrow(d, x, y, px):
    f = inter(px, "SemiBold"); bb = f.getbbox("H")
    return tracked(d, (x, y - bb[1]), "GUIDE", f, INK, 0.14), bb[3] - bb[1]

def place_motif(im, cat, box):
    m = Image.open(os.path.join(HERE, "motifs", CATEGORIES[cat][1])).convert("RGB")
    x0, y0, x1, y1 = box; s = min((x1 - x0) / m.width, (y1 - y0) / m.height)
    m = m.resize((max(1, int(m.width * s)), max(1, int(m.height * s))), Image.LANCZOS)
    layer = Image.new("RGB", im.size, WHITE); layer.paste(m, (x0 + (x1 - x0 - m.width) // 2, y0 + (y1 - y0 - m.height) // 2))
    return ImageChops.multiply(im, layer)   # white falls away, ink and yellow stay exact

def clean_edges(im, band=2):
    a = np.asarray(im).copy(); a[:band] = 255; a[-band:] = 255; a[:, :band] = 255; a[:, -band:] = 255
    return Image.fromarray(a)

# ---------------------------------------------------------------- renderers
def render_og(title, cat, byline=True):
    """1200x630. Safe area: centre 1080x560 (x 60..1140, y 35..595). Content kept at x 80..1110, y 66..566."""
    S = 2; W, H = 1200 * S, 630 * S
    im = Image.new("RGB", (W, H), WHITE); d = ImageDraw.Draw(im)
    wordmark(d, 80 * S, 66 * S, 2.0 * S)
    mono = monogram(34 * S).convert("RGBA"); im.paste(mono, (1110 * S - mono.width, 62 * S), mono)
    ex, eh = eyebrow(d, 80 * S, 150 * S, 17 * S)
    pill(d, ex + 16 * S, 150 * S + eh / 2 - (17 * S * 0.73 + 17 * S * 0.9) / 2, CATEGORIES[cat][0], 17 * S)
    box_w = 690 * S; top = 200 * S; bottom = (452 if byline else 540) * S
    f, lines, px, lead = fit_title(d, caps(title), box_w, bottom - top, 112 * S, 44 * S)
    draw_title(d, f, lines, 78 * S, top, lead)
    if byline:
        fb, fr = inter(22 * S, "SemiBold"), inter(19 * S, "Regular")
        d.text((80 * S, 515 * S), BYLINE[0], font=fb, fill=INK, anchor="ls")
        d.text((80 * S, 546 * S), BYLINE[1], font=fr, fill=SLATE, anchor="ls")
    im = place_motif(im, cat, (820 * S, 170 * S, 1110 * S, 560 * S))
    im = im.resize((1200, 630), Image.LANCZOS)
    return clean_edges(im), dict(size=px // S, lines=lines)

def render_card(title, cat, scale=2):
    """Hub card, 4:3. 640x480 CSS px; rendered at 1280x960 for 2x. Safe inset 48 px (1x) on every side."""
    S = scale * 2; W, H = 640 * S, 480 * S
    im = Image.new("RGB", (W, H), WHITE); d = ImageDraw.Draw(im)
    ex, eh = eyebrow(d, 48 * S, 52 * S, 14 * S)
    pill(d, ex + 12 * S, 52 * S + eh / 2 - (14 * S * 0.73 + 14 * S * 0.9) / 2, CATEGORIES[cat][0], 14 * S)
    f, lines, px, lead = fit_title(d, caps(title), 544 * S, 168 * S, 92 * S, 34 * S)
    bottom = draw_title(d, f, lines, 47 * S, 102 * S, lead)   # title block: y 102..270 (1x)
    mono = monogram(22 * S).convert("RGBA"); im.paste(mono, (48 * S, 432 * S - mono.height + 4 * S), mono)
    # motif: fixed box bottom-right, below the title block, so every card in the grid lines up
    im = place_motif(im, cat, (300 * S, 292 * S, 592 * S, 432 * S))
    out = im.resize((640 * scale, 480 * scale), Image.LANCZOS)
    return clean_edges(out), dict(size=px / S, lines=lines)

# ---------------------------------------------------------------- motifs (one-off)
def build_motifs():
    """Cut the per-category motif from the approved service hero art (read-only)."""
    src = os.path.normpath(os.path.join(HERE, "..", "services", "_preview"))
    crops = {"branding": ("svc-branding-hero.png", (538, 100, 928, 820)),
             "seo-aeo-geo": ("svc-seo-aeo-geo-hero.png", None),
             "performance": ("svc-performance-marketing-hero.png", None),
             "social": ("svc-social-media-hero.png", None)}
    for cat, (fn, box) in crops.items():
        im = Image.open(os.path.join(src, fn)).convert("RGB")
        if box: im = im.crop(box)
        a = np.asarray(im.convert("L")); ys, xs = np.where(a < 250)
        im = im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
        if cat == "performance":   # the arm leaves the hero frame at the top: fade it rather than hard-cut
            g = np.ones((im.height, 1), np.float32); n = 90; g[:n, 0] = np.linspace(0, 1, n) ** 1.5
            b = np.asarray(im, np.float32); im = Image.fromarray((b * g[..., None] + 255 * (1 - g[..., None])).astype("uint8"))
        im.save(os.path.join(HERE, "motifs", CATEGORIES[cat][1]), optimize=True); print("motif", cat, im.size)

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--title"); ap.add_argument("--category", default="seo-aeo-geo")
    ap.add_argument("--slug"); ap.add_argument("--out", default=os.path.join(HERE, "out"))
    ap.add_argument("--no-byline", action="store_true"); ap.add_argument("--build-motifs", action="store_true")
    a = ap.parse_args()
    if a.build_motifs: build_motifs()
    if not a.title: return
    if "\u2014" in a.title: sys.exit("No em dashes in titles (house rule).")
    cat = ALIASES.get(a.category, a.category)
    if cat not in CATEGORIES: sys.exit(f"--category must be one of {', '.join(CATEGORIES)}")
    slug = a.slug or re.sub(r"[^a-z0-9]+", "-", a.title.lower()).strip("-")
    os.makedirs(a.out, exist_ok=True)
    og, i1 = render_og(a.title, cat, not a.no_byline)
    p = os.path.join(a.out, f"og-guide-{slug}.png")
    og.quantize(256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG).save(p, optimize=True)
    print(f"{p}  1200x630  {os.path.getsize(p):,} B  title {i1['size']}px x{len(i1['lines'])} lines: {i1['lines']}")
    for sc in (1, 2):
        c, i2 = render_card(a.title, cat, sc)
        p = os.path.join(a.out, f"card-guide-{slug}{'@2x' if sc == 2 else ''}.webp")
        c.save(p, "WEBP", lossless=True, method=6, exact=True)
        print(f"{p}  {c.width}x{c.height}  {os.path.getsize(p):,} B  title {i2['size']:.0f}px (1x) x{len(i2['lines'])} lines")

if __name__ == "__main__":
    main()
