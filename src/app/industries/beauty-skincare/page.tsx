import type { Metadata } from 'next';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { IndustryBeautyView } from '@/components/hml/IndustryBeautyView';
import { ServiceFaqStructuredData } from '@/components/hml/ServiceFaqStructuredData';
import { JsonLd } from '@/components/hml/JsonLd';
import { faqItemsFromCopy, pageTitleFromCopy } from '@/lib/hml/seoCopyMeta';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { industryBeautyPageGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

const copy = loadCopyMap('industries-beauty-skincare.json');
const path = '/industries/beauty-skincare';

export const metadata: Metadata = buildMetadata({
  title: pageTitleFromCopy(copy['IND-BEAUTY-META-TITLE']),
  description: copy['IND-BEAUTY-META-DESC'],
  path,
  ogImage: '/og/industries/og-beauty-skincare.png',
});

export default function BeautySkincareIndustryPage() {
  const faqItems = faqItemsFromCopy(copy, { prefix: 'IND-BEAUTY', max: 8 });

  return (
    <HmlPageShell>
      <JsonLd
        data={industryBeautyPageGraph({
          name: copy['IND-BEAUTY-META-TITLE'],
          description: copy['IND-BEAUTY-META-DESC'],
          breadcrumbTitle: 'Beauty and skincare',
        })}
      />
      {faqItems.length > 0 ? <ServiceFaqStructuredData items={faqItems} path={path} /> : null}
      <IndustryBeautyView />
    </HmlPageShell>
  );
}