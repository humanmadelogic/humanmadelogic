import type { CopyPhraseLink } from '@/lib/hml/copyRichText';
import type { KitSlug } from '@/config/kits';

export const kitAltBodyLinks: Record<KitSlug, CopyPhraseLink[]> = {
  'launch-kit': [
    { phrase: 'Branding', href: '/services/branding' },
    { phrase: 'Performance marketing', href: '/services/performance-marketing' },
    { phrase: 'Social media', href: '/services/social-media' },
    { phrase: 'Authority Kit', href: '/kits/authority-kit' },
  ],
  'authority-kit': [
    { phrase: 'SEO/AEO/GEO', href: '/services/seo-aeo-geo' },
    { phrase: 'Local Domination Kit', href: '/kits/local-domination-kit' },
  ],
  'local-domination-kit': [],
};

export const localDominationExtraLinks: CopyPhraseLink[] = [
  {
    phrase: "Google's help page",
    href: 'https://support.google.com/business/answer/7091?hl=en-GB',
    external: true,
  },
  {
    phrase: "Google's policy",
    href: 'https://support.google.com/contributionpolicy/answer/7400114',
    external: true,
  },
];