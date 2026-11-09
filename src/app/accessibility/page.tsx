import type { Metadata } from 'next';
import { HmlLegalPage } from '@/components/hml/HmlLegalPage';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { homePage } from '@/config/agency';
import { accessibilityPage } from '@/config/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Accessibility statement',
  description: accessibilityPage.intro,
  path: '/accessibility',
  ogImage: homePage.meta.ogImage,
});

export default function Accessibility() {
  return (
    <HmlPageShell>
      <HmlLegalPage page={accessibilityPage} />
    </HmlPageShell>
  );
}
