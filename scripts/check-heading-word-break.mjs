import { chromium } from 'playwright';

const base = process.env.BASE_URL ?? 'http://127.0.0.1:3000';
const widths = [360, 768, 1024, 1280, 1440];
const serviceSlugs = ['branding', 'seo-aeo-geo', 'performance-marketing', 'social-media'];
const kitSlugs = ['launch-kit', 'authority-kit', 'local-domination-kit'];
const guideSlugs = ['seo-vs-aeo-vs-geo', 'how-to-get-your-brand-cited-by-chatgpt'];

const routes = [
  '/',
  '/about',
  '/accessibility',
  '/contact',
  '/cookies',
  '/legal',
  '/pricing',
  '/privacy',
  '/terms',
  '/services',
  ...serviceSlugs.map((slug) => `/services/${slug}`),
  '/kits',
  ...kitSlugs.map((slug) => `/kits/${slug}`),
  '/guides',
  ...guideSlugs.map((slug) => `/guides/${slug}`),
  '/blog',
  '/industries/beauty-skincare',
];

/** Returns failures: { route, width, tag, word, snippet } */
const evaluateHeadings = () => {
  function wordUnitFailures(heading) {
    const units = [...heading.querySelectorAll('.h3-word, .home-v2-word, .hml-word')].filter(
      (el) => !el.closest('.sr-only'),
    );
    const fails = [];
    for (const el of units) {
      const range = document.createRange();
      range.selectNodeContents(el);
      const rects = [...range.getClientRects()].filter((r) => r.width > 0.5 && r.height > 0.5);
      const tops = [...new Set(rects.map((r) => Math.round(r.top)))];
      if (tops.length > 1) {
        fails.push({
          word: (el.textContent || '').trim(),
          snippet: (heading.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 96),
        });
      }
    }
    return fails;
  }

  function textNodesIn(root) {
    const nodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (node.parentElement?.closest('.sr-only')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    let n;
    while ((n = walker.nextNode())) {
      if ((n.textContent || '').trim()) nodes.push(n);
    }
    return nodes;
  }

  function failuresForHeading(heading) {
    if (heading.closest('.guide-article-prose')) return [];
    if (heading.hasAttribute('data-guide-display-headline')) return [];

    const style = window.getComputedStyle(heading);
    if (style.display === 'none' || style.visibility === 'hidden') return [];
    const rect = heading.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return [];

    const hasUnits = heading.querySelector('.h3-word, .home-v2-word, .hml-word');
    if (hasUnits) return wordUnitFailures(heading);

    const root = heading.querySelector(':scope > span[aria-hidden="true"]') || heading;
    const textNodes = textNodesIn(root);
    if (textNodes.length === 0) return [];

    let fullText = '';
    const spans = [];
    for (const node of textNodes) {
      const text = node.textContent || '';
      spans.push({ node, start: fullText.length, text });
      fullText += text;
    }

    const words = fullText.match(/\S+/g) || [];
    const fails = [];
    let searchFrom = 0;

    for (const word of words) {
      const idx = fullText.indexOf(word, searchFrom);
      if (idx < 0) continue;
      searchFrom = idx + word.length;

      let startNode = null;
      let startOffset = 0;
      let endNode = null;
      let endOffset = 0;
      const endIdx = idx + word.length;

      for (const span of spans) {
        const end = span.start + span.text.length;
        if (idx >= span.start && idx < end) {
          startNode = span.node;
          startOffset = idx - span.start;
        }
        if (endIdx > span.start && endIdx <= end) {
          endNode = span.node;
          endOffset = endIdx - span.start;
        }
      }

      if (!startNode || !endNode) continue;

      const range = document.createRange();
      range.setStart(startNode, startOffset);
      range.setEnd(endNode, endOffset);
      const rects = [...range.getClientRects()].filter((r) => r.width > 0.5 && r.height > 0.5);
      const tops = [...new Set(rects.map((r) => Math.round(r.top)))];
      if (tops.length > 1) {
        fails.push({
          word,
          snippet: (heading.textContent || '').trim().slice(0, 96),
        });
      }
    }
    return fails;
  }

  const all = [];
  for (const heading of document.querySelectorAll('h1, h2, h3')) {
    if (heading.closest('.sr-only')) continue;
    const tag = heading.tagName.toLowerCase();
    for (const fail of failuresForHeading(heading)) {
      all.push({ tag, ...fail });
    }
  }
  return all;
};

const evaluateHeadingHierarchy = () => {
  const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].filter(
    (h) => !h.closest('.sr-only'),
  );
  const visible = headings.filter((h) => {
    const style = window.getComputedStyle(h);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    const rect = h.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0;
  });

  const fails = [];
  const h1s = visible.filter((h) => h.tagName === 'H1');
  if (h1s.length !== 1) {
    fails.push({ kind: 'h1-count', detail: `expected 1 visible h1, found ${h1s.length}` });
  }

  let prev = 0;
  for (const h of visible) {
    const level = Number.parseInt(h.tagName.slice(1), 10);
    const label = (h.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 72);
    if (prev === 0) {
      if (level !== 1) {
        fails.push({ kind: 'first-heading', detail: `first visible heading is ${h.tagName}, expected H1 — "${label}"` });
      }
    } else if (level > prev + 1) {
      fails.push({
        kind: 'level-skip',
        detail: `skipped from H${prev} to ${h.tagName} — "${label}"`,
      });
    }
    prev = level;
  }
  return fails;
};

