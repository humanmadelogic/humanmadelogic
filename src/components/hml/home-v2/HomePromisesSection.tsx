'use client';

import { homeV2Config } from '@/config/home-v2';
import { hasText, isPromisesPopulated } from '@/lib/hml/homeV2';
import { useScrollReveal } from './useScrollReveal';

export function HomePromisesSection() {
  const { promises } = homeV2Config.content;
  const reveal = useScrollReveal<HTMLElement>();

  if (!isPromisesPopulated(homeV2Config.content)) return null;

  const items = promises.items
    .filter((item) => hasText(item.title) || hasText(item.body))
    .slice(0, 5);

  return (
    <section
      ref={reveal.ref}
      className={`border-y border-obsidian/10 bg-hairline py-16 sm:py-24 ${reveal.className}`}
      aria-labelledby={hasText(promises.heading) ? 'home-promises-heading' : undefined}
    >
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        {hasText(promises.heading) ? (
          <h2 id="home-promises-heading" className="text-[30px] tracking-[-0.03em] sm:text-[36px]">
            {promises.heading}
          </h2>
        ) : null}
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={item.title || `promise-${index}`}
              className="min-w-0 break-words rounded-[14px] border border-obsidian/10 bg-paper p-5"
            >
              <p className="text-[12px] tabular-nums tracking-[0.14em] text-slate">
                {String(index + 1).padStart(2, '0')}
              </p>
              {hasText(item.title) ? (
                <h3 className="mt-2 text-[16px] font-medium leading-snug tracking-[-0.02em] text-obsidian sm:text-[17px]">
                  {item.title}
                </h3>
              ) : null}
              {hasText(item.body) ? (
                <p className="mt-2 text-[15px] leading-[1.6] text-slate">{item.body}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
