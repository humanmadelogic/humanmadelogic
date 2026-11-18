/**
 * Parse blog hub table + frontmatter posts from docs/copy/blog into JSON artifacts.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  paragraphsFromArticleMarkdown,
  renderArticleHtml,
  wordCount,
} from './lib/extract-full-article.mjs';
import {
  blogSeoFieldsFromFrontmatter,
  parseBlogFrontmatterFromSource,
} from './lib/parse-blog-frontmatter-fields.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'docs/copy/blog');
const OUT_COPY = path.join(ROOT, 'src/config/copy');
const ARTICLE_DIR = path.join(OUT_COPY, 'articles');
const BLOG_CONFIG = path.join(ROOT, 'src/config/blog');

function splitTableRow(line) {
  const cells = [];
  let current = '';
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '\\' && line[i + 1] === '|') {
      current += '|';
      i += 1;
    } else if (line[i] === '|') {
      cells.push(current.trim());
      current = '';
    } else {
      current += line[i];
    }
  }
  cells.push(current.trim());
  return cells;
}

function parseCopyTable(markdown) {
  const map = {};
  for (const line of markdown.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|') || trimmed.startsWith('|---')) continue;
    const cells = splitTableRow(trimmed);
    if (cells.length < 5) continue;
    const id = cells[1];
    const status = cells[3];
    const finalText = cells[4];
    if (!id || id === 'ID' || status !== 'NEW' || !finalText) continue;
    map[id] = finalText.replace(/\\\|/g, '|').trim();
  }
  return map;
}

function parseFrontmatter(source) {
  const parsed = parseBlogFrontmatterFromSource(source);
  if (!parsed) return null;
  const end = source.indexOf('\n---\n', 4);
  const body = source.slice(end + 5).trim();
  return { data: parsed, body };
}

function estimateReadingMinutes(markdown) {
  return Math.max(1, Math.round(wordCount(markdown) / 200));
}

function isPostFile(name) {
  if (!name.endsWith('.md')) return false;
  if (
    name === 'blog-hub.md' ||
    name === 'blog-index.md' ||
    name === 'README.md' ||
    name === 'BLOG-TOPICS.md' ||
    name === 'ALT-TEXT.md'
  )
    return false;
  return true;
}

function validatePost(meta, file) {
  const required = ['slug', 'title', 'metaDescription', 'date', 'excerpt'];
  for (const key of required) {
    if (!meta[key] || String(meta[key]).trim() === '') {
      throw new Error(`[parse:blog] ${file}: missing frontmatter "${key}"`);
    }
  }
  if (String(meta.metaDescription).length > 155) {
    throw new Error(`[parse:blog] ${file}: metaDescription exceeds 155 characters`);
  }
  if (meta.draft === false) {
    for (const key of ['heroImage', 'heroImageAlt']) {
      if (!meta[key] || String(meta[key]).trim() === '') {
        throw new Error(`[parse:blog] ${file}: published posts require "${key}"`);
      }
    }
  }
}

function main() {
  fs.mkdirSync(BLOG_CONFIG, { recursive: true });
  fs.mkdirSync(ARTICLE_DIR, { recursive: true });

  const hubPath = path.join(BLOG_DIR, 'blog-hub.md');
  if (fs.existsSync(hubPath)) {
    const hubMap = parseCopyTable(fs.readFileSync(hubPath, 'utf8'));
    fs.writeFileSync(path.join(OUT_COPY, 'blog-hub.json'), `${JSON.stringify(hubMap, null, 2)}\n`);
    console.log(`[parse:blog] blog-hub.json — ${Object.keys(hubMap).length} ids`);
  }

  const indexPath = path.join(BLOG_DIR, 'blog-index.md');
  if (fs.existsSync(indexPath)) {
    const indexMap = parseCopyTable(fs.readFileSync(indexPath, 'utf8'));
    fs.writeFileSync(path.join(OUT_COPY, 'blog-index.json'), `${JSON.stringify(indexMap, null, 2)}\n`);
    console.log(`[parse:blog] blog-index.json — ${Object.keys(indexMap).length} ids`);
  }

  const posts = [];
  const names = fs.readdirSync(BLOG_DIR).filter(isPostFile).sort();

  for (const name of names) {
    const filePath = path.join(BLOG_DIR, name);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = parseFrontmatter(raw);
    if (!parsed) {
      throw new Error(`[parse:blog] ${name}: must start with YAML frontmatter (---)`);
    }
    const { data, body } = parsed;
    validatePost(data, name);
    const seoFields = blogSeoFieldsFromFrontmatter(data);

    const slug = String(data.slug).trim();
    const draft = data.draft !== false;
    const readingMinutes =
      typeof data.readingMinutes === 'number' && data.readingMinutes > 0
        ? data.readingMinutes
        : estimateReadingMinutes(body);
    const updated = data.updated || data.date;

    const paragraphs = paragraphsFromArticleMarkdown(body);
    const html = renderArticleHtml(body);
    const articleBase = `blog-${slug}`;
    const articlePayload = {
      markdown: body,
      html,
      wordCountSource: wordCount(body),
      wordCountRendered: wordCount(html.replace(/<[^>]+>/g, ' ')),
      paragraphs,
    };
    fs.writeFileSync(
      path.join(ARTICLE_DIR, `${articleBase}.article.json`),
      `${JSON.stringify(articlePayload, null, 2)}\n`,
    );

    posts.push({
      slug,
      title: data.title,
      metaTitle: data.metaTitle || data.title,
      metaDescription: data.metaDescription,
      date: data.date,
      updated,
      excerpt: data.excerpt,
      heroImage: data.heroImage || '',
      heroImageAlt: data.heroImageAlt || '',
      cardImage: data.cardImage || '',
      cardImage2x: data.cardImage2x || '',
      ogImage: data.ogImage || `/og/blog/${slug}.png`,
      keyPoints: seoFields.keyPoints,
      keyPointsAfter:
        typeof data.keyPointsAfter === 'number' && data.keyPointsAfter > 0
          ? data.keyPointsAfter
          : 1,
      faqs: seoFields.faqs,
      relatedLinks: seoFields.relatedLinks,
      hmlOneLiner: seoFields.hmlOneLiner,
      readingMinutes,
      draft,
      articleFile: `${articleBase}.article.json`,
    });
    console.log(`[parse:blog] post ${slug} — draft=${draft}, ${readingMinutes} min read`);
  }

  const HUB_ORDER = [
    'google-november-core-update-gemini-4-hydrogen',
    'chatgpt-businesses-business-hub',
    'google-ai-mode-ads-australia-canada-singapore-uk',
    'uk-rules-check-cma-asa',
    'consumer-trends-2027-trust-proof-outcomes',
  ];
  const rank = (slug) => {
    const i = HUB_ORDER.indexOf(slug);
    return i === -1 ? 999 : i;
  };
  const sortPosts = (a, b) => b.date.localeCompare(a.date) || rank(a.slug) - rank(b.slug);
  const published = posts.filter((p) => !p.draft).sort(sortPosts);
  posts.sort(sortPosts);
  fs.writeFileSync(
    path.join(BLOG_CONFIG, 'manifest.json'),
    `${JSON.stringify({ posts, publishedCount: published.length }, null, 2)}\n`,
  );
  console.log(`[parse:blog] manifest — ${posts.length} file(s), ${published.length} published`);
}

main();