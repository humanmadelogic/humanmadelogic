import type { Metadata } from 'next';
import { Suspense } from 'react';
import { JsonLd } from '@/components/hml/JsonLd';
import { ContactView } from '@/components/hml/ContactView';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { contact, homePage } from '@/config/agency';
import { contactPageGraph } from '@/lib/schema';
import { buildMetadata, siteTitle } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description: contact.body,
  path: '/contact',
  ogImage: homePage.meta.ogImage,
});

export default function ContactPage() {
  return (
    <HmlPageShell>
      <JsonLd
        data={contactPageGraph({
          name: siteTitle('Contact'),
          description: contact.body,
        })}
      />
      <Suspense fallback={null}>
        <ContactView />
      </Suspense>
    </HmlPageShell>
  );
}
