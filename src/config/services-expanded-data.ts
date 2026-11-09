import type { ServiceExpandedContent } from './services';

const heroCtas = {
  primaryCtaLabel: 'Start a project',
  primaryCtaHref: '/contact',
  secondaryCtaLabel: 'All services',
  secondaryCtaHref: '/services',
} as const;

const sharedFinalCta = {
  heading: 'Ready to be impossible to ignore?',
  body:
    "Start with a short, no-pressure fit call. Tell us where your brand feels stuck and what you want next. If we're not the right fit, we'll tell you honestly.",
  ctaLabel: 'Start a project',
  ctaHref: '/contact',
} as const;

const packageLinks = {
  servicesLinkLabel: 'Explore all services',
  contactLinkLabel: 'Ask which kit fits you',
} as const;

export const brandingExpanded: ServiceExpandedContent = {
  ogImage: '',
  hero: {
    eyebrow: '01 · Service',
    subline:
      'Distinctive brand codes that make people recognise you at a glance and name you first when a friend asks.',
    intro:
      "Most small brands don't have a visibility problem. They have a memory problem: people see them, then forget them, because they look like everyone else in the category. We build brands around distinctive codes people recognise at a glance, so every post and every ad starts adding up.",
    ...heroCtas,
    imageAlt: 'A row of plain grey bottles with one bold yellow bottle that stands out at a glance',
  },
  whoItsFor: {
    intro:
      'For founders and marketing leads in crowded categories, from DTC skincare to clinics and cafés, where every brand starts to blur.',
    painPoints: [
      {
        title: 'You look like everyone else',
        description:
          'Same soft pastels, same clean sans serif, same "clinically proven" claims. When your skincare brand could swap logos with the one in the next ad, customers can\'t pick you out.',
        imageAlt:
          'Seven identical grey pump bottles in a row, one circled in yellow but no different from the rest',
      },
      {
        title: 'People see you, then forget',
        description:
          "They scroll past your ad, maybe even like it, then can't recall your name a day later. The attention you paid for leaks away because nothing about you is distinctive enough to stick.",
        imageAlt: 'A skincare jar in focus, with blurred copies fading away behind it',
      },
      {
        title: 'Every launch looks different',
        description:
          'New serum, new look. Without a system, every campaign reinvents the colours, the type and the tone, so nothing builds on what came before.',
        imageAlt:
          'Four mismatched campaign cards taped side by side, each with a different shape, pattern and colour',
      },
    ],
  },
  whatYouGet: {
    heading: 'Your brand, built to stick',
    intro:
      'Everything here works as one system, so your brand looks and sounds like you wherever people meet it.',
    deliverables: [
      { title: 'Strategy and positioning', description: "What you stand for, who it's for and why you're different." },
      { title: 'Identity system', description: 'Logo, colour, type and the rules that hold it together.' },
      {
        title: 'Brand codes guide',
        description: 'The shapes, words and habits customers should remember you by.',
      },
      {
        title: 'Verbal identity',
        description:
          "A tone of voice, a few signature lines and the words you own, so your copy sounds like nobody else's.",
      },
      {
        title: 'Brand guidelines',
        description:
          'A practical guide your team and freelancers can actually follow, with real examples rather than rules nobody reads.',
      },
      {
        title: 'Starter templates',
        description:
          'Core layouts for your website, social posts and ads, so the new identity shows up properly from the first post.',
      },
    ],
    featureImageAlt:
      'A brand kit laid flat: guidelines book, colour swatch fan, stamp, a stack of cards topped in yellow, pencil and ruler',
  },
  howItWorks: {
    heading: 'From blur to brand codes',
    steps: [
      {
        title: 'Category audit',
        description:
          "We line you up against your category and map the colours, claims and clichés everyone shares. That shows us exactly where there's room to be different.",
      },
      {
        title: 'Positioning',
        description:
          "We agree what you should be known for and who it's for, in plain words. Every design choice after this answers to it.",
      },
      {
        title: 'Codes and identity',
        description:
          'We design the distinctive assets: logo, colour, type, shapes and voice. We check they still work small and in a fast scroll, not just on a big presentation slide.',
      },
      {
        title: 'System and handover',
        description:
          'We turn it all into guidelines and templates your team can use without us. Then we walk you through it so the system survives the next launch.',
      },
    ],
    showTimeline: false,
    showStepIcons: true,
  },
  whatChanges: {
    heading: 'What changes once it clicks',
    outcomes: [
      {
        title: "Recognised before you're read",
        description:
          "People spot your posts and ads before they read your name, because your codes do the work.",
      },
      {
        title: 'Every decision pulls together',
        description:
          'Clarity on what your brand stands for, so every decision, from your homepage to your next ad, pulls the same way.',
      },
      {
        title: 'No more reinventing',
        description:
          'A recognisable system your team can use consistently, so you stop reinventing your look every time you launch something.',
      },
    ],
  },
  howWeUseAi: {
    heading: 'AI helps. Taste decides.',
    body:
      'AI speeds up the research and the drafts. People make the calls. On a branding project that means faster category scans and more early routes to react to, while every logo, colour and line is chosen, refined and signed off by people.',
  },
  packageBand: {
    heading: 'On its own or bundled',
    body:
      "Branding works on its own if you mainly need a sharper identity. It's also the base of our Launch Kit, which adds a website or landing page and a 30 to 60 day performance or social sprint. The Local Domination Kit includes a lighter brand refresh.",
    ...packageLinks,
  },
  faq: {
    heading: 'Good questions before a rebrand',
    items: [
      {
        question: 'How long does a rebrand take?',
        answer:
          "It depends on scope, so we confirm the timeline in writing before we start. A focused identity refresh moves faster than a full repositioning with a new voice and new codes. On the fit call we'll ask what you need, what's launching when and who signs off. Then we give you a plan with clear dates.",
      },
      {
        question: 'Do I need a full rebrand or just a refresh?',
        answer:
          "Often a refresh is enough. If people already recognise something about you, we keep it and build around it, because throwing away familiar codes wastes the memory you've already earned. The category audit shows which parts are working and which are blending in, so you only change what needs changing.",
      },
      {
        question: 'What are distinctive brand codes?',
        answer:
          "They're the assets people recognise as you before they read your name: a colour, a shape, a phrase, a sound or a way of showing your product. Think of the brands that own a colour in their category. We find or create a small set of codes, then use them consistently until they're unmistakably yours.",
      },
      {
        question: 'Do you design packaging?',
        answer:
          "No. Packaging and on-shelf design aren't part of our branding service. We focus on strategy, positioning, identity and the brand codes that show up on screen and in search. If you do need packaging, your new guidelines give a packaging specialist a clear brief to work from, so everything still looks like one brand.",
      },
      {
        question: "Will this work if we're not a beauty brand?",
        answer:
          "Yes. We use skincare as an example because it's a crowded category where brands blur fast. The fundamentals are the same for clinics, trades, studios, gyms, hospitality, education and property. Every business needs to be recognised, remembered and named when someone asks for a recommendation. That's what the work is built around.",
      },
      {
        question: 'Do you work with brands outside the UK?',
        answer:
          "Yes. We work with SMB founders and marketing teams across the UK, Australia, Canada and Singapore. The work happens remotely, with calls planned around your time zone. We write in British English unless your market needs something different, and we check your codes make sense in every market you sell in.",
      },
    ],
  },
  relatedServices: {
    enabled: true,
    heading: 'Where branding goes next',
  },
  finalCta: { ...sharedFinalCta },
};

