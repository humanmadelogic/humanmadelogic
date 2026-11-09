'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { homeV2Config } from '@/config/home-v2';
import { hasText, isHowWeWorkPopulated } from '@/lib/hml/homeV2';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';

const AI_PHRASE = 'People make the calls.';

function ProcessPlate({ src }: { src: string }) {
  const [missing, setMissing] = useState(false);
  if (missing) {
    return <div className="aspect-[3/2] w-full bg-paper/10" aria-hidden />;
  }
  return (
    <div className="home-v2-plate-reveal relative aspect-[3/2] w-full overflow-hidden bg-paper/5">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 38vw, 90vw"
        onError={() => setMissing(true)}
      />
    </div>
  );
}

function AiLine({ text }: { text: string }) {
  const idx = text.indexOf(AI_PHRASE);
  if (idx < 0) {
    return (
      <p className="home-v2-display mt-20 text-[clamp(2.75rem,8.2vw,7.375rem)] leading-[0.9] text-paper">{text}</p>
    );
  }
  return (
    <p className="home-v2-display mt-20 max-w-[24ch] text-[clamp(2.75rem,8.2vw,7.375rem)] leading-[0.9] text-paper sm:max-w-none">
      {text.slice(0, idx)}
      <span className="text-signalYellow">{AI_PHRASE}</span>
    </p>
  );
}

export function HomeHowWeWorkSection() {
  const { howWeWork } = homeV2Config.content;
  const { processPlates } = homeV2Config.assets;
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
      { rootMargin: '-30% 0px -30% 0px', threshold: [0.15, 0.4, 0.65] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [reducedMotion]);

  if (!isHowWeWorkPopulated(homeV2Config.content)) return null;

  const steps = howWeWork.steps.filter((step) => hasText(step.title) || hasText(step.body));

  return (
    <section className="home-v2-ink-band py-16 text-paper sm:py-20 lg:py-24">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <aside className="lg:col-span-4 lg:self-start lg:sticky lg:top-[7.5rem]">
            {hasText(howWeWork.heading) ? (
              <h2 className="home-v2-display text-[clamp(3rem,6.5vw,6rem)] leading-[0.88] text-paper">
                {howWeWork.heading}
              </h2>
            ) : null}
            <ol className="mt-8 hidden gap-2 lg:flex lg:flex-col" aria-label="Process progress">
              {steps.map((step, index) => (
                <li key={step.title || index}>
                  <span
                    className={`block h-1.5 w-10 rounded-full transition-colors duration-300 motion-reduce:transition-none ${
                      index <= activeStep ? 'bg-signalYellow' : 'bg-paper/25'
                    }`}
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ol>
            <ol className="mt-8 flex gap-2 lg:hidden" aria-label="Process steps">
              {steps.map((step, index) => (
                <li key={`m-${step.title || index}`}>
                  <span
                    className={`flex h-11 min-w-11 items-center justify-center rounded-full border text-[13px] font-semibold tabular-nums ${
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
          </aside>

          <ol className="mt-12 space-y-14 lg:col-span-8 lg:mt-0 lg:space-y-20">
            {howWeWork.steps.map((step, index) => {
              if (!hasText(step.title) && !hasText(step.body)) return null;
              const plate = processPlates[index];
              return (
                <li
                  key={step.title || `step-${index}`}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className="min-w-0 border-t border-paper/20 pt-12 first:border-t-0 first:pt-0"
                >
                  {plate ? <ProcessPlate src={plate} /> : null}
                  <div className="mt-6 flex flex-wrap items-start gap-4 sm:gap-6">
                    <span className="home-v2-step-num" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      {hasText(step.title) ? (
                        <h3 className="home-v2-display text-[clamp(2rem,4.8vw,3.25rem)] leading-[0.9] text-paper">
                          {step.title}
                        </h3>
                      ) : null}
                      {hasText(step.body) ? (
                        <p className="mt-4 max-w-[58ch] text-[16px] leading-[1.65] text-paper/72 sm:text-[17px]">
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

        {hasText(howWeWork.aiLine) ? <AiLine text={howWeWork.aiLine} /> : null}
      </div>
    </section>
  );
}
