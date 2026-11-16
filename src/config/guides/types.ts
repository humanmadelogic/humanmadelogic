import type { SeoCopyMap } from '@/lib/hml/seoCopyTable';

export type GuideSection =
  | { kind: 'pair'; headingKey: string; bodyKey: string }
  | { kind: 'body'; bodyKey: string }
  | { kind: 'prose'; html: string };

export type GuideDefinition = {
  slug: string;
  copyFile: string;
  prefix: string;
  breadcrumbTitle: string;
  cardImageSlug: string;
  hubCardKey: 'G1' | 'G2';
  pillar: 'GUIDES-PILLAR-SEARCH-NAME';
  ogImage: string;
  publishedAt?: string;
  draft?: boolean;
  about?: { name: string }[];
  sections: GuideSection[];
  readingMinutes?: number;
};