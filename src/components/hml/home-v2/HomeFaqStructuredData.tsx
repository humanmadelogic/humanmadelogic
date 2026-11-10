import type { HomeV2FaqItem } from '@/config/home-v2';
import { siteConfig } from '@/config/site';
import { JsonLd } from '../JsonLd';

type Props = {
  items: HomeV2FaqItem[];
};

export function HomeFaqStructuredData({ items }: Props) {
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
        '@id': `${siteConfig.url}/#faq`,
        mainEntity,
      }}
    />
  );
}
