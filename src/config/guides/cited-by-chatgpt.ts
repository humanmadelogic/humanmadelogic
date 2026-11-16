import type { GuideDefinition } from './types';

export const citedByChatgptGuide: GuideDefinition = {
  slug: 'how-to-get-your-brand-cited-by-chatgpt',
  copyFile: 'guide-cited-by-chatgpt.json',
  prefix: 'G2',
  breadcrumbTitle: 'Get cited by ChatGPT',
  cardImageSlug: 'cited-by-chatgpt',
  hubCardKey: 'G2',
  pillar: 'GUIDES-PILLAR-SEARCH-NAME',
  ogImage: '/og/guides/og-how-to-get-your-brand-cited-by-chatgpt.png',
  readingMinutes: 12,
  sections: [
    { kind: 'pair', headingKey: 'G2-S1-H2', bodyKey: 'G2-S1-A' },
    { kind: 'body', bodyKey: 'G2-S1-NOGUARANTEE' },
    { kind: 'pair', headingKey: 'G2-S2-H2', bodyKey: 'G2-S2-A' },
    { kind: 'pair', headingKey: 'G2-S3-H2', bodyKey: 'G2-S3-A' },
    { kind: 'pair', headingKey: 'G2-S4-H2', bodyKey: 'G2-S4-A' },
    { kind: 'pair', headingKey: 'G2-S5-H2', bodyKey: 'G2-S5-A' },
    { kind: 'pair', headingKey: 'G2-S6-H2', bodyKey: 'G2-S6-A' },
    { kind: 'pair', headingKey: 'G2-S7-H2', bodyKey: 'G2-S7-A' },
    { kind: 'pair', headingKey: 'G2-S8-H2', bodyKey: 'G2-S8-A' },
    { kind: 'pair', headingKey: 'G2-S9-H2', bodyKey: 'G2-S9-A' },
    { kind: 'pair', headingKey: 'G2-S10-H2', bodyKey: 'G2-S10-A' },
  ],
};

export const g2SupplementaryCopy: Record<string, string> = {
  'G2-S4-A':
    "AI tools piece together who you are from lots of places. If your site calls you one thing and your LinkedIn page says another, you're making that job harder. Write a short, plain description of your brand: your name, what you make or do, who it's for and where you sell. Use it consistently on your homepage, About page, LinkedIn and directory profiles.",
  'G2-S5-A':
    "Assistants answer questions, so give them answers. Collect the questions your buyers actually ask and turn the important ones into pages or FAQ sections. Open each one with a direct answer in a sentence or two, then add the detail.",
  'G2-S6-A':
    'Check your robots.txt file. If it blocks the crawlers AI tools use for search, those tools may not be able to show your pages in their results. OpenAI recommends allowing OAI-SearchBot and Perplexity recommends allowing PerplexityBot if you want to appear in their results.',
  'G2-S7-A':
    "Your own site is one voice. AI tools tend to look at what others say too. Earn genuine mentions on industry directories, editorial roundups, podcasts, newsletters and review platforms where real customers leave real reviews.",
  'G2-S8-A':
    'Keep a simple log. Same prompts, same tools, once a month. Over a few months the log shows which sources keep coming up and whether your changes are moving things.',
  'G2-S9-A':
    'Buying "guaranteed" placement, fake reviews, keyword stuffing and blocking every crawler while still hoping to appear in AI answers does not work.',
};