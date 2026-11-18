/**
 * Extract "## Full article" prose from Pamala FINAL markdown and derive fidelity paragraphs.
 */
import { marked } from 'marked';

marked.setOptions({ gfm: true });

const END_MARKERS = ['\n## Pamala QA', '\n## Pamala final'];

export function extractFullArticleMarkdown(markdown) {
  const startMatch = markdown.match(/^## Full article[^\n]*$/m);
  if (!startMatch || startMatch.index == null) return null;

  let body = markdown.slice(startMatch.index + startMatch[0].length);
  let end = body.length;
  for (const marker of END_MARKERS) {
    const i = body.indexOf(marker);
    if (i >= 0) end = Math.min(end, i);
  }
  body = body.slice(0, end).trim();

  body = body
    .replace(/^#\s+.+\n+/, '')
    .replace(/^\*\*By[^\n]+\*\*\s*\n+/m, '')
    .replace(/^Reviewed by[^\n]+\n+/m, '')
    .replace(/^Last updated:[^\n]+\n+/m, '')
    .trim();

  return body || null;
}

export function normalizeForFidelity(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[“”]/g, '"')
    .replace(/[’]/g, "'")
    .trim();
}

/** Strip markdown to plain text for paragraph fingerprinting (not full CommonMark). */
export function markdownBlockToPlain(block) {
  let t = block.trim();
  if (!t) return '';
  if (t.startsWith('```')) {
    const inner = t.replace(/^```[^\n]*\n/, '').replace(/\n```$/, '');
    return inner.trim();
  }
  t = t.replace(/^\|.+\|$/gm, (row) => row.replace(/\|/g, ' '));
  t = t.replace(/^#{1,6}\s+/gm, '');
  t = t.replace(/\*\*([^*]+)\*\*/g, '$1');
  t = t.replace(/\*([^*]+)\*/g, '$1');
  t = t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  t = t.replace(/^>\s?/gm, '');
  t = t.replace(/^[-*]\s+/gm, '');
  t = t.replace(/^\d+\.\s+/gm, '');
  return t.replace(/\s+/g, ' ').trim();
}

function expandBlockParts(block) {
  const parts = [];
  const re = /```[^\n]*\n([\s\S]*?)```/g;
  let last = 0;
  let match;
  while ((match = re.exec(block))) {
    const before = block.slice(last, match.index).trim();
    if (before) parts.push({ type: 'prose', text: before });
    parts.push({ type: 'code', text: match[1].trim() });
    last = match.index + match[0].length;
  }
  const after = block.slice(last).trim();
  if (after) parts.push({ type: 'prose', text: after });
  if (parts.length === 0 && block.trim()) parts.push({ type: 'prose', text: block.trim() });
  return parts;
}

function tableRowParagraphs(block) {
  const lines = block.trim().split('\n').filter((l) => l.trim().startsWith('|'));
  if (lines.length < 2) return null;
  const rows = lines.filter((l) => !/^\|\s*---/.test(l));
  const out = [];
  for (const row of rows) {
    const plain = row.replace(/^\|/, '').replace(/\|$/, '').replace(/\|/g, ' ').trim();
    const norm = normalizeForFidelity(plain);
    if (norm.length >= 20) out.push({ plain, norm });
  }
  return out.length ? out : null;
}

function splitRespectingFences(markdown) {
  const blocks = [];
  let i = 0;
  while (i < markdown.length) {
    const fence = markdown.indexOf('```', i);
    if (fence === -1) {
      const tail = markdown.slice(i);
      for (const chunk of tail.split(/\n\n+/)) {
        const t = chunk.trim();
        if (t) blocks.push(t);
      }
      break;
    }
    const before = markdown.slice(i, fence);
    for (const chunk of before.split(/\n\n+/)) {
      const t = chunk.trim();
      if (t) blocks.push(t);
    }
    const fenceEnd = markdown.indexOf('```', fence + 3);
    if (fenceEnd === -1) {
      blocks.push(markdown.slice(fence).trim());
      break;
    }
    blocks.push(markdown.slice(fence, fenceEnd + 3).trim());
    i = fenceEnd + 3;
  }
  return blocks;
}

export function paragraphsFromArticleMarkdown(markdown) {
  if (!markdown) return [];
  const blocks = splitRespectingFences(markdown);
  const out = [];
  for (let block of blocks) {
    block = block.replace(/^---\s*\n+/, '').trim();
    if (!block || block === '---') continue;

    const tableRows = tableRowParagraphs(block);
    if (tableRows) {
      out.push(...tableRows);
      continue;
    }

    for (const part of expandBlockParts(block)) {
      const plain =
        part.type === 'code'
          ? part.text.replace(/\s+/g, ' ').trim()
          : markdownBlockToPlain(part.text);
      const norm = normalizeForFidelity(plain);
      const minLen = part.type === 'code' ? 12 : 32;
      if (norm.length < minLen) continue;
      out.push({ plain, norm });
    }
  }
  return out;
}

export function wordCount(text) {
  const words = text.match(/[\p{L}\p{N}''-]+/gu);
  return words ? words.length : 0;
}

export function renderArticleHtml(markdown) {
  return marked.parse(markdown);
}