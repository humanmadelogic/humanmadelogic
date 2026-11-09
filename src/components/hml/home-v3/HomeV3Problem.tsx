'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { homeV2Config } from '@/config/home-v2';
import { hasText, isProblemPopulated } from '@/lib/hml/homeV2';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { useH3Reveal } from './useH3Reveal';

function PainImage({ src }: { src: string }) {
  const [missing, setMissing] = useState(false);
  if (missing) {
    return <div className="aspect-[4/3] w-full rounded-lg bg-[var(--h3-tint)]" aria-hidden />;
  }
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="(min-width: 768px) 28vw, 88vw"
        loading="lazy"
        onError={() => setMissing(true)}
      />
    </div>
  );
}

export function HomeV3Problem() {
  const { problem } = homeV2Config.content;
  const { problemPainImages } = homeV2Config.assets;
  const reduced = useReducedMotion();
  const root = useRef<HTMLParagraphElement>(null);
  const reveal = useH3Reveal<HTMLElement>();
  const [activeThrough, setActiveThrough] = useState(reduced ? Infinity : 0);

  useEffect(() => {
    if (reduced || !problem.statement) return;
    const node = root.current;
    if (!node) return;
    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh * 0.75 - rect.top) / (vh * 0.45);
      const clamped = Math.min(1, Math.max(0, progress));
      const words = problem.statement!.trim().split(/\s+/).length;
      setActiveThrough(Math.floor(clamped * words));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [problem.statement, reduced]);

  if (!isProblemPopulated(homeV2Config.content)) return null;

  const words = problem.statement?.trim().split(/\s+/).filter(Boolean) ?? [];
  const lines = problem.lines?.filter((line) => hasText(line)) ?? [];

  return (
    <section ref={reveal.ref} className={`px-5 py-20 sm:px-8 sm:py-28 lg:px-12 ${reveal.className}`}>
      <div className="mx-auto max-w-editorial min-w-0">
        {words.length > 0 ? (
          <p
            ref={root}
            className="h3-display text-[clamp(1.75rem,6.5vw,5.5rem)] leading-[0.94] text-obsidian"
          >
            {words.map((word, index) => {
              const key = word.replace(/[^a-z]/gi, '').toLowerCase();
              const isRemember = key.startsWith('remember');
              const lit = reduced || index <= activeThrough;
              if (isRemember) {
                return (
                  <span key={`${word}-${index}`} className="h3-word">
                    <span
                      className="h3-marker-block inline-block origin-left transition-transform duration-500 motion-reduce:transition-none"
                      style={{
                        transform: lit ? 'scaleX(1)' : 'scaleX(0.15)',
                      }}
                    >
                      {word}
                    </span>
                    {index < words.length - 1 ? '\u00a0' : ''}
                  </span>
                );
              }
              return (
                <span
                  key={`${word}-${index}`}
                  className={`h3-word transition-colors duration-300 ${lit ? 'text-obsidian' : 'text-[var(--h3-muted)]'}`}
                >
                  {word}
                  {index < words.length - 1 ? '\u00a0' : ''}
                </span>
              );
            })}
          </p>
        ) : null}
        {lines.length > 0 ? (
          <ul className="mt-16 grid gap-10 border-t border-obsidian pt-10 md:grid-cols-3">
            {lines.map((line, index) => (
              <li key={line} className="min-w-0">
                {problemPainImages[index] ? <PainImage src={problemPainImages[index]} /> : null}
                <span className="h3-display mt-4 block text-3xl text-slate">{String(index + 1).padStart(2, '0')}</span>
                <p className="h3-body mt-3 font-medium text-obsidian">{line}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
