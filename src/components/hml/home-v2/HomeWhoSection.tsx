'use client';

import { useEffect, useRef, useState } from 'react';
import { homeV2Config } from '@/config/home-v2';
import { hasText, isPendingHomeImageAlt, isWhoPopulated } from '@/lib/hml/homeV2';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { HomeOptionalImage } from './HomeOptionalImage';
import { useScrollReveal } from './useScrollReveal';
import { HomeV2Words } from './homeV2Typography';

function CheckRow({ line, drawn }: { line: string; drawn: boolean }) {
  return (
    <li className="flex gap-4 border-b border-obsidian/10 py-5 first:pt-0">
      <span
        className={`home-v2-check mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-[1.5px] border-obsidian ${drawn ? 'is-drawn' : ''}`}
        aria-hidden
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            className="home-v2-check-tick"
            d="M2.5 7.25 5.5 10.25 11.5 4.25"
            stroke="var(--h2v-y)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="min-w-0 flex-1 text-[clamp(17px,2.2vw,20px)] font-semibold leading-snug tracking-[-0.02em] text-obsidian">
        {line}
      </span>
    </li>
  );
}

export function HomeWhoSection() {
  const { who } = homeV2Config.content;
  const { assets } = homeV2Config;
  const reveal = useScrollReveal<HTMLElement>();
  const listRef = useRef<HTMLUListElement>(null);
  const reducedMotion = useReducedMotion();
  const [ticksDrawn, setTicksDrawn] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const node = listRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTicksDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  if (!isWhoPopulated(homeV2Config.content)) return null;

  const lines = who.lines.filter((line) => hasText(line));
  const showWhoImage = !isPendingHomeImageAlt(who.imageAlt);

  return (
    <section ref={reveal.ref} className={`bg-paper px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28 ${reveal.className}`}>
      <div
        className={`mx-auto grid max-w-editorial gap-10 lg:items-center lg:gap-14 ${
          showWhoImage ? 'lg:grid-cols-12' : 'max-w-prose'
        }`}
      >
        {showWhoImage ? (
          <div className="order-2 min-w-0 lg:order-1 lg:col-span-6">
            <div className="home-v2-img-reveal overflow-hidden rounded-sm">
              <HomeOptionalImage
                src={assets.whoImage}
                alt={who.imageAlt}
                width={assets.whoWidth}
                height={assets.whoHeight}
                sizes="(min-width: 1024px) 44vw, 100vw"
                reveal={false}
              />
            </div>
          </div>
        ) : null}
        <div className={showWhoImage ? 'order-1 min-w-0 lg:order-2 lg:col-span-6' : 'min-w-0'}>
          {hasText(who.heading) ? (
            <h2 className="home-v2-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.88] text-obsidian">
              <HomeV2Words text={who.heading} />
            </h2>
          ) : null}
          {lines.length > 0 ? (
            <ul ref={listRef} className="mt-8">
              {lines.map((line) => (
                <CheckRow key={line} line={line} drawn={ticksDrawn} />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
