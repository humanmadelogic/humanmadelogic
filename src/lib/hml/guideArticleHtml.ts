/** Wrap wide tables for accessible horizontal scroll on narrow viewports. */
export function enhanceGuideArticleHtml(html: string): string {
  return html.replace(/<table>[\s\S]*?<\/table>/g, (table) => {
    const label = /Named\?|Sources cited/i.test(table)
      ? 'Monthly AI visibility tracking log'
      : 'SEO, AEO and GEO comparison table';
    return `<div class="guide-table-scroll -mx-5 overflow-x-auto px-5 pb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-signalYellow/80 sm:mx-0 sm:px-0" tabindex="0" role="region" aria-label="${label}">${table}</div>`;
  });
}