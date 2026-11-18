import type { KitSlug } from '@/config/kits';

const KIT_OG: Record<KitSlug, string> = {
  'launch-kit': '/og/kits/og-launch-kit.png',
  'authority-kit': '/og/kits/og-authority-kit.png',
  'local-domination-kit': '/og/kits/og-local-domination-kit.png',
};

export const kitsHubOgImage = '/og/kits/og-kits.png';
export const kitsOgFallback = '/og/og-default.png';

export function resolveKitOgImage(slug: KitSlug): string {
  return KIT_OG[slug] ?? kitsOgFallback;
}