/**
 * Diff rendered page text against Pamala FINAL source (full-article paragraphs or table rows).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { normalizeForFidelity, wordCount } from './lib/extract-full-article.mjs';
import { beautySkincareCopyOrder } from './lib/beauty-page-copy-order.mjs';
import { blogHubCopyOrder } from './lib/blog-hub-copy-order.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const COPY_DIR = path.join(ROOT, 'src/config/copy');
const ARTICLE_DIR = path.join(COPY_DIR, 'articles');

const base = process.env.BASE_URL ?? 'http://127.0.0.1:3000';

const GUIDE_PAGES = [
  { path: '/guides/seo-vs-aeo-vs-geo', articleFile: 'guide-seo-vs-aeo-vs-geo.article.json' },
  {
    path: '/guides/how-to-get-your-brand-cited-by-chatgpt',
    articleFile: 'guide-cited-by-chatgpt.article.json',
  },
];

const BEAUTY_PATH = '/industries/beauty-skincare';
const BLOG_PATH = '/blog';
const BLOG_MANIFEST = path.join(ROOT, 'src/config/blog/manifest.json');

async function mainText(page) {
  return page.evaluate(() => {
    for (const el of document.querySelectorAll('details')) {
      el.open = true;
    }
    const root = document.querySelector('article') ?? document.querySelector('main') ?? document.body;
    return (root?.innerText ?? document.body.innerText).replace(/\s+/g, ' ').trim();
  });
}

async function renderedText(page, route) {
  const url = `${base}${route}`;
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  if (!res || res.status() >= 400) {
    throw new Error(`Could not load ${url} (status ${res?.status() ?? 'error'})`);
  }
  await page.waitForTimeout(400);
  const raw = await mainText(page);
  return normalizeForFidelity(raw);
}

function checkParagraphs(label, paragraphs, renderedNorm) {
  const missing = [];
  for (const { plain, norm } of paragraphs) {
    if (!renderedNorm.includes(norm)) {
      missing.push(plain.slice(0, 120) + (plain.length > 120 ? '…' : ''));
    }
  }
  if (missing.length > 0) {
    console.error(`\nFAIL ${label} — ${missing.length} paragraph(s) from source not found on page:`);
    for (const m of missing) console.error(`  • ${m}`);
    return false;
  }
  console.log(`OK ${label} — all ${paragraphs.length} source paragraphs present on page.`);
  return true;
}

function checkBeautyRows(copy, renderedNorm) {
  const missing = [];
  for (const id of beautySkincareCopyOrder) {
    const text = copy[id];
    if (!text?.trim()) {
      missing.push({ id, reason: 'missing in JSON' });
      continue;
    }
    const norm = normalizeForFidelity(text);
    if (!renderedNorm.includes(norm)) {
      missing.push({ id, reason: 'not found on page' });
    }
  }
  if (missing.length > 0) {
    console.error(`\nFAIL ${BEAUTY_PATH} — ${missing.length} copy row(s) missing:`);
    for (const m of missing) console.error(`  • ${m.id}: ${m.reason}`);
    return false;
  }
  console.log(`OK ${BEAUTY_PATH} — all ${beautySkincareCopyOrder.length} table rows present on page.`);
  return true;
}

const browser = await chromium.launch();
const page = await browser.newPage();
let ok = true;
const report = [];

for (const { path: route, articleFile } of GUIDE_PAGES) {
  const article = JSON.parse(fs.readFileSync(path.join(ARTICLE_DIR, articleFile), 'utf8'));
  const renderedNorm = await renderedText(page, route);
  const renderedWords = wordCount(renderedNorm);
  ok = checkParagraphs(route, article.paragraphs, renderedNorm) && ok;
  report.push({
    slug: route,
    wordCountSource: article.wordCountSource,
    wordCountRendered: renderedWords,
    wordCountArtifact: article.wordCountRendered,
  });
}

const beautyCopy = JSON.parse(fs.readFileSync(path.join(COPY_DIR, 'industries-beauty-skincare.json'), 'utf8'));
const beautyRendered = await renderedText(page, BEAUTY_PATH);
const beautySourceWords = wordCount(
  beautySkincareCopyOrder.map((id) => beautyCopy[id] ?? '').join(' '),
);
ok = checkBeautyRows(beautyCopy, beautyRendered) && ok;
report.push({
  slug: BEAUTY_PATH,
  wordCountSource: beautySourceWords,
  wordCountRendered: wordCount(beautyRendered),
});

function checkHubRows(label, copy, renderedNorm, ids) {
  const missing = [];
  for (const id of ids) {
    const text = copy[id];
    if (!text?.trim()) {
      missing.push({ id, reason: 'missing in JSON' });
      continue;
    }
    const norm = normalizeForFidelity(text);
    if (!renderedNorm.includes(norm)) missing.push({ id, reason: 'not found on page' });
  }
  if (missing.length) {
    console.error(`\nFAIL ${label} — ${missing.length} copy row(s) missing`);
    for (const m of missing) console.error(`  • ${m.id}: ${m.reason}`);
    return false;
  }
  console.log(`OK ${label} — all ${ids.length} copy rows present on page.`);
  return true;
}

const blogHubCopy = JSON.parse(fs.readFileSync(path.join(COPY_DIR, 'blog-hub.json'), 'utf8'));
const blogHubRendered = await renderedText(page, BLOG_PATH);
const blogHubSourceWords = wordCount(blogHubCopyOrder.map((id) => blogHubCopy[id] ?? '').join(' '));
ok = checkHubRows(BLOG_PATH, blogHubCopy, blogHubRendered, blogHubCopyOrder) && ok;
report.push({
  slug: BLOG_PATH,
  wordCountSource: blogHubSourceWords,
  wordCountRendered: wordCount(blogHubRendered),
});

const manifest = JSON.parse(fs.readFileSync(BLOG_MANIFEST, 'utf8'));
for (const post of manifest.posts.filter((p) => !p.draft)) {
  const route = `/blog/${post.slug}`;
  const articlePath = path.join(ARTICLE_DIR, post.articleFile);
  if (!fs.existsSync(articlePath)) {
    console.error(`FAIL ${route} — missing ${post.articleFile}`);
    ok = false;
    continue;
  }
  const article = JSON.parse(fs.readFileSync(articlePath, 'utf8'));
  const renderedNorm = await renderedText(page, route);
  ok = checkParagraphs(route, article.paragraphs, renderedNorm) && ok;
  report.push({
    slug: route,
    wordCountSource: article.wordCountSource,
    wordCountRendered: wordCount(renderedNorm),
    wordCountArtifact: article.wordCountRendered,
  });
}

await browser.close();

console.log('\n--- Copy fidelity summary ---');
for (const row of report) {
  console.log(
    `${row.slug}: source ${row.wordCountSource} words, rendered ~${row.wordCountRendered} words` +
      (row.wordCountArtifact != null ? ` (artifact plain ${row.wordCountArtifact})` : ''),
  );
}

if (!ok) {
  console.error('\nCopy fidelity check failed.');
  process.exit(1);
}
console.log('\nCopy fidelity OK.');