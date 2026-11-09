/**
 * Service detail pages. Approved service names; body copy is placeholder unless noted.
 */

import type { CapabilityVisualKind } from './agency';

export type ServiceSlug =
  | 'branding'
  | 'seo-aeo-geo'
  | 'performance-marketing'
  | 'social-media';

export type ServiceDefinition = {
  slug: ServiceSlug;
  index: string;
  title: string;
  shortTitle: string;
  /** Homepage card summary */
  summary: string;
  /** Longer page intro — mostly placeholder */
  intro: string;
  visual: CapabilityVisualKind;
  /** Placeholder bullets for the content team */
  deliverables: string[];
  /** Placeholder FAQ-style points */
  outcomes: string[];
  metaDescription: string;
};

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
    shortTitle: 'Branding',
    summary:
      'Identity, positioning, and visual systems built to be remembered on shelf, on screen, and in search.',
    intro:
      // PLACEHOLDER COPY: pending content team
      'Brand strategy, naming, identity design, and guidelines shaped around how real customers choose in your category.',
    visual: 'letterforms',
    deliverables: [
      // PLACEHOLDER COPY: pending content team
      'Positioning and messaging architecture',
      'Visual identity and asset libraries',
      'Brand guidelines your team can use every day',
    ],
    outcomes: [
      // PLACEHOLDER COPY: pending content team
      'A distinctive look and voice that scales across channels',
      'Creative decisions that stay aligned as you grow',
    ],
    metaDescription:
      'Branding for SMB founders and marketing leads: strategy, identity systems, and guidelines from Human Made Logic.',
  },
  'seo-aeo-geo': {
    slug: 'seo-aeo-geo',
    index: '02',
    title: 'SEO, AEO and GEO',
    shortTitle: 'SEO/AEO/GEO',
    summary:
      'Search, answer engines, and generative discovery tuned so your brand shows up where buyers look and ask.',
    intro:
      // PLACEHOLDER COPY: pending content team
      'Technical SEO, content architecture, and structured data so classic search, AI answers, and generative experiences can surface what you sell.',
    visual: 'signal',
    deliverables: [
      // PLACEHOLDER COPY: pending content team
      'Search and entity audits',
      'On-page optimisation and schema',
      'Content briefs aligned to intent',
    ],
    outcomes: [
      // PLACEHOLDER COPY: pending content team
      'Clear paths from discovery to product pages',
      'Measurement that ties rankings to commercial goals',
    ],
    metaDescription:
      'SEO, AEO, and GEO for growing brands: discoverability across search and AI answers from Human Made Logic.',
  },
  'performance-marketing': {
    slug: 'performance-marketing',
    index: '03',
    title: 'Performance marketing',
    shortTitle: 'Performance',
    summary:
      'Paid media and experimentation that connects creative ideas to dashboards your leadership trusts.',
    intro:
      // PLACEHOLDER COPY: pending content team
      'Channel strategy, campaign build, and iterative testing with creative that matches your brand, not a generic template.',
    visual: 'contact-sheet',
    deliverables: [
      // PLACEHOLDER COPY: pending content team
      'Media planning and budget modelling',
      'Ad creative and landing experiences',
      'Reporting tied to revenue or qualified pipeline',
    ],
    outcomes: [
      // PLACEHOLDER COPY: pending content team
      'Campaigns you can explain to the board in one slide',
      'Learning loops between brand and performance teams',
    ],
    metaDescription:
      'Performance marketing for SMB teams: paid media, testing, and measurement from Human Made Logic.',
  },
  'social-media': {
    slug: 'social-media',
    index: '04',
    title: 'Social media',
    shortTitle: 'Social',
    summary:
      'Editorial rhythm, platform-native creative, and community care that keeps your brand in the conversation.',
    intro:
      // PLACEHOLDER COPY: pending content team
      'Content calendars, production support, and channel playbooks so social feels intentional, not improvised.',
    visual: 'modules',
    deliverables: [
      // PLACEHOLDER COPY: pending content team
      'Platform strategy and content pillars',
      'Asset templates and caption frameworks',
      'Publishing workflows your team can run',
    ],
    outcomes: [
      // PLACEHOLDER COPY: pending content team
      'A consistent presence without burning out the founder',
      'Creative that still feels human when AI assists the drafts',
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