export const seoAeoGeoExpanded: ServiceExpandedContent = {
  ogImage: '',
  hero: {
    eyebrow: '02 · Service',
    subline: 'Get your brand found in search and named when customers ask AI who to trust.',
    intro:
      "Page two isn't the only place brands disappear. Customers now ask AI tools for recommendations too, and if your name isn't in the answer, you're not in the running. We make your brand easy to find and easy to name, across search engines and AI answers.",
    ...heroCtas,
    imageAlt: 'A yellow sheet pulled up to the top of a pile of plain white paper',
  },
  whoItsFor: {
    intro:
      'For brands whose customers search, compare and ask AI before they ever click buy or book.',
    painPoints: [
      {
        title: 'Buried on page two',
        description:
          'Competitors take the top spots for the searches that matter, like "best vitamin C serum UK" or "physio near me". Buyers make their choice before they ever scroll down to you.',
        imageAlt: 'A stack of blank paper with one yellow sheet buried near the bottom',
      },
      {
        title: 'Missing from AI answers',
        description:
          "Ask an AI assistant for the best moisturiser for sensitive skin and it names your competitors, not you. If AI tools can't work out who you are and what you're known for, they won't recommend you.",
        imageAlt:
          'A speech bubble listing three answers, with an empty dashed slot where a fourth should be',
      },
      {
        title: 'Traffic that never buys',
        description:
          'Visits come in, but for terms that were never going to convert. Busy analytics feel good until you notice the basket and the booking form are still empty.',
        imageAlt:
          'Streams of arrows sweeping past an empty shopping basket without stopping',
      },
    ],
  },
  whatYouGet: {
    heading: 'Found first, then named',
    intro:
      'We cover classic search work and the newer job of being understood by AI tools, in one plan.',
    deliverables: [
      {
        title: 'Search and AI visibility audit',
        description: "Where you're found, where you're missed and why, across search engines and AI answers.",
      },
      {
        title: 'Site structure and on-page SEO',
        description: 'Structure and pages that help search engines understand what you do and where.',
      },
      {
        title: 'Answer-ready content',
        description: 'Content for AEO and GEO, written to help AI tools understand and mention your brand.',
      },
      {
        title: 'Question map',
        description:
          'The searches and questions your buyers really use, grouped by intent so we chase the ones that lead to sales or bookings.',
      },
      {
        title: 'Technical fixes',
        description:
          'Speed, indexing, schema and the other behind-the-scenes issues that stop good pages being found.',
      },
      {
        title: 'Local search set-up',
        description:
          'Google Business Profile and location pages for clinics, trades and venues that rely on nearby customers.',
      },
    ],
    featureImageAlt:
      'A search kit laid flat: magnifying glass, index card box, linked tags, a pinned map and a yellow notebook',
  },
  howItWorks: {
    heading: 'How we get you found',
    steps: [
      {
        title: 'Audit search and AI',
        description:
          'We check where you rank, how your site is built and what AI assistants say when buyers ask about your category. You see the gaps in plain English.',
      },
      {
        title: 'Map the questions',
        description:
          'We list the searches and questions your buyers use. Then we pick the ones worth owning based on intent, not just volume.',
      },
      {
        title: 'Fix and build',
        description:
          'We sort the technical issues, restructure key pages and write answer-ready content with clear facts AI tools can quote.',
      },
      {
        title: 'Track and refine',
        description:
          'We watch rankings, traffic quality and how AI answers describe you. Then we adjust the plan as search keeps changing.',
      },
    ],
    showTimeline: false,
    showStepIcons: false,
  },
  whatChanges: {
    heading: 'What getting found changes',
    outcomes: [
      {
        title: 'A plan you can follow',
        description:
          "A clear view of how people find you today, plus a plan for the searches and questions your brand should own.",
      },
      {
        title: 'Found and named',
        description:
          'Pages and content built to be found and named, in search results and in the AI answers your customers read.',
      },
      {
        title: 'Visitors who mean it',
        description:
          'Traffic from people searching for what you actually sell, so visits have a real chance of turning into enquiries.',
      },
    ],
  },
  howWeUseAi: {
    heading: 'AI reads. People decide.',
    body:
      'AI speeds up the research and the drafts. People make the calls. We use it to sort large keyword lists and check how AI assistants describe your category, while a person decides which questions to own and edits every page before it goes live.',
  },
  packageBand: {
    heading: 'Solo or in a kit',
    body:
      "Take SEO/AEO/GEO on its own if your brand is sorted and you need to be found. It anchors our Authority Kit, alongside positioning, site structure and a content engine. It also powers the Local Domination Kit with Google Business Profile, local SEO, reviews and lead-gen ads.",
    ...packageLinks,
  },
  faq: {
    heading: 'Search questions, answered',
    items: [
      {
        question: "What's the difference between SEO, AEO and GEO?",
        answer:
          'SEO gets your pages ranking in search engines. AEO (answer engine optimisation) makes your content easy to lift into direct answers and featured snippets. GEO (generative engine optimisation) helps AI assistants understand your brand well enough to mention it. They overlap a lot, so we plan them together rather than selling you three separate jobs.',
      },
      {
        question: 'How long does SEO take to work?',
        answer:
          "Longer than ads, and anyone promising overnight rankings is guessing. Technical fixes can happen early, but rankings and AI mentions build as search engines recrawl your site and learn to trust your content. We agree a scoped plan with checkpoints at the start, then show you what's moving at each one.",
      },
      {
        question: 'Can you guarantee a top ranking on Google?',
        answer:
          "No, and you should be wary of anyone who does. Nobody controls Google's results or what AI assistants say. What we can do is fix what's holding your site back, build pages around real buyer questions and make your brand clear enough that search engines and AI tools have good reason to show it.",
      },
      {
        question: 'How do I get my brand mentioned by ChatGPT and other AI tools?',
        answer:
          'Make it easy for them to understand you. That means clear, consistent facts about who you are and what you offer, pages that answer real questions directly and a presence on the sites AI tools already trust. We start by checking what AI assistants say about your category today, then close the gaps.',
      },
      {
        question: 'Do you do local SEO for clinics and trades?',
        answer:
          "Yes. For businesses that rely on nearby customers, we set up and tidy your Google Business Profile, build location pages that aren't copy-pasted and help you ask for reviews in a way that feels natural. It's the core of our Local Domination Kit, which adds lead-gen ads and a light brand refresh.",
      },
      {
        question: 'Can you do SEO for Australia, Canada or Singapore?',
        answer:
          'Yes. We work with SMBs across the UK, Australia, Canada and Singapore. Search behaves differently in each. Spelling, local terms, competitors and even the questions people ask AI tools can change by market. So we research each market you sell in rather than copying a UK plan across.',
      },
    ],
  },
  relatedServices: {
    enabled: true,
    heading: 'Turn found into chosen',
  },
  finalCta: { ...sharedFinalCta },
};

