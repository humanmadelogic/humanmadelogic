import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { ServiceStructuredData } from '@/components/hml/ServiceStructuredData';
import { ServiceFaqStructuredData } from '@/components/hml/ServiceFaqStructuredData';
import { ServiceView } from '@/components/hml/ServiceView';
import { getService, servicePage, serviceSlugs } from '@/config/services';
import { resolveServiceOgImage } from '@/lib/hml/serviceOg';
import { isFaqPopulated } from '@/lib/hml/serviceExpanded';
import { buildMetadata } from '@/lib/seo';

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getService(params.slug);
  if (!service) {
    return buildMetadata({
      title: servicePage.notFound.metaTitle,
      description: servicePage.notFound.metaDescription,
      path: `/services/${params.slug}`,
      noindex: true,
    });
  }

  const ogImage = resolveServiceOgImage(
    service.slug,
    service.ogImage,
    service.expanded.ogImage,
  );

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    ogImage,
  });
}

export default function ServicePage({ params }: PageProps) {
  const service = getService(params.slug);
  if (!service) notFound();

  const faq = service.expanded.faq;
  const faqItems =
    isFaqPopulated(faq) ?
      faq.items.filter((item) => item.question.trim() && item.answer.trim())
    : [];

  return (
    <HmlPageShell>
      <ServiceStructuredData service={service} />
      {faqItems.length > 0 ? (
        <ServiceFaqStructuredData items={faqItems} path={`/services/${service.slug}`} />
      ) : null}
      <ServiceView service={service} />
    </HmlPageShell>
  );
}
