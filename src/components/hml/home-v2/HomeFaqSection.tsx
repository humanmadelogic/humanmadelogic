'use client';

import { homeV2Config } from '@/config/home-v2';
import { hasText, isFaqPopulated } from '@/lib/hml/homeV2';

export function HomeFaqSection() {
  const { faq } = homeV2Config.content;

  if (!isFaqPopulated(homeV2Config.content)) return null;

  const items = faq.items.filter((item) => hasText(item.question) && hasText(item.answer));

  return (
    <section
      className="bg-paper py-16 sm:py-24 lg:py-28"
      aria-labelledby={hasText(faq.heading) ? 'home-faq-heading' : undefined}
    >
      <div className="mx-auto max-w-prose px-5 sm:px-8 lg:px-12">
        {hasText(faq.heading) ? (
          <h2 id="home-faq-heading" className="text-[30px] tracking-[-0.03em] sm:text-[34px]">
            {faq.heading}
          </h2>
        ) : null}
        <div className="mt-10 divide-y divide-obsidian/10 border-y border-obsidian/10">
          {items.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium tracking-[-0.02em] text-obsidian marker:content-none [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-slate transition-transform group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="pb-2 text-[16px] leading-[1.65] text-slate">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
