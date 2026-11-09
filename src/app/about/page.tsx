import type { Metadata } from 'next';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { AboutView } from '@/components/hml/AboutView';
import { aboutPage } from '@/config/agency';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: aboutPage.meta.title,
  description: aboutPage.meta.description,
  path: '/about',
  ogImage: aboutPage.meta.ogImage,
});

export default function AboutPage() {
  return (
    <HmlPageShell>
      <AboutView />
    </HmlPageShell>
  );
}
