'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { approach } from '@/config/agency';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { useIsomorphicLayoutEffect } from '@/lib/hml/useIsomorphicLayoutEffect';
import { RevealOnScroll } from './RevealOnScroll';
import { RevealText } from './RevealText';

/**
 * About and positioning: human-led delivery, performance spine, ICP markets.
 */
export function AboutApproach() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const element = section.current;
    if (!element || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-approach-card]').forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 28 },
          {
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 55%',
              scrub: 0.6,
            },
            delay: index * 0.04,
          },
        );
      });
    }, element);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section id="approach" ref={section} className="scroll-mt-24 bg-obsidian py-24 text-paper sm:py-32 lg:py-40">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-paper/50 lg:col-span-3">
            {approach.label}
          </p>
          <RevealText
            lines={[approach.heading]}
            className="text-[8vw] leading-[1.02] tracking-[-0.04em] text-paper sm:text-[5vw] lg:col-span-9 lg:text-[3.6vw] xl:text-[52px]"
          />
        </div>

        <ul className="mt-16 grid gap-6 sm:mt-20 lg:grid-cols-3 lg:gap-8">
          {approach.pillars.map((pillar) => (
            <li key={pillar.title} className="h-full">
              <RevealOnScroll>
                <article
                  data-approach-card
                  className="flex h-full flex-col rounded-[16px] border border-paper/12 bg-paper/[0.04] p-8 transition-colors duration-300 hover:border-paper/25 hover:bg-paper/[0.07]"
                >
                  <h3 className="text-[22px] tracking-[-0.03em] sm:text-[24px]">{pillar.title}</h3>
                  <p className="mt-4 flex-1 text-[15px] leading-[1.65] text-paper/70">{pillar.body}</p>
                </article>
              </RevealOnScroll>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
