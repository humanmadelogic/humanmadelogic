import type { Metadata } from 'next';
import { HmlLegalPage } from '@/components/hml/HmlLegalPage';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { privacyPage } from '@/config/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy policy',
  description: privacyPage.intro,
  path: '/privacy',
});

export default function Privacy() {
  return (
    <HmlPageShell>
      <HmlLegalPage page={privacyPage} />
    </HmlPageShell>
  );
}
