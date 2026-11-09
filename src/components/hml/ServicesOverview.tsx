'use client';

import Link from 'next/link';
import { capabilities } from '@/config/agency';
import { servicesIndex } from '@/config/services';
import { CapabilityVisual } from './CapabilityVisual';
import { RevealText } from './RevealText';

export function ServicesOverview() {
  return (
    <>
      <section className="pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate">{servicesIndex.eyebrow}</p>
          <RevealText
            as="h1"
            immediate
            lines={[capabilities.heading]}
            className="mt-6 text-[11vw] leading-[0.95] tracking-[-0.05em] sm:text-[8vw] lg:text-[72px]"
          />
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-slate">{capabilities.intro}</p>
        </div>
      </section>

      <section className="pb-24 pt-12 sm:pb-32">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <ul className="grid border-t border-obsidian/10 md:grid-cols-2">
            {capabilities.items.map((item) => (
              <li key={item.slug} className="border-b border-obsidian/10 p-6 md:odd:border-r">
                <Link href={item.href} className="group flex h-full flex-col justify-between gap-8">
                  <span>
                    <span className="text-[12px] tabular-nums tracking-[0.18em] text-slate">{item.index}</span>
                    <h2 className="mt-4 text-[30px] tracking-[-0.035em]">{item.title}</h2>
                    <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.6] text-slate">{item.body}</p>
                  </span>
                  <span className="flex items-end justify-between gap-4">
                    <span className="text-[14px] font-medium group-hover:underline">
                      {servicesIndex.viewServiceLabel}
                    </span>
                    <CapabilityVisual kind={item.visual} active={false} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
