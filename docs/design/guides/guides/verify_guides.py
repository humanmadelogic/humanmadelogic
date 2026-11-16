"""Check guide renders: sizes, white edges, centre safe area (OG), bytes."""
import glob, os, sys, numpy as np
from PIL import Image
D = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "samples")
ok_all = True
for p in sorted(glob.glob(os.path.join(D, "*.png")) + glob.glob(os.path.join(D, "*.webp"))):
    n = os.path.basename(p); im = Image.open(p); a = np.asarray(im.convert("RGB")); b = os.path.getsize(p)
    edges = all((e == 255).all() for e in (a[0], a[-1], a[:, 0], a[:, -1]))
    ys, xs = np.where((a < 250).any(2)); bb = (int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max()))
    if n.startswith("og-"):
        want = (1200, 630); safe = bb[0] >= 60 and bb[1] >= 35 and bb[2] <= 1139 and bb[3] <= 594; lim = 1_000_000
    else:
        want = (1280, 960) if "@2x" in n else (640, 480); k = want[0] / 640; i = 40 * k
        safe = bb[0] >= i and bb[1] >= i and bb[2] <= want[0] - i and bb[3] <= want[1] - i; lim = 300_000
    yel = (np.abs(a.astype(int) - [244, 189, 73]).sum(2) < 30).mean() * 100
    ok = im.size == want and edges and safe and b <= lim; ok_all &= ok
    print(f"{'PASS' if ok else 'FAIL'} {n:52s} {im.size[0]}x{im.size[1]} {b:>8,} B edges_255={edges} content_bbox={bb} in_safe={safe} yellow={yel:.1f}%")
print("ALL PASS" if ok_all else "SOME FAIL"); sys.exit(0 if ok_all else 1)
