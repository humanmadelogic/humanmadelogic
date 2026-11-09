import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

/** `{page} | Human Made Logic` */
export function siteTitle(page: string): string {
  return `${page} | ${siteConfig.name}`;
}

/** Home document title and default social title. */
export function homeTitle(): string {
  return `${siteConfig.coverLine} | ${siteConfig.name}`;
}

function ogImages(relativePath: string, alt: string) {
  const url = new URL(relativePath, siteConfig.url).toString();
  return [{ url, width: 1200, height: 630, alt }];
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
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noindex?: boolean;
  ogImage?: string;
}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = siteTitle(title);
  const images = ogImage ? ogImages(ogImage, fullTitle) : undefined;

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
      ...(images ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      ...(images ? { images: images.map((image) => image.url) } : {}),
    },
  };
}
