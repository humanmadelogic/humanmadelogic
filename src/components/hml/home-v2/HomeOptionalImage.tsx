'use client';

import Image from 'next/image';
import { useState } from 'react';
import { isPendingHomeImageAlt } from '@/lib/hml/homeV2';

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  reveal?: boolean;
};

/** Renders nothing until alt is approved and the asset loads (pending alts stay hidden). */
export function HomeOptionalImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = '(min-width: 1024px) 42vw, 100vw',
  className = '',
  reveal = false,
}: Props) {
  const [missing, setMissing] = useState(false);

  if (!hasText(alt) || isPendingHomeImageAlt(alt)) {
    return null;
  }

  const boxClass = `relative w-full overflow-hidden rounded-[14px] border border-obsidian/10 bg-paper ${
    reveal ? 'home-v2-hero-reveal' : ''
  }`;

  return (
    <div className={boxClass} style={{ aspectRatio: `${width} / ${height}` }}>
      {!missing ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${className}`}
          onError={() => setMissing(true)}
        />
      ) : null}
    </div>
  );
}

function hasText(value: string) {
  return Boolean(value.trim());
}
