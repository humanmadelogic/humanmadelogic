import type { Metadata } from 'next';
import { HomePage } from '@/components/hml/HomePage';
import { StructuredData } from '@/components/hml/StructuredData';
import { homePage } from '@/config/agency';
import { siteConfig } from '@/config/site';
import { buildMetadata, homeTitle } from '@/lib/seo';

const homeMeta = buildMetadata({
  title: siteConfig.coverLine,
  description: homePage.meta.description,
  path: '/',
  ogImage: homePage.meta.ogImage,
});

export const metadata: Metadata = {
  ...homeMeta,
  title: { absolute: homeTitle() },
  openGraph: {
    ...homeMeta.openGraph,
    title: homeTitle(),
  },
  twitter: {
    ...homeMeta.twitter,
    title: homeTitle(),
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