export const performanceMarketingExpanded: ServiceExpandedContent = {
  ogImage: '',
  hero: {
    eyebrow: '03 · Service',
    subline:
      "Ads people remember, landing pages that don't leak and reporting that tells you what to do next.",
    intro:
      "Plenty of ad budgets buy attention nobody keeps. The ads look like the category, the landing page is fuzzy, and the spend resets every month. We run campaigns that turn attention into measurable growth, with creative people remember and a next step that doesn't leak.",
    ...heroCtas,
    imageAlt:
      'A hand tipping coins from a jar, their trail now one clean yellow path heading upwards',
  },
  whoItsFor: {
    intro:
      'For founders and marketing leads already spending on ads, or about to, who want that spend to build something that lasts.',
    painPoints: [
      {
        title: 'Ad spend with no story',
        description:
          "Money goes out every month across Meta and Google, but nobody can say clearly what's working. The dashboard is full of numbers and short on answers.",
        imageAlt: 'A hand tipping coins from a jar, their trail tangling into a knot',
      },
      {
        title: 'Creative that burns out fast',
        description:
          "Your best ad stops working within days and there's nothing ready to replace it. Without a steady pipeline of new creative, you end up paying to show people the same tired thing.",
        imageAlt: 'A rubber stamp repeating the same mark, each print fainter than the last',
      },
      {
        title: "Clicks that don't convert",
        description:
          'The ads do their job and the clicks arrive. Then a slow, vague landing page loses people before they buy, book or enquire.',
        imageAlt: 'Cursors arriving at a blank page and turning straight back out',
      },
    ],
  },
  whatYouGet: {
    heading: 'Spend that builds something',
    intro:
      'Strategy, creative, landing pages and reporting, run as one loop instead of four separate suppliers.',
    deliverables: [
      {
        title: 'Campaign strategy',
        description: 'A plan across the paid channels that suit your audience, budget and goals.',
      },
      {
        title: 'Ad creative on your codes',
        description: "Creative built on your brand codes, so it doesn't look like everyone else's.",
      },
      {
        title: 'Landing pages and conversion fixes',
        description: 'Pages and fixes that give every click a clear next step.',
      },
      {
        title: 'Creative testing pipeline',
        description:
          'A steady flow of new hooks, formats and variations, so a fresh ad is ready before the old one tires.',
      },
      {
        title: 'Tracking set-up',
        description:
          'Pixels, conversion events and analytics checked and fixed, so the numbers you see are numbers you can trust.',
      },
      {
        title: 'Reporting you can act on',
        description: "Plain-English updates on what's working, what isn't and what we'll test next.",
      },
    ],
    featureImageAlt:
      'A campaign kit laid flat: folder, a clipped pair of proofs with one in yellow, page proofs, counters and a ruler',
  },
  howItWorks: {
    heading: 'How the loop runs',
    steps: [
      {
        title: 'Audit the account',
        description:
          'We go through your ad accounts, tracking and landing pages to find where money and clicks are leaking. You get a plain list of fixes in priority order.',
      },
      {
        title: 'Plan the tests',
        description:
          'We set clear goals, pick the channels and decide which ideas, audiences and offers to test first.',
      },
      {
        title: 'Launch and learn',
        description:
          "We launch creative built on your brand codes alongside sharper landing pages. Then we read the results honestly, including what didn't work.",
      },
      {
        title: 'Refresh and scale',
        description:
          'Winning ideas get more budget and new variations. Tired ads get replaced before they drag the account down.',
      },
    ],
    showTimeline: false,
    showStepIcons: false,
  },
  whatChanges: {
    heading: 'What better ads change',
    outcomes: [
      {
        title: 'Numbers with a story',
        description:
          "Campaigns you can measure properly, with clear reporting on what's working, what isn't and what we'll test next.",
      },
      {
        title: 'Each campaign helps the next',
        description:
          'Ads that build recognition as well as clicks, so each campaign gives the next one a head start.',
      },
      {
        title: 'Clicks with somewhere to go',
        description:
          'Landing pages that give visitors a clear reason to buy, book or enquire, so fewer clicks go to waste.',
      },
    ],
  },
  howWeUseAi: {
    heading: 'AI drafts. People judge.',
    body:
      'AI speeds up the research and the drafts. People make the calls. We use it to spin up ad variations and spot patterns in campaign data faster, while a person decides which ideas are on brand, what gets budget and what gets switched off.',
  },
  packageBand: {
    heading: 'Run it solo or bundled',
    body:
      "Run performance marketing on its own if your brand and site are ready for paid traffic. It can be the 30 to 60 day sprint in our Launch Kit, straight after a new brand and site. It's also the lead-gen engine in the Local Domination Kit.",
    ...packageLinks,
  },
  faq: {
    heading: 'Ad questions, straight answers',
    items: [
      {
        question: 'How much should I spend on ads?',
        answer:
          "Enough to learn something, then more only once it's working. The right budget depends on your channels, your margins and how much testing you need, so we don't quote a magic figure. On the fit call we'll look at your goals and current spend, then recommend a starting budget you're comfortable with.",
      },
      {
        question: 'Which ad platforms do you use?',
        answer:
          "The ones your buyers actually use. For a DTC skincare brand that's often Meta, with Google Search catching people who already know what they want. A clinic or trade usually leans on Google Search and local campaigns. We recommend channels after the audit, not before, so the plan fits your business rather than our habits.",
      },
      {
        question: 'Do you make the ad creative too?',
        answer:
          "Yes. Creative does a lot of the heavy lifting in paid social, so we don't treat it as an afterthought. We build ads on your brand codes so they look like you, then keep new hooks and formats coming. That way you're never stuck running one tired ad for months because nothing else is ready.",
      },
      {
        question: 'How quickly will I see results?',
        answer:
          "You'll see data quickly, but reliable results take longer. The first stretch of any campaign is about testing what works for your audience, offer and market. We agree what success looks like before launch, report on it in plain English and tell you honestly when something isn't working, along with what we'll change.",
      },
      {
        question: 'Will you work in our existing ad accounts?',
        answer:
          "Yes, and we'd recommend it. Your ad accounts, pixels and data should belong to your business. We'll ask for access to the accounts you already have, or help you set up new ones in your own name. That way everything stays yours, including the history and the learnings, whoever runs it later.",
      },
      {
        question: 'Can you run ads in more than one country?',
        answer:
          "Yes. We work with SMBs across the UK, Australia, Canada and Singapore. Campaigns can target one market or several. Each one needs its own look at audiences, currency, spelling and timing. So we plan markets separately instead of pasting the same ads everywhere, and we'll help you decide which market to start with.",
      },
    ],
  },
  relatedServices: {
    enabled: true,
    heading: 'Ads land better with these',
  },
  finalCta: { ...sharedFinalCta },
};

