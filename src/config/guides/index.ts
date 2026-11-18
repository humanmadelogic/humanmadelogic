import { citedByChatgptGuide } from './cited-by-chatgpt';
import { seoVsAeoVsGeoGuide } from './seo-vs-aeo-vs-geo';
import type { GuideDefinition } from './types';

export const publishedGuides: GuideDefinition[] = [seoVsAeoVsGeoGuide, citedByChatgptGuide];

export const guideBySlug = Object.fromEntries(
  publishedGuides.map((guide) => [guide.slug, guide]),
) as Record<string, GuideDefinition | undefined>;

export function indexableGuides() {
  return publishedGuides.filter((g) => !g.draft);
}