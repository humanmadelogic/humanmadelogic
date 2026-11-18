import type { GuideDefinition } from '@/config/guides/types';

/** Same label as guide article headers (from guide config readingMinutes). */
export function guideReadingMinutesLabel(guide: Pick<GuideDefinition, 'readingMinutes'>): string | undefined {
  if (!guide.readingMinutes) return undefined;
  return `${guide.readingMinutes} min read`;
}