import type { Metadata } from 'next';
import type { BlogPostRecord } from '@/config/blog';
import { blogIsoDateTime } from '@/lib/hml/blogDates';
import { buildMetadata } from '@/lib/seo';

/** Blog post social + document titles use metaTitle only (no brand suffix). */
export function blogPostMetadata(post: BlogPostRecord): Metadata {
  const pageTitle = post.metaTitle || post.title;
  const base = buildMetadata({
    title: pageTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: blogIsoDateTime(post.date),
    modifiedTime: blogIsoDateTime(post.updated),
    ogImage: post.ogImage || `/og/blog/${post.slug}.png`,
  });
  return {
    ...base,
    title: { absolute: pageTitle },
    openGraph: {
      ...base.openGraph,
      title: pageTitle,
    },
    twitter: {
      ...base.twitter,
      title: pageTitle,
    },
  };
}