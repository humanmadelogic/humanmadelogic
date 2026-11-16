#!/usr/bin/env node
/**
 * Validate JSON-LD on sitemap routes: parse, forbidden strings, @graph types, canonical alignment.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BUILD_PAGES = path.join(ROOT, '.next/server/app');

const SITE = 'https://humanmadelogic.com';

const ROUTES = [
  { route: '/', file: 'index.html', expect: ['Organization', 'WebSite', 'WebPage', 'FAQPage', 'Person'] },
  { route: '/services', file: 'services.html', expect: ['Organization', 'WebSite', 'CollectionPage', 'BreadcrumbList', 'ItemList'] },
  { route: '/about', file: 'about.html', expect: ['Organization', 'WebSite', 'AboutPage', 'BreadcrumbList'] },
  { route: '/contact', file: 'contact.html', expect: ['Organization', 'WebSite', 'ContactPage', 'BreadcrumbList'] },
  { route: '/privacy', file: 'privacy.html', expect: ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList'] },
  { route: '/cookies', file: 'cookies.html', expect: ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList'] },
  { route: '/terms', file: 'terms.html', expect: ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList'] },
  { route: '/accessibility', file: 'accessibility.html', expect: ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList'] },
  { route: '/legal', file: 'legal.html', expect: ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList'] },
  { route: '/services/branding', file: path.join('services', 'branding.html'), expect: ['Organization', 'WebSite', 'Service', 'WebPage', 'BreadcrumbList', 'FAQPage'] },
  { route: '/services/seo-aeo-geo', file: path.join('services', 'seo-aeo-geo.html'), expect: ['Organization', 'WebSite', 'Service', 'WebPage', 'BreadcrumbList', 'FAQPage'] },
  { route: '/services/performance-marketing', file: path.join('services', 'performance-marketing.html'), expect: ['Organization', 'WebSite', 'Service', 'WebPage', 'BreadcrumbList', 'FAQPage'] },
  { route: '/services/social-media', file: path.join('services', 'social-media.html'), expect: ['Organization', 'WebSite', 'Service', 'WebPage', 'BreadcrumbList', 'FAQPage'] },
  {
    route: '/kits',
    file: path.join('kits.html'),
    expect: ['Organization', 'WebSite', 'CollectionPage', 'BreadcrumbList', 'ItemList', 'FAQPage'],
  },
  {
    route: '/kits/launch-kit',
    file: path.join('kits', 'launch-kit.html'),
    expect: ['Organization', 'WebSite', 'Service', 'WebPage', 'BreadcrumbList', 'FAQPage'],
  },
  {
    route: '/kits/authority-kit',
    file: path.join('kits', 'authority-kit.html'),
    expect: ['Organization', 'WebSite', 'Service', 'WebPage', 'BreadcrumbList', 'FAQPage'],
  },
  {
    route: '/kits/local-domination-kit',
    file: path.join('kits', 'local-domination-kit.html'),
    expect: ['Organization', 'WebSite', 'Service', 'WebPage', 'BreadcrumbList', 'FAQPage'],
  },
  {
    route: '/guides',
    file: path.join('guides.html'),
    expect: ['Organization', 'WebSite', 'CollectionPage', 'BreadcrumbList', 'ItemList'],
  },
  {
    route: '/guides/seo-vs-aeo-vs-geo',
    file: path.join('guides', 'seo-vs-aeo-vs-geo.html'),
    expect: ['Organization', 'WebSite', 'Article', 'WebPage', 'BreadcrumbList', 'FAQPage'],
    guideArticle: true,
  },
  {
    route: '/guides/how-to-get-your-brand-cited-by-chatgpt',
    file: path.join('guides', 'how-to-get-your-brand-cited-by-chatgpt.html'),
    expect: ['Organization', 'WebSite', 'Article', 'WebPage', 'BreadcrumbList', 'FAQPage'],
    guideArticle: true,
  },
  {
    route: '/industries/beauty-skincare',
    file: path.join('industries', 'beauty-skincare.html'),
    expect: ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList', 'FAQPage'],
  },
];

const ORG_ID = 'https://humanmadelogic.com/#organization';
const FOUNDER_ID = 'https://humanmadelogic.com/#founder';

function extractJsonLd(html) {
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  const blocks = [];
  let m;
  while ((m = re.exec(html))) {
    blocks.push(JSON.parse(m[1]));
  }
  return blocks;
}

function collectTypes(block) {
  const types = new Set();
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (node['@type']) {
      const t = node['@type'];
      if (Array.isArray(t)) t.forEach((x) => types.add(x));
      else types.add(t);
    }
    for (const v of Object.values(node)) walk(v);
  };
  walk(block);
  return types;
}

function extractCanonical(html) {
  const m = html.match(/<link rel="canonical" href="([^"]+)"/);
  return m?.[1] ?? null;
}

function main() {
  let failed = 0;
  const report = [];

  for (const { route, file, expect, optional, guideArticle } of ROUTES) {
    const htmlPath = path.join(BUILD_PAGES, file);
    if (!fs.existsSync(htmlPath)) {
      if (optional) {
        console.log(`SKIP ${route} (not built yet)`);
        continue;
      }
      console.error(`MISSING build artifact ${htmlPath} (run npm run build first)`);
      failed += 1;
      continue;
    }
    const html = fs.readFileSync(htmlPath, 'utf8');
    const canonical = extractCanonical(html);
    const expectedCanonical =
      route === '/' ? SITE : new URL(route, SITE).toString();

    if (canonical !== expectedCanonical) {
      console.error(`FAIL ${route}: canonical ${canonical} !== ${expectedCanonical}`);
      failed += 1;
    }

    const blocks = extractJsonLd(html);
    const raw = JSON.stringify(blocks);
    if (/TODO|PLACEHOLDER/i.test(raw)) {
      console.error(`FAIL ${route}: JSON-LD contains TODO or PLACEHOLDER`);
      failed += 1;
    }
    if (raw.includes('ProfessionalService') || raw.includes('LocalBusiness')) {
      console.error(`FAIL ${route}: forbidden LocalBusiness types`);
      failed += 1;
    }
    if (raw.includes('#author-rowan-blake')) {
      console.error(`FAIL ${route}: Rowan Blake must not appear in JSON-LD`);
      failed += 1;
    }
    if (guideArticle) {
      const articleAuthor = blocks
        .flatMap((b) => (b['@graph'] ? b['@graph'] : [b]))
        .find((n) => n['@type'] === 'Article');
      if (!articleAuthor || articleAuthor.author?.['@id'] !== ORG_ID) {
        console.error(`FAIL ${route}: Article.author must reference ${ORG_ID}`);
        failed += 1;
      }
      const pageNode = blocks
        .flatMap((b) => (b['@graph'] ? b['@graph'] : [b]))
        .find((n) => n['@type'] === 'WebPage' && String(n['@id'] || '').includes('/guides/'));
      if (!pageNode || pageNode.reviewedBy?.['@id'] !== FOUNDER_ID) {
        console.error(`FAIL ${route}: WebPage.reviewedBy must reference ${FOUNDER_ID}`);
        failed += 1;
      }
    }

    const types = new Set();
    blocks.forEach((b) => collectTypes(b).forEach((t) => types.add(t)));

    const orgCount = blocks.filter((b) => JSON.stringify(b).includes('"@id":"https://humanmadelogic.com/#organization"')).length;
    if (orgCount < 1) {
      console.error(`FAIL ${route}: no Organization @id in graph`);
      failed += 1;
    }

    for (const need of expect) {
      if (!types.has(need)) {
        console.error(`FAIL ${route}: missing @type ${need} (have ${[...types].join(', ')})`);
        failed += 1;
      }
    }

    for (const block of blocks) {
      const str = JSON.stringify(block);
      const urlMatches = [...str.matchAll(/"url":"(https:\/\/humanmadelogic\.com[^"]*)"/g)].map((x) => x[1]);
      for (const url of urlMatches) {
        if (url !== SITE && !url.startsWith(`${SITE}/`)) {
          console.error(`FAIL ${route}: unexpected url ${url}`);
          failed += 1;
        }
      }
    }

    report.push({ route, canonical, types: [...types].sort() });
    console.log(`OK ${route} types=${[...types].sort().join(',')}`);
  }

  const out = path.join(ROOT, '.json-ld-validation.json');
  fs.writeFileSync(out, JSON.stringify({ report }, null, 2));
  if (failed) {
    console.error(`${failed} validation error(s)`);
    process.exit(1);
  }
  console.log(`Wrote ${out}`);
}

main();
