'use client';

import { homeV2Config } from '@/config/home-v2';
import { hasText, isPendingHomeImageAlt, isWhoPopulated } from '@/lib/hml/homeV2';
import { HomeOptionalImage } from './HomeOptionalImage';
import { useScrollReveal } from './useScrollReveal';

export function HomeWhoSection() {
  const { who } = homeV2Config.content;
  const { assets } = homeV2Config;
  const reveal = useScrollReveal<HTMLElement>();

  if (!isWhoPopulated(homeV2Config.content)) return null;

  const lines = who.lines.filter((line) => hasText(line));
  const showWhoImage = !isPendingHomeImageAlt(who.imageAlt);

  return (
    <section ref={reveal.ref} className={`bg-paper py-16 sm:py-24 lg:py-28 ${reveal.className}`}>
      <div
        className={`mx-auto grid max-w-editorial gap-10 px-5 sm:px-8 lg:items-center lg:gap-14 lg:px-12 ${
          showWhoImage ? 'lg:grid-cols-12' : 'lg:grid-cols-1'
        }`}
      >
        {showWhoImage ? (
          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <HomeOptionalImage
              src={assets.whoImage}
              alt={who.imageAlt}
              width={assets.whoWidth}
              height={assets.whoHeight}
              sizes="(min-width: 1024px) 36vw, 100vw"
            />
          </div>
        ) : null}
        <div
          className={
            showWhoImage ? 'lg:col-span-6 lg:col-start-1 lg:row-start-1' : 'max-w-prose'
          }
        >
          {hasText(who.heading) ? (
            <h2 className="text-[30px] tracking-[-0.03em] sm:text-[36px]">{who.heading}</h2>
          ) : null}
          {lines.length > 0 ? (
            <ul className="mt-8 space-y-4">
              {lines.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-[16px] leading-[1.6] text-obsidian before:mt-[0.55em] before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-signalYellow before:content-['']"
                >
                  {line}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
