import g1Article from '@/config/copy/articles/guide-seo-vs-aeo-vs-geo.article.json';
import g2Article from '@/config/copy/articles/guide-cited-by-chatgpt.article.json';

export type GuideArticlePayload = {
  markdown: string;
  html: string;
  wordCountSource: number;
  wordCountRendered: number;
  paragraphs: { plain: string; norm: string }[];
};

const bySlug: Record<string, GuideArticlePayload> = {
  'seo-vs-aeo-vs-geo': g1Article as GuideArticlePayload,
  'how-to-get-your-brand-cited-by-chatgpt': g2Article as GuideArticlePayload,
};

export function guideFullArticle(slug: string): GuideArticlePayload | undefined {
  return bySlug[slug];
}