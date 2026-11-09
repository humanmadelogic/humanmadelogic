import { agency, capabilities } from '@/config/agency';
import { siteConfig } from '@/config/site';

/**
 * JSON-LD for the homepage: Organization, WebSite, WebPage, and Service offers.
 */
export function StructuredData() {
  const url = siteConfig.url;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${url}/#organization`,
        name: agency.name,
        alternateName: agency.shortName,
        url,
        email: agency.email,
        slogan: agency.tagline,
        description: siteConfig.description,
        logo: { '@type': 'ImageObject', url: `${url}/icon.svg` },
        image: `${url}/og/og-default.png`,
        areaServed: siteConfig.markets,
        knowsAbout: capabilities.items.map((item) => item.title),
        makesOffer: capabilities.items.map((item) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: item.title,
            description: item.body,
            url: new URL(item.href, url).toString(),
          },
        })),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: agency.email,
          availableLanguage: 'English',
          areaServed: siteConfig.markets,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url,
        name: agency.name,
        description: siteConfig.description,
        publisher: { '@id': `${url}/#organization` },
        inLanguage: siteConfig.locale,
      },
      {
        '@type': 'WebPage',
        '@id': `${url}/#webpage`,
        url,
        name: `${siteConfig.coverLine} | ${agency.name}`,
        isPartOf: { '@id': `${url}/#website` },
        about: { '@id': `${url}/#organization` },
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
