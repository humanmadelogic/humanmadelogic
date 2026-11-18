#!/usr/bin/env node
/**
 * Scan published blog article HTML for internal links and flag unknown paths.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ARTICLE_DIR = path.join(ROOT, 'src/config/copy/articles');
const MANIFEST = path.join(ROOT, 'src/config/blog/manifest.json');

const STATIC = new Set([
  '/',
  '/about',
  '/contact',
  '/guides',
  '/blog',
  '/kits',
  '/services',
  '/privacy',
  '/cookies',
  '/terms',
  '/accessibility',
  '/legal',
  '/industries/beauty-skincare',
  '/ai-visibility-check',
  '/services/branding',
]);

STATIC.add('/guides/seo-vs-aeo-vs-geo');
STATIC.add('/guides/how-to-get-your-brand-cited-by-chatgpt');

const services = ['branding', 'seo-aeo-geo', 'performance-marketing', 'social-media'];
services.forEach((s) => STATIC.add(`/services/${s}`));
['launch-kit', 'authority-kit', 'local-domination-kit'].forEach((s) => STATIC.add(`/kits/${s}`));

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
for (const post of manifest.posts) {
  if (!post.draft) STATIC.add(`/blog/${post.slug}`);
}

let failed = 0;
const broken = [];

for (const post of manifest.posts.filter((p) => !p.draft)) {
  const articlePath = path.join(ARTICLE_DIR, post.articleFile);
  if (!fs.existsSync(articlePath)) continue;
  const html = JSON.parse(fs.readFileSync(articlePath, 'utf8')).html ?? '';
  const re = /href="(\/[^"#?]*)/g;
  let m;
  while ((m = re.exec(html))) {
    const href = m[1].replace(/\/$/, '') || '/';
    if (href.startsWith('http')) continue;
    if (!STATIC.has(href)) {
      broken.push({ slug: post.slug, href });
    }
  }
}

for (const row of broken) {
  console.error(`FAIL internal link ${row.href} in /blog/${row.slug}`);
  failed += 1;
}

if (failed) process.exit(1);
console.log(`OK internal links — ${manifest.posts.filter((p) => !p.draft).length} blog post(s) scanned.`);