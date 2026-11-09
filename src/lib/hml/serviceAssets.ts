import type { ServiceSlug } from '@/config/services';

export function serviceHeroImage(slug: ServiceSlug) {
  return `/images/hml/services/svc-${slug}-hero.webp`;
}

export function servicePainImage(slug: ServiceSlug, index: 1 | 2 | 3) {
  return `/images/hml/services/svc-${slug}-pain-${index}.webp`;
}

export function serviceFeatureImage(slug: ServiceSlug) {
  return `/images/hml/services/svc-${slug}-feature.webp`;
}

export function serviceStepIcon(slug: ServiceSlug, index: 1 | 2 | 3 | 4) {
  return `/images/hml/services/svc-${slug}-step-${index}.svg`;
}
