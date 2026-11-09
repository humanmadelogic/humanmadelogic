'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { homeV2Config } from '@/config/home-v2';
import { hasText, isHowWeWorkPopulated } from '@/lib/hml/homeV2';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';

function StepPlate({ src, index }: { src: string; index: number }) {
  const [missing, setMissing] = useState(false);
  if (missing) return null;
  return (
    <Image
      src={src}
      alt=""
      width={56}
      height={56}
      className="h-12 w-12 shrink-0"
      aria-hidden
      onError={() => setMissing(true)}
    />
  );
}

export function HomeHowWeWorkSection() {
  const { howWeWork } = homeV2Config.content;
  const { processStepIcons } = homeV2Config.assets;
  const reducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (reducedMotion) return;
    const nodes = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target) {
          const idx = nodes.indexOf(visible.target as HTMLLIElement);
          if (idx >= 0) setActiveStep(idx);
        }
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: [0.2, 0.5, 0.8] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [reducedMotion]);

  if (!isHowWeWorkPopulated(homeV2Config.content)) return null;

  const steps = howWeWork.steps.filter((step) => hasText(step.title) || hasText(step.body));

  return (
    <section className="bg-obsidian py-16 text-paper sm:py-24 lg:py-28">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4 lg:self-start lg:sticky lg:top-28">
            {hasText(howWeWork.heading) ? (
              <h2 className="text-[30px] tracking-[-0.03em] sm:text-[36px]">{howWeWork.heading}</h2>
            ) : null}
            <ol className="mt-8 flex gap-2 lg:hidden" aria-label="Process steps">
              {steps.map((step, index) => (
                <li key={step.title || index}>
                  <span
                    className={`flex h-11 min-w-11 items-center justify-center rounded-full border text-[13px] tabular-nums ${
                      index === activeStep
                        ? 'border-signalYellow bg-signalYellow/15 text-paper'
                        : 'border-paper/25 text-paper/60'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <ol className="mt-10 space-y-12 lg:col-span-8 lg:mt-0 lg:space-y-16">
            {howWeWork.steps.map((step, index) => {
              if (!hasText(step.title) && !hasText(step.body)) return null;
              const icon = processStepIcons[index];
              return (
                <li
                  key={step.title || `step-${index}`}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className={`border-t border-paper/15 pt-10 first:border-t-0 first:pt-0 ${
                    index === activeStep ? 'opacity-100' : 'opacity-90 lg:opacity-70'
                  }`}
                >
                  <div className="flex gap-4">
                    {icon ? <StepPlate src={icon} index={index} /> : null}
                    <div>
                      <p className="text-[12px] tabular-nums tracking-[0.18em] text-paper/55">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      {hasText(step.title) ? (
                        <h3 className="mt-2 text-[22px] tracking-[-0.03em]">{step.title}</h3>
                      ) : null}
                      {hasText(step.body) ? (
                        <p className="mt-3 max-w-[58ch] text-[16px] leading-[1.65] text-paper/70">
                          {step.body}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {hasText(howWeWork.aiLine) ? (
          <p className="mt-16 max-w-[52ch] border-t border-paper/15 pt-10 text-[17px] leading-[1.6] text-paper/80 sm:text-[18px]">
            {howWeWork.aiLine}
          </p>
        ) : null}
      </div>
    </section>
  );
}
