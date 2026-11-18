import type { Metadata } from 'next';
import { BlogHubStructuredData } from '@/components/hml/BlogStructuredData';
import { BlogHubView } from '@/components/hml/BlogHubView';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { pageTitleFromCopy } from '@/lib/hml/seoCopyMeta';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { buildMetadata } from '@/lib/seo';

const hubCopy = loadCopyMap('blog-hub.json');

const hubMetadata = buildMetadata({
  title: pageTitleFromCopy(hubCopy['BLOG-META-TITLE']),
  description: hubCopy['BLOG-META-DESC'],
  path: '/blog',
});

export const metadata: Metadata = {
  ...hubMetadata,
  alternates: {
    ...(typeof hubMetadata.alternates === 'object' ? hubMetadata.alternates : {}),
    types: {
      'application/rss+xml': [{ url: '/blog/rss.xml', title: 'Human Made Logic Blog' }],
    },
  },
};

export default function BlogHubPage() {
  return (
    <HmlPageShell>
      <BlogHubStructuredData />
      <BlogHubView />
    </HmlPageShell>
  );
}