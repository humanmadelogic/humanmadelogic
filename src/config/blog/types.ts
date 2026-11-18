export type BlogRelatedLink = { href: string; label: string };

export type BlogPostRecord = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  updated: string;
  excerpt: string;
  heroImage: string;
  heroImageAlt: string;
  cardImage: string;
  cardImage2x: string;
  ogImage: string;
  relatedLinks: BlogRelatedLink[];
  readingMinutes: number;
  draft: boolean;
  articleFile: string;
};