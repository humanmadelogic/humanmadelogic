import type { Metadata } from 'next';
import { HmlLegalPage } from '@/components/hml/HmlLegalPage';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { termsPage } from '@/config/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of use',
  description: termsPage.intro,
  path: '/terms',
});

export default function Terms() {
  return (
    <HmlPageShell>
      <HmlLegalPage page={termsPage} />
    </HmlPageShell>
  );
}
