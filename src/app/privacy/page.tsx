import type { Metadata } from 'next';
import { HmlLegalPage } from '@/components/hml/HmlLegalPage';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { homePage } from '@/config/agency';
import { privacyPage } from '@/config/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy policy',
  description: privacyPage.intro,
  path: '/privacy',
  ogImage: homePage.meta.ogImage,
});

export default function Privacy() {
  return (
    <HmlPageShell>
      <HmlLegalPage page={privacyPage} />
    </HmlPageShell>
  );
}
