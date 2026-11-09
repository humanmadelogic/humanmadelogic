import type { Metadata } from 'next';
import { ContactView } from '@/components/hml/ContactView';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { contact, homePage } from '@/config/agency';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description: contact.body,
  path: '/contact',
  ogImage: homePage.meta.ogImage,
});

export default function ContactPage() {
  return (
    <HmlPageShell>
      <ContactView />
    </HmlPageShell>
  );
}
