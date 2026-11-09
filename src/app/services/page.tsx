import type { Metadata } from 'next';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { ServicesOverview } from '@/components/hml/ServicesOverview';
import { servicesIndex } from '@/config/services';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: servicesIndex.metaTitle,
  description: servicesIndex.metaDescription,
  path: '/services',
  ogImage: servicesIndex.ogImage,
});

export default function ServicesPage() {
  return (
    <HmlPageShell>
      <ServicesOverview />
    </HmlPageShell>
  );
}
