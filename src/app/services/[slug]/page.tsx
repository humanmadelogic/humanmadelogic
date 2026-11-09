import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { ServiceStructuredData } from '@/components/hml/ServiceStructuredData';
import { ServiceView } from '@/components/hml/ServiceView';
import { agency } from '@/config/agency';
import { getService, serviceSlugs } from '@/config/services';
import { siteConfig } from '@/config/site';

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getService(params.slug);
  if (!service) return { title: 'Service not found' };

  const title = `${service.title} — ${agency.name}`;
  const url = `/services/${service.slug}`;

  return {
    title,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title,
      description: service.metaDescription,
      url: new URL(url, siteConfig.url).toString(),
      siteName: agency.name,
      locale: siteConfig.locale.replace('-', '_'),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: service.metaDescription,
    },
  };
}

export default function ServicePage({ params }: PageProps) {
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <HmlPageShell>
      <ServiceStructuredData service={service} />
      <ServiceView service={service} />
    </HmlPageShell>
  );
}
