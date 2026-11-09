'use client';

import { homeV2Config } from '@/config/home-v2';
import { hasText, isFaqPopulated } from '@/lib/hml/homeV2';
import { H3Words } from './h3Typography';
import { useH3Reveal } from './useH3Reveal';

export function HomeV3Faq() {
  const { faq } = homeV2Config.content;
  const reveal = useH3Reveal<HTMLElement>();

  if (!isFaqPopulated(homeV2Config.content)) return null;

  const items = faq.items.filter((i) => hasText(i.question) && hasText(i.answer));

  return (
    <section ref={reveal.ref} className={`px-5 py-20 sm:px-8 lg:px-12 ${reveal.className}`}>
      <div className="mx-auto grid max-w-editorial min-w-0 gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        {hasText(faq.heading) ? (
          <h2 className="h3-display text-[clamp(1.75rem,5vw,3.25rem)] text-obsidian">
            <H3Words text={faq.heading} />
          </h2>
        ) : (
          <div />
        )}
        <div className="divide-y divide-obsidian/15 border-y border-obsidian/15">
          {items.map((item, index) => (
            <details key={item.question} className="group py-3" open={index === 0}>
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-2 text-[17px] font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden
                  className="text-2xl text-slate transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <div className="h3-faq-panel">
                <div>
                  <p className="h3-body pb-3 pt-1">{item.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
