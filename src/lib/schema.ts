import { serviceSlugs, services, type ServiceDefinition, type ServiceSlug } from '@/config/services';
import { siteConfig } from '@/config/site';

export const ORG_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;
export const LOGO_ID = `${siteConfig.url}/#logo`;
export const FOUNDER_ID = `${siteConfig.url}/#founder`;
export const AUTHOR_ROWAN_ID = `${siteConfig.url}/#author-rowan-blake`;

const FOUNDER_NAME = 'Kuntal Khanapurkar';
const AUTHOR_ROWAN_NAME = 'Rowan Blake';

export function canonicalUrl(path: string): string {
  if (path === '/' || path === '') return siteConfig.url;
  return new URL(path.startsWith('/') ? path : `/${path}`, siteConfig.url).toString();
}

export function pageId(path: string, fragment = 'webpage'): string {
  const base = canonicalUrl(path);
  return path === '/' ? `${siteConfig.url}/#${fragment}` : `${base}#${fragment}`;
}

const KNOWS_ABOUT = [
  'Branding',
  'Search engine optimisation',
  'Answer engine optimisation',
  'Generative engine optimisation',
  'Performance marketing',
  'Social media marketing',
] as const;

const AREA_SERVED_COUNTRIES = siteConfig.markets.map((name) => ({
  '@type': 'Country' as const,
  name,
}));

const AREA_SERVED_ISO = ['GB', 'AU', 'CA', 'SG'];

const SERVICE_TYPE: Record<ServiceSlug, string> = {
  branding: 'Branding',
  'seo-aeo-geo': 'Search engine, answer engine and generative engine optimisation',
  'performance-marketing': 'Performance marketing',
  'social-media': 'Social media marketing',
};

export function linkedInSameAs(): string[] {
  return ['https://www.linkedin.com/company/human-made-logic/'];
}

export function founderPersonNode() {
  return {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: FOUNDER_NAME,
    jobTitle: 'Founder',
    worksFor: { '@id': ORG_ID },
  };
}

/** Pen-name author for guides (no url or sameAs). */
export function authorRowanBlakeNode() {
  return {
    '@type': 'Person',
    '@id': AUTHOR_ROWAN_ID,
    name: AUTHOR_ROWAN_NAME,
  };
}

type KitOfferSource = {
  slug: string;
  title: string;
};

function serviceOfferEntries() {
  return serviceSlugs.map((slug) => {
    const svc = services[slug];
    const url = canonicalUrl(`/services/${slug}`);
    return {
      '@type': 'Offer' as const,
      itemOffered: {
        '@type': 'Service' as const,
        '@id': `${url}#service`,
        name: svc.title,
        url,
      },
    };
  });
}

function kitOfferEntries(kits: KitOfferSource[]) {
  return kits.map((kit) => {
    const url = canonicalUrl(`/kits/${kit.slug}`);
    return {
      '@type': 'Offer' as const,
      itemOffered: {
        '@type': 'Service' as const,
        '@id': `${url}#service`,
        name: kit.title,
        url,
      },
    };
  });
}

export function organizationNode(options?: { kitOffers?: KitOfferSource[] }) {
  const makesOffer = [...serviceOfferEntries(), ...(options?.kitOffers ? kitOfferEntries(options.kitOffers) : [])];

  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: 'HML',
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    founder: { '@id': FOUNDER_ID },
    email: siteConfig.contactEmail,
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID,
      url: `${siteConfig.url}/apple-icon.png`,
      contentUrl: `${siteConfig.url}/apple-icon.png`,
      width: 180,
      height: 180,
      caption: siteConfig.name,
    },
    image: { '@id': LOGO_ID },
    sameAs: linkedInSameAs(),
    areaServed: AREA_SERVED_COUNTRIES,
    knowsAbout: [...KNOWS_ABOUT],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: siteConfig.contactEmail,
      availableLanguage: ['English'],
      areaServed: AREA_SERVED_ISO,
    },
    makesOffer,
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    alternateName: 'HML',
    description: siteConfig.description,
    publisher: { '@id': ORG_ID },
    inLanguage: siteConfig.locale,
  };
}

