import manifest from './manifest.json';
import { blogHubSlugOrder } from './hubOrder';
import type { BlogPostRecord } from './types';

export type { BlogFaqItem, BlogPostRecord, BlogRelatedLink } from './types';

const posts = manifest.posts as BlogPostRecord[];

export function allBlogPosts(): BlogPostRecord[] {
  return posts;
}

function hubRank(slug: string): number {
  const rank = blogHubSlugOrder.indexOf(slug as (typeof blogHubSlugOrder)[number]);
  return rank === -1 ? 999 : rank;
}

export function publishedBlogPosts(): BlogPostRecord[] {
  return posts
    .filter((p) => !p.draft)
    .slice()
    .sort(
      (a, b) =>
        b.date.localeCompare(a.date) ||
        hubRank(a.slug) - hubRank(b.slug) ||
        a.slug.localeCompare(b.slug),
    );
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