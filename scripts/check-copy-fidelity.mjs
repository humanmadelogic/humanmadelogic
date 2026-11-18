/**
 * Diff rendered page text against Pamala FINAL source (full-article paragraphs or table rows).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import {
  normalizeForFidelity,
  paragraphsFromArticleMarkdown,
  wordCount,
} from './lib/extract-full-article.mjs';
import { extractBlogPostBody, parseBlogDeckMeta } from './lib/extract-blog-post-body.mjs';
import { faqListsMatch } from './lib/blog-seo-fidelity.mjs';
import { beautySkincareCopyOrder } from './lib/beauty-page-copy-order.mjs';
import { blogHubCardTeaserIds, blogHubCopyOrder } from './lib/blog-hub-copy-order.mjs';

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
const BLOG_SOURCE_DIR = path.join(ROOT, 'docs/copy/blog/source');
const AI_CHECK_HREF = '/contact?topic=Free%20AI%20visibility%20check';

function sourceBodyForFidelity(raw) {
  let body = extractBlogPostBody(raw);
  body = body.replace(/\]\(\/ai-visibility-check\)/g, `](${AI_CHECK_HREF})`);
  body = body.replace(/\[([^\]]+)\]\(\/guides\/how-to-rank-in-google-ai-overviews\)/g, '$1');
  return body;
}

async function mainText(page) {
  return page.evaluate(() => {
    for (const el of document.querySelectorAll('details')) {
      el.open = true;
    }
    const root = document.querySelector('article') ?? document.querySelector('main') ?? document.body;
    return (root?.innerText ?? document.body.innerText).replace(/\s+/g, ' ').trim();
  });
}

async function readBlogVisibleFaqs(page) {
  return page.evaluate(() => {
    const heading = document.getElementById('blog-faq-heading');
    if (!heading?.parentElement) return [];
    const section = heading.parentElement;
    return [...section.querySelectorAll('h3')].map((h3) => ({
      q: (h3.textContent ?? '').trim(),
      a: (h3.nextElementSibling?.textContent ?? '').trim(),
    }));
  });
}

function checkBlogSeoManifestFields(route, post, renderedNorm, visibleFaqs) {
  let pass = true;
  const stripMdLinks = (text) =>
    String(text)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1');
  const keyPoints = (post.keyPoints ?? []).map((p) => String(p).trim()).filter(Boolean);
  for (const point of keyPoints) {
    const norm = normalizeForFidelity(stripMdLinks(point));
    if (!renderedNorm.includes(norm)) {
      console.error(`FAIL ${route} — key point not on page: ${point.slice(0, 80)}`);
      pass = false;
    }
  }
  if (keyPoints.length > 0) {
    const kpHeading = normalizeForFidelity('Key points');
    if (!renderedNorm.includes(kpHeading)) {
      console.error(`FAIL ${route} — Key points heading missing`);
      pass = false;
    }
  }

  const faqs = (post.faqs ?? []).filter((item) => item.q?.trim() && item.a?.trim());
  if (faqs.length > 0) {
    const questionsHeading = normalizeForFidelity('Questions people ask');
    if (!renderedNorm.includes(questionsHeading)) {
      console.error(`FAIL ${route} — Questions people ask heading missing`);
      pass = false;
    }
    const manifestFaqs = faqs.map((item) => ({ q: item.q.trim(), a: item.a.trim() }));
    if (!faqListsMatch(visibleFaqs, manifestFaqs)) {
      console.error(`FAIL ${route} — visible FAQs do not match manifest faqs`);
      pass = false;
    }
  } else if (visibleFaqs.length > 0) {
    console.error(`FAIL ${route} — page shows FAQs but manifest faqs is empty`);
    pass = false;
  }

  const oneLiner = String(post.hmlOneLiner ?? '').trim();
  if (oneLiner) {
    const norm = normalizeForFidelity(oneLiner);
    if (!renderedNorm.includes(norm)) {
      console.error(`FAIL ${route} — hmlOneLiner not on page`);
      pass = false;
    }
  }

  const links = (post.relatedLinks ?? []).filter((l) => l.href?.trim() && l.label?.trim());
  for (const link of links) {
    const norm = normalizeForFidelity(link.label);
    if (!renderedNorm.includes(norm)) {
      console.error(`FAIL ${route} — related link label not on page: ${link.label}`);
      pass = false;
    }
  }
  if (links.length > 0) {
    const relatedHeading = normalizeForFidelity('Related');
    if (!renderedNorm.includes(relatedHeading)) {
      console.error(`FAIL ${route} — Related heading missing`);
      pass = false;
    }
  }

  if (pass && (keyPoints.length || faqs.length || oneLiner || links.length)) {
    console.log(`OK ${route} — blog SEO manifest fields present on page.`);
  }
  return pass;
}

async function renderedText(page, route) {
  const url = `${base}${route}`;
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  if (!res || res.status() >= 400) {
    throw new Error(`Could not load ${url} (HTTP ${res?.status() ?? 'error'})`);
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
const blogIndexPath = path.join(COPY_DIR, 'blog-index.json');
const blogIndexCopy = fs.existsSync(blogIndexPath)
  ? JSON.parse(fs.readFileSync(blogIndexPath, 'utf8'))
  : {};
const blogHubRendered = await renderedText(page, BLOG_PATH);
const manifestPreview = JSON.parse(fs.readFileSync(BLOG_MANIFEST, 'utf8'));
const hubRowIds =
  manifestPreview.publishedCount > 0
    ? [
        ...blogHubCopyOrder.filter((id) => !id.startsWith('BLOG-EMPTY')),
        ...blogHubCardTeaserIds,
      ]
    : blogHubCopyOrder;
const hubCopyForCheck = { ...blogHubCopy, ...blogIndexCopy };
const blogHubSourceWords = wordCount(hubRowIds.map((id) => hubCopyForCheck[id] ?? '').join(' '));
ok = checkHubRows(BLOG_PATH, hubCopyForCheck, blogHubRendered, hubRowIds) && ok;
report.push({
  slug: BLOG_PATH,
  wordCountSource: blogHubSourceWords,
  wordCountRendered: wordCount(blogHubRendered),
});

const sourceFiles = fs.existsSync(BLOG_SOURCE_DIR)
  ? fs.readdirSync(BLOG_SOURCE_DIR).filter((n) => n.startsWith('post-') && n.endsWith('.md'))
  : [];
const sourceBySlug = new Map();
for (const name of sourceFiles) {
  const raw = fs.readFileSync(path.join(BLOG_SOURCE_DIR, name), 'utf8');
  try {
    const { slug } = parseBlogDeckMeta(raw);
    sourceBySlug.set(slug, raw);
  } catch {
    /* skip */
  }
}

