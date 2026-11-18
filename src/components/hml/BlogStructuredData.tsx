import type { BlogPostRecord } from '@/config/blog';
import { publishedBlogPosts } from '@/config/blog';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { blogIsoDateTime } from '@/lib/hml/blogDates';
import { blogHubGraph, blogPostingGraph, canonicalUrl } from '@/lib/schema';
import { JsonLd } from './JsonLd';

export function BlogHubStructuredData() {
  const copy = loadCopyMap('blog-hub.json');
  const posts = publishedBlogPosts().map((p) => ({ slug: p.slug, title: p.title }));

  return (
    <JsonLd
      data={blogHubGraph({
        name: copy['BLOG-META-TITLE'],
        description: copy['BLOG-META-DESC'],
        posts,
      })}
    />
  );
}

export function BlogPostStructuredData({ post }: { post: BlogPostRecord }) {
  const imageUrl = canonicalUrl(post.ogImage || `/og/blog/${post.slug}.png`);

  return (
    <JsonLd
      data={blogPostingGraph({
        slug: post.slug,
        headline: post.title,
        description: post.metaDescription,
        imageUrl,
        webPageTitle: post.title,
        breadcrumbTitle: post.title,
        datePublished: blogIsoDateTime(post.date),
        dateModified: blogIsoDateTime(post.updated),
        lastReviewed: blogIsoDateTime(post.updated),
      })}
    />
  );
}