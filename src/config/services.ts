/**
 * Service detail pages.
 */

import type { CapabilityVisualKind } from './agency';
import { siteConfig } from './site';

export type ServiceSlug =
  | 'branding'
  | 'seo-aeo-geo'
  | 'performance-marketing'
  | 'social-media';

export type ServiceDefinition = {
  slug: ServiceSlug;
  index: string;
  title: string;
  /** Short document title segment for `buildMetadata` (usually same as `title`). */
  metaTitle: string;
  shortTitle: string;
  /** Homepage card summary */
  summary: string;
  intro: string;
  visual: CapabilityVisualKind;
  deliverables: string[];
  outcomes: string[];
  metaDescription: string;
  ogImage: string;
};

/** Copy and metadata for `/services`. */
export const servicesIndex = {
  metaTitle: 'Services',
  metaDescription: siteConfig.servicesBlurb,
  ogImage: '/og/og-services.png',
  eyebrow: 'Services',
  viewServiceLabel: 'View service',
} as const;

/** Shared labels on each `/services/[slug]` page. */
export const servicePage = {
  eyebrowSuffix: 'Service',
  deliverablesHeading: 'What we deliver',
  outcomesHeading: 'What you gain',
  allServicesLabel: 'All services',
  allServicesHref: '/services',
  notFound: {
    metaTitle: 'Service not found',
    metaDescription: 'This service page could not be found.',
  },
} as const;

export const serviceSlugs: ServiceSlug[] = [
  'branding',
  'seo-aeo-geo',
  'performance-marketing',
  'social-media',
];

export const services: Record<ServiceSlug, ServiceDefinition> = {
  branding: {
    slug: 'branding',
    index: '01',
    title: 'Branding',
    metaTitle: 'Branding',
    shortTitle: 'Branding',
    ogImage: '/og/services/og-branding.png',
    summary:
      'Identity, positioning, and visual systems built to be remembered on shelf, on screen, and in search.',
    intro:
      "Most small brands don't have a visibility problem. They have a memory problem: people see them, then forget them, because they look like everyone else in the category. We build brands around distinctive codes people recognise at a glance, so every post and every ad starts adding up.",
    visual: 'letterforms',
    deliverables: [
      'Brand strategy and positioning: what you stand for, who it\'s for and why you\'re different.',
      'A brand identity system: logo, colour, type and the rules that hold it together.',
      'A brand codes guide: the shapes, words and habits customers should remember you by.',
    ],
    outcomes: [
      'Clarity on what your brand stands for, so every decision, from your homepage to your next ad, pulls the same way.',
      'A recognisable system your team can use consistently, so you stop reinventing your look every time you launch something.',
    ],
    metaDescription:
      'Branding for SMB founders and marketing leads: strategy, identity systems, and guidelines from Human Made Logic.',
  },
  'seo-aeo-geo': {
    slug: 'seo-aeo-geo',
    index: '02',
    title: 'SEO, AEO and GEO',
    metaTitle: 'SEO, AEO and GEO',
    shortTitle: 'SEO/AEO/GEO',
    ogImage: '/og/services/og-seo-aeo-geo.png',
    summary:
      'Search, answer engines, and generative discovery tuned so your brand shows up where buyers look and ask.',
    intro:
      "Page two isn't the only place brands disappear. Customers now ask AI tools for recommendations too, and if your name isn't in the answer, you're not in the running. We make your brand easy to find and easy to name, across search engines and AI answers.",
    visual: 'signal',
    deliverables: [
      "A search and AI visibility audit: where you're found, where you're missed and why.",
      'Site structure and on-page SEO that help search engines understand what you do and where.',
      'Answer-ready content for AEO and GEO, written to help AI tools understand and mention your brand.',
    ],
    outcomes: [
      "A clear view of how people find you today, plus a plan for the searches and questions your brand should own.",
      'Pages and content built to be found and named, in search results and in the AI answers your customers read.',
    ],
    metaDescription:
      'SEO, AEO, and GEO for growing brands: discoverability across search and AI answers from Human Made Logic.',
  },
  'performance-marketing': {
    slug: 'performance-marketing',
    index: '03',
    title: 'Performance marketing',
    metaTitle: 'Performance marketing',
    shortTitle: 'Performance',
    ogImage: '/og/services/og-performance-marketing.png',
    summary:
      'Paid media and experimentation that connects creative ideas to dashboards your leadership trusts.',
    intro:
      "Plenty of ad budgets buy attention nobody keeps. The ads look like the category, the landing page is fuzzy, and the spend resets every month. We run campaigns that turn attention into measurable growth, with creative people remember and a next step that doesn't leak.",
    visual: 'contact-sheet',
    deliverables: [
      'Campaign strategy across the paid channels that suit your audience, budget and goals.',
      "Ad creative built on your brand codes, so it doesn't look like everyone else's.",
      'Landing pages and conversion fixes that give every click a clear next step.',
    ],
    outcomes: [
      "Campaigns you can measure properly, with clear reporting on what's working, what isn't and what we'll test next.",
      'Ads that build recognition as well as clicks, so each campaign gives the next one a head start.',
    ],
    metaDescription:
      'Performance marketing for SMB teams: paid media, testing, and measurement from Human Made Logic.',
  },
  'social-media': {
    slug: 'social-media',
    index: '04',
    title: 'Social media',
    metaTitle: 'Social media',
    shortTitle: 'Social',
    ogImage: '/og/services/og-social-media.png',
    summary:
      'Editorial rhythm, platform-native creative, and community care that keeps your brand in the conversation.',
    intro:
      "Posting more isn't the same as being remembered. Bursts of content followed by silence teach your audience nothing. We build social presences that are fewer, better and easy to recognise: a clear voice, ideas worth repeating and a rhythm your team can actually keep up with.",
    visual: 'modules',
    deliverables: [
      'A social strategy: the few ideas, formats and channels actually worth your time.',
      'A recognisable content system: templates, voice rules and visual codes every post is built on.',
      'A steady posting calendar with written posts and creative, planned around a rhythm you can sustain.',
    ],
    outcomes: [
      'A social presence people recognise before they read your name, built on ideas worth repeating rather than trends.',
      'A rhythm you can keep up with, so social stops feeling like a hamster wheel and starts compounding.',
    ],
    metaDescription:
      'Social media strategy and content systems for growing brands from Human Made Logic.',
  },
};

export function getService(slug: string): ServiceDefinition | undefined {
  if (serviceSlugs.includes(slug as ServiceSlug)) {
    return services[slug as ServiceSlug];
  }
  return undefined;
}
