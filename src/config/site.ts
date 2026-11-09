/**
 * Human Made Logic — global site identity, navigation helpers and metadata defaults.
 */

export type NavItem = {
  label: string;
  href: string;
  hint?: string;
};

export type CallToAction = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export type SiteConfig = {
  name: string;
  titleSuffix: string;
  tagline: string;
  coverLine: string;
  description: string;
  servicesBlurb: string;
  url: string;
  locale: string;
  contactEmail: string;
  legalName: string;
  /** ICP regions for structured data and llms.txt */
  markets: string[];
  /** Legacy template shell — unused on HML routes */
  announcementBar: { label: string; href: string } | null;
  nav: NavItem[];
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
  builtByLabel: string;
};

export const footerColumns: FooterColumn[] = [
  {
    title: 'Services',
    links: [
      { label: 'Branding', href: '/services/branding' },
      { label: 'SEO/AEO/GEO', href: '/services/seo-aeo-geo' },
      { label: 'Performance marketing', href: '/services/performance-marketing' },
      { label: 'Social media', href: '/services/social-media' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export const siteConfig: SiteConfig = {
  name: 'Human Made Logic',
  titleSuffix: 'Human Made Logic',
  tagline:
    'We make brands impossible to ignore, with identities built for people, screens, and algorithms.',
  coverLine: 'Impossible to ignore. Built to be chosen.',
  servicesBlurb:
    'Branding, SEO/AEO/GEO, Performance marketing, and Social Media for SMB founders and marketing leads in the UK, Australia, Canada, and Singapore. Take the full package or pick what you need. We build brands people remember, search engines and AI answers can find, and campaigns that turn attention into measurable growth. AI speeds up the research and the drafts. People make the calls.',
  description:
    'Human Made Logic is a branding and performance marketing agency for SMB founders and marketing leads in the UK, Australia, Canada, and Singapore. Branding, SEO/AEO/GEO, performance marketing, and social media.',
  url: 'https://humanmadelogic.com',
  locale: 'en-GB',
  contactEmail: 'info@humanmadelogic.fun',
  legalName: 'Human Made Logic',
  markets: ['United Kingdom', 'Australia', 'Canada', 'Singapore'],
  announcementBar: null,
  nav: [
    { label: 'Services', href: '/#services' },
    { label: 'Contact', href: '/contact' },
  ],
  primaryCta: { label: 'Start a project', href: '/contact' },
  secondaryCta: { label: 'Contact', href: '/contact' },
  builtByLabel: 'Human Made Logic',
};
