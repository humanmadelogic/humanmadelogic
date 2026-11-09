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
    .slice(0, 4);

  return (
    <section
      ref={reveal.ref}
      className={`bg-[var(--h2v-tint)] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28 ${reveal.className}`}
      aria-labelledby={hasText(promises.heading) ? 'home-promises-heading' : undefined}
    >
      <div className="mx-auto max-w-editorial">
        {hasText(promises.heading) ? (
          <h2
            id="home-promises-heading"
            className="home-v2-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.9] text-obsidian"
          >
            {promises.heading}
          </h2>
        ) : null}
        <ul className="mt-12 grid gap-0 border-t-2 border-obsidian sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={item.title || `promise-${index}`}
              className="min-w-0 border-b border-obsidian/15 px-0 py-8 sm:border-r sm:border-b-0 sm:px-6 sm:py-10 last:sm:border-r-0 lg:px-8"
            >
              <p className="home-v2-display text-[clamp(2.75rem,6vw,6rem)] leading-none text-obsidian">
                {String(index + 1).padStart(2, '0')}
              </p>
              {hasText(item.title) ? (
                <h3 className="mt-4 text-[clamp(17px,2vw,20px)] font-semibold leading-snug tracking-[-0.02em] text-obsidian">
                  {item.title}
                </h3>
              ) : null}
              {hasText(item.body) ? (
                <p className="home-v2-body mt-3">{item.body}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
