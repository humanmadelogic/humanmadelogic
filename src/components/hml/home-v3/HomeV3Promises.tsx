'use client';

import { homeV2Config } from '@/config/home-v2';
import { hasText, isPromisesPopulated } from '@/lib/hml/homeV2';
import { H3Words } from './h3Typography';
import { useH3Reveal } from './useH3Reveal';

export function HomeV3Promises() {
  const { promises } = homeV2Config.content;
  const reveal = useH3Reveal<HTMLElement>();

  if (!isPromisesPopulated(homeV2Config.content)) return null;

  const items = promises.items.filter((i) => hasText(i.title) || hasText(i.body)).slice(0, 4);

  return (
    <section
      ref={reveal.ref}
      className={`bg-[var(--h3-tint)] px-5 py-20 sm:px-8 lg:px-12 ${reveal.className}`}
    >
      <div className="mx-auto max-w-editorial min-w-0">
        {hasText(promises.heading) ? (
          <h2 className="h3-display max-w-[20ch] text-[clamp(1.75rem,5vw,3.5rem)] text-obsidian">
            <H3Words text={promises.heading} />
          </h2>
        ) : null}
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li key={item.title || index} className="min-w-0 border-t-2 border-obsidian pt-6">
              <p className="h3-display text-5xl text-obsidian">{String(index + 1).padStart(2, '0')}</p>
              {hasText(item.title) ? (
                <h3 className="mt-3 text-lg font-semibold text-obsidian">{item.title}</h3>
              ) : null}
              {hasText(item.body) ? <p className="h3-body mt-2">{item.body}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
