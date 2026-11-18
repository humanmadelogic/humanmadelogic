import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostStructuredData } from '@/components/hml/BlogStructuredData';
import { BlogPostView } from '@/components/hml/BlogPostView';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { blogPostBySlug, publishedBlogPosts } from '@/config/blog';
import { blogPostMetadata } from '@/lib/hml/blogPostMetadata';
import { buildMetadata } from '@/lib/seo';

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return publishedBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = blogPostBySlug(params.slug);
  if (!post) {
    return buildMetadata({ title: 'Post not found', description: '', path: `/blog/${params.slug}`, noindex: true });
  }
  return blogPostMetadata(post);
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <HmlPageShell>
      <BlogPostStructuredData post={post} />
      <BlogPostView post={post} />
    </HmlPageShell>
  );
}