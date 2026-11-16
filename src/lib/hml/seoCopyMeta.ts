import { siteConfig } from '@/config/site';
import type { SeoCopyMap } from '@/lib/hml/seoCopyTable';

const TITLE_SUFFIX = ` | ${siteConfig.name}`;

export function pageTitleFromCopy(metaTitle: string): string {
  if (metaTitle.endsWith(TITLE_SUFFIX)) {
    return metaTitle.slice(0, -TITLE_SUFFIX.length);
  }
  const idx = metaTitle.indexOf(' | ');
  return idx >= 0 ? metaTitle.slice(0, idx) : metaTitle;
}

export function faqItemsFromCopy(
  copy: SeoCopyMap,
  opts: { prefix: string; max?: number },
): { question: string; answer: string }[] {
  const { prefix, max = 12 } = opts;
  const items: { question: string; answer: string }[] = [];
  for (let i = 1; i <= max; i += 1) {
    const q = copy[`${prefix}-FAQ-${i}-Q`];
    const a = copy[`${prefix}-FAQ-${i}-A`];
    if (!q?.trim() || !a?.trim()) break;
    items.push({ question: q, answer: a });
  }
  return items;
}