export function siteGraph(options?: { kitOffers?: KitOfferSource[] }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationNode(options), websiteNode(), founderPersonNode()],
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbNode(path: string, crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': pageId(path, 'breadcrumb'),
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: canonicalUrl(crumb.path),
    })),
  };
}

export function homeWebPageGraph({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageId('/', 'webpage'),
    url: siteConfig.url,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/og/og-default.png`,
      width: 1200,
      height: 630,
    },
    inLanguage: siteConfig.locale,
  };
}

export function aboutPageGraph({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const path = '/about';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': pageId(path, 'webpage'),
        url: canonicalUrl(path),
        name,
        description,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        mainEntity: { '@id': ORG_ID },
        breadcrumb: { '@id': pageId(path, 'breadcrumb') },
        inLanguage: siteConfig.locale,
      },
      breadcrumbNode(path, [
        { name: 'Home', path: '/' },
        { name: 'About', path },
      ]),
    ],
  };
}

export function contactPageGraph({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const path = '/contact';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': pageId(path, 'webpage'),
        url: canonicalUrl(path),
        name,
        description,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        mainEntity: { '@id': ORG_ID },
        breadcrumb: { '@id': pageId(path, 'breadcrumb') },
        inLanguage: siteConfig.locale,
      },
      breadcrumbNode(path, [
        { name: 'Home', path: '/' },
        { name: 'Contact', path },
      ]),
    ],
  };
}

export function servicesHubGraph({
  name,
  description,
}: {
  name: string;
  description?: string;
}) {
  const path = '/services';
  const itemListId = `${canonicalUrl(path)}#itemlist`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': pageId(path, 'webpage'),
        url: canonicalUrl(path),
        name,
        ...(description ? { description } : {}),
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        mainEntity: { '@id': itemListId },
        breadcrumb: { '@id': pageId(path, 'breadcrumb') },
        inLanguage: siteConfig.locale,
      },
      {
        '@type': 'ItemList',
        '@id': itemListId,
        itemListElement: serviceSlugs.map((slug, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: services[slug].title,
          url: canonicalUrl(`/services/${slug}`),
        })),
      },
      breadcrumbNode(path, [
        { name: 'Home', path: '/' },
        { name: 'Services', path },
      ]),
    ],
  };
}

export function servicePageGraph(service: ServiceDefinition) {
  const path = `/services/${service.slug}`;
  const url = canonicalUrl(path);
  const webPageName = `${service.metaTitle} | ${siteConfig.name}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.title,
        serviceType: SERVICE_TYPE[service.slug],
        description: service.metaDescription,
        url,
        provider: { '@id': ORG_ID },
        areaServed: AREA_SERVED_COUNTRIES,
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'SMB founders and marketing leads',
        },
      },
      {
        '@type': 'WebPage',
        '@id': pageId(path, 'webpage'),
        url,
        name: webPageName,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': `${url}#service` },
        breadcrumb: { '@id': pageId(path, 'breadcrumb') },
        inLanguage: siteConfig.locale,
      },
      breadcrumbNode(path, [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: service.title, path },
      ]),
    ],
  };
}

export function legalWebPageGraph({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description?: string;
}) {
  const safeDescription =
    description && !/PLACEHOLDER/i.test(description) ? description : undefined;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageId(path, 'webpage'),
        url: canonicalUrl(path),
        name,
        ...(safeDescription ? { description: safeDescription } : {}),
        isPartOf: { '@id': WEBSITE_ID },
        publisher: { '@id': ORG_ID },
        breadcrumb: { '@id': pageId(path, 'breadcrumb') },
        inLanguage: siteConfig.locale,
      },
      breadcrumbNode(path, [
        { name: 'Home', path: '/' },
        { name, path },
      ]),
    ],
  };
}

export type KitDefinition = {
  slug: string;
  title: string;
  serviceType: string;
  metaDescription: string;
  metaTitle: string;
  relatedServiceSlugs: ServiceSlug[];
};

