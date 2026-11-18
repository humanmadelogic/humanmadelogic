import type { Metadata } from 'next';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { AiVisibilityCheckView } from '@/components/hml/AiVisibilityCheckView';
import { ServiceFaqStructuredData } from '@/components/hml/ServiceFaqStructuredData';
import { JsonLd } from '@/components/hml/JsonLd';
import { siteConfig } from '@/config/site';
import { avcFormEnabled } from '@/lib/aiVisibilityCheck';
import { faqItemsFromCopy, pageTitleFromCopy } from '@/lib/hml/seoCopyMeta';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { aiVisibilityCheckPageGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

const copy = loadCopyMap('ai-visibility-check.json');
const pagePath = '/ai-visibility-check';
const ogImage = '/og/og-ai-visibility-check.png';
const ogImageUrl = new URL(ogImage, siteConfig.url).toString();

export const metadata: Metadata = buildMetadata({
  title: pageTitleFromCopy(copy['AVC-META-TITLE']),
  description: copy['AVC-META-DESC'],
  path: pagePath,
  ogImage,
});

export default function AiVisibilityCheckPage() {
  const faqItems = faqItemsFromCopy(copy, { prefix: 'AVC', max: 10 });

  return (
    <HmlPageShell>
      <JsonLd
        data={aiVisibilityCheckPageGraph({
          name: copy['AVC-META-TITLE'],
          description: copy['AVC-WHAT-A'],
          webDescription: copy['AVC-META-DESC'],
          imageUrl: ogImageUrl,
        })}
      />
      {faqItems.length > 0 ? <ServiceFaqStructuredData items={faqItems} path={pagePath} /> : null}
      <AiVisibilityCheckView formEnabled={avcFormEnabled()} />
    </HmlPageShell>
  );
}