export const socialMediaExpanded: ServiceExpandedContent = {
  ogImage: '',
  hero: {
    eyebrow: '04 · Service',
    subline: 'Fewer, better posts with a voice people recognise before they see your name.',
    intro:
      "Posting more isn't the same as being remembered. Bursts of content followed by silence teach your audience nothing. We build social presences that are fewer, better and easy to recognise: a clear voice, ideas worth repeating and a rhythm your team can actually keep up with.",
    ...heroCtas,
    imageAlt: 'Three bold, matching post cards taped up side by side, clearly part of one set',
  },
  whoItsFor: {
    intro:
      "For founders and small teams who post a lot, hear very little back and wonder what it's all for.",
    painPoints: [
      {
        title: 'Posting without a point',
        description:
          "The calendar is full but there's no clear idea or voice holding it together. Each post is fine on its own and forgettable as a set.",
        imageAlt: 'A calendar crammed with random, unrelated shapes in every day',
      },
      {
        title: 'Followers who never engage',
        description:
          "The audience is there, but the comments are quiet and the likes don't turn into sales. People follow you, then scroll straight past.",
        imageAlt: 'A full audience seen from behind, with an empty heart outline above them',
      },
      {
        title: 'No time to keep up',
        description:
          'Social needs more content than a founder or small team can make between everything else. So it slips, comes back in a burst and slips again.',
        imageAlt:
          'A tired person at a laptop late at night beside a long to-do list with nothing ticked',
      },
    ],
  },
  whatYouGet: {
    heading: 'Posts people would miss',
    intro:
      'A system that makes posting easier and more recognisable, built around a rhythm your team can keep.',
    deliverables: [
      {
        title: 'Social strategy',
        description: 'The few ideas, formats and channels actually worth your time.',
      },
      {
        title: 'Content system',
        description: 'Templates, voice rules and visual codes every post is built on.',
      },
      {
        title: 'Posting calendar',
        description: 'Written posts and creative, planned around a rhythm you can sustain.',
      },
      {
        title: 'Signature formats',
        description:
          'A few repeatable series your audience learns to recognise, so you never start from a blank page.',
      },
      {
        title: 'Platform-native creative',
        description:
          'Posts, carousels and short videos shaped for each platform rather than one asset stretched across all of them.',
      },
      {
        title: 'Regular reviews',
        description: "A plain read of what landed, what didn't and what we'll change next.",
      },
    ],
    featureImageAlt:
      'A content kit laid flat: folder, a grid of square cards with one yellow, a blank calendar and paper stars',
  },
  howItWorks: {
    heading: 'How we build your rhythm',
    steps: [
      {
        title: 'Social audit',
        description:
          'We look at what you post, what gets a reaction and what your competitors repeat. Then we find the gap where your brand can stand out.',
      },
      {
        title: 'Voice and formats',
        description:
          'We define your tone, your visual codes and a few signature formats, so every post is recognisably yours.',
      },
      {
        title: 'Batch and approve',
        description:
          "We plan and create posts in batches, well ahead of time. Nothing goes out until you've approved it.",
      },
      {
        title: 'Post, learn, refine',
        description:
          'We keep the rhythm going, review what landed and adjust the formats so your social gets sharper over time.',
      },
    ],
    showTimeline: false,
    showStepIcons: false,
  },
  whatChanges: {
    heading: 'What a steady rhythm changes',
    outcomes: [
      {
        title: 'Recognised in the feed',
        description:
          'A social presence people recognise before they read your name, built on ideas worth repeating rather than trends.',
      },
      {
        title: 'Off the hamster wheel',
        description:
          'A rhythm you can keep up with, so social stops feeling like a hamster wheel and starts compounding.',
      },
      {
        title: 'Posts worth replying to',
        description:
          'Content that gives people something to react to, so your audience has a reason to join in.',
      },
    ],
  },
  howWeUseAi: {
    heading: 'AI assists. Your voice leads.',
    body:
      "AI speeds up the research and the drafts. People make the calls. We use it to scan what's trending in your category and draft first versions of captions faster, while a person shapes every idea, edits every line in your voice and decides what's worth posting.",
  },
  packageBand: {
    heading: 'Just social, or more',
    body:
      'Take social media on its own if your brand is clear and you need a steady rhythm. It can also be the sprint in our Launch Kit, with 30 to 60 days of focused posting straight after a new brand and site go live.',
    ...packageLinks,
  },
  faq: {
    heading: 'Social questions, honestly answered',
    items: [
      {
        question: 'How often should my brand post?',
        answer:
          "As often as you can keep up with good ideas. A steady rhythm people can learn beats bursts of daily posting followed by weeks of silence. We'll set a frequency that suits your channels and your team's capacity, then build the content system that makes it sustainable rather than something you dread every Monday.",
      },
      {
        question: 'Which platforms should we be on?',
        answer:
          "Fewer than you think. It's usually better to show up well on one or two platforms than thinly on five. For a skincare brand that might be Instagram and TikTok. For a clinic, trade or professional firm it could be Instagram, Facebook or LinkedIn. We decide after the audit, based on where your buyers spend time.",
      },
      {
        question: 'Do you write the posts and make the creative?',
        answer:
          "Yes. We plan the calendar, write the captions and create the visuals, all built on your templates and brand codes. You approve everything before it goes out. If you already have photos, video or a team member who loves being on camera, we'll build that in rather than replace it.",
      },
      {
        question: 'Can you make us go viral?',
        answer:
          "No, and we wouldn't build a plan around it. Viral moments are mostly luck and timing. What we can build is a recognisable presence: a clear voice, repeatable formats and codes people spot in a fast scroll. That's what keeps working long after a lucky post has been forgotten.",
      },
      {
        question: 'Is social worth it for a clinic or local business?',
        answer:
          'Yes, if it shows people who you are. For clinics, trades, gyms and hospitality, social works as proof: the team, the space, the work and the answers to questions customers ask. People often check you out there before they book. We plan content that builds trust locally as well as recognition.',
      },
      {
        question: 'What do you need from us?',
        answer:
          "A little time and honest feedback. We'll need a kick-off session to understand your brand, access to your accounts or a shared approval process and someone who can sign off posts. Your product knowledge and photos help a lot. We handle the planning, writing and creative, so you're not stuck doing it at midnight.",
      },
    ],
  },
  relatedServices: {
    enabled: true,
    heading: 'Keep the codes working',
  },
  finalCta: { ...sharedFinalCta },
};
