import authorityKitCopy from '@/config/copy/authority-kit.json';
import launchKitCopy from '@/config/copy/launch-kit.json';
import localDominationKitCopy from '@/config/copy/local-domination-kit.json';
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
    metaDescription: launchKitCopy['LK-META-DESC'],
    relatedServiceSlugs: ['branding', 'performance-marketing', 'social-media'],
  },
  'authority-kit': {
    slug: 'authority-kit',
    title: 'Authority Kit',
    serviceType: 'Brand authority and search visibility package',
    metaTitle: 'Authority Kit',
    metaDescription: authorityKitCopy['AK-META-DESC'],
    relatedServiceSlugs: ['branding', 'seo-aeo-geo'],
  },
  'local-domination-kit': {
    slug: 'local-domination-kit',
    title: 'Local Domination Kit',
    serviceType: 'Local search and lead generation package',
    metaTitle: 'Local Domination Kit',
    metaDescription: localDominationKitCopy['LDK-META-DESC'],
    relatedServiceSlugs: ['seo-aeo-geo', 'performance-marketing', 'branding'],
  },
};

export function kitOfferSources() {
  return kitSlugs.map((slug) => ({ slug, title: kits[slug].title }));
}
