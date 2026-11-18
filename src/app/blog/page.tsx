import type { Metadata } from 'next';
import { BlogHubStructuredData } from '@/components/hml/BlogStructuredData';
import { BlogHubView } from '@/components/hml/BlogHubView';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { pageTitleFromCopy } from '@/lib/hml/seoCopyMeta';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { homePage } from '@/config/agency';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

const hubCopy = loadCopyMap('blog-hub.json');

const hubMetadata = buildMetadata({
  title: pageTitleFromCopy(hubCopy['BLOG-META-TITLE']),
  description: hubCopy['BLOG-META-DESC'],
  path: '/blog',
  ogImage: homePage.meta.ogImage,
});

/** Hub needs the RSS alternate on page metadata so static `/blog` HTML includes it (layout covers post routes). */
export const metadata: Metadata = {
  ...hubMetadata,
  alternates: {
    ...(typeof hubMetadata.alternates === 'object' ? hubMetadata.alternates : {}),
    types: {
      'application/rss+xml': [
        {
          url: new URL('/blog/rss.xml', siteConfig.url),
          title: 'Human Made Logic Blog',
        },
      ],
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