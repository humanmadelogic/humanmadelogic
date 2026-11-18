import { publishedBlogPosts } from '@/config/blog';
import { siteConfig } from '@/config/site';
import { blogRssPubDate } from '@/lib/hml/blogDates';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';

/** RSS 2.0 channel document (empty `<channel>` items while there are no published posts). */
export function buildBlogRssXml(): string {
  const hub = loadCopyMap('blog-hub.json');
  const channelLink = new URL('/blog', siteConfig.url).toString();
  const items = publishedBlogPosts()
    .map((post) => {
      const url = new URL(`/blog/${post.slug}`, siteConfig.url).toString();
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${blogRssPubDate(post.date)}</pubDate>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.name} — Blog</title>
    <link>${channelLink}</link>
    <description>${hub['BLOG-META-DESC']}</description>
    <language>en-gb</language>
${items}
  </channel>
</rss>`;
}