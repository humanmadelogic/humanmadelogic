import { buildBlogRssXml } from '@/lib/hml/blogRss';

export function GET() {
  const xml = buildBlogRssXml();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}