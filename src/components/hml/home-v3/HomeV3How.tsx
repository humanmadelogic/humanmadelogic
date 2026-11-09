'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { homeV2Config } from '@/config/home-v2';
import { hasText, isHowWeWorkPopulated } from '@/lib/hml/homeV2';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { H3Words } from './h3Typography';
import { useH3Reveal } from './useH3Reveal';

const AI = 'People make the calls.';

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
      { rootMargin: '-25% 0px -35% 0px', threshold: [0.2, 0.5] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [reduced]);

  if (!isHowWeWorkPopulated(homeV2Config.content)) return null;

  const steps = howWeWork.steps.filter((s) => hasText(s.title) || hasText(s.body));
  const progress = steps.length > 0 ? (step + 1) / steps.length : 0;

  return (
    <section ref={reveal.ref} className={`h3-ink-band px-5 py-20 text-white sm:px-8 lg:px-12 ${reveal.className}`}>
      <div className="mx-auto grid max-w-editorial min-w-0 gap-10 lg:grid-cols-12">
        <aside className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          {hasText(howWeWork.heading) ? (
            <h2 className="h3-display text-[clamp(2rem,5vw,3.5rem)] text-white">
              <H3Words text={howWeWork.heading} />
            </h2>
          ) : null}
          <div className="mt-8 hidden h-48 w-2 overflow-hidden rounded-full bg-white/15 lg:block" aria-hidden>
            <div
              className="w-full bg-signalYellow transition-[height] duration-500"
              style={{ height: `${progress * 100}%` }}
            />
          </div>
          <div className="mt-6 flex gap-2 lg:hidden" aria-label="Step progress">
            {steps.map((_, i) => (
              <span
                key={`dot-${i}`}
                className={`h-2 flex-1 rounded-full ${i <= step ? 'bg-signalYellow' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </aside>
        <ol className="relative border-l border-white/20 pl-6 lg:col-span-8 lg:pl-10">
          <span
            aria-hidden
            className="absolute bottom-0 left-0 w-px origin-top bg-signalYellow transition-transform duration-500"
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
                className={`mb-14 min-w-0 last:mb-0 ${active ? 'opacity-100' : 'opacity-70'}`}
              >
                {plate ? (
                  <div className="relative mb-4 aspect-[3/2] w-full max-w-lg overflow-hidden rounded-lg">
                    <Image src={plate} alt="" fill className="object-cover" sizes="(min-width:1024px) 40vw, 90vw" loading="lazy" />
                  </div>
                ) : null}
                <p className="h3-display text-5xl text-signalYellow">{String(index + 1).padStart(2, '0')}</p>
                {hasText(item.title) ? (
                  <h3 className="h3-display mt-2 text-[clamp(1.5rem,3vw,2.25rem)] text-white">
                    <H3Words text={item.title} />
                  </h3>
                ) : null}
                {hasText(item.body) ? <p className="mt-3 max-w-[58ch] text-[16px] leading-relaxed text-white/75">{item.body}</p> : null}
              </li>
            );
          })}
        </ol>
      </div>
      {hasText(howWeWork.aiLine) ? (
        <p className="mx-auto mt-16 max-w-editorial h3-display text-[clamp(1.75rem,5vw,4rem)] leading-[0.95] text-white">
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
