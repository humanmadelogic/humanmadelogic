export type BlogRelatedLink = { href: string; label: string };

export type BlogFaqItem = { q: string; a: string };

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
  keyPoints: string[];
  /** Paragraphs of intro prose before the key-points box (default 1). */
  keyPointsAfter: number;
  faqs: BlogFaqItem[];
  relatedLinks: BlogRelatedLink[];
  hmlOneLiner: string;
  readingMinutes: number;
  draft: boolean;
  articleFile: string;
};