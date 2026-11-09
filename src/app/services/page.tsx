import type { Metadata } from 'next';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { ServicesOverview } from '@/components/hml/ServicesOverview';
import { agency } from '@/config/agency';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Services — ${agency.name}`,
  description: siteConfig.servicesBlurb,
  alternates: { canonical: '/services' },
  openGraph: {
    title: `Services — ${agency.name}`,
    description: siteConfig.servicesBlurb,
    url: new URL('/services', siteConfig.url).toString(),
    locale: 'en_GB',
  },
};

export default function ServicesPage() {
  return (
    <HmlPageShell>
      <ServicesOverview />
    </HmlPageShell>
  );
}
