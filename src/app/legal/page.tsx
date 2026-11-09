import type { Metadata } from 'next';
import { HmlLegalPage } from '@/components/hml/HmlLegalPage';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { companyPage } from '@/config/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Company information',
  description: companyPage.intro,
  path: '/legal',
});

export default function CompanyLegal() {
  return (
    <HmlPageShell>
      <HmlLegalPage page={companyPage} />
    </HmlPageShell>
  );
}
