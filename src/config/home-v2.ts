/**
 * Home page v2 copy and layout config.
 * String IDs use the HOME-* prefix from the wireframe (see docs / home-v2-wireframe).
 * Paste final copy here; empty strings omit fields. Sections hide when entirely empty.
 */

import type { ServiceSlug } from './services';
import { siteConfig } from './site';

export type HomeV2Cta = { label: string; href: string };

export type HomeV2ServiceCardCopy = {
  /** HOME-SVC card one-liner (up to 90 chars) */
  oneLiner: string;
  /** Three outcome tags (up to 24 chars each) */
  tags: [string, string, string];
};

export type HomeV2Kit = {
  /** HOME-KIT-n-NAME */
  title: string;
  /** HOME-KIT-n-FOR */
  bestFor?: string;
  /** HOME-KIT-n-INC-1..3 */
  inclusions?: string[];
  /** HOME-KIT-n-CTA */
  cta?: HomeV2Cta;
  /** Shown only when set */
  price?: string;
};

export type HomeV2Promise = {
  /** HOME-PROMISE-n-TITLE */
  title: string;
  /** HOME-PROMISE-n-BODY */
  body: string;
};

export type HomeV2WorkCase = {
  /** HOME-WORK-* (hidden until real approved work exists) */
  title: string;
  body: string;
  href: string;
  imageAlt: string;
};

export type HomeV2FaqItem = {
  question: string;
  answer: string;
};

export type HomeV2Step = {
  title: string;
  body: string;
};

export type HomeV2Content = {
  meta: {
    /** HOME-META-TITLE */
    title: string;
    /** HOME-META-DESC */
    description: string;
    ogImage: string;
  };
  hero: {
    /** HOME-HERO-EYEBROW */
    eyebrow: string;
    /** HOME-HERO-H1 (locked OPT-B) */
    h1: string;
    /** HOME-HERO-SUB */
    sub: string;
    imageAlt: string;
    /** HOME-HERO-CTA-1 */
    primaryCta: HomeV2Cta;
    /** HOME-HERO-CTA-2 */
    secondaryCta: HomeV2Cta;
  };
  problem: {
    /** HOME-PROB-HEADING (optional heading above pain lines) */
    heading?: string;
    /** HOME-STATEMENT — full-bleed big type */
    statement?: string;
    /** HOME-STATEMENT-SUPPORT — contrasting follow-on */
    statementSupport?: string;
    /** HOME-PROB-1..3 */
    lines?: [string, string, string];
  };
  belief: {
    /** HOME-BELIEF */
    quote: string;
    /** HOME-BELIEF-BODY */
    body: string;
    /** HOME-BELIEF-SLOGAN (locked; Oxford comma preserved) */
    slogan: string;
  };
  serviceCards: {
    /** HOME-SVC-HEADING */
    heading: string;
    /** HOME-SVC-INTRO (above cards) */
    lede: string;
    /** HOME-SVC-BLURB (full width under cards) */
    blurb: string;
    items: Record<ServiceSlug, HomeV2ServiceCardCopy>;
  };
  howWeWork: {
    /** HOME-HOW-HEADING */
    heading: string;
    steps: [HomeV2Step, HomeV2Step, HomeV2Step, HomeV2Step];
    /** HOME-AI-LINE */
    aiLine: string;
  };
  kits: {
    /** HOME-KITS-HEADING */
    heading: string;
    items: HomeV2Kit[];
  };
  who: {
    /** HOME-WHO-HEADING */
    heading: string;
    /** HOME-WHO-1..4 */
    lines: [string, string, string, string];
    imageAlt: string;
  };
  promises: {
    /** HOME-PROMISE-HEADING */
    heading: string;
    items: HomeV2Promise[];
  };
  /** HOME-WORK-* — does not render until populated with real work */
  work: {
    items: HomeV2WorkCase[];
  };
  faq: {
    /** HOME-FAQ-HEADING */
    heading: string;
    items: HomeV2FaqItem[];
  };
  finalCta: {
    /** HOME-CTA-HEADING */
    heading: string;
    /** HOME-CTA-BODY */
    body: string;
    /** HOME-CTA-BUTTON */
    button: HomeV2Cta;
    /** HOME-CTA-NOTE */
    note: string;
  };
};

