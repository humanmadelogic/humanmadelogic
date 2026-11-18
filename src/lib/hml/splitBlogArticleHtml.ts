/** Split rendered article HTML for blog SEO blocks (key points, FAQs before Sources). */

export function splitAfterParagraphs(html: string, paragraphCount: number): { intro: string; rest: string } {
  if (paragraphCount < 1) return { intro: '', rest: html };
  let rest = html;
  let intro = '';
  for (let i = 0; i < paragraphCount; i += 1) {
    const end = rest.indexOf('</p>');
    if (end < 0) break;
    intro += rest.slice(0, end + 4);
    rest = rest.slice(end + 4).trim();
  }
  return { intro, rest };
}

export function splitBeforeSources(html: string): { beforeSources: string; sources: string } {
  const match = html.match(/<h2[^>]*>\s*Sources\s*<\/h2>/i);
  if (!match || match.index == null) {
    return { beforeSources: html, sources: '' };
  }
  const idx = match.index;
  return {
    beforeSources: html.slice(0, idx).trim(),
    sources: html.slice(idx).trim(),
  };
}