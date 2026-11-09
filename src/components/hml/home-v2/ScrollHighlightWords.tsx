'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';

type Props = {
  text: string;
  className?: string;
};

/** Big statement: words gain emphasis as the block scrolls through the viewport. */
export function ScrollHighlightWords({ text, className = '' }: Props) {
  const root = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeThrough, setActiveThrough] = useState(reducedMotion ? Infinity : -1);

  const words = text.trim().split(/\s+/).filter(Boolean);

  useEffect(() => {
    if (reducedMotion || words.length === 0) return;

    const node = root.current;
    if (!node) return;

    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.72;
      const end = vh * 0.28;
      const progress = (start - rect.top) / Math.max(start - end, 1);
      const clamped = Math.min(1, Math.max(0, progress));
      setActiveThrough(Math.floor(clamped * words.length));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reducedMotion, words.length]);

  return (
    <p ref={root} className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={
            index <= activeThrough
              ? 'text-obsidian transition-colors duration-300 motion-reduce:transition-none'
              : 'text-obsidian/25 transition-colors duration-300 motion-reduce:transition-none'
          }
        >
          {word}
          {index < words.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </p>
  );
}
