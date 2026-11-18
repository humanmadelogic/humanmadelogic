import type { MetadataRoute } from 'next';
import { blogHasPublishedPosts, publishedBlogPosts } from '@/config/blog';
import { kitSlugs } from '@/config/kits';
import { indexableGuides } from '@/config/guides';
import { serviceSlugs } from '@/config/services';
import { siteConfig } from '@/config/site';

const staticRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/kits', priority: 0.88, changeFrequency: 'monthly' as const },
  { path: '/guides', priority: 0.87, changeFrequency: 'weekly' as const },
  { path: '/industries/beauty-skincare', priority: 0.84, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/cookies', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/accessibility', priority: 0.35, changeFrequency: 'yearly' as const },
  { path: '/legal', priority: 0.35, changeFrequency: 'yearly' as const },
  ...serviceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  })),
  ...kitSlugs.map((slug) => ({
    path: `/kits/${slug}`,
    priority: 0.86,
    changeFrequency: 'monthly' as const,
  })),
  ...indexableGuides().map((guide) => ({
    path: `/guides/${guide.slug}`,
    priority: 0.83,
    changeFrequency: 'monthly' as const,
  })),
  ...(blogHasPublishedPosts()
    ? [
        { path: '/blog', priority: 0.82, changeFrequency: 'weekly' as const },
        ...publishedBlogPosts().map((post) => ({
          path: `/blog/${post.slug}`,
          priority: 0.81,
          changeFrequency: 'monthly' as const,
        })),
      ]
    : []),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticRoutes.map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
