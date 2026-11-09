'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';

type Props = {
  text: string;
  className?: string;
};

function normalizeWord(word: string) {
  return word.replace(/[^a-zA-Z.]/g, '').toLowerCase();
}

/** Problem statement: words grey → ink on scroll; REMEMBER on yellow block. */
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
      const end = vh * 0.4;
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
      {words.map((word, index) => {
        const isRemember = normalizeWord(word).startsWith('remember');
        if (isRemember) {
          return (
            <span key={`${word}-${index}`} className="home-v2-word home-v2-marker-block">
              {word}
              {index < words.length - 1 ? '\u00a0' : ''}
            </span>
          );
        }
        const active = reducedMotion || index <= activeThrough;
        return (
          <span
            key={`${word}-${index}`}
            className={`home-v2-word ${
              active
                ? 'text-[var(--h2v-ink)] transition-colors duration-300 motion-reduce:transition-none'
                : 'text-[var(--h2v-muted)] transition-colors duration-300 motion-reduce:transition-none'
            }`}
          >
            {word}
            {index < words.length - 1 ? '\u00a0' : ''}
          </span>
        );
      })}
    </p>
  );
}
