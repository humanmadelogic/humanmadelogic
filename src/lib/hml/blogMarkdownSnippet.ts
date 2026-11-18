import { marked } from 'marked';

/** Render a short markdown fragment (lists, links) for blog UI blocks. */
export function markdownSnippetToHtml(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}

export function keyPointsListHtml(points: string[]): string {
  const md = points.map((p) => `- ${p}`).join('\n');
  return markdownSnippetToHtml(md);
}