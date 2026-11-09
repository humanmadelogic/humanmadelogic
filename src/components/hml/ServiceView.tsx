'use client';

import Link from 'next/link';
import { agency, finalCta } from '@/config/agency';
import type { ServiceDefinition } from '@/config/services';
import { CapabilityVisual } from './CapabilityVisual';
import { RevealOnScroll } from './RevealOnScroll';
import { RevealText } from './RevealText';

type Props = {
  service: ServiceDefinition;
};

export function ServiceView({ service }: Props) {
  return (
  <>
    <section className="pt-28 sm:pt-32 lg:pt-36">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate">
          {service.index} · Service
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8">
            <RevealText
              as="h1"
              immediate
              lines={[service.title]}
              className="text-[11vw] leading-[0.95] tracking-[-0.05em] sm:text-[8vw] lg:text-[72px]"
            />
            <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.65] text-slate">{service.intro}</p>
          </div>
          <div className="flex justify-start lg:col-span-4 lg:justify-end">
            <CapabilityVisual kind={service.visual} active />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href={agency.cta.href}
            className="inline-flex h-12 items-center rounded-full bg-obsidian px-6 text-[15px] font-medium text-paper transition-colors hover:bg-obsidian/85"
          >
            {agency.cta.label}
          </Link>
          <Link
            href="/#services"
            className="inline-flex h-12 items-center rounded-full border border-obsidian/20 px-6 text-[15px] transition-colors hover:border-obsidian/45"
          >
            All services
          </Link>
        </div>
      </div>
    </section>

    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <RevealOnScroll>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-slate">What we deliver</h2>
              <ul className="mt-6 space-y-4">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="border-b border-obsidian/10 pb-4 text-[16px] leading-[1.55] text-obsidian"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-slate">What you gain</h2>
              <ul className="mt-6 space-y-4">
                {service.outcomes.map((item) => (
                  <li
                    key={item}
                    className="border-b border-obsidian/10 pb-4 text-[16px] leading-[1.55] text-obsidian"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>

    <section className="border-t border-obsidian/10 py-20 sm:py-24">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <h2 className="text-[9vw] leading-[1.02] tracking-[-0.04em] sm:text-[48px]">{finalCta.heading}</h2>
        <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.6] text-slate">{finalCta.body}</p>
        <Link
          href={finalCta.cta.href}
          className="mt-8 inline-flex h-12 items-center rounded-full bg-obsidian px-6 text-[15px] font-medium text-paper transition-colors hover:bg-obsidian/85"
        >
          {finalCta.cta.label}
        </Link>
      </div>
    </section>
  </>
  );
}
