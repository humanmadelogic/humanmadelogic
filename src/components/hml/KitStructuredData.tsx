import type { KitSlug } from '@/config/kits';
import { kits } from '@/config/kits';
import { faqItemsFromCopy } from '@/lib/hml/seoCopyMeta';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { kitPageGraph } from '@/lib/schema';
import { JsonLd } from './JsonLd';
import { ServiceFaqStructuredData } from './ServiceFaqStructuredData';

const KIT_COPY_FILE: Record<KitSlug, { file: string; prefix: string }> = {
  'launch-kit': { file: 'launch-kit.json', prefix: 'LK' },
  'authority-kit': { file: 'authority-kit.json', prefix: 'AK' },
  'local-domination-kit': { file: 'local-domination-kit.json', prefix: 'LDK' },
};

export function KitStructuredData({ slug }: { slug: KitSlug }) {
  const kit = kits[slug];
  const { file, prefix } = KIT_COPY_FILE[slug];
  const copy = loadCopyMap(file);
  const faqItems = faqItemsFromCopy(copy, { prefix });
  const path = `/kits/${slug}`;

  return (
    <>
      <JsonLd data={kitPageGraph(kit)} />
      {faqItems.length > 0 ? <ServiceFaqStructuredData items={faqItems} path={path} /> : null}
    </>
  );
}