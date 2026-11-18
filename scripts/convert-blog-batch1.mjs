#!/usr/bin/env node
/**
 * One-shot: copy deck sources → docs/copy/blog/{slug}.md + apply CTA href swap.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractBlogPostBody, parseBlogDeckMeta } from './lib/extract-blog-post-body.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'docs/copy/blog/source');
const BLOG_DIR = path.join(ROOT, 'docs/copy/blog');

const AI_CHECK_HREF = '/contact?topic=Free%20AI%20visibility%20check';

const POST_ALTS = {
  'google-november-core-update-gemini-4-hydrogen':
    'Two calendar pages for 10 and 12 November pinned to a corkboard, joined by yellow string to a search bar with a question mark',
  'chatgpt-businesses-business-hub':
    'A hand stamping a tick on one yellow business card in a grid of grey cards',
  'google-ai-mode-ads-australia-canada-singapore-uk':
    'Ad tags hanging on a line, three filled and one dotted outline still to come',
  'uk-rules-check-cma-asa':
    'A five-star review card with one star peeling off, beside a price tag with a hidden fee folded underneath',
  'consumer-trends-2027-trust-proof-outcomes':
    'Unbranded skincare dropper, jar, pouch and a candle in a bright flat-lay, with a small bowl and a closed report with a yellow tab',
};

function swapCta(markdown) {
  return markdown.replace(/\]\(\/ai-visibility-check\)/g, `](${AI_CHECK_HREF})`);
}

function brokenLinkStrip(markdown) {
  return markdown.replace(
    /\[([^\]]+)\]\(\/guides\/how-to-rank-in-google-ai-overviews\)/g,
    '$1',
  );
}

function buildFrontmatter(meta, extra) {
  const lines = [
    '---',
    `slug: ${meta.slug}`,
    `title: ${JSON.stringify(meta.title).slice(1, -1)}`,
    `metaTitle: ${JSON.stringify(meta.metaTitle).slice(1, -1)}`,
    `metaDescription: ${JSON.stringify(meta.metaDescription).slice(1, -1)}`,
    `date: 2026-11-18`,
    `updated: 2026-11-18`,
    `excerpt: ${JSON.stringify(meta.excerpt).slice(1, -1)}`,
    `heroImage: /blog/${meta.slug}-hero.webp`,
    `heroImageAlt: ${JSON.stringify(extra.heroImageAlt).slice(1, -1)}`,
    `cardImage: /blog/cards/${meta.slug}.webp`,
    `cardImage2x: /blog/cards/${meta.slug}@2x.webp`,
    `ogImage: /og/blog/${meta.slug}.png`,
    `readingMinutes: 0`,
    `draft: false`,
  ];
  if (extra.relatedLinks?.length) {
    lines.push(`relatedLinks: ${JSON.stringify(extra.relatedLinks)}`);
  }
  lines.push('---', '');
  return lines.join('\n');
}

function convertFile(name) {
  const srcPath = path.join(SOURCE_DIR, name);
  const raw = fs.readFileSync(srcPath, 'utf8');
  const meta = parseBlogDeckMeta(raw);
  let body = extractBlogPostBody(raw);
  body = brokenLinkStrip(swapCta(body));

  const heroImageAlt =
    POST_ALTS[meta.slug] ||
    raw.match(/\| BLOG-\d+-HERO-ALT \|[^\n]+\| NEW \| ([^|]+) \|/)?.[1]?.trim() ||
    meta.title;

  const out = buildFrontmatter(meta, { heroImageAlt }) + body + '\n';

  const outPath = path.join(BLOG_DIR, `${meta.slug}.md`);
  fs.writeFileSync(outPath, out);
  console.log(`[convert] ${name} → ${meta.slug}.md`);
}

const sources = fs
  .readdirSync(SOURCE_DIR)
  .filter((n) => n.startsWith('post-') && n.endsWith('.md'))
  .sort();

for (const name of sources) convertFile(name);