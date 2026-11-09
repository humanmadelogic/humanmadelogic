import type { Metadata } from 'next';
import { HmlLegalPage } from '@/components/hml/HmlLegalPage';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { homePage } from '@/config/agency';
import { companyPage } from '@/config/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Company information',
  description: companyPage.intro,
  path: '/legal',
  ogImage: homePage.meta.ogImage,
});

export default function CompanyLegal() {
  return (
    <HmlPageShell>
      <HmlLegalPage page={companyPage} path="/legal" />
    </HmlPageShell>
  );
}
