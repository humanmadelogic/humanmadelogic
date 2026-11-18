import { blogHubSlugOrder } from '@/config/blog/hubOrder';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';

/** Hub card slot 1–5 in `blogHubSlugOrder`, not list position after date sort. */
export function blogHubCardNumber(slug: string): number | undefined {
  const idx = blogHubSlugOrder.indexOf(slug as (typeof blogHubSlugOrder)[number]);
  return idx === -1 ? undefined : idx + 1;
}

export function blogHubCardTeaser(slug: string): string {
  const n = blogHubCardNumber(slug);
  if (n == null) return '';
  const copy = loadCopyMap('blog-index.json');
  const key = `BLOG-INDEX-CARD-${n}-TEASER`;
  return copy[key] ?? '';
}