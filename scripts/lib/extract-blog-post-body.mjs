/**
 * Extract publishable article markdown from Pamala copy-deck sources (batch 1 format).
 */
const STOP_MARKERS = [
  '\n---\n**About the author.**',
  '\n**About the author.**',
  '\n## Notes for Jeff',
  '\n## Pamala QA',
  '\n## Open flags',
  '\n### Open flags',
];

export function extractBlogPostBody(source) {
  const h1Match = source.match(/^# .+$/m);
  if (!h1Match || h1Match.index == null) {
    throw new Error('No H1 (# ...) found in source');
  }

  let body = source.slice(h1Match.index + h1Match[0].length);
  let end = body.length;
  for (const marker of STOP_MARKERS) {
    const i = body.indexOf(marker);
    if (i >= 0) end = Math.min(end, i);
  }
  body = body.slice(0, end).trim();

  body = body
    .replace(/^\*\*By Rowan Blake\*\*\s*\n+/m, '')
    .replace(/^By Rowan Blake\s*\n+/m, '')
    .replace(/^Reviewed by[^\n]+\n+/m, '')
    .replace(/^Published:\s*\[TBC[^\]]*\]\s*\n+/m, '')
    .replace(/^Published:\s*\[TBC: publish date\]\s*\n+/m, '')
    .trim();

  return body;
}

export function parseBlogDeckMeta(source) {
  const title =
    source.match(/^\*\*Title:\*\*\s*(.+)$/m)?.[1]?.trim() ||
    source.match(/^- \*\*Title:\*\*\s*(.+)$/m)?.[1]?.trim();
  const slugRaw =
    source.match(/^\*\*Slug:\*\*\s*(.+)$/m)?.[1]?.trim() ||
    source.match(/^- \*\*Slug:\*\*\s*(.+)$/m)?.[1]?.trim();
  const slug = slugRaw?.replace(/[`(].*/s, '').trim();
  const metaTitle =
    source.match(/^\*\*Meta title[^:]*:\*\*\s*(.+)$/m)?.[1]?.trim() ||
    source.match(/^- \*\*Meta title[^:]*:\*\*\s*(.+)$/m)?.[1]?.trim();
  const metaDescription =
    source.match(/^\*\*Meta description[^:]*:\*\*\s*(.+)$/m)?.[1]?.trim() ||
    source.match(/^- \*\*Meta description[^:]*:\*\*\s*(.+)$/m)?.[1]?.trim();
  const excerpt =
    source.match(/^\*\*Excerpt:\*\*\s*(.+)$/m)?.[1]?.trim() ||
    source.match(/^- \*\*Excerpt:\*\*\s*(.+)$/m)?.[1]?.trim();

  if (!title || !slug || !metaDescription || !excerpt) {
    throw new Error('Missing Title, Slug, Meta description or Excerpt in deck header');
  }

  const stripCounts = (s) => s?.replace(/\s*\(\d+\s*\/\s*\d+\)\s*$/, '').trim();
  const metaTitleClean = stripCounts(metaTitle) || title;
  const metaDescriptionClean = stripCounts(metaDescription);

  return { title, slug, metaTitle: metaTitleClean, metaDescription: metaDescriptionClean, excerpt };
}