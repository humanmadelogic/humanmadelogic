#!/usr/bin/env node
/**
 * Install Sam/Pamala final blog art from hml-blog-art-final.tar.gz layout (post-01 … post-05).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const ART_ROOT = process.env.BLOG_ART_FINAL || '/tmp/blog-art-final';

const SLUGS = [
  'google-november-core-update-gemini-4-hydrogen',
  'chatgpt-businesses-business-hub',
  'google-ai-mode-ads-australia-canada-singapore-uk',
  'uk-rules-check-cma-asa',
  'consumer-trends-2027-trust-proof-outcomes',
];

const POST_DIR = {
  'google-november-core-update-gemini-4-hydrogen': 'post-01',
  'chatgpt-businesses-business-hub': 'post-02',
  'google-ai-mode-ads-australia-canada-singapore-uk': 'post-03',
  'uk-rules-check-cma-asa': 'post-04',
  'consumer-trends-2027-trust-proof-outcomes': 'post-05',
};

function pick(dir, pattern) {
  const names = fs.readdirSync(dir);
  const name = names.find((n) => pattern.test(n));
  if (!name) throw new Error(`Missing ${pattern} in ${dir} (have: ${names.join(', ')})`);
  return path.join(dir, name);
}

function install(slug) {
  const dir = path.join(ART_ROOT, POST_DIR[slug]);
  if (!fs.existsSync(dir)) throw new Error(`Missing art folder ${dir}`);

  const heroSrc = pick(dir, new RegExp(`^blog-${slug}-hero\\.webp$`));
  const ogSrc = pick(dir, new RegExp(`^og-blog-${slug}\\.png$`));
  const cardSrc = pick(dir, new RegExp(`^card-blog-${slug}\\.webp$`));
  const card2Src = pick(dir, new RegExp(`^card-blog-${slug}@2x\\.webp$`));

  const heroOut = path.join(ROOT, 'public/blog', `${slug}-hero.webp`);
  const ogOut = path.join(ROOT, 'public/og/blog', `${slug}.png`);
  const cardOut = path.join(ROOT, 'public/blog/cards', `${slug}.webp`);
  const card2Out = path.join(ROOT, 'public/blog/cards', `${slug}@2x.webp`);

  fs.mkdirSync(path.dirname(heroOut), { recursive: true });
  fs.mkdirSync(path.dirname(ogOut), { recursive: true });
  fs.mkdirSync(path.dirname(cardOut), { recursive: true });

  fs.copyFileSync(heroSrc, heroOut);
  fs.copyFileSync(ogSrc, ogOut);
  fs.copyFileSync(cardSrc, cardOut);
  fs.copyFileSync(card2Src, card2Out);

  console.log(`[art] ${slug}`);
}

for (const slug of SLUGS) install(slug);
console.log('[art] All final blog images installed.');