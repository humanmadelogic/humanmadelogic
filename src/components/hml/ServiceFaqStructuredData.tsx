import type { ServiceExpandedFaqItem } from '@/config/services';
import { siteConfig } from '@/config/site';

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

  const graph = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteConfig.url}${path}#faq`,
    mainEntity,
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}
