import type { Metadata, Viewport } from 'next';
import { Archivo, Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/AppShell';
import { siteConfig } from '@/config/site';
import { homeTitle } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-serif',
});

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homeTitle(),
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'branding agency',
    'performance marketing agency',
    'SEO agency',
    'AEO',
    'GEO',
    'social media agency',
    'SMB marketing UK',
    'beauty branding',
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  alternates: { canonical: '/' },
  referrer: 'origin-when-cross-origin',
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: homeTitle(),
    description: siteConfig.description,
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle(),
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'Branding and marketing agency',
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#f6f4ef',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${instrumentSerif.variable} ${archivo.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
