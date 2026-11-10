import type { Metadata } from 'next';
import { JsonLd } from '@/components/hml/JsonLd';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { ServicesOverview } from '@/components/hml/ServicesOverview';
import { servicesIndex } from '@/config/services';
import { servicesHubGraph } from '@/lib/schema';
import { buildMetadata, siteTitle } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: servicesIndex.metaTitle,
  description: servicesIndex.metaDescription,
  path: '/services',
  ogImage: servicesIndex.ogImage,
});

export default function ServicesPage() {
  return (
    <HmlPageShell>
      <JsonLd
        data={servicesHubGraph({
          name: siteTitle(servicesIndex.metaTitle),
          description: servicesIndex.metaDescription,
        })}
      />
      <ServicesOverview />
    </HmlPageShell>
  );
}