export const homeV2Config = {
  /** When true, `/` renders {@link HomePageV2}. Keep legacy {@link HomePage} for revert. */
  enabled: true,
  assets: {
    heroImage: '/images/hml/home-v2/home-hero.webp',
    whoImage: '/images/hml/home-v2/home-who.webp',
    heroWidth: 1600,
    heroHeight: 1200,
    whoWidth: 1200,
    whoHeight: 900,
    processPlates: [
      '/images/hml/process-monument.webp',
      '/images/hml/process-aperture.webp',
      '/images/hml/process-pillar.webp',
      '/images/hml/terrain.webp',
    ] as const,
    problemPainImages: [
      '/images/hml/services/svc-branding-pain-1.webp',
      '/images/hml/services/svc-seo-aeo-geo-pain-2.webp',
      '/images/hml/services/svc-performance-marketing-pain-2.webp',
    ] as const,
  },
  content: {
    meta: {
      title: 'Impossible to ignore. Built to be chosen. | Human Made Logic',
      description:
        'Branding, SEO/AEO/GEO, performance marketing and social media for SMBs in the UK, Australia, Canada and Singapore. Be remembered, found and chosen.',
      ogImage: '/og/og-default.png',
    },
    hero: {
      eyebrow: 'We make brands impossible to ignore.',
      h1: 'Be the brand they name without googling.',
      sub:
        'Branding, SEO/AEO/GEO, performance marketing and social media for SMB founders and marketing leads in the UK, Australia, Canada and Singapore.',
      imageAlt:
        'A hand lifts one yellow card out of a grid of plain grey cards, while an empty speech bubble points at it.',
      primaryCta: { label: 'Start a project', href: '/contact' },
      secondaryCta: { label: 'View services', href: '/services' },
    },
    problem: {
      heading: '',
      /** HOME-PROB-HEADING — full-bleed big statement */
      statement:
        'People saw your ad. They even liked it. Then they bought from the brand they could actually remember.',
      statementSupport: '',
      lines: [
        'Same palette, same fonts, same claims. You look like everyone else in your category.',
        "Buried on page two and missing when someone asks AI who's good.",
        'Ads that burn out in days. Posts that never had a point.',
      ],
    },
    belief: {
      quote: 'Be remembered. Be found. Be the one they name.',
      body:
        'We build distinctive brand codes: the colours, shapes and words people know before they read your name. Then we make you easy to find for people, screens and algorithms.',
      slogan: siteConfig.tagline,
    },
    serviceCards: {
      heading: 'Four ways in. Take one or all four.',
      lede:
        'Full package or à la carte. Start where it hurts most. Every service runs on the same brand codes, so nothing feels bolted on.',
      blurb: siteConfig.servicesBlurb,
      items: {
        branding: {
          oneLiner:
            'Identity, positioning and visual systems built to be remembered on screen and in search.',
          tags: ['Recognised at a glance', 'One consistent system', 'Codes people remember'],
        },
        'seo-aeo-geo': {
          oneLiner:
            'Search engines and AI answers, tuned so your brand shows up where buyers look and ask.',
          tags: ['Found in search', 'Ready for AI answers', 'Traffic with intent'],
        },
        'performance-marketing': {
          oneLiner:
            'Paid media and testing that connect creative ideas to clear reporting you can act on.',
          tags: ['Ads people remember', 'Clicks with a next step', 'Plain-English reporting'],
        },
        'social-media': {
          oneLiner:
            'A steady rhythm, platform-native creative and codes people spot in a fast scroll.',
          tags: ['Fewer, better posts', 'A voice people know', 'A rhythm you can keep'],
        },
      },
    },
    howWeWork: {
      heading: 'How brands become unforgettable',
      steps: [
        {
          title: 'Listen and audit',
          body:
            "We look at your brand, your market and where you're found or missed: in search, on social and in AI answers.",
        },
        {
          title: "Decide what you're known for",
          body:
            'A sharp position and a short list of distinctive brand codes. Everything we build after this answers to it.',
        },
        {
          title: 'Build it as one system',
          body:
            'Identity, site, content and campaigns made together, so every touchpoint looks and sounds like you.',
        },
        {
          title: 'Launch, learn, repeat',
          body:
            "We measure what's working, report it plainly and refine, so every campaign gives the next one a head start.",
        },
      ],
      aiLine: 'AI speeds up the research and the drafts. People make the calls.',
    },
    kits: {
      heading: 'Three kits for three starting points',
      items: [
        {
          title: 'Launch Kit',
          bestFor:
            'Best for new or relaunching brands that need to look right and get moving.',
          inclusions: [
            'A brand identity',
            'A website or landing page',
            'A 30 to 60 day performance or social sprint',
          ],
          cta: { label: 'Ask about this kit', href: '/contact' },
        },
        {
          title: 'Authority Kit',
          bestFor:
            'Best for brands that want to be the name search engines and AI answers trust.',
          inclusions: ['Positioning and site structure', 'SEO/AEO/GEO', 'A content engine'],
          cta: { label: 'Ask about this kit', href: '/contact' },
        },
        {
          title: 'Local Domination Kit',
          bestFor:
            'Best for clinics, trades, studios and venues that live on nearby customers.',
          inclusions: [
            'Google Business Profile and local SEO',
            'Reviews and lead-gen ads',
            'A light brand refresh',
          ],
          cta: { label: 'Ask about this kit', href: '/contact' },
        },
      ] satisfies HomeV2Kit[],
    },
    who: {
      heading: "Sounds like you?",
      lines: [
        "You run a skincare brand that's genuinely good but looks like everyone else's.",
        'Your clinic or studio is brilliant, but searches keep finding someone else.',
        'Your trade or venue runs on word of mouth. You want to be the name people say.',
        "You're in the UK, Australia, Canada or Singapore with more ideas than hours.",
      ],
      imageAlt:
        'Hands pack a serum bottle into a box of yellow tissue, beside skincare jars, brushes, a tape measure and a hammer.',
    },
    promises: {
      heading: 'No case studies yet. Just promises we keep.',
      items: [
        {
          title: 'No borrowed logos',
          body:
            "No fake results, no made-up quotes, no logos we didn't earn. Real work goes up once it's finished and signed off.",
        },
        {
          title: 'Reporting in plain English',
          body:
            "What's working, what isn't and what we'll test next. No dashboards that need a translator.",
        },
        {
          title: 'Your accounts, your data',
          body:
            'Ad accounts, pixels and data stay in your name. If we ever part ways, all of it stays with you.',
        },
        {
          title: 'Nothing posts without you',
          body:
            "Every post gets your yes before it goes out. Nothing lands in your feed that you haven't seen.",
        },
      ],
    },
    work: {
      items: [] as HomeV2WorkCase[],
    },
    faq: {
      heading: 'Things founders ask first',
      items: [
        {
          question: 'What does Human Made Logic do?',
          answer:
            'We make brands impossible to ignore. Human Made Logic offers branding, SEO/AEO/GEO, performance marketing and social media for SMB founders and marketing leads. We build distinctive brand codes first, then make sure people can find you, remember you and choose you.',
        },
        {
          question: 'Do you only work with beauty brands?',
          answer:
            'No. UK DTC beauty and skincare is a big focus because brands there blur fast, but the fundamentals travel. The same work suits clinics, trades, studios, gyms, hospitality, education and property. If people need to remember you, this work is for you.',
        },
        {
          question: 'Can I buy just one service?',
          answer:
            'Yes. Take any service on its own or combine them in a kit: Launch, Authority or Local Domination. Full package or à la carte, it all runs on the same brand codes. The fit call is where we work out what you need first.',
        },
        {
          question: 'What does it cost to get started?',
          answer:
            "It depends on what you need, so there's no price list here. We scope every project after a short, no-pressure fit call, once we know your goals, your channels and where your brand feels stuck. You get a clear proposal before any work starts.",
        },
        {
          question: 'Do you use AI?',
          answer:
            'Yes, as a tool, never as our personality. AI speeds up the research and the drafts. People make the calls. It helps us move faster on audits and first versions, while people choose every idea, edit every line and sign off what you see.',
        },
        {
          question: 'Do you work with businesses outside the UK?',
          answer:
            'Yes. We work with SMB founders and marketing leads right across the UK, Australia, Canada and Singapore. The work happens remotely, with calls always planned around your own time zone. We write in British English unless your market needs something else.',
        },
      ],
    },
    finalCta: {
      heading: 'Ready to be impossible to ignore?',
      body:
        "Start with a short, no-pressure fit call. Tell us where your brand feels stuck. If we're not the right fit, we'll say so.",
      button: { label: 'Start a project', href: '/contact' },
      note: 'We reply within one working day',
    },
  } satisfies HomeV2Content,
};

export type HomeV2Config = typeof homeV2Config;
