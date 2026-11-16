import type { Metadata } from 'next';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { GuidesHubStructuredData } from '@/components/hml/GuideStructuredData';
import { GuidesHubView } from '@/components/hml/GuidesHubView';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { pageTitleFromCopy } from '@/lib/hml/seoCopyMeta';
import { buildMetadata } from '@/lib/seo';

const hubCopy = loadCopyMap('guides-hub.json');

export const metadata: Metadata = buildMetadata({
  title: pageTitleFromCopy(hubCopy['GUIDES-META-TITLE']),
  description: hubCopy['GUIDES-META-DESC'],
  path: '/guides',
  ogImage: '/og/guides/og-guide-seo-vs-aeo-vs-geo.png',
});

export default function GuidesHubPage() {
  return (
    <HmlPageShell>
      <GuidesHubStructuredData />
      <GuidesHubView />
    </HmlPageShell>
  );
}