const hierarchyRoutes = new Set([
  '/kits',
  ...kitSlugs.map((slug) => `/kits/${slug}`),
  '/guides',
  ...guideSlugs.map((slug) => `/guides/${slug}`),
  '/blog',
  '/industries/beauty-skincare',
]);

const browser = await chromium.launch();
const page = await browser.newPage();
let totalFailures = 0;
let hierarchyFailures = 0;

const runtimeErrors = [];
page.on('pageerror', (err) => runtimeErrors.push(err.message));

async function assertProductionReady(probeRoute) {
  runtimeErrors.length = 0;
  const url = `${base}${probeRoute}`;
  const res = await page
    .goto(url, { waitUntil: 'networkidle', timeout: 90000 })
    .catch(() => null);
  if (!res || res.status() >= 400) {
    console.error(`FAIL runtime ${probeRoute}: HTTP ${res?.status() ?? 'error'} at ${url}`);
    console.error('Start a single fresh server after `npm run build` (e.g. `npm run start`) and retry.');
    await browser.close();
    process.exit(1);
  }
  const badShell = await page.evaluate(() => {
    const text = document.body?.innerText ?? '';
    if (text.includes('Application error: a client-side exception has occurred')) return 'next-error-overlay';
    const h1 = [...document.querySelectorAll('h1')].filter((h) => !h.closest('.sr-only'));
    if (h1.length === 0) return 'missing-h1';
    return null;
  });
  if (badShell || runtimeErrors.some((m) => m.includes('ChunkLoadError') || m.includes('Loading chunk'))) {
    console.error(`FAIL runtime ${probeRoute}: ${badShell ?? 'chunk-load-error'}`);
    for (const m of runtimeErrors.slice(0, 3)) {
      console.error(`  ${m.split('\n')[0]}`);
    }
    console.error(
      'This is usually a stale or duplicate `next start` on the port. Stop other servers, rebuild, and start one server.',
    );
    await browser.close();
    process.exit(1);
  }
}

await assertProductionReady('/kits');

for (const route of routes) {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    const url = `${base}${route}`;
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch(() => null);
    if (!res || res.status() >= 400) {
      console.log(`skip ${route} @${width} (status ${res?.status() ?? 'error'})`);
      continue;
    }
    await page.waitForTimeout(150);

    if (hierarchyRoutes.has(route) && width === widths[0]) {
      const hierarchyFails = await page.evaluate(evaluateHeadingHierarchy);
      if (hierarchyFails.length > 0) {
        hierarchyFailures += hierarchyFails.length;
        console.log(`FAIL hierarchy ${route}`);
        for (const f of hierarchyFails) {
          console.log(`  ${f.kind}: ${f.detail}`);
        }
      }
    }

    const fails = await page.evaluate(evaluateHeadings);
    if (fails.length > 0) {
      totalFailures += fails.length;
      console.log(`FAIL word-break ${route} @${width}px`);
      for (const f of fails) {
        console.log(`  ${f.tag}: "${f.word}" in "${f.snippet}"`);
      }
    }
  }
}

await browser.close();

if (hierarchyFailures > 0) {
  console.error(`\n${hierarchyFailures} heading hierarchy issue(s) on kits/guides/industries routes.`);
  process.exit(1);
}

if (totalFailures > 0) {
  console.error(`\n${totalFailures} mid-word heading break(s) found.`);
  process.exit(1);
}

console.log(
  `OK — heading hierarchy on ${hierarchyRoutes.size} routes; no mid-word breaks on ${routes.length} routes × ${widths.length} widths.`,
);