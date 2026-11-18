# Blog copy (`/blog`)

Posts are Markdown files in this directory. **`blog-hub.md`** holds hub page table copy (same ID table format as guides). **`blog-hub.md` is not a post.**

## Post files

Each published post is a separate `*.md` file whose name matches the `slug` in frontmatter (e.g. `my-post.md` with `slug: my-post`). Do not commit placeholder posts: an empty directory means zero live posts (preview hub only).

## Frontmatter (required on every post file)

```yaml
---
slug: your-post-slug
title: Post title for H1 and schema
metaDescription: Meta description (max 155 characters)
date: 2026-11-18
updated: 2026-11-18
excerpt: One or two sentences for the blog index card
heroImage: /blog/your-post-slug-hero.webp
heroImageAlt: Describe the hero image for screen readers
readingMinutes: 8
draft: true
---
```

| Field | Rules |
|---|---|
| `slug` | Lowercase kebab-case, matches filename without `.md` |
| `title` | British English, no em dashes |
| `metaDescription` | Plain text, ≤155 chars |
| `date` / `updated` | ISO date `YYYY-MM-DD` |
| `excerpt` | Index card blurb only; not invented metrics |
| `heroImage` | Path under `public/blog/` |
| `heroImageAlt` | Meaningful alt; required when `draft: false` |
| `readingMinutes` | Optional; computed from body word count if omitted |
| `draft` | `true` keeps the post out of the index, sitemap and static build |

## Article body

Markdown after the closing `---`. Rendered like guide full articles (GFM tables, lists, headings). No separate `## Full article` block.

## Hero images (Sam / design)

- **Format:** WebP (`.webp`) in `public/blog/`
- **Filename:** `{slug}-hero.webp` (match `heroImage` in frontmatter)
- **Dimensions:** **1200×630 px** for OG/social; supply a **640×360** crop or scale for index cards (same file is fine if 16:9)
- **Max weight:** ~200 KB after compression where possible
- British spelling in filenames and alt text only as needed for accessibility

Run `npm run parse:copy` after adding or editing files.

## Schema, RSS and validation

Build notes and JSON-LD blocks **B1** (hub) and **B2** (posts) live in [`BLOG-TOPICS.md`](./BLOG-TOPICS.md) (SS spec). Author in JSON-LD is **Organization** (`#organization`); Rowan Blake is visible byline only. Post **WebPage** nodes carry `reviewedBy` (`#founder`) and `lastReviewed`.

- **OG defaults:** `public/og/blog/{slug}.png` at 1200×630 when no `heroImage` is set.
- **RSS:** `/blog/rss.xml` (RSS 2.0); `rel=alternate` from `src/app/blog/layout.tsx`.
- **Automated checks (after `npm run build`):** `npm run check:json-ld`, `npm run check:blog-rss`.
- **Manual (before production):** [Google Rich Results Test](https://search.google.com/test/rich-results) and [validator.schema.org](https://validator.schema.org/) on `/blog` and one post; confirm no `Person` for Rowan Blake in JSON-LD.