export function kitsHubGraph({
  name,
  description,
  kits,
}: {
  name: string;
  description?: string;
  kits: KitDefinition[];
}) {
  const path = '/kits';
  const itemListId = `${canonicalUrl(path)}#itemlist`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': pageId(path, 'webpage'),
        url: canonicalUrl(path),
        name,
        ...(description ? { description } : {}),
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        mainEntity: { '@id': itemListId },
        breadcrumb: { '@id': pageId(path, 'breadcrumb') },
        inLanguage: siteConfig.locale,
      },
      {
        '@type': 'ItemList',
        '@id': itemListId,
        itemListElement: kits.map((kit, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: kit.title,
          url: canonicalUrl(`/kits/${kit.slug}`),
        })),
      },
      breadcrumbNode(path, [
        { name: 'Home', path: '/' },
        { name: 'Kits', path },
      ]),
    ],
  };
}

export function kitPageGraph(kit: KitDefinition) {
  const path = `/kits/${kit.slug}`;
  const url = canonicalUrl(path);
  const webPageName = `${kit.metaTitle} | ${siteConfig.name}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: kit.title,
        serviceType: kit.serviceType,
        description: kit.metaDescription,
        url,
        provider: { '@id': ORG_ID },
        areaServed: AREA_SERVED_COUNTRIES,
        isRelatedTo: kit.relatedServiceSlugs.map((slug) => ({
          '@id': `${canonicalUrl(`/services/${slug}`)}#service`,
        })),
      },
      {
        '@type': 'WebPage',
        '@id': pageId(path, 'webpage'),
        url,
        name: webPageName,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': `${url}#service` },
        breadcrumb: { '@id': pageId(path, 'breadcrumb') },
        inLanguage: siteConfig.locale,
      },
      breadcrumbNode(path, [
        { name: 'Home', path: '/' },
        { name: 'Kits', path: '/kits' },
        { name: kit.title, path },
      ]),
    ],
  };
}

export type GuideListItem = {
  slug: string;
  title: string;
};

export function guidesHubGraph({
  name,
  description,
  guides,
}: {
  name: string;
  description?: string;
  guides: GuideListItem[];
}) {
  const path = '/guides';
  const itemListId = `${canonicalUrl(path)}#itemlist`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': pageId(path, 'webpage'),
        url: canonicalUrl(path),
        name,
        ...(description ? { description } : {}),
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        mainEntity: { '@id': itemListId },
        breadcrumb: { '@id': pageId(path, 'breadcrumb') },
        inLanguage: siteConfig.locale,
      },
      {
        '@type': 'ItemList',
        '@id': itemListId,
        itemListElement: guides.map((guide, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: guide.title,
          url: canonicalUrl(`/guides/${guide.slug}`),
        })),
      },
      breadcrumbNode(path, [
        { name: 'Home', path: '/' },
        { name: 'Guides', path },
      ]),
    ],
  };
}

export function guideArticleGraph({
  slug,
  headline,
  description,
  imageUrl,
  datePublished,
  dateModified,
  webPageTitle,
  breadcrumbTitle,
  lastReviewed,
  about,
}: {
  slug: string;
  headline: string;
  description: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
  webPageTitle: string;
  breadcrumbTitle: string;
  lastReviewed: string;
  about?: { name: string }[];
}) {
  const path = `/guides/${slug}`;
  const url = canonicalUrl(path);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      authorRowanBlakeNode(),
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline,
        description,
        image: [imageUrl],
        datePublished,
        dateModified,
        author: { '@id': AUTHOR_ROWAN_ID },
        publisher: { '@id': ORG_ID },
        mainEntityOfPage: { '@id': pageId(path, 'webpage') },
        isPartOf: { '@id': WEBSITE_ID },
        ...(about?.length
          ? { about: about.map((item) => ({ '@type': 'Thing' as const, name: item.name })) }
          : {}),
        inLanguage: siteConfig.locale,
      },
      {
        '@type': 'WebPage',
        '@id': pageId(path, 'webpage'),
        url,
        name: webPageTitle,
        isPartOf: { '@id': WEBSITE_ID },
        reviewedBy: { '@id': FOUNDER_ID },
        lastReviewed,
        breadcrumb: { '@id': pageId(path, 'breadcrumb') },
        inLanguage: siteConfig.locale,
      },
      breadcrumbNode(path, [
        { name: 'Home', path: '/' },
        { name: 'Guides', path: '/guides' },
        { name: breadcrumbTitle, path },
      ]),
    ],
  };
}
