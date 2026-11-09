'use client';

import { homeV2Config } from '@/config/home-v2';
import { hasText, isFaqPopulated } from '@/lib/hml/homeV2';

export function HomeFaqSection() {
  const { faq } = homeV2Config.content;

  if (!isFaqPopulated(homeV2Config.content)) return null;

  const items = faq.items.filter((item) => hasText(item.question) && hasText(item.answer));

  return (
    <section
      className="bg-paper px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      aria-labelledby={hasText(faq.heading) ? 'home-faq-heading' : undefined}
    >
      <div className="mx-auto grid max-w-editorial gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16 lg:items-start">
        {hasText(faq.heading) ? (
          <h2
            id="home-faq-heading"
            className="home-v2-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.9] text-obsidian"
          >
            {faq.heading}
          </h2>
        ) : (
          <div />
        )}
        <div className="min-w-0 divide-y divide-obsidian/15 border-y border-obsidian/15">
          {items.map((item, index) => (
            <details key={item.question} className="group py-4" open={index === 0}>
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-2 text-[clamp(17px,2.2vw,20px)] font-semibold tracking-[-0.02em] text-obsidian marker:content-none [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-[22px] leading-none text-slate transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <div className="home-v2-faq-panel">
                <div>
                  <p className="home-v2-body pb-3 pt-2">{item.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
