'use client';

import { workPlaceholder } from '@/config/agency';
import { RevealText } from './RevealText';

/**
 * Reserved for approved case studies. No invented clients or metrics.
 */
export function WorkPlaceholder() {
  return (
    <section id={workPlaceholder.id} className="scroll-mt-24 border-y border-dashed border-obsidian/20 py-24 sm:py-32">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate lg:col-span-3">
            {workPlaceholder.label}
          </p>
          <RevealText
            lines={[workPlaceholder.heading]}
            className="text-[7vw] leading-[1.06] tracking-[-0.04em] sm:text-[4.6vw] lg:col-span-9 lg:text-[3.2vw] xl:text-[46px]"
          />
        </div>

        <div
          role="status"
          aria-live="polite"
          className="mt-14 rounded-[16px] border border-obsidian/15 bg-paper/80 p-8 sm:mt-16 sm:p-10"
        >
          <p className="max-w-[62ch] text-[16px] leading-[1.65] text-slate">{workPlaceholder.body}</p>
          {workPlaceholder.note ? (
            <p className="mt-6 font-mono text-[13px] leading-[1.5] text-slate/80">{workPlaceholder.note}</p>
          ) : null}

          <ul className="mt-10 grid gap-4 sm:grid-cols-3" aria-label="Placeholder slots for future case studies">
            {[1, 2, 3].map((slot) => (
              <li
                key={slot}
                className="flex min-h-[140px] flex-col justify-end rounded-[12px] border border-dashed border-obsidian/25 bg-obsidian/[0.03] p-5"
              >
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate">Placeholder {slot}</span>
                <span className="mt-2 text-[14px] text-slate/70">Case study pending approval</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
