'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  /** Intrinsic width (e.g. 960) for aspect ratio hint; layout uses fill + aspect box. */
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  aspectClass?: string;
};

/** Hides the slot entirely if the asset file is missing or fails to load. */
export function ServiceOptionalImage({
  src,
  alt,
  width = 960,
  height = 720,
  priority = false,
  sizes = '(min-width: 768px) 33vw, 100vw',
  className = '',
  aspectClass = 'aspect-[4/3]',
}: Props) {
  const [hidden, setHidden] = useState(false);

  if (hidden || !alt.trim()) return null;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[14px] border border-obsidian/10 bg-white ${aspectClass}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
        onError={() => setHidden(true)}
      />
    </div>
  );
}
