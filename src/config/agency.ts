/**
 * Human Made Logic — homepage and shared chrome content.
 */

import type { MediaKey } from './media';
import { services, serviceSlugs, type ServiceSlug } from './services';
import { siteConfig } from './site';

export type NavLink = { label: string; href: string };

export type CapabilityVisualKind =
  | 'letterforms'
  | 'system'
  | 'cursor'
  | 'contact-sheet'
  | 'signal'
  | 'modules';

export const agency = {
  name: siteConfig.name,
  shortName: 'HML',
  principle: siteConfig.coverLine,
  tagline: siteConfig.tagline,
  email: siteConfig.contactEmail,
  // PLACEHOLDER COPY: pending content team — studio footprint line
  location: 'UK, Australia, Canada, Singapore',
  // PLACEHOLDER COPY: pending content team
  availability: 'New project enquiries open',
  nav: [
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ] as NavLink[],
  legalNav: [
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Cookie policy', href: '/cookies' },
    { label: 'Terms of use', href: '/terms' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Company information', href: '/legal' },
  ] as NavLink[],
  cta: { label: 'Start a project', href: '/contact' },
  social: [
    // PLACEHOLDER COPY: pending content team — replace hrefs when profiles are live
    { label: 'LinkedIn', href: '/contact' },
    { label: 'Instagram', href: '/contact' },
  ] as NavLink[],
} as const;

/* ------------------------------------------------------------------ hero */

export type HeroFrame = {
  media: MediaKey;
  discipline: string;
  offset: number;
  rotate: number;
  depth: number;
};

export const hero = {
  eyebrow: 'Branding and performance marketing agency',
  headline: ['Impossible to', 'ignore.'],
  subhead: siteConfig.coverLine,
  body: siteConfig.tagline,
  primaryCta: { label: 'Start a project', href: '/contact' },
  secondaryCta: { label: 'View services', href: '/services' },
  scrollHint: 'Scroll',
  frames: [
    { media: 'heroIdentity', discipline: 'Branding', offset: 4, rotate: -3.4, depth: 0.55 },
    { media: 'heroArtDirection', discipline: 'SEO/AEO/GEO', offset: -7, rotate: 2.1, depth: 0.9 },
    { media: 'heroProduct', discipline: 'Performance', offset: 2, rotate: -1.2, depth: 1.25 },
    { media: 'heroCampaign', discipline: 'Social', offset: -6, rotate: 3.1, depth: 0.9 },
  ] as HeroFrame[],
};

/* ------------------------------------------------------------- statement */

export const statement = {
  label: '/ What we do',
  lines: ['Built for people,', 'screens, and algorithms.'],
  body: siteConfig.servicesBlurb,
};

/* ---------------------------------------------------------- capabilities */

export type Capability = {
  index: string;
  slug: ServiceSlug;
  title: string;
  body: string;
  visual: CapabilityVisualKind;
  href: string;
};

export const capabilities = {
  label: '/ Services',
  heading: 'Full package or à la carte.',
  intro: siteConfig.servicesBlurb,
  items: serviceSlugs.map((slug) => {
    const service = services[slug];
    return {
      index: service.index,
      slug,
      title: service.title,
      body: service.summary,
      visual: service.visual,
      href: `/services/${slug}`,
    };
  }) as Capability[],
};

/* ----------------------------------------------------------- placeholder */

export const workPlaceholder = {
  id: 'work',
  label: '/ Client work',
  heading: 'Case studies and logos land here.',
  body:
    // PLACEHOLDER COPY: pending content team
    'This section is reserved for approved client stories, metrics, and visuals. Nothing below is real work yet.',
  note: 'Content team: replace this block when case studies are cleared for publication.',
};

/* --------------------------------------------------------------- process */

export const process = {
  label: '/ How we work',
  heading: 'Research fast. Decide together.',
  steps: [
    {
      index: '01',
      title: 'Listen',
      // PLACEHOLDER COPY: pending content team
      body: 'We map your market, margins, and momentum so creative choices stay tied to commercial reality.',
    },
    {
      index: '02',
      title: 'Frame',
      // PLACEHOLDER COPY: pending content team
      body: 'Positioning, channel priorities, and success metrics agreed before we open a single tool.',
    },
    {
      index: '03',
      title: 'Make',
      // PLACEHOLDER COPY: pending content team
      body: 'Brand, content, and campaigns produced in sprints. AI accelerates drafts; people sign off every direction.',
    },
    {
      index: '04',
      title: 'Learn',
      // PLACEHOLDER COPY: pending content team
      body: 'We read performance data with you and feed what we learn back into the next cycle.',
    },
  ],
};

/* ---------------------------------------------------------------- approach */

export const approach = {
  label: '/ Approach',
  heading: 'A creative agency with a performance spine.',
  pillars: [
    {
      title: 'People make the calls',
      // PLACEHOLDER COPY: pending content team
      body: 'AI helps us research, draft, and iterate. Strategy, taste, and accountability stay human.',
    },
    {
      title: 'Beauty that converts',
      // PLACEHOLDER COPY: pending content team
      body: 'Brand craft and media efficiency are one conversation, not two agencies passing files.',
    },
    {
      title: 'Built for your markets',
      // PLACEHOLDER COPY: pending content team
      body: `We focus on founders and marketing leads in the ${siteConfig.markets.join(', ')}. Current craft depth sits in UK DTC beauty and skincare.`,
    },
  ],
};

/* ------------------------------------------------------------- final cta */

export const finalCta = {
  heading: 'Ready to be impossible to ignore?',
  // PLACEHOLDER COPY: pending content team
  body: 'Tell us what you are building. We will reply within one working day.',
  cta: { label: 'Start a project', href: '/contact' },
};

/* -------------------------------------------------------------- contact */

export const contact = {
  eyebrow: '/ Start a project',
  heading: ['Tell us what you', 'are building.'],
  body: 'A short note is enough. We read every enquiry ourselves, and we reply within one working day.',
  successTitle: 'Message received.',
  successBody: 'Thank you. We will write back to the address you gave us, usually within one working day.',
  topics: [
    'Full package',
    'Branding',
    'SEO/AEO/GEO',
    'Performance marketing',
    'Social media',
    'Something else',
  ],
  details: [
    { label: 'Email', value: siteConfig.contactEmail },
    { label: 'Markets', value: agency.location },
    { label: 'Response', value: 'One working day' },
  ],
};

/* ------------------------------------------------------------------- mcp */

export const mcp = {
  eyebrow: '/ ComLabs MCP',
  heading: ['One server.', 'Claude, GPT, Gemini.'],
  body: 'The ComLabs MCP server is how Claude, ChatGPT, Cursor and other MCP clients talk to the studio, and to the models behind them.',
  clients: ['Claude', 'ChatGPT', 'Cursor', 'Gemini', 'Windsurf', 'VS Code'],
  providers: [
    {
      id: 'claude',
      title: 'Claude',
      body: 'Anthropic models through the Messages API. Set ANTHROPIC_API_KEY and ask from any connected client.',
    },
    {
      id: 'gpt',
      title: 'GPT',
      body: 'OpenAI chat models through the Completions API. Set OPENAI_API_KEY to route prompts to GPT.',
    },
    {
      id: 'gemini',
      title: 'Gemini',
      body: 'Google generative models. Set GOOGLE_API_KEY and the same ask tool will send the prompt to Gemini.',
    },
  ],
  steps: [
    {
      index: '01',
      title: 'Connect a client',
      body: 'Point Claude Desktop, Cursor, ChatGPT or any MCP host at /api/mcp, or run the stdio server locally.',
    },
    {
      index: '02',
      title: 'Choose a model',
      body: 'Call list_providers, then ask with provider set to claude, gpt or gemini. Only configured keys are live.',
    },
    {
      index: '03',
      title: 'Use the studio',
      body: 'Read capabilities and services as resources, or submit an enquiry that lands in the same inbox as the contact form.',
    },
  ],
  tools: [
    { name: 'studio_profile', purpose: 'Who we are, where we work, how to reach us' },
    { name: 'list_capabilities', purpose: 'The four agency services' },
    { name: 'list_work', purpose: 'Reserved for future case studies' },
    { name: 'list_providers', purpose: 'Which model backends are configured' },
    { name: 'ask', purpose: 'Send a prompt to Claude, GPT or Gemini' },
    { name: 'submit_inquiry', purpose: 'The same intake as the contact page' },
  ],
};

/* ----------------------------------------------------------------- admin */

export const admin = {
  eyebrow: '/ Studio',
  heading: ['Enquiries and', 'the MCP server.'],
  body: 'Messages from the contact form and from connected clients. Provider keys stay on the server.',
  loginHeading: 'Studio access',
  loginBody: 'Enter the admin password to read enquiries and check which models are connected.',
  mcp: {
    eyebrow: '/ How to use MCP',
    heading: 'Connect Claude, GPT and Cursor to the studio.',
    body: 'The server lives at /api/mcp. Point an MCP client at that URL, then call list_providers and ask.',
  },
};

/* ----------------------------------------------------------- not found */

export const notFoundPage = {
  code: '404',
  heading: 'This page is not here.',
  body: 'The link may be out of date. Head back to the homepage or send us a note.',
  links: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
};
