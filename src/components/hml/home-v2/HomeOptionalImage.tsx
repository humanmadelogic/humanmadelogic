'use client';

import Image from 'next/image';
import { useState } from 'react';

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

/**
 * Reserved aspect-ratio slot; keeps the box when the asset is missing (no broken img, no CLS).
 */
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

  const boxClass = `relative w-full overflow-hidden rounded-[14px] border border-obsidian/10 bg-paper ${
    reveal ? 'home-v2-hero-reveal' : ''
  }`;

  if (!hasText(alt)) {
    return (
      <div
        className={boxClass}
        style={{ aspectRatio: `${width} / ${height}` }}
        aria-hidden="true"
      />
    );
  }

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
