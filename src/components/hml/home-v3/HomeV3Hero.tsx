'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { homeV2Config } from '@/config/home-v2';
import { isHeroPopulated, isPendingHomeImageAlt } from '@/lib/hml/homeV2';
import { useFinePointer } from '@/lib/hml/useMediaQuery';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { H3Marker, H3Words, splitHeadlineLines } from './h3Typography';

const GRID = 5;
const YELLOW_INDEX = 12;

function BrandGrid() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState(YELLOW_INDEX);
  const pointer = useRef({ x: 0.5, y: 0.5 });

  const onMove = useCallback(
    (event: React.PointerEvent) => {
      if (!fine || reduced) return;
      const rect = wrap.current?.getBoundingClientRect();
      if (!rect) return;
      pointer.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    },
    [fine, reduced],
  );

  useEffect(() => {
    if (reduced || fine) return;
    let i = 0;
    const id = window.setInterval(() => {
      setFocus((GRID * GRID + i++) % (GRID * GRID));
    }, 2200);
    return () => clearInterval(id);
  }, [fine, reduced]);

  useEffect(() => {
    if (!fine || reduced) return;
    let raf = 0;
    const cells = wrap.current?.querySelectorAll<HTMLElement>('[data-card]');
    const tick = () => {
      cells?.forEach((cell, index) => {
        const col = index % GRID;
        const row = Math.floor(index / GRID);
        const cx = (col + 0.5) / GRID;
        const cy = (row + 0.5) / GRID;
        const dx = pointer.current.x - cx;
        const dy = pointer.current.y - cy;
        const dist = Math.hypot(dx, dy);
        const lift = Math.max(0, 1 - dist * 2.2);
        const tiltX = dx * 8;
        const tiltY = -dy * 8;
        const isYellow = index === YELLOW_INDEX || index === focus;
        cell.style.transform = `translate3d(0, ${-lift * 10}px, 0) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
        cell.style.zIndex = isYellow ? '2' : '1';
        cell.style.boxShadow = lift > 0.2 ? '0 12px 28px -8px rgba(21,21,21,0.25)' : 'none';
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fine, reduced, focus]);

  return (
    <div
      ref={wrap}
      className="relative aspect-square w-full max-w-[min(92vw,520px)] touch-none select-none"
      onPointerMove={onMove}
      aria-hidden
    >
      <div
        className="grid h-full w-full gap-2 sm:gap-2.5"
        style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}
      >
        {Array.from({ length: GRID * GRID }, (_, index) => (
          <div
            key={index}
            data-card
            className={`rounded-md border border-obsidian/10 transition-colors duration-300 ${
              index === YELLOW_INDEX ? 'bg-signalYellow' : 'bg-[#e8e8e6]'
            }`}
            style={{ transformStyle: 'preserve-3d', minHeight: 44 }}
          />
        ))}
      </div>
    </div>
  );
}

export function HomeV3Hero() {
  const { hero } = homeV2Config.content;
  const showArt = !isPendingHomeImageAlt(hero.imageAlt);

  if (!isHeroPopulated(homeV2Config.content) || !hero.h1.trim()) return null;

  const lines = splitHeadlineLines(hero.h1, 3);

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-x-clip pb-10 pt-28 sm:pb-14 sm:pt-32"
    >
      <div className="mx-auto grid w-full max-w-editorial min-w-0 grid-cols-1 items-end gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12">
        <div className="relative z-10 min-w-0">
          {hero.eyebrow.trim() ? (
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-obsidian">
              <span aria-hidden className="mr-2 inline-block h-2 w-2 rounded-full bg-signalYellow" />
              {hero.eyebrow}
            </p>
          ) : null}
          <h1 className="h3-display mt-6 text-[clamp(1.65rem,5.8vw,4.75rem)] leading-[0.94] text-obsidian">
            {lines.map((line, li) => (
              <span
                key={line}
                className="h3-hero-line block overflow-hidden pb-1"
                style={{ animationDelay: `${80 * li}ms` }}
              >
                {line.split(/\s+/).map((word, wi, arr) => {
                  const isName = word.toLowerCase().startsWith('name');
                  return (
                    <span key={`${li}-${wi}`} className="h3-word">
                      {isName ? <H3Marker>{word}</H3Marker> : word}
                      {wi < arr.length - 1 ? '\u00a0' : ''}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>
          {hero.sub.trim() ? (
            <p className="h3-body mt-6 max-w-[36ch]">{hero.sub}</p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            {hero.primaryCta.label.trim() ? (
              <Link href={hero.primaryCta.href} className="h3-btn h3-btn-ink">
                {hero.primaryCta.label}
              </Link>
            ) : null}
            {hero.secondaryCta.label.trim() ? (
              <Link href={hero.secondaryCta.href} className="h3-btn h3-btn-outline">
                {hero.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="relative z-0 flex min-w-0 items-end justify-center lg:justify-end">
          <BrandGrid />
          {showArt ? (
            <p className="sr-only">{hero.imageAlt}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
