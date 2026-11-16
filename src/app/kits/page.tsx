import type { Metadata } from 'next';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { KitsHubStructuredData } from '@/components/hml/KitsHubStructuredData';
import { KitsHubView } from '@/components/hml/KitsHubView';
import { ServiceFaqStructuredData } from '@/components/hml/ServiceFaqStructuredData';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { kitsHubOgImage } from '@/lib/hml/kitOg';
import { faqItemsFromCopy, pageTitleFromCopy } from '@/lib/hml/seoCopyMeta';
import { buildMetadata } from '@/lib/seo';

const copy = loadCopyMap('kits-hub.json');

export const metadata: Metadata = buildMetadata({
  title: pageTitleFromCopy(copy['KITS-META-TITLE']),
  description: copy['KITS-META-DESC'],
  path: '/kits',
  ogImage: kitsHubOgImage,
});

export default function KitsHubPage() {
  const faqItems = faqItemsFromCopy(copy, { prefix: 'KITS', max: 6 });

  return (
    <HmlPageShell>
      <KitsHubStructuredData />
      {faqItems.length > 0 ? <ServiceFaqStructuredData items={faqItems} path="/kits" /> : null}
      <KitsHubView />
    </HmlPageShell>
  );
}