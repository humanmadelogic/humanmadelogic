import type { ServiceExpandedFaqItem } from '@/config/services';
import { canonicalUrl } from '@/lib/schema';
import { JsonLd } from './JsonLd';

type Props = {
  items: ServiceExpandedFaqItem[];
  path: string;
};

export function ServiceFaqStructuredData({ items, path }: Props) {
  const mainEntity = items
    .filter((item) => item.question.trim() && item.answer.trim())
    .map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }));

  if (mainEntity.length === 0) return null;

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${canonicalUrl(path)}#faq`,
        mainEntity,
      }}
    />
  );
}
