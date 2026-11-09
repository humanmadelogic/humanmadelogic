import type { ServiceDefinition } from '@/config/services';
import { agency } from '@/config/agency';
import { siteConfig } from '@/config/site';

export function ServiceStructuredData({ service }: { service: ServiceDefinition }) {
  const url = `${siteConfig.url}/services/${service.slug}`;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.title,
        description: service.metaDescription,
        provider: { '@id': `${siteConfig.url}/#organization` },
        areaServed: siteConfig.markets,
        url,
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${service.title} | ${agency.name}`,
        isPartOf: { '@id': `${siteConfig.url}/#website` },
        about: { '@id': `${url}#service` },
        inLanguage: siteConfig.locale,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
