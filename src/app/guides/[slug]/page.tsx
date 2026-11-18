import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GuideArticleView } from '@/components/hml/GuideArticleView';
import { GuideStructuredData } from '@/components/hml/GuideStructuredData';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { guideBySlug, indexableGuides } from '@/config/guides';
import type { GuideDefinition } from '@/config/guides/types';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { pageTitleFromCopy } from '@/lib/hml/seoCopyMeta';
import { buildMetadata } from '@/lib/seo';

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return indexableGuides().map((guide) => ({ slug: guide.slug }));
}

function getGuide(slug: string): GuideDefinition | undefined {
  return guideBySlug[slug];
}

export function generateMetadata({ params }: PageProps): Metadata {
  const guide = getGuide(params.slug);
  if (!guide) {
    return buildMetadata({ title: 'Guide not found', description: '', path: `/guides/${params.slug}`, noindex: true });
  }
  const copy = loadCopyMap(guide.copyFile);
  return buildMetadata({
    title: pageTitleFromCopy(copy[`${guide.prefix}-META-TITLE`]),
    description: copy[`${guide.prefix}-META-DESC`],
    path: `/guides/${guide.slug}`,
    type: 'article',
    publishedTime: guide.publishedAt,
    noindex: Boolean(guide.draft),
    ogImage: guide.ogImage,
  });
}

export default function GuidePage({ params }: PageProps) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  return (
    <HmlPageShell>
      <GuideStructuredData guide={guide} />
      <GuideArticleView guide={guide} />
    </HmlPageShell>
  );
}