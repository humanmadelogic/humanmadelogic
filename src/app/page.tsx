import type { Metadata } from 'next';
import { HomePage } from '@/components/hml/HomePage';
import { StructuredData } from '@/components/hml/StructuredData';
import { agency } from '@/config/agency';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `${agency.name} — ${siteConfig.coverLine}`,
  description: siteConfig.servicesBlurb,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: `${agency.name} — ${siteConfig.coverLine}`,
    description: siteConfig.servicesBlurb,
    siteName: agency.name,
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${agency.name} — ${siteConfig.coverLine}`,
    description: siteConfig.servicesBlurb,
  },
};

export default function Page() {
  return (
    <>
      <StructuredData />
      <HomePage />
    </>
  );
}
