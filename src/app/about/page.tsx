import type { Metadata } from 'next';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { AboutView } from '@/components/hml/AboutView';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: siteConfig.description,
  path: '/about',
});

export default function AboutPage() {
  return (
    <HmlPageShell>
      <AboutView />
    </HmlPageShell>
  );
}
