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
  aspectClass?: string;
};

/** Hides the slot entirely if the asset file is missing or fails to load. */
export function ServiceOptionalImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className = '',
  aspectClass = 'aspect-[4/3]',
}: Props) {
  const [hidden, setHidden] = useState(false);

  if (hidden || !alt.trim()) return null;

  return (
    <div className={`relative overflow-hidden rounded-[14px] border border-obsidian/10 bg-white ${aspectClass}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={`h-full w-full object-cover ${className}`}
        onError={() => setHidden(true)}
      />
    </div>
  );
}
