import type { Metadata } from 'next';
import { BlogHubStructuredData } from '@/components/hml/BlogStructuredData';
import { BlogHubView } from '@/components/hml/BlogHubView';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { blogHasPublishedPosts } from '@/config/blog';
import { pageTitleFromCopy } from '@/lib/hml/seoCopyMeta';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { buildMetadata } from '@/lib/seo';

const hubCopy = loadCopyMap('blog-hub.json');

export const metadata: Metadata = buildMetadata({
  title: pageTitleFromCopy(hubCopy['BLOG-META-TITLE']),
  description: hubCopy['BLOG-META-DESC'],
  path: '/blog',
  noindex: !blogHasPublishedPosts(),
});

export default function BlogHubPage() {
  return (
    <HmlPageShell>
      <BlogHubStructuredData />
      <BlogHubView />
    </HmlPageShell>
  );
}