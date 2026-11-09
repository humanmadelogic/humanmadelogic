# Placeholder copy register

British spelling. Replace every PLACEHOLDER entry before production legal sign-off or launch campaigns.

| Page / section | Purpose | Target words | File location |
| --- | --- | --- | --- |
| Global — studio footprint | Where HML operates | 12–20 | `src/config/agency.ts` → `agency.location` |
| Global — availability line | Header status pill | 8–16 | `src/config/agency.ts` → `agency.availability` |
| Global — social URLs | Footer external links | n/a (URLs) | `src/config/agency.ts` → `agency.social` |
| Home — case study block | Explain empty work section | 40–70 | `src/config/agency.ts` → `workPlaceholder.body`, `workPlaceholder.note` |
| Home — final CTA body | Pre-contact reassurance | 20–35 | `src/config/agency.ts` → `finalCta.body` |
| About — process steps (×4) | How engagements run | 35–55 each | `src/config/agency.ts` → `process.steps[].body` |
| About — approach pillars (×3) | Positioning pillars | 40–60 each | `src/config/agency.ts` → `approach.pillars[].body` |
| Services — Branding intro | Service page hero | 35–55 | `src/config/services.ts` → `branding.intro` |
| Services — Branding deliverables (×3) | Scope list | 8–18 each | `src/config/services.ts` → `branding.deliverables` |
| Services — Branding outcomes (×2) | Client outcomes | 15–25 each | `src/config/services.ts` → `branding.outcomes` |
| Services — SEO/AEO/GEO intro | Service page hero | 35–55 | `src/config/services.ts` → `seo-aeo-geo.intro` |
| Services — SEO deliverables (×3) | Scope list | 8–18 each | `src/config/services.ts` → `seo-aeo-geo.deliverables` |
| Services — SEO outcomes (×2) | Client outcomes | 15–25 each | `src/config/services.ts` → `seo-aeo-geo.outcomes` |
| Services — Performance intro | Service page hero | 35–55 | `src/config/services.ts` → `performance-marketing.intro` |
| Services — Performance deliverables (×3) | Scope list | 8–18 each | `src/config/services.ts` → `performance-marketing.deliverables` |
| Services — Performance outcomes (×2) | Client outcomes | 15–25 each | `src/config/services.ts` → `performance-marketing.outcomes` |
| Services — Social intro | Service page hero | 35–55 | `src/config/services.ts` → `social-media.intro` |
| Services — Social deliverables (×3) | Scope list | 8–18 each | `src/config/services.ts` → `social-media.deliverables` |
| Services — Social outcomes (×2) | Client outcomes | 15–25 each | `src/config/services.ts` → `social-media.outcomes` |
| Privacy policy — full page | UK/EU/UK GDPR compliance | 1,200–2,500 total | `src/config/legal.ts` → `privacyPage` |
| Cookie policy — full page | PECR and multi-region notice | 600–1,200 total | `src/config/legal.ts` → `cookiePage` |
| Terms of use — full page | Website terms | 800–1,500 total | `src/config/legal.ts` → `termsPage` |
| Accessibility — full page | WCAG statement | 250–500 total | `src/config/legal.ts` → `accessibilityPage` |
| Company information — full page | UK company details | 150–350 total | `src/config/legal.ts` → `companyPage` |

## Approved copy (do not change without sign-off)

Held in `src/config/site.ts`: `tagline`, `coverLine`, `servicesBlurb`, `description`.
