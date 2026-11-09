import type { Metadata } from 'next';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { ServicesOverview } from '@/components/hml/ServicesOverview';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description: siteConfig.servicesBlurb,
  path: '/services',
});

export default function ServicesPage() {
  return (
    <HmlPageShell>
      <ServicesOverview />
    </HmlPageShell>
  );
}
