/**
 * Apply Pamala round-2 copy to docs/copy/blog/*.md (frontmatter + body patches).
 * Sources: docs/copy/blog/source/round2/post-0N-round2.md
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '..', 'docs/copy/blog');

const HML =
  'Human Made Logic is a branding, search and performance marketing agency working with SMB founders and marketing teams across the UK, Australia, Canada and Singapore.';

const ROUND2 = {
  'google-november-core-update-gemini-4-hydrogen': {
    keyPointsAfter: 1,
    keyPoints: [
      'Google started the November 2026 core update on 10 November; its dashboard says the rollout may take up to 2 weeks ([Google Search Status Dashboard](https://status.search.google.com/incidents/WLxcJyC6jMWMfryxsKMc)).',
      'Gemini 4 Hydrogen went live across Search on 12 November; Google calls it "the biggest model upgrade to Search yet" ([Google](https://blog.google/products-and-platforms/products/search/gemini-4-hydrogen-search-upgrade/)).',
      'Log both dates, wait for the rollout to finish and compare like with like before changing anything.',
    ],
    faqs: [
      {
        q: "When did Google's November 2026 core update start?",
        a: 'Google\'s Search Status Dashboard says it released the November 2026 core update on 10 November. It applies globally and to all languages, and the rollout may take up to 2 weeks to complete.',
      },
      {
        q: 'What is Gemini 4 Hydrogen?',
        a: 'It\'s Google\'s new model for Search. Google calls it "the biggest model upgrade to Search yet" and says it is available globally in Google Search for all users.',
      },
      {
        q: 'Why is November search data hard to read?',
        a: 'The core update and Gemini 4 Hydrogen landed two days apart, so a change could come from either. Search Engine Journal notes that, on Google\'s two-week estimate, the first full week after the rollout has finished would include Black Friday, so compare like with like.',
      },
      {
        q: 'Is Google sending more clicks from AI answers?',
        a: 'Google says it has added more links to its AI experiences, but neither of its posts gives click numbers. Your own Search Console and analytics are the numbers to trust.',
      },
    ],
    h2: [
      ['## Why the timing makes your data harder to read', '## Why is November search data hard to read?'],
      ['## A simple log to keep this month', '## What should you log this month?'],
      ['## What this means for your brand', '## What does this mean for your brand?'],
    ],
    insertBeforeCta: {
      anchor: 'Want to know what AI says about your brand?',
      block: `More from us: [SEO, AEO and GEO](/services/seo-aeo-geo), our guide to [SEO vs AEO vs GEO](/guides/seo-vs-aeo-vs-geo) and the [Authority Kit](/kits/authority-kit).

${HML}`,
    },
  },
  'chatgpt-businesses-business-hub': {
    keyPointsAfter: 1,
    keyPoints: [
      'Eligible businesses can claim a ChatGPT business profile in Business Hub (beta) and see mentions, website clicks and discovery topics ([OpenAI](https://openai.com/index/introducing-businesses-chatgpt/)).',
      'Business Agents and shopping in ChatGPT are US only for now ([OpenAI](https://openai.com/index/introducing-businesses-chatgpt/), [ChatGPT merchants page](https://chatgpt.com/merchants/)).',
      'Claiming "doesn\'t guarantee increased visibility" ([OpenAI Help Center](https://help.openai.com/en/articles/20001635-setting-up-your-business-on-chatgpt)).',
    ],
    faqs: [
      {
        q: 'Can I claim a ChatGPT business profile outside the US?',
        a: 'OpenAI says any eligible business located where ChatGPT is available can claim their business through Business Hub, and that availability depends on the business\'s location and type. It doesn\'t list eligible countries or categories. One catch: local stores and restaurants can currently claim only an existing US listing.',
      },
      {
        q: 'Is Business Hub the same as the ChatGPT Business plan?',
        a: 'No. This is not ChatGPT\'s paid Business plan. OpenAI\'s help page says you don\'t need an Ads account or a ChatGPT Enterprise agreement to claim an eligible business.',
      },
      {
        q: 'Does claiming a profile make ChatGPT recommend you more?',
        a: 'OpenAI says it doesn\'t guarantee increased visibility or give you direct control over ChatGPT\'s independent recommendations, and that advertising doesn\'t influence ChatGPT\'s independent answers.',
      },
      {
        q: 'What do Business Hub mentions count?',
        a: 'For an online business, a mention counts when ChatGPT references its website. Naming the brand alone doesn\'t count. Insights show aggregate activity over the past 28 days.',
      },
    ],
    h2: [
      ['## What happened', '## What did OpenAI launch on 10 November?'],
      ['## What OpenAI actually launched', "## What's the difference between Business Hub and Business Agents?"],
      ['## What the mentions and clicks actually count', '## What do Business Hub mentions and clicks count?'],
      ["## What claiming won't do", '## Will claiming a profile make ChatGPT recommend you more?'],
      ['## What this means for your brand', '## What does this mean for your brand?'],
    ],
    bodyReplace: [
      [
        'which is what [our guide](/guides/how-to-get-your-brand-cited-by-chatgpt) on getting cited by ChatGPT covers step by step.',
        'which is what our guide, [how to get your brand cited by ChatGPT](/guides/how-to-get-your-brand-cited-by-chatgpt), covers step by step.',
      ],
    ],
    insertBeforeCta: {
      anchor: '**[Get a free AI visibility check]',
      block: `More from us: [SEO, AEO and GEO](/services/seo-aeo-geo) and the [Authority Kit](/kits/authority-kit).

${HML}`,
    },
  },
  'google-ai-mode-ads-australia-canada-singapore-uk': {
    keyPointsAfter: 1,
    keyPoints: [
      'Google is scaling ads in AI Mode in 10 new countries, including Australia, Canada and Singapore ([Google, 28 Oct 2026](https://blog.google/products/ads-commerce/ads-in-ai-mode-global/)).',
      'The UK is planned for Q4 2026, not live ([Google](https://blog.google/products/ads-commerce/ads-in-ai-mode-global/)).',
      'Google says existing Search, Shopping and Performance Max campaigns are automatically eligible, and that paid ads don\'t influence organic AI responses ([Google Ads Help](https://support.google.com/google-ads/answer/18826097)).',
    ],
    faqs: [
      {
        q: 'Are ads in Google AI Mode live in Australia, Canada and Singapore?',
        a: 'Google said on 28 October 2026 that it is scaling ads in AI Mode in 10 new countries, including Australia, Canada and Singapore.',
      },
      {
        q: 'Are AI Mode ads live in the UK?',
        a: 'Not according to Google. Its 28 October post says it plans to expand to additional locales in Q4 2026, including the United Kingdom. That is a plan, not a launch.',
      },
      {
        q: 'Which Google Ads campaigns can show in AI Mode?',
        a: 'Google\'s Ads Help page says existing Search, Shopping and Performance Max campaigns are automatically eligible to serve ads within AI Overviews and AI Mode. It also says these ads are available in English in the United States and select English-speaking markets, so check what applies to your own account and market.',
      },
      {
        q: "Do ads change Google's AI answers?",
        a: 'Google\'s Ads Help page says paid advertising does not influence the organic responses generated by Google AI.',
      },
    ],
    h2: [
      ['## What Google announced', '## What did Google announce on 28 October?'],
      ['## Where this leaves our four markets', '## Are AI Mode ads live in the UK, Australia, Canada and Singapore?'],
      ['## The two numbers Google points to (both US)', '## What numbers does Google give? (Both are US figures)'],
      ['## Organic still matters in the same answer', '## Does organic search still matter in AI Mode?'],
      ['## A note on timing', '## Why is November a tricky month to judge?'],
      ['## What Google says about eligibility', '## Which Google Ads campaigns can show in AI Mode?'],
      ['## What this means for your brand', '## What does this mean for your brand?'],
    ],
    bodyReplace: [
      [
        "5. **Read November's numbers with care.** Google's November core update [started rolling out on 10 November](https://status.search.google.com/incidents/WLxcJyC6jMWMfryxsKMc), so compare like with like before you change anything.",
        "5. **Read November's numbers with care.** Google's [November 2026 core update](/blog/google-november-core-update-gemini-4-hydrogen) started rolling out on 10 November, so compare like with like before you change anything.",
      ],
    ],
    insertBeforeCta: {
      anchor: 'Want to know what AI says about your brand?',
      block: HML,
    },
  },
  'uk-rules-check-cma-asa': {
    keyPointsAfter: 2,
    keyPoints: [
      'The CMA has opened 20 investigations under its direct enforcement powers and imposed fines of over £11.8 million ([CMA](https://competitionandmarkets.blog.gov.uk/2026/10/14/direct-consumer-enforcement-18-months-on/)).',
      'The CMA says discounts must be genuine and businesses must show the total price clearly. It also says unlawful conduct could include a business requesting members of staff to write reviews ([CMA](https://competitionandmarkets.blog.gov.uk/2026/10/14/direct-consumer-enforcement-18-months-on/)).',
      'The ASA says a 270-character ad still had room to explain a carbon neutral claim ([ASA](https://www.asa.org.uk/rulings/procook-ltd.html)).',
    ],
    faqs: [
      {
        q: "Can staff write reviews of their own company's products?",
        a: 'The CMA says commissioning reviews isn\'t limited to paying consumers, and that unlawful conduct could include a business requesting members of staff to write reviews about its products or services.',
      },
      {
        q: 'What does the CMA expect on prices and discounts?',
        a: 'The CMA says discounts must be genuine and businesses must show the total price clearly and throughout the purchasing journey, without opting customers in by pre-selecting extra services.',
      },
      {
        q: 'When do the new UK subscription rules start?',
        a: 'The CMA says a new subscription contracts regime will come into force in January, and that the government will publish secondary legislation and further guidance ahead of it. The CMA also warns businesses not to assume that its support for compliance means enforcement is being delayed.',
      },
      {
        q: 'Can a short ad skip the basis of a green claim?',
        a: 'Not according to the ASA. In its ProCook ruling it said an ad with a 270-character limit was not so limited that the basis of a carbon neutral claim couldn\'t be made clear.',
      },
    ],
    h2: [
      ['## What the CMA has been doing', '## What has the CMA done with its new powers?'],
      ['## Prices and discounts', '## What does the CMA expect on prices and discounts?'],
      ['## CMA on fake reviews, including your own team\'s', '## What does the CMA say about fake reviews, including staff ones?'],
      ['## Subscriptions: new rules from January', '## What changes for subscriptions in January?'],
      ["## AI doesn't change the rules", '## Does using AI change your responsibilities?'],
      ['## What the ASA ruled on "carbon neutral delivery"', '## What did the ASA rule on "carbon neutral delivery"?'],
      ['## What this means for your brand', '## What does this mean for your brand?'],
    ],
    bodyReplace: [
      [
        'More from us: [Branding](/services/branding), [Performance marketing](/services/performance-marketing) and [Beauty and skincare brands](/industries/beauty-skincare).',
        'More from us: [Branding](/services/branding), [Performance marketing](/services/performance-marketing), [Beauty and skincare brands](/industries/beauty-skincare) and the [Launch Kit](/kits/launch-kit).',
      ],
    ],
    insertBeforeCta: {
      anchor: 'Want a second pair of eyes on how your brand comes across?',
      block: HML,
    },
  },
  'consumer-trends-2027-trust-proof-outcomes': {
    keyPointsAfter: 2,
    keyPoints: [
      'Kearney says consumers are "2x more likely to use beauty for wellness than for self-expression" ([Kearney](https://www.prnewswire.com/news-releases/kearney-releases-2027-beauty-outlook-report-302928612.html)).',
      'Euromonitor\'s beauty survey says premium buyers choose "premium ingredients over a premium brand by 43% to 18%". The page doesn\'t say which countries were surveyed ([Euromonitor](https://www.euromonitor.com/voice-of-the-consumer-beauty-survey-2026-key-insights/report)).',
      'Generative AI sways 8% of colour cosmetics purchasers, but only 19% see it as a highly trustworthy source of shopping information ([Euromonitor beauty survey](https://www.euromonitor.com/voice-of-the-consumer-beauty-survey-2026-key-insights/report), [Euromonitor trends](https://www.euromonitor.com/newsroom/press-releases/november-2026/global-consumer-trends-2027)).',
    ],
    faqs: [
      {
        q: 'What are the main consumer trends for 2027?',
        a: 'The 2027 reports we read point the same way: beauty is merging with wellness, shoppers want proof over a famous name, AI is starting to shape the shortlist and trust still comes from people.',
      },
      {
        q: 'How much does AI influence beauty purchases?',
        a: 'Euromonitor\'s beauty survey says generative AI already sways 8% of colour cosmetics purchasers and 15% of Beauty Innovators. Its global trends research says only 19% see GenAI as a highly trustworthy source of shopping information.',
      },
      {
        q: 'Do beauty shoppers still buy in store?',
        a: "McKinsey's Alexis Wolfer says more than two-thirds of beauty sales globally, and about 50 percent in the US, still happen in store.",
      },
      {
        q: 'What do AI tools look for in beauty products?',
        a: 'McKinsey partner Sara Hudson says LLMs pick up on functional words: how something is used, what ingredients are in it and what ingredients are not.',
      },
    ],
    h2: [
      ['## Beauty is turning into a wellness habit', '## Is beauty turning into a wellness habit?'],
      ['## Proof now beats the name on the bottle', '## Why does proof now beat the name on the bottle?'],
      ['## Trust still comes from people', '## Where does trust still come from?'],
      ['## AI is joining the shortlist, but it isn\'t trusted yet', '## Is AI joining the shortlist, and do shoppers trust it?'],
      ["## The shop counter hasn't gone away", '## Do beauty shoppers still buy in store?'],
      ['## What this means for your brand', '## What does this mean for your brand?'],
    ],
    insertBeforeCta: {
      anchor: 'Building a beauty brand for 2027?',
      block: HML,
    },
  },
};

function parseMd(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  if (!raw.startsWith('---\n')) throw new Error(`No frontmatter: ${filePath}`);
  const end = raw.indexOf('\n---\n', 4);
  const yaml = raw.slice(4, end);
  const body = raw.slice(end + 5);
  return { yaml, body, raw };
}

function setYamlField(yaml, key, value) {
  const json = JSON.stringify(value);
  const line = `${key}: ${json}`;
  const re = new RegExp(`^${key}:.*$`, 'm');
  if (re.test(yaml)) return yaml.replace(re, line);
  return `${yaml.trimEnd()}\n${line}\n`;
}

function applyPost(slug, spec) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const { yaml, body } = parseMd(filePath);
  let nextYaml = yaml;
  nextYaml = setYamlField(nextYaml, 'keyPoints', spec.keyPoints);
  nextYaml = setYamlField(nextYaml, 'keyPointsAfter', spec.keyPointsAfter);
  nextYaml = setYamlField(nextYaml, 'faqs', spec.faqs);
  if (!/keyPoints:/.test(yaml)) {
    /* added by setYamlField */
  }

  let nextBody = body;
  for (const [from, to] of spec.h2 ?? []) {
    if (!nextBody.includes(from)) {
      throw new Error(`${slug}: missing H2 ${from}`);
    }
    nextBody = nextBody.replace(from, to);
  }
  for (const [from, to] of spec.bodyReplace ?? []) {
    if (!nextBody.includes(from)) {
      throw new Error(`${slug}: missing body snippet`);
    }
    nextBody = nextBody.replace(from, to);
  }
  const { anchor, block } = spec.insertBeforeCta;
  if (!nextBody.includes(anchor)) {
    throw new Error(`${slug}: missing CTA anchor`);
  }
  if (!nextBody.includes(block.split('\n')[0])) {
    nextBody = nextBody.replace(anchor, `${block}\n\n${anchor}`);
  }

  const out = `---\n${nextYaml.trimEnd()}\n---\n${nextBody}`;
  fs.writeFileSync(filePath, out);
  console.log(`[round2] ${slug}`);
}

for (const [slug, spec] of Object.entries(ROUND2)) {
  applyPost(slug, spec);
}

const deck02 = path.join(BLOG_DIR, 'source/post-02-chatgpt-businesses-business-hub_b02a.md');
if (fs.existsSync(deck02)) {
  let deck = fs.readFileSync(deck02, 'utf8');
  deck = deck.replace('**By Rowan Blake**', 'By Rowan Blake');
  fs.writeFileSync(deck02, deck);
  console.log('[round2] post-02 deck byline unbolded');
}