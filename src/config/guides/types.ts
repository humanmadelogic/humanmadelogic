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
  updatedAt?: string;
  draft?: boolean;
  about?: { name: string }[];
  readingMinutes?: number;
};