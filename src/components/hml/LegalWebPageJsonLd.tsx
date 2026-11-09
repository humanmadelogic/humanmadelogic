import { siteConfig } from '@/config/site';

type Props = {
  path: string;
  name: string;
  description: string;
};

export function LegalWebPageJsonLd({ path, name, description }: Props) {
  const url = new URL(path, siteConfig.url).toString();
  const json = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
