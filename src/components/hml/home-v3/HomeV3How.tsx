'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { homeV2Config } from '@/config/home-v2';
import { hasText, isHowWeWorkPopulated } from '@/lib/hml/homeV2';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { H3Words } from './h3Typography';
import { useH3Reveal } from './useH3Reveal';

const AI = 'People make the calls.';

function headingLines(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

export function HomeV3How() {
  const { howWeWork } = homeV2Config.content;
  const { processPlates } = homeV2Config.assets;
  const reduced = useReducedMotion();
  const reveal = useH3Reveal<HTMLElement>();
  const [step, setStep] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    const nodes = refs.current.filter(Boolean) as HTMLLIElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target) {
          const idx = nodes.indexOf(hit.target as HTMLLIElement);
          if (idx >= 0) setStep(idx);
        }
      },
      { rootMargin: '-28% 0px -32% 0px', threshold: [0.15, 0.45] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [reduced]);

  if (!isHowWeWorkPopulated(homeV2Config.content)) return null;

  const steps = howWeWork.steps.filter((s) => hasText(s.title) || hasText(s.body));
  const progress = steps.length > 0 ? (step + 1) / steps.length : 0;
  const lines = hasText(howWeWork.heading) ? headingLines(howWeWork.heading) : [];

  return (
    <section
      ref={reveal.ref}
      className={`h3-how h3-ink-band scroll-mt-28 px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 ${reveal.className}`}
    >
      <div className="mx-auto grid min-w-0 max-w-editorial grid-cols-1 gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-x-14 xl:gap-x-20">
        <aside className="h3-how__aside min-w-0 max-w-full lg:sticky lg:top-32 lg:self-start">
          {lines.length > 0 ? (
            <h2 className="h3-how__heading h3-display max-w-full leading-[0.95] text-white">
              {lines.map((line) => (
                <span key={line} className="block">
                  <span className="h3-word">{line}</span>
                </span>
              ))}
            </h2>
          ) : null}
          <div
            className="relative mt-10 hidden h-44 w-1.5 overflow-hidden rounded-full bg-white/15 lg:block"
            aria-hidden
          >
            <div
              className="absolute inset-x-0 top-0 bg-signalYellow transition-[height] duration-500"
              style={{ height: `${progress * 100}%` }}
            />
          </div>
          <div className="mt-6 flex gap-2 lg:hidden" aria-label="Step progress">
            {steps.map((_, i) => (
              <span
                key={`dot-${i}`}
                className={`h-2 min-h-[8px] flex-1 rounded-full ${i <= step ? 'bg-signalYellow' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </aside>

        <ol className="relative min-w-0 border-l border-white/20 pl-8 md:pl-10 lg:pl-12">
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 w-px origin-top bg-signalYellow transition-transform duration-500"
            style={{ height: '100%', transform: `scaleY(${progress})` }}
          />
          {howWeWork.steps.map((item, index) => {
            if (!hasText(item.title) && !hasText(item.body)) return null;
            const plate = processPlates[index];
            const active = index === step;
            return (
              <li
                key={item.title || index}
                ref={(el) => {
                  refs.current[index] = el;
                }}
                className={`mb-16 min-w-0 pb-2 last:mb-0 ${active ? 'opacity-100' : 'opacity-75'}`}
              >
                {plate ? (
                  <div className="relative mb-8 aspect-[3/2] w-full max-w-[34rem] overflow-hidden rounded-xl">
                    <Image
                      src={plate}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 42vw, 90vw"
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <div className="max-w-[34rem]">
                  <p className="h3-display text-[clamp(2.25rem,5vw,3.25rem)] leading-none text-signalYellow">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  {hasText(item.title) ? (
                    <h3 className="h3-display mt-3 text-[clamp(1.35rem,2.8vw,2rem)] leading-[0.95] text-white">
                      <H3Words text={item.title} />
                    </h3>
                  ) : null}
                  {hasText(item.body) ? (
                    <p className="mt-4 max-w-[58ch] text-[16px] leading-relaxed text-white/75">{item.body}</p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      {hasText(howWeWork.aiLine) ? (
        <p className="mx-auto mt-16 max-w-editorial min-w-0 h3-display text-[clamp(1.75rem,5vw,4rem)] leading-[0.95] text-white">
          {howWeWork.aiLine.includes(AI) ? (
            <>
              {howWeWork.aiLine.slice(0, howWeWork.aiLine.indexOf(AI))}
              <span className="text-signalYellow">{AI}</span>
            </>
          ) : (
            howWeWork.aiLine
          )}
        </p>
      ) : null}
    </section>
  );
}
