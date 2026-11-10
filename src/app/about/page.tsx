import type { Metadata } from 'next';
import { JsonLd } from '@/components/hml/JsonLd';
import { AboutView } from '@/components/hml/AboutView';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { aboutPage } from '@/config/agency';
import { aboutPageGraph } from '@/lib/schema';
import { buildMetadata, siteTitle } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: aboutPage.meta.title,
  description: aboutPage.meta.description,
  path: '/about',
  ogImage: aboutPage.meta.ogImage,
});

export default function AboutPage() {
  return (
    <HmlPageShell>
      <JsonLd
        data={aboutPageGraph({
          name: siteTitle(aboutPage.meta.title),
          description: aboutPage.meta.description,
        })}
      />
      <AboutView />
    </HmlPageShell>
  );
}