const PUBLISHED_BLOG_DIR = path.join(ROOT, 'docs/copy/blog');

function publishedBlogMarkdown(slug) {
  const filePath = path.join(PUBLISHED_BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  if (!raw.startsWith('---\n')) return null;
  const end = raw.indexOf('\n---\n', 4);
  if (end < 0) return null;
  return raw.slice(end + 5);
}

const manifest = JSON.parse(fs.readFileSync(BLOG_MANIFEST, 'utf8'));
for (const post of manifest.posts.filter((p) => !p.draft)) {
  const route = `/blog/${post.slug}`;
  const publishedMd = publishedBlogMarkdown(post.slug);
  const deckRaw = sourceBySlug.get(post.slug);
  let fidelityBody;
  if (publishedMd) {
    let body = publishedMd.trim();
    body = body.replace(/\]\(\/ai-visibility-check\)/g, `](${AI_CHECK_HREF})`);
    body = body.replace(/\[([^\]]+)\]\(\/guides\/how-to-rank-in-google-ai-overviews\)/g, '$1');
    fidelityBody = body;
  } else if (deckRaw) {
    fidelityBody = sourceBodyForFidelity(deckRaw);
  } else {
    console.error(`FAIL ${route} — no published markdown in docs/copy/blog/`);
    ok = false;
    continue;
  }
  const sourceParagraphs = paragraphsFromArticleMarkdown(fidelityBody).filter(
    (p) => !p.plain.startsWith('## '),
  );
  const renderedNorm = await renderedText(page, route);
  const visibleFaqs = await readBlogVisibleFaqs(page);
  ok = checkParagraphs(route, sourceParagraphs, renderedNorm) && ok;
  ok = checkBlogSeoManifestFields(route, post, renderedNorm, visibleFaqs) && ok;
  report.push({
    slug: route,
    wordCountSource: wordCount(fidelityBody),
    wordCountRendered: wordCount(renderedNorm),
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