/**
 * Home page v2 copy and layout config.
 * String IDs use the HOME-* prefix from the wireframe (see docs / home-v2-wireframe).
 * Paste final copy here; empty strings omit fields. Sections hide when entirely empty.
 */

import type { ServiceSlug } from './services';

export type HomeV2Cta = { label: string; href: string };

export type HomeV2ServiceCardCopy = {
  /** HOME-SVC card one-liner (up to 90 chars) */
  oneLiner: string;
  /** Three outcome tags (up to 24 chars each) */
  tags: [string, string, string];
};

export type HomeV2Kit = {
  /** HOME-KIT-n-TITLE */
  title: string;
  /** HOME-KIT-n-BODY */
  body: string;
  /** HOME-KIT-n-FOR */
  bestFor?: string;
  /** HOME-KIT-n-INC-1..3 */
  inclusions?: string[];
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
    /** HOME-HERO-H1 (production) */
    h1: string;
    /** Preview only: three hook options for ?hook=1|2|3 */
    h1Options?: [string, string, string];
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
  };
  serviceCards: {
    /** HOME-SVC-HEADING */
    heading: string;
    /** HOME-SVC-INTRO */
    intro: string;
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
    /** HOME-KITS-LINK */
    linkLabel: string;
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

const emptyServiceCard = (): HomeV2ServiceCardCopy => ({
  oneLiner: '',
  tags: ['', '', ''],
});

const placeholder = (id: string) => `[${id}]`;

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
    processStepIcons: [
      '/images/hml/services/svc-branding-step-1.svg',
      '/images/hml/services/svc-branding-step-2.svg',
      '/images/hml/services/svc-branding-step-3.svg',
      '/images/hml/services/svc-branding-step-4.svg',
    ] as const,
  },
  content: {
    meta: {
      title: placeholder('HOME-META-TITLE'),
      description: placeholder('HOME-META-DESC'),
      ogImage: '/og/home/og-home.png',
    },
    hero: {
      eyebrow: placeholder('HOME-HERO-EYEBROW'),
      h1: placeholder('HOME-HERO-H1'),
      h1Options: [
        placeholder('HOME-HERO-H1-OPTION-1'),
        placeholder('HOME-HERO-H1-OPTION-2'),
        placeholder('HOME-HERO-H1-OPTION-3'),
      ],
      sub: placeholder('HOME-HERO-SUB'),
      imageAlt: placeholder('HOME-HERO-IMAGE-ALT'),
      primaryCta: { label: placeholder('HOME-HERO-CTA-1'), href: '/contact' },
      secondaryCta: { label: placeholder('HOME-HERO-CTA-2'), href: '/services' },
    },
    problem: {
      heading: placeholder('HOME-PROB-HEADING'),
      statement: placeholder('HOME-STATEMENT'),
      statementSupport: placeholder('HOME-STATEMENT-SUPPORT'),
      lines: [
        placeholder('HOME-PROB-1'),
        placeholder('HOME-PROB-2'),
        placeholder('HOME-PROB-3'),
      ],
    },
    belief: {
      quote: placeholder('HOME-BELIEF'),
      body: placeholder('HOME-BELIEF-BODY'),
    },
    serviceCards: {
      heading: placeholder('HOME-SVC-HEADING'),
      intro: placeholder('HOME-SVC-INTRO'),
      items: {
        branding: {
          oneLiner: placeholder('HOME-SVC-BRANDING-LINE'),
          tags: [
            placeholder('HOME-SVC-BRANDING-TAG-1'),
            placeholder('HOME-SVC-BRANDING-TAG-2'),
            placeholder('HOME-SVC-BRANDING-TAG-3'),
          ],
        },
        'seo-aeo-geo': {
          oneLiner: placeholder('HOME-SVC-SEO-LINE'),
          tags: [
            placeholder('HOME-SVC-SEO-TAG-1'),
            placeholder('HOME-SVC-SEO-TAG-2'),
            placeholder('HOME-SVC-SEO-TAG-3'),
          ],
        },
        'performance-marketing': {
          oneLiner: placeholder('HOME-SVC-PERF-LINE'),
          tags: [
            placeholder('HOME-SVC-PERF-TAG-1'),
            placeholder('HOME-SVC-PERF-TAG-2'),
            placeholder('HOME-SVC-PERF-TAG-3'),
          ],
        },
        'social-media': {
          oneLiner: placeholder('HOME-SVC-SOCIAL-LINE'),
          tags: [
            placeholder('HOME-SVC-SOCIAL-TAG-1'),
            placeholder('HOME-SVC-SOCIAL-TAG-2'),
            placeholder('HOME-SVC-SOCIAL-TAG-3'),
          ],
        },
      },
    },
    howWeWork: {
      heading: placeholder('HOME-HOW-HEADING'),
      steps: [
        { title: placeholder('HOME-HOW-1-TITLE'), body: placeholder('HOME-HOW-1-BODY') },
        { title: placeholder('HOME-HOW-2-TITLE'), body: placeholder('HOME-HOW-2-BODY') },
        { title: placeholder('HOME-HOW-3-TITLE'), body: placeholder('HOME-HOW-3-BODY') },
        { title: placeholder('HOME-HOW-4-TITLE'), body: placeholder('HOME-HOW-4-BODY') },
      ],
      aiLine:
        'AI speeds up the research and the drafts. People make the calls.',
    },
    kits: {
      heading: placeholder('HOME-KITS-HEADING'),
      linkLabel: placeholder('HOME-KITS-LINK'),
      items: [
        {
          title: placeholder('HOME-KIT-1-TITLE'),
          body: placeholder('HOME-KIT-1-BODY'),
          bestFor: placeholder('HOME-KIT-1-FOR'),
          inclusions: [
            placeholder('HOME-KIT-1-INC-1'),
            placeholder('HOME-KIT-1-INC-2'),
            placeholder('HOME-KIT-1-INC-3'),
          ],
        },
        {
          title: placeholder('HOME-KIT-2-TITLE'),
          body: placeholder('HOME-KIT-2-BODY'),
          bestFor: placeholder('HOME-KIT-2-FOR'),
          inclusions: [
            placeholder('HOME-KIT-2-INC-1'),
            placeholder('HOME-KIT-2-INC-2'),
            placeholder('HOME-KIT-2-INC-3'),
          ],
        },
        {
          title: placeholder('HOME-KIT-3-TITLE'),
          body: placeholder('HOME-KIT-3-BODY'),
          bestFor: placeholder('HOME-KIT-3-FOR'),
          inclusions: [
            placeholder('HOME-KIT-3-INC-1'),
            placeholder('HOME-KIT-3-INC-2'),
            placeholder('HOME-KIT-3-INC-3'),
          ],
        },
      ] satisfies HomeV2Kit[],
    },
    who: {
      heading: placeholder('HOME-WHO-HEADING'),
      lines: [
        placeholder('HOME-WHO-1'),
        placeholder('HOME-WHO-2'),
        placeholder('HOME-WHO-3'),
        placeholder('HOME-WHO-4'),
      ],
      imageAlt: placeholder('HOME-WHO-IMAGE-ALT'),
    },
    promises: {
      heading: placeholder('HOME-PROMISE-HEADING'),
      items: [
        { title: placeholder('HOME-PROMISE-1-TITLE'), body: placeholder('HOME-PROMISE-1-BODY') },
        { title: placeholder('HOME-PROMISE-2-TITLE'), body: placeholder('HOME-PROMISE-2-BODY') },
        { title: placeholder('HOME-PROMISE-3-TITLE'), body: placeholder('HOME-PROMISE-3-BODY') },
        { title: placeholder('HOME-PROMISE-4-TITLE'), body: placeholder('HOME-PROMISE-4-BODY') },
        { title: placeholder('HOME-PROMISE-5-TITLE'), body: placeholder('HOME-PROMISE-5-BODY') },
      ],
    },
    work: {
      items: [] as HomeV2WorkCase[],
    },
    faq: {
      heading: placeholder('HOME-FAQ-HEADING'),
      items: [
        { question: placeholder('HOME-FAQ-1-Q'), answer: placeholder('HOME-FAQ-1-A') },
        { question: placeholder('HOME-FAQ-2-Q'), answer: placeholder('HOME-FAQ-2-A') },
        { question: placeholder('HOME-FAQ-3-Q'), answer: placeholder('HOME-FAQ-3-A') },
        { question: placeholder('HOME-FAQ-4-Q'), answer: placeholder('HOME-FAQ-4-A') },
        { question: placeholder('HOME-FAQ-5-Q'), answer: placeholder('HOME-FAQ-5-A') },
        { question: placeholder('HOME-FAQ-6-Q'), answer: placeholder('HOME-FAQ-6-A') },
      ],
    },
    finalCta: {
      heading: placeholder('HOME-CTA-HEADING'),
      body: placeholder('HOME-CTA-BODY'),
      button: { label: placeholder('HOME-CTA-BUTTON'), href: '/contact' },
      note: 'We reply within one working day',
    },
  } satisfies HomeV2Content,
};

export type HomeV2Config = typeof homeV2Config;
