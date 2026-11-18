import manifest from './manifest.json';
import type { BlogPostRecord } from './types';

export type { BlogPostRecord };

const posts = manifest.posts as BlogPostRecord[];

export function allBlogPosts(): BlogPostRecord[] {
  return posts;
}

export function publishedBlogPosts(): BlogPostRecord[] {
  return posts.filter((p) => !p.draft);
}

export function blogHasPublishedPosts(): boolean {
  return publishedBlogPosts().length > 0;
}

export function blogPostBySlug(slug: string): BlogPostRecord | undefined {
  return posts.find((p) => p.slug === slug && !p.draft);
}

export const blogBySlug = Object.fromEntries(
  publishedBlogPosts().map((post) => [post.slug, post]),
) as Record<string, BlogPostRecord>;