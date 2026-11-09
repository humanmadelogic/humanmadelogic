# Placeholder copy register

**Approval status:** Copy v1 QA (Pamala, 9 Nov 2026) is built on the preview branch but **pending Pawan's approval** before it is treated as final. Do not edit locked lines in `src/config/site.ts` without sign-off.

| Field | Page / section | Purpose | Target words | File location | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Global — studio footprint | Where HML operates | 12–20 | `src/config/agency.ts` → `agency.location` | Filled (v1 QA, pending approval) |
| 2 | Global — availability line | Header status pill | 8–16 | `src/config/agency.ts` → `agency.availability` | Filled (v1 QA, pending approval); **`[MONTH TBC]`** awaits Pawan |
| 3 | Global — social URLs | Footer external links | n/a | `src/config/agency.ts` → `agency.social` | Still placeholder (links point to `/contact`) |
| 4 | Home — case study block | Explain empty work section | 40–70 | `src/config/agency.ts` → `workPlaceholder.body` | Filled (v1 QA, pending approval) |
| 5 | Home — final CTA body | Pre-contact reassurance | 20–35 | `src/config/agency.ts` → `finalCta.body` | Filled (v1 QA, pending approval) |
| 6 | About — process steps (×4) | How engagements run | 35–55 each | `src/config/agency.ts` → `process.steps[]` | Filled (v1 QA, pending approval) |
| 7 | About — approach pillars (×3) | Positioning pillars | 40–60 each | `src/config/agency.ts` → `approach.pillars[]` | Filled (v1 QA, pending approval) |
| 8–10 | Services — Branding | Intro, deliverables, outcomes | per brief | `src/config/services.ts` → `branding.*` | Filled (v1 QA, pending approval) |
| 8–10 | Services — SEO/AEO/GEO | Intro, deliverables, outcomes | per brief | `src/config/services.ts` → `seo-aeo-geo.*` | Filled (v1 QA, pending approval) |
| 8–10 | Services — Performance | Intro, deliverables, outcomes | per brief | `src/config/services.ts` → `performance-marketing.*` | Filled (v1 QA, pending approval) |
| 8–10 | Services — Social | Intro, deliverables, outcomes | per brief | `src/config/services.ts` → `social-media.*` | Filled (v1 QA, pending approval) |
| — | Privacy policy | UK/EU GDPR | 1,200–2,500 | `src/config/legal.ts` → `privacyPage` | Still placeholder (owner/counsel) |
| — | Cookie policy | PECR / multi-region | 600–1,200 | `src/config/legal.ts` → `cookiePage` | Still placeholder |
| — | Terms of use | Website terms | 800–1,500 | `src/config/legal.ts` → `termsPage` | Still placeholder |
| — | Accessibility | WCAG statement | 250–500 | `src/config/legal.ts` → `accessibilityPage` | Still placeholder |
| — | Company information | UK transparency | 150–350 | `src/config/legal.ts` → `companyPage` | Still placeholder |

## Approved copy (locked, do not change without sign-off)

Held in `src/config/site.ts`: `tagline`, `coverLine`, `servicesBlurb`, `description`.

## Source document

`uploads/website-copy-v1-qa.md` (copy v1, QA'd by Pamala).
