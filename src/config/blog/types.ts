export type BlogPostRecord = {
  slug: string;
  title: string;
  metaDescription: string;
  date: string;
  updated: string;
  excerpt: string;
  heroImage: string;
  heroImageAlt: string;
  readingMinutes: number;
  draft: boolean;
  articleFile: string;
};