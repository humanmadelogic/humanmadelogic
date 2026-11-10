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
  location:
    'Working with SMB founders and marketing teams across the UK, Australia, Canada and Singapore.',
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
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/human-made-logic/' },
  ] as NavLink[],
} as const;

/** Home route metadata (document title uses {@link siteConfig.coverLine} via `homeTitle()`). */
export const homePage = {
  meta: {
    description:
      'Branding, SEO/AEO/GEO, performance marketing and social media for SMBs in the UK, Australia, Canada and Singapore. Brands people remember, find and then choose.',
    ogImage: '/og/og-default.png',
  },
  quickLinks: {
    viewAllServices: { label: 'View all services', href: '/services' },
    aboutUs: { label: 'About us', href: '/about' },
  },
} as const;

export const aboutPage = {
  meta: {
    title: 'About',
    description: siteConfig.description,
    ogImage: '/og/og-about.png',
  },
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
  headline: ['Impossible to ignore.', 'Built to be chosen.'],
  subhead:
    'Brand, search, ads and social for growing businesses in the UK, Australia, Canada and Singapore, built to be remembered first and found everywhere.',
  body: siteConfig.tagline,
  primaryCta: { label: 'Start a project', href: '/contact' },
  secondaryCta: { label: 'View services', href: '/services' },
  scrollHint: 'Scroll',
  frames: [
    { media: 'heroIdentity', discipline: 'Branding', offset: 4, rotate: -3.4, depth: 0.55 },
    { media: 'heroArtDirection', discipline: 'SEO/AEO/GEO', offset: -7, rotate: 2.1, depth: 0.9 },
    { media: 'heroProduct', discipline: 'Performance marketing', offset: 2, rotate: -1.2, depth: 1.25 },
    { media: 'heroCampaign', discipline: 'Social media', offset: -6, rotate: 3.1, depth: 0.9 },
  ] as HeroFrame[],
};

/* ------------------------------------------------------------- statement */

export const statement = {
  label: '/ What we do',
  lines: ['Built for people,', 'screens and algorithms.'],
  body:
    'We start with what people remember, then make sure they can find you and choose you. Fundamentals first, original ideas throughout and AI to move faster, while people make the calls.',
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
  id: 'services',
  label: '/ Services',
  heading: 'Full package or à la carte.',
  intro: siteConfig.servicesBlurb,
  viewServiceLabel: 'View service',
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
  label: '/ Work',
  heading: "Thinking first. Work when it's signed off.",
  body:
    "No case studies here yet, and that's on purpose. We'd rather show you how we think than fill a page with borrowed logos. Work goes up as projects are finished and signed off. Until then, see how we'd approach your brand in our process, or book a fit call and we'll talk it through using your brand, not a template.",
  note: '',
};

/* --------------------------------------------------------------- process */

export const process = {
  label: '/ How we work',
  heading: 'Research fast. Decide together.',
  steps: [
    {
      index: '01',
      title: 'Listen and audit',
      body: "We start by listening. We look at your brand, your market and your competitors, then dig into what customers already remember about you and where you're being found or missed: in search, on social and in AI answers. No assumptions, just a clear picture of where you stand.",
    },
    {
      index: '02',
      title: 'Define',
      body: "Next, we decide what you should be known for. That means a sharp strategy, clear positioning and a short list of distinctive brand codes: the colours, shapes, words and habits people recognise before they read your name. Everything we build later answers to this.",
    },
    {
      index: '03',
      title: 'Build',
      body: 'Then we make it real: identity, website or landing pages, content and campaigns, built as one system rather than a pile of separate jobs. AI speeds up research and first drafts so we move faster, and people make every call on how your brand looks and sounds.',
    },
    {
      index: '04',
      title: 'Grow',
      body: 'We launch, measure what\'s working, test and refine. From there, growth compounds through the channels that suit you: SEO/AEO/GEO to be found and named, performance campaigns that turn attention into enquiries and sales, or social that stays recognisable week after week.',
    },
  ],
};

/* ---------------------------------------------------------------- approach */

export const approach = {
  label: '/ Approach',
  heading: 'A creative agency with a performance spine.',
  pillars: [
    {
      title: 'Distinctive before loud',
      body: "Spend only works hard when people know it's you. So we build the parts customers remember first, the codes, the voice and the idea, and then put budget behind them. Being seen is easy to buy. Being remembered is what makes that spend add up over time.",
    },
    {
      title: 'Findable everywhere people look',
      body: "People don't only search any more. They scroll, compare and ask AI tools to explain a whole category in one breath. We make sure your brand turns up across search, social and AI answers, and gets named clearly instead of folded into a vague list of providers.",
    },
    {
      title: 'Fundamentals, faster',
      body: "Good marketing still runs on fundamentals: a clear position, original ideas and creative that earns attention. We use AI to research, draft and test faster, so more of your budget goes on thinking. It's the speed layer, never the personality, and people make the calls.",
    },
  ],
};

/* ------------------------------------------------------------- final cta */

export const finalCta = {
  heading: 'Ready to be impossible to ignore?',
  body: "Start with a short, no-pressure fit call. Tell us where your brand feels stuck and what you want next. If we're not the right fit, we'll tell you honestly.",
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
