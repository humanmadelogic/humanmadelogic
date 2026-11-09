import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { ServiceStructuredData } from '@/components/hml/ServiceStructuredData';
import { ServiceView } from '@/components/hml/ServiceView';
import { getService, serviceSlugs } from '@/config/services';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getService(params.slug);
  if (!service) {
    return buildMetadata({
      title: 'Service not found',
      description: 'This service page could not be found.',
      path: `/services/${params.slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
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
