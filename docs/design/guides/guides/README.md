# HML Guides: OG and hub card template

Made by Sam (Senior Graphic Designer), 10 Nov 2026, for the /guides section (plan: `/workspace/hml-website-copy/seo-pages/GUIDES-PLAN.md`). Nothing here has been uploaded, committed or deployed.

## What is in this folder

| Path | What it is |
| --- | --- |
| `make_guide_art.py` | The template as a script. Renders the OG and the card (1x and 2x) from a title. |
| `guide-template.html` | Layered HTML/CSS source with the title as live text, the same layout as the script, for Jeff to generate in code. |
| `motifs/*.png` | One motif per category, cut from the approved service hero art (no new photos, no people). |
| `samples/` | Rendered samples: guide 1 plus three stress tests (see below). |
| `contact-sheet-guides.png` | Every sample OG and card, the four motifs, and the HTML render for comparison. |
| `verify_guides.py` | Checks sizes, exact white edges, safe areas and bytes. |
| `build_contact_sheet.py` | Rebuilds the contact sheet. |
| `_preview/` | Chrome renders of `guide-template.html`, used on the contact sheet only. |

## Sizes and safe areas

**OG / social share: `og-guide-<slug>.png`, 1200x630 PNG** (256-colour palette, about 55 to 85 KB, limit 1 MB).
- Key content stays inside the centre 1080x560 (x 60 to 1140, y 35 to 595), the same as the service OGs. In practice everything sits in x 78 to 1110, y 62 to 556.
- Layers: the wordmark top left, the small H mark top right, the GUIDE eyebrow and category pill, the title (box 690x252, top at y 200), the byline (baseline at y 515 and 546), and the category motif in the right column (box x 820 to 1110, y 170 to 560).
- With `--no-byline` the title box grows to y 540.

**Hub card: `card-guide-<slug>.webp` 640x480 and `card-guide-<slug>@2x.webp` 1280x960, lossless WebP, 4:3.**
- Why 4:3: it's the site's card pattern. Every image card in the current build is `aspect-[4/3]`: the home-v3 service cards, the problem and who cards, and `ServiceOptionalImage` on the service pages. A /guides grid of these cards will line up with the rest of the site.
- Why 640x480 CSS: a three-column card on the 1280 px desktop container is about 400 px wide, and a two-column tablet card is up to about 600 px. The 2x export (1280x960) stays sharp on retina at either size. Use `srcset="card-guide-<slug>.webp 640w, card-guide-<slug>@2x.webp 1280w"`.
- Safe inset: 48 px (1x) on every side, so a `rounded-2xl` corner or a 1 px border never touches content. Layers: the eyebrow and pill at the top, the title (box 544x168, top at y 102), the H mark bottom left, and the motif in a fixed box bottom right (x 300 to 592, y 292 to 432) so every card in the grid lines up. No byline on the card.

Both have pure #FFFFFF paper with every edge row and column exactly 255,255,255 (checked by `verify_guides.py`). There is no grain, vignette or tint on the paper.

## Run it

```
cd /workspace/hml-website-assets/guides
python3 make_guide_art.py --title "SEO vs AEO vs GEO" --category seo-aeo-geo --slug seo-vs-aeo-vs-geo --out samples
python3 verify_guides.py samples
```

- `--category` is `seo-aeo-geo`, `branding`, `performance` or `social`. It sets the pill label (SEO/AEO/GEO, Branding, Performance, Social) and the motif. `seo`, `brand`, `performance-marketing` and `social-media` also work.
- `--slug` defaults to the title in lower-case kebab form. `--out` defaults to `./out`. `--no-byline` drops the OG byline.
- The script refuses titles with an em dash (house rule).
- Needs Python 3 with Pillow and numpy. It reads `motifs/` next to the script.
- Fonts: Archivo variable (`Archivo-VariableFont_wdth,wght.ttf`, set at wdth 62 and wght 800) and Inter variable. They're read from `/usr/share/fonts/truetype/sand-box/google/{Archivo,Inter}/` by default. Set `HML_FONTS=/path` to point at another folder with the same `Archivo/` and `Inter/` subfolders.
- `--build-motifs` re-cuts `motifs/` from `../services/_preview/svc-*-hero.png`. This only reads those files, and is only needed if the service hero art changes.

