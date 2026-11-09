import { media } from '@/config/media';
import {
  brandingExpanded,
  performanceMarketingExpanded,
  seoAeoGeoExpanded,
} from '@/config/services-expanded-data';

/** Approved alts from config — no new copy. */
const PAIN_IMAGE_ALTS: Record<string, string> = {
  '/images/hml/services/svc-branding-pain-1.webp':
    brandingExpanded.whoItsFor.painPoints[0]?.imageAlt ?? '',
  '/images/hml/services/svc-seo-aeo-geo-pain-2.webp':
    seoAeoGeoExpanded.whoItsFor.painPoints[1]?.imageAlt ?? '',
  '/images/hml/services/svc-performance-marketing-pain-2.webp':
    performanceMarketingExpanded.whoItsFor.painPoints[1]?.imageAlt ?? '',
};

const PLATE_ALTS: Record<string, string> = {
  '/images/hml/process-monument.webp': media.monument.alt,
  '/images/hml/process-aperture.webp': media.aperture.alt,
  '/images/hml/process-pillar.webp': media.pillar.alt,
  '/images/hml/terrain.webp': media.terrain.alt,
};

export function altForHomeAsset(src: string): string {
  return PLATE_ALTS[src] || PAIN_IMAGE_ALTS[src] || '';
}
