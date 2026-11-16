import type { GuideDefinition } from './types';

export const seoVsAeoVsGeoGuide: GuideDefinition = {
  slug: 'seo-vs-aeo-vs-geo',
  copyFile: 'guide-seo-vs-aeo-vs-geo.json',
  prefix: 'G1',
  breadcrumbTitle: 'SEO vs AEO vs GEO',
  cardImageSlug: 'seo-vs-aeo-vs-geo',
  hubCardKey: 'G1',
  pillar: 'GUIDES-PILLAR-SEARCH-NAME',
  ogImage: '/og/guides/og-guide-seo-vs-aeo-vs-geo.png',
  readingMinutes: 9,
  about: [{ name: 'Search engine optimisation' }, { name: 'Answer engine optimisation' }, { name: 'Generative engine optimisation' }],
  sections: [
    { kind: 'pair', headingKey: 'G1-S1-H2', bodyKey: 'G1-S1-A' },
    {
      kind: 'prose',
      html: `<p class="text-[17px] leading-[1.65] text-slate">If you only remember one line from this guide, make it that last one. Three acronyms, one body of work. The rest of this page explains what each one means in practice, where they differ and what to do first if you're a founder with a small team and no patience for jargon.</p>`,
    },
    { kind: 'pair', headingKey: 'G1-S2-H2', bodyKey: 'G1-S2-A' },
    { kind: 'pair', headingKey: 'G1-S3-H2', bodyKey: 'G1-S3-A' },
    { kind: 'pair', headingKey: 'G1-S4-H2', bodyKey: 'G1-S4-A' },
    { kind: 'pair', headingKey: 'G1-S5-H2', bodyKey: 'G1-S5-A' },
    { kind: 'pair', headingKey: 'G1-S6-H2', bodyKey: 'G1-S6-A' },
    { kind: 'pair', headingKey: 'G1-S7-H2', bodyKey: 'G1-S7-A' },
  ],
};

/** Table row bodies absent from the copy table — from Full article prose. */
export const g1SupplementaryCopy: Record<string, string> = {
  'G1-S2-A':
    "SEO, search engine optimisation, is the work of helping search engines find, understand and rank your pages. It's the oldest of the three and still the foundation for the other two. In practice it covers three things. Technical health: can search engines crawl and index your site, and does it work properly on a phone? Relevance: does each page clearly cover one topic that people actually search for? Trust: do other sites mention and link to you, and does your content show real expertise?",
  'G1-S6-A':
    "If you're starting from scratch, here's a sensible order. None of it needs a big budget. It needs focus. Fix the technical basics. List the questions your buyers ask. Answer first on every page. Make your brand facts consistent. Check, log and repeat each month.",
  'G1-S7-A':
    "\"You need a separate GEO agency.\" You don't. GEO builds on the same foundations as SEO. \"More pages means more chances.\" Google's people-first guidance warns against producing lots of content in the hope that some of it performs well. Fewer, better pages that properly answer real questions are a stronger bet. The other myths you'll hear are answered in the questions below.",
};