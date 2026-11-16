import { indexableGuides } from '@/config/guides';
import { siteConfig } from '@/config/site';
import { guideUpdatedLine } from '@/lib/hml/guideDates';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';

export function GET() {
  const hub = loadCopyMap('guides-hub.json');
  const items = indexableGuides()
    .map((guide) => {
      const copy = loadCopyMap(guide.copyFile);
      const url = new URL(`/guides/${guide.slug}`, siteConfig.url).toString();
      const updated = guideUpdatedLine(guide.publishedAt, copy[`${guide.prefix}-UPDATED`]);
      return `    <item>
      <title><![CDATA[${copy[`${guide.prefix}-H1`]}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description><![CDATA[${copy[`${guide.prefix}-META-DESC`]}]]></description>
      <pubDate>${guide.publishedAt ?? updated}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.name} — Guides</title>
    <link>${new URL('/guides', siteConfig.url)}</link>
    <description>${hub['GUIDES-META-DESC']}</description>
    <language>en-gb</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}