import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

/** RSS `rel=alternate` on all `/blog/*` routes (including post pages). */
export const metadata: Metadata = {
  alternates: {
    types: {
      'application/rss+xml': [
        {
          url: new URL('/blog/rss.xml', siteConfig.url),
          title: 'Human Made Logic Blog',
        },
      ],
    },
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}