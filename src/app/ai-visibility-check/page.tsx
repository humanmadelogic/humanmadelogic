import type { Metadata } from 'next';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { AiVisibilityCheckView } from '@/components/hml/AiVisibilityCheckView';
import { ServiceFaqStructuredData } from '@/components/hml/ServiceFaqStructuredData';
import { JsonLd } from '@/components/hml/JsonLd';
import { homePage } from '@/config/agency';
import { avcFormEnabled } from '@/lib/aiVisibilityCheck';
import { faqItemsFromCopy, pageTitleFromCopy } from '@/lib/hml/seoCopyMeta';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { aiVisibilityCheckPageGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

const copy = loadCopyMap('ai-visibility-check.json');
const pagePath = '/ai-visibility-check';

const ogFromCopy = copy['AVC-OG-FILE']?.replace(/^public/, '') || '';
const ogImage = ogFromCopy.startsWith('/') && existsSync(path.join(process.cwd(), 'public', ogFromCopy.slice(1)))
  ? ogFromCopy
  : homePage.meta.ogImage;

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
        })}
      />
      {faqItems.length > 0 ? <ServiceFaqStructuredData items={faqItems} path={pagePath} /> : null}
      <AiVisibilityCheckView formEnabled={avcFormEnabled()} />
    </HmlPageShell>
  );
}