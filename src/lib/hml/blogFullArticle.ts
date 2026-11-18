import fs from 'node:fs';
import path from 'node:path';
import type { BlogPostRecord } from '@/config/blog';

export type BlogArticlePayload = {
  markdown: string;
  html: string;
  wordCountSource: number;
  wordCountRendered: number;
  paragraphs: { plain: string; norm: string }[];
};

export function loadBlogArticle(post: BlogPostRecord): BlogArticlePayload {
  const filePath = path.join(process.cwd(), 'src/config/copy/articles', post.articleFile);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing blog article artifact: ${post.articleFile}. Run npm run parse:copy.`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as BlogArticlePayload;
}