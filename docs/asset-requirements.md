# Visual asset requirements

Supply assets in British-market brand style (UK DTC beauty/skincare craft where relevant). Prefer WebP or AVIF for photos; SVG for icons and logos.

| Asset | Dimensions (W×H) | Format | Max size | Used on |
| --- | --- | --- | --- | --- |
| Favicon | 32×32, 16×16 | SVG (+ ICO optional) | 8 KB | Browser tab (`public/icon.svg`) |
| Apple touch icon | 180×180 | PNG or SVG | 40 KB | iOS home screen (not yet wired) |
| Open Graph default | 1200×630 | PNG or WebP | 250 KB | `src/app/opengraph-image.tsx`, social shares (all pages unless overridden) |
| OG — Services overview | 1200×630 | PNG or WebP | 250 KB | `/services` (optional dedicated OG) |
| OG — About | 1200×630 | PNG or WebP | 250 KB | `/about` (optional) |
| OG — each service (×4) | 1200×630 | PNG or WebP | 250 KB | `/services/*` (optional per route) |
| Hero frame — Branding | ~456×600 (4:5 crop) | WebP/AVIF | 180 KB | Home hero fan (`media.heroIdentity`) |
| Hero frame — SEO/AEO/GEO | ~456×600 | WebP/AVIF | 180 KB | `media.heroArtDirection` |
| Hero frame — Performance | ~456×600 | WebP/AVIF | 180 KB | `media.heroProduct` |
| Hero frame — Social | ~456×600 | WebP/AVIF | 180 KB | `media.heroCampaign` |
| Belief / about photography | 16:9 + overlap panels | WebP/AVIF | 220 KB each | Home statement, About (`media.belief`, `media.terrain`) |
| Process interlude plates (×3) | ~1200×800 | WebP/AVIF | 200 KB each | About process (`media.monument`, `media.aperture`, `media.pillar`) |
| Service card marks | 120×80 SVG | SVG | 12 KB | Capability visuals (generated in CSS; optional custom marks) |
| LinkedIn icon/link | n/a | SVG or text link | n/a | Footer (`agency.social`) |
| Instagram icon/link | n/a | SVG or text link | n/a | Footer |
| Case study slot (×3) | 4:3 min 800×600 | WebP/AVIF | 200 KB | Home placeholder cards (future) |
| Case study logo marks | max height 48px | SVG | 15 KB each | Future work section |

## Notes

- Remote OpenAI CDN URLs in `src/config/media.ts` are interim art direction. Replace with owned assets on Blob or static hosting for production.
- WebGL shader layer samples the same images as DOM frames; keep consistent crops (`src/config/media.ts` → `position`, `aspect`).
- No client logos or results should be added until legally cleared (see `workPlaceholder` on the homepage).
