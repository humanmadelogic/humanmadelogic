'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { homeV2Config } from '@/config/home-v2';
import { hasText, isPendingHomeImageAlt, isWhoPopulated } from '@/lib/hml/homeV2';
import { H3Words } from './h3Typography';
import { useH3Reveal } from './useH3Reveal';

export function HomeV3Who() {
  const { who } = homeV2Config.content;
  const { assets } = homeV2Config;
  const { hero, finalCta } = homeV2Config.content;
  const reveal = useH3Reveal<HTMLElement>();
  const [ticked, setTicked] = useState<Set<number>>(() => new Set());

  const showImage = !isPendingHomeImageAlt(who.imageAlt);
  const lines = who.lines.filter((l) => hasText(l));
  const count = ticked.size;

  const ctaScale = useMemo(() => 1 + count * 0.06, [count]);

  if (!isWhoPopulated(homeV2Config.content)) return null;

  const toggle = (index: number) => {
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section ref={reveal.ref} className={`px-5 py-20 sm:px-8 lg:px-12 ${reveal.className}`}>
      <div className="mx-auto grid max-w-editorial min-w-0 gap-12 lg:grid-cols-2 lg:items-center">
        {showImage ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image
              src={assets.whoImage}
              alt={who.imageAlt}
              fill
              className="object-cover"
              sizes="(min-width:1024px) 44vw, 92vw"
              loading="lazy"
            />
          </div>
        ) : null}
        <div className="min-w-0">
          {hasText(who.heading) ? (
            <h2 className="h3-display text-[clamp(2rem,8vw,4.5rem)] text-obsidian">
              <H3Words text={who.heading} />
            </h2>
          ) : null}
          <ul className="mt-8 space-y-2">
            {lines.map((line, index) => {
              const on = ticked.has(index);
              return (
                <li key={line}>
                  <button
                    type="button"
                    className={`flex min-h-[44px] w-full items-start gap-4 rounded-lg border px-4 py-3 text-left transition-colors ${
                      on ? 'border-signalYellow bg-[#fff8e8]' : 'border-obsidian/15'
                    }`}
                    aria-pressed={on}
                    onClick={() => toggle(index)}
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border ${
                        on ? 'border-obsidian bg-signalYellow' : 'border-obsidian'
                      }`}
                      aria-hidden
                    >
                      {on ? '✓' : ''}
                    </span>
                    <span className="text-[17px] font-semibold leading-snug text-obsidian">{line}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          {hasText(hero.primaryCta.label) ? (
            <Link
              href={hero.primaryCta.href}
              className="h3-btn h3-btn-y mt-8 inline-flex transition-transform duration-300 motion-reduce:transform-none"
              style={{ transform: `scale(${ctaScale})` }}
            >
              {hero.primaryCta.label}
            </Link>
          ) : null}
          {hasText(finalCta.note) ? (
            <p className="mt-3 text-sm text-slate">{finalCta.note}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
