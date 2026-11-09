import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

/** `{page} | Human Made Logic` */
export function siteTitle(page: string): string {
  return `${page} | ${siteConfig.name}`;
}

/** Home document title and default social title. */
export function homeTitle(): string {
  return `${siteConfig.name} | ${siteConfig.coverLine}`;
}

/**
 * Page metadata: pass a short page title only (no brand). The root layout
 * template appends ` | Human Made Logic` for the document title.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  type = 'website',
  publishedTime,
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noindex?: boolean;
}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = siteTitle(title);

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'en_GB',
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
