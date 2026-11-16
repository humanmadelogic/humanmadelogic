import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { KitDetailView } from '@/components/hml/KitDetailView';
import { KitStructuredData } from '@/components/hml/KitStructuredData';
import { kitSlugs, kits, type KitSlug } from '@/config/kits';
import { resolveKitOgImage } from '@/lib/hml/kitOg';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { pageTitleFromCopy } from '@/lib/hml/seoCopyMeta';
import { buildMetadata } from '@/lib/seo';

const COPY_FILE: Record<KitSlug, { file: string; prefix: string }> = {
  'launch-kit': { file: 'launch-kit.json', prefix: 'LK' },
  'authority-kit': { file: 'authority-kit.json', prefix: 'AK' },
  'local-domination-kit': { file: 'local-domination-kit.json', prefix: 'LDK' },
};

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return kitSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const slug = params.slug as KitSlug;
  if (!kitSlugs.includes(slug)) {
    return buildMetadata({ title: 'Kit not found', description: '', path: `/kits/${params.slug}`, noindex: true });
  }
  const { file, prefix } = COPY_FILE[slug];
  const copy = loadCopyMap(file);
  return buildMetadata({
    title: pageTitleFromCopy(copy[`${prefix}-META-TITLE`]),
    description: copy[`${prefix}-META-DESC`],
    path: `/kits/${slug}`,
    ogImage: resolveKitOgImage(slug),
  });
}

export default function KitPage({ params }: PageProps) {
  const slug = params.slug as KitSlug;
  if (!kits[slug]) notFound();

  return (
    <HmlPageShell>
      <KitStructuredData slug={slug} />
      <KitDetailView slug={slug} />
    </HmlPageShell>
  );
}