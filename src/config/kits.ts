import type { KitDefinition } from '@/lib/schema';

export const kitSlugs = ['launch-kit', 'authority-kit', 'local-domination-kit'] as const;
export type KitSlug = (typeof kitSlugs)[number];

/** Schema and hub metadata (page copy ships separately). */
export const kits: Record<KitSlug, KitDefinition> = {
  'launch-kit': {
    slug: 'launch-kit',
    title: 'Launch Kit',
    serviceType: 'Brand launch package',
    metaTitle: 'Launch Kit',
    metaDescription:
      'Best for new or relaunching brands that need to look right and get moving. A brand identity, a website or landing page, and a 30 to 60 day performance or social sprint.',
    relatedServiceSlugs: ['branding', 'performance-marketing', 'social-media'],
  },
  'authority-kit': {
    slug: 'authority-kit',
    title: 'Authority Kit',
    serviceType: 'Brand authority and search visibility package',
    metaTitle: 'Authority Kit',
    metaDescription:
      'Best for brands that want to be the name search engines and AI answers trust. Positioning and site structure, SEO/AEO/GEO and a content engine.',
    relatedServiceSlugs: ['branding', 'seo-aeo-geo'],
  },
  'local-domination-kit': {
    slug: 'local-domination-kit',
    title: 'Local Domination Kit',
    serviceType: 'Local search and lead generation package',
    metaTitle: 'Local Domination Kit',
    metaDescription:
      'Best for clinics, trades, studios and venues that live on nearby customers. Google Business Profile and local SEO, reviews and lead-gen ads, and a light brand refresh.',
    relatedServiceSlugs: ['seo-aeo-geo', 'performance-marketing', 'branding'],
  },
};

export function kitOfferSources() {
  return kitSlugs.map((slug) => ({ slug, title: kits[slug].title }));
}
