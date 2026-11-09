import { chromium } from 'playwright';
import path from 'node:path';

const base = process.env.BASE_URL ?? 'http://127.0.0.1:3000';
const widths = [360, 768, 1024, 1280, 1440];
const serviceSlugs = ['branding', 'seo-aeo-geo', 'performance-marketing', 'social-media'];

const routes = [
  '/',
  '/about',
  '/accessibility',
  '/contact',
  '/cookies',
  '/legal',
  '/mcp',
  '/pricing',
  '/privacy',
  '/services',
  '/terms',
  ...serviceSlugs.map((slug) => `/services/${slug}`),
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

const browser = await chromium.launch();
const page = await browser.newPage();
let totalFailures = 0;

for (const route of routes) {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    const url = `${base}${route}`;
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(() => null);
    if (!res || res.status() >= 400) {
      console.log(`skip ${route} @${width} (status ${res?.status() ?? 'error'})`);
      continue;
    }
    await page.waitForTimeout(300);
    const fails = await page.evaluate(evaluateHeadings);
    if (fails.length > 0) {
      totalFailures += fails.length;
      console.log(`FAIL ${route} @${width}px`);
      for (const f of fails) {
        console.log(`  ${f.tag}: "${f.word}" in "${f.snippet}"`);
      }
    }
  }
}

await browser.close();

if (totalFailures > 0) {
  console.error(`\n${totalFailures} mid-word heading break(s) found.`);
  process.exit(1);
}

console.log(`OK — no mid-word breaks in h1/h2/h3 on ${routes.length} routes × ${widths.length} widths.`);
