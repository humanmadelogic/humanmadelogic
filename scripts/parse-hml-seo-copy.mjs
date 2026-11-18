/**
 * Parse SEO copy tables from docs/copy markdown into src/config/copy/*.json id→text maps.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  extractFullArticleMarkdown,
  paragraphsFromArticleMarkdown,
  renderArticleHtml,
  wordCount,
} from './lib/extract-full-article.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const KITS_DIR = path.join(ROOT, 'docs/copy/kits');
const GUIDES_DIR = path.join(ROOT, 'docs/copy/guides');
const OUT_DIR = path.join(ROOT, 'src/config/copy');
const ARTICLE_DIR = path.join(OUT_DIR, 'articles');

/** Split a markdown table row on unescaped `|` only. */
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

function unescapeCellText(text) {
  return text.replace(/\\\|/g, '|').trim();
}

/**
 * Parse copy rows: | ID | … | NEW | Final text | …
 * Final text is the 4th data column (index 4 after leading empty cell from `|`).
 */
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

    if (!id || id === 'ID' || status !== 'NEW') continue;
    if (!finalText) continue;

    map[id] = unescapeCellText(finalText);
  }
  return map;
}

function shouldSkipKitsFile(name) {
  return /KITS-BATCH/i.test(name);
}

function shouldSkipGuidesFile(name) {
  if (/^GUIDES-PLAN/i.test(name)) return true;
  if (name === 'industries.md') return true;
  return false;
}

function collectMarkdownFiles() {
  const files = [];
  for (const name of fs.readdirSync(KITS_DIR)) {
    if (!name.endsWith('.md') || shouldSkipKitsFile(name)) continue;
    files.push({ input: path.join(KITS_DIR, name), basename: name.replace(/\.md$/, '') });
  }
  for (const name of fs.readdirSync(GUIDES_DIR)) {
    if (!name.endsWith('.md') || shouldSkipGuidesFile(name)) continue;
    files.push({ input: path.join(GUIDES_DIR, name), basename: name.replace(/\.md$/, '') });
  }
  return files.sort((a, b) => a.basename.localeCompare(b.basename));
}

function writeFullArticleArtifact(basename, markdown) {
  const body = extractFullArticleMarkdown(markdown);
  if (!body) return;

  const paragraphs = paragraphsFromArticleMarkdown(body);
  const html = renderArticleHtml(body);
  const plainFromHtml = html.replace(/<[^>]+>/g, ' ');

  const payload = {
    markdown: body,
    html,
    wordCountSource: wordCount(body),
    wordCountRendered: wordCount(plainFromHtml),
    paragraphs,
  };

  fs.mkdirSync(ARTICLE_DIR, { recursive: true });
  const outPath = path.join(ARTICLE_DIR, `${basename}.article.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(
    `[parse:copy] ${basename}.article.json — ${payload.wordCountSource} source words, ${paragraphs.length} paragraphs`,
  );
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = collectMarkdownFiles();
  let totalIds = 0;

  for (const { input, basename } of files) {
    const markdown = fs.readFileSync(input, 'utf8');
    const map = parseCopyTable(markdown);
    const outPath = path.join(OUT_DIR, `${basename}.json`);
    fs.writeFileSync(outPath, `${JSON.stringify(map, null, 2)}\n`, 'utf8');
    const count = Object.keys(map).length;
    totalIds += count;
    console.log(`[parse:copy] ${basename}.json — ${count} ids`);
    writeFullArticleArtifact(basename, markdown);
  }

  console.log(`[parse:copy] Wrote ${files.length} files (${totalIds} ids total).`);
}

main();