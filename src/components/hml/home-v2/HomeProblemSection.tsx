'use client';

import { homeV2Config } from '@/config/home-v2';
import { hasText, isProblemPopulated } from '@/lib/hml/homeV2';
import { ScrollHighlightWords } from './ScrollHighlightWords';
import { useScrollReveal } from './useScrollReveal';

export function HomeProblemSection() {
  const { problem } = homeV2Config.content;
  const reveal = useScrollReveal<HTMLElement>();

  if (!isProblemPopulated(homeV2Config.content)) return null;

  const lines = problem.lines?.filter((line) => hasText(line)) ?? [];

  return (
    <section
      ref={reveal.ref}
      className={`bg-paper py-16 sm:py-24 lg:py-28 ${reveal.className}`}
      aria-labelledby={hasText(problem.heading) ? 'home-problem-heading' : undefined}
    >
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        {hasText(problem.statement) ? (
          <ScrollHighlightWords
            text={problem.statement}
            className="max-w-[18ch] text-[clamp(1.75rem,5.5vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.04em]"
          />
        ) : null}
        {hasText(problem.statementSupport) ? (
          <p className="mt-8 max-w-[48ch] text-[18px] leading-[1.55] text-slate sm:text-[20px]">
            {problem.statementSupport}
          </p>
        ) : null}
        {hasText(problem.heading) ? (
          <h2
            id="home-problem-heading"
            className="mt-10 text-[13px] font-medium uppercase tracking-[0.16em] text-slate"
          >
            {problem.heading}
          </h2>
        ) : null}
        {lines.length > 0 ? (
          <ul
            className={`grid gap-6 ${hasText(problem.heading) || hasText(problem.statement) ? 'mt-10' : ''} sm:grid-cols-3 sm:gap-8`}
          >
            {lines.map((line) => (
              <li
                key={line}
                className="rounded-[14px] border border-obsidian/10 bg-paper p-5 text-[16px] leading-[1.6] text-obsidian"
              >
                {line}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
