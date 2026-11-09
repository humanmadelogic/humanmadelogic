import type { Metadata } from 'next';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { AboutView } from '@/components/hml/AboutView';
import { agency } from '@/config/agency';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `About — ${agency.name}`,
  description: siteConfig.servicesBlurb,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About — ${agency.name}`,
    description: siteConfig.description,
    url: new URL('/about', siteConfig.url).toString(),
    locale: 'en_GB',
  },
};

export default function AboutPage() {
  return (
    <HmlPageShell>
      <AboutView />
    </HmlPageShell>
  );
}
