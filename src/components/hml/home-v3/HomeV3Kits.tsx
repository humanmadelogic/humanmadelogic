'use client';

import Link from 'next/link';
import { useState } from 'react';
import { homeV2Config, type HomeV2Kit } from '@/config/home-v2';
import { hasText, isKitPopulated, isKitsPopulated } from '@/lib/hml/homeV2';
import { useFinePointer } from '@/lib/hml/useMediaQuery';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { H3Words } from './h3Typography';
import { useH3Reveal } from './useH3Reveal';

export function HomeV3Kits() {
  const { kits } = homeV2Config.content;
  const reveal = useH3Reveal<HTMLElement>();
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  if (!isKitsPopulated(homeV2Config.content)) return null;

  const items = kits.items.filter(isKitPopulated).slice(0, 3);

  return (
    <section ref={reveal.ref} className={`px-5 py-20 sm:px-8 lg:px-12 ${reveal.className}`}>
      <div className="mx-auto max-w-editorial min-w-0">
        {hasText(kits.heading) ? (
          <h2 className="h3-display text-[clamp(2rem,6vw,4rem)] text-obsidian">
            <H3Words text={kits.heading} />
          </h2>
        ) : null}
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {items.map((kit: HomeV2Kit, index) => {
            const inc = kit.inclusions?.filter((l) => hasText(l)) ?? [];
            const tilt =
              fine && !reduced && hovered === index
                ? 'rotateX(4deg) rotateY(-4deg) translateY(-8px)'
                : 'none';
            return (
              <li
                key={kit.title || index}
                className="min-w-0"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                style={{ perspective: '900px' }}
              >
                <article
                  className="flex h-full flex-col border-t-4 border-obsidian bg-paper p-6 shadow-none transition-[transform,box-shadow] duration-400"
                  style={{
                    transform: tilt,
                    boxShadow:
                      fine && !reduced && hovered === index
                        ? '0 24px 48px -24px rgba(21,21,21,0.35)'
                        : undefined,
                  }}
                >
                  <span className="h3-display text-4xl text-slate">{String(index + 1).padStart(2, '0')}</span>
                  {hasText(kit.title) ? (
                    <h3 className="h3-display mt-3 text-[clamp(1.5rem,3vw,2.5rem)] text-obsidian">
                      <H3Words text={kit.title} />
                    </h3>
                  ) : null}
                  {hasText(kit.bestFor) ? <p className="h3-body mt-3">{kit.bestFor}</p> : null}
                  <ul
                    className={`mt-4 space-y-2 overflow-hidden transition-[max-height] duration-500 ${
                      hovered === index || reduced ? 'max-h-40' : 'max-h-24'
                    }`}
                  >
                    {inc.map((line) => (
                      <li key={line} className="flex gap-2 text-[15px] text-obsidian">
                        <span className="text-signalYellow" aria-hidden>
                          ✓
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                  {hasText(kit.cta?.label) ? (
                    <Link
                      href={kit.cta?.href ?? '/contact'}
                      className="mt-6 inline-flex min-h-[44px] items-center font-semibold underline decoration-signalYellow"
                    >
                      {kit.cta?.label}
                    </Link>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