### Title auto-fit (1 to 3 lines)
- The title is set in Archivo condensed caps, at the largest size that fits the box in up to 3 lines: OG 112 px down to 44 px, card 92 px down to 34 px (1x).
- Lines are balanced, so the widest line is as short as possible.
- Good breaks are tried first: no line ends on a small word (a, the, and, or, of, to, in, on, for, with, vs, your, at, by, is), and there's no one-word last line on titles over three words. The script only falls back to any break if no good break fits.
- File names and URLs keep their real case inside the caps headline, so `llms.txt` stays `llms.txt` and isn't turned into `LLMS.TXT`.
- If a title can't fit in 3 lines even at the smallest size, the script stops with a message and doesn't render something unreadable.

## The HTML source (for code)

`guide-template.html?title=...&category=...&frame=og|card|both&byline=0&guides=1`
- `frame` picks the OG (1200x630) or the card (640x480 CSS). `guides=1` shows the 1080x560 safe area outline. `byline=0` hides the byline.
- The title is real text, auto-fitted by a small script with the same 3-line rule and the same small-word rule (via non-breaking spaces). The file-name case rule matches too.
- Each layer carries a `data-layer` attribute (wordmark, h-mark, eyebrow, category, title, byline, motif), so it can be ported to `next/og` or Satori.
- Fonts come from Google Fonts (Archivo wdth 62 to 125, wght 800; Inter 400, 500, 600). For production, self-host them as the site already does.
- Export with headless Chrome, for example: `google-chrome --headless=new --hide-scrollbars --window-size=1280,1250 --force-device-scale-factor=2 --screenshot=out.png "file://$PWD/guide-template.html?frame=card&title=..."`, then crop the frame. The PNG/WebP files from the Python script are the reference renders.
- The H mark is inline SVG with the official ratios. The motif images use `mix-blend-mode: multiply`, so their white falls away on the paper.

## Brand rules followed
- Paper #FFFFFF, ink #151515, slate #6B6A66 (for the reviewer line only), signal yellow #F4BD49 as the only accent.
- Yellow only as a marker (the wordmark dot), behind ink text (the category pill) or inside the motif art. It's never used for text on white.
- Wordmark as on the live header: a 7 px yellow dot, an 8 px gap and "Human Made Logic" in Inter Medium at -0.03em, scaled 2x on the OG. The H mark is the official H with underline. It sits top right on the OG and bottom left on the card.
- Copy is limited to: the title, the GUIDE eyebrow, the category label, the byline "By Rowan Blake" and "Reviewed by Kuntal Khanapurkar, Founder" (OG only), and the wordmark (OG only). There are no stats, claims, dates or URLs.
- No portrait, avatar, initials badge or face for Rowan Blake (approved pen name), and no photo of Kuntal. The byline is text only.
- No em dashes. British spelling.

## Where the files go (suggested for Jeff)
- OG: `public/og/guides/og-guide-<slug>.png`, referenced from the guide's `openGraph.images` and `twitter.images`, alt = the guide title.
- Card: `public/images/hml/guides/card-guide-<slug>.webp` and `@2x.webp` on the /guides hub. The card is decorative if the hub card also shows the title as HTML (then use `alt=""`). Otherwise alt = the guide title.

## Samples (`samples/`)
| Title | Category | OG title | Card title (1x) |
| --- | --- | --- | --- |
| SEO vs AEO vs GEO (guide 1) | seo-aeo-geo | 112 px, 2 lines: SEO VS AEO / VS GEO | 92 px, 2 lines |
| What is llms.txt and does your site need one? (stress test) | seo-aeo-geo | 93 px, 3 lines: WHAT IS llms.txt / AND DOES YOUR SITE / NEED ONE? | 65 px, 3 lines |
| Restaurant marketing in Singapore: search, reviews and social (stress test) | social | 74 px, 3 lines: RESTAURANT MARKETING / IN SINGAPORE: SEARCH, / REVIEWS AND SOCIAL | 58 px, 3 lines |
| Rebrand checklist for small brands (extra, shows the Branding motif) | branding | 97 px, 3 lines: REBRAND / CHECKLIST / FOR SMALL BRANDS | 72 px, 2 lines |

The categories on the samples are my assumption from the plan, since the plan doesn't assign categories. SS or Pamala should confirm each guide's category.
