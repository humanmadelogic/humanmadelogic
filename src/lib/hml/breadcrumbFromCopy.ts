export type BreadcrumbItem = { label: string; href?: string };

const SEGMENT_HREFS: Record<string, string> = {
  Home: '/',
  Kits: '/kits',
  Guides: '/guides',
  'Launch Kit': '/kits/launch-kit',
  'Authority Kit': '/kits/authority-kit',
  'Local Domination Kit': '/kits/local-domination-kit',
  'SEO vs AEO vs GEO': '/guides/seo-vs-aeo-vs-geo',
  'Get cited by ChatGPT': '/guides/cited-by-chatgpt',
  'Beauty and skincare': '/industries/beauty-skincare',
};

export function breadcrumbItemsFromCopy(trail: string): BreadcrumbItem[] {
  const parts = trail.split('>').map((s) => s.trim()).filter(Boolean);
  return parts.map((label, index) => ({
    label,
    href: index < parts.length - 1 ? SEGMENT_HREFS[label] : undefined,
  }));
}