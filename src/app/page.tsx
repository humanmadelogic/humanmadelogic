import type { Metadata } from 'next';
import { HomePage } from '@/components/hml/HomePage';
import { StructuredData } from '@/components/hml/StructuredData';
import { siteConfig } from '@/config/site';
import { homeTitle } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: homeTitle() },
  description: siteConfig.servicesBlurb,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: homeTitle(),
    description: siteConfig.servicesBlurb,
    siteName: siteConfig.name,
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle(),
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
