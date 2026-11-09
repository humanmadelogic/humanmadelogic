import type { MetadataRoute } from 'next';
import { serviceSlugs } from '@/config/services';
import { siteConfig } from '@/config/site';

const staticRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  ...serviceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  })),
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
