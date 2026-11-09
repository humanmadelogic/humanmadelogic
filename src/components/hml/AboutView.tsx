'use client';

import { approach, process, statement } from '@/config/agency';
import { Process } from './Process';
import { RevealText } from './RevealText';

export function AboutView() {
  return (
    <>
      <section className="pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate">{statement.label}</p>
          <RevealText
            as="h1"
            immediate
            lines={['About Human Made Logic']}
            className="mt-6 text-[11vw] leading-[0.95] tracking-[-0.05em] sm:text-[8vw] lg:text-[72px]"
          />
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-slate">{statement.body}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate">{approach.label}</p>
          <h2 className="mt-6 text-[8vw] leading-[1.04] tracking-[-0.04em] sm:text-[44px]">{approach.heading}</h2>
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {approach.pillars.map((pillar) => (
              <li
                key={pillar.title}
                className="rounded-[16px] border border-obsidian/10 bg-white p-8"
              >
                <h3 className="text-[22px] tracking-[-0.03em]">{pillar.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.65] text-slate sm:text-[16px]">{pillar.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Process />
    </>
  );
}
