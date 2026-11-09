'use client';

import Image from 'next/image';
import type { CapabilityVisualKind } from '@/config/agency';

const MARK_SRC: Record<CapabilityVisualKind, string> = {
  letterforms: '/images/hml/marks/branding.svg',
  signal: '/images/hml/marks/seo-aeo-geo.svg',
  'contact-sheet': '/images/hml/marks/performance-marketing.svg',
  modules: '/images/hml/marks/social-media.svg',
  system: '/images/hml/marks/branding.svg',
  cursor: '/images/hml/marks/seo-aeo-geo.svg',
};

type Props = { kind: CapabilityVisualKind; active: boolean };

/** Sam service marks (120×80), with a subtle scale on hover/focus. */
export function CapabilityVisual({ kind, active }: Props) {
  const src = MARK_SRC[kind];

  return (
    <div
      className={`relative h-[70px] w-[104px] text-obsidian transition-transform duration-500 ease-out ${
        active ? 'scale-[1.06]' : 'scale-100'
      }`}
    >
      <Image src={src} alt="" width={120} height={80} className="h-full w-full object-contain" aria-hidden />
    </div>
  );
}
