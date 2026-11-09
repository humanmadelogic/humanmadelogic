import type { Metadata } from 'next';
import { HmlLegalPage } from '@/components/hml/HmlLegalPage';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { cookiePage } from '@/config/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Cookie policy',
  description: cookiePage.intro,
  path: '/cookies',
});

export default function Cookies() {
  return (
    <HmlPageShell>
      <HmlLegalPage page={cookiePage} />
    </HmlPageShell>
  );
}
