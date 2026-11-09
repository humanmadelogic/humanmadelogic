'use client';

import { homeV2Config } from '@/config/home-v2';
import { hasText, isWorkPopulated } from '@/lib/hml/homeV2';

/** Reserved for approved case studies (HOME-WORK-*). Renders nothing until populated. */
export function HomeWorkSection() {
  const { work } = homeV2Config.content;

  if (!isWorkPopulated(homeV2Config.content)) return null;

  return (
    <section className="bg-paper py-16 sm:py-24" aria-label="Selected work">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <ul className="grid gap-6 md:grid-cols-2">
          {work.items.map((item) => {
            if (!hasText(item.title) || !hasText(item.href)) return null;
            return (
              <li key={item.title} className="rounded-[14px] border border-obsidian/10 p-6">
                <h3 className="text-[20px] tracking-[-0.03em]">{item.title}</h3>
                {hasText(item.body) ? (
                  <p className="mt-3 text-[16px] leading-[1.6] text-slate">{item.body}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
