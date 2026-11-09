'use client';

import { homeV2Config } from '@/config/home-v2';
import { hasText, isBeliefPopulated } from '@/lib/hml/homeV2';
import { splitDisplayLines } from './homeV2Typography';
import { useScrollReveal } from './useScrollReveal';

function beliefQuoteLines(quote: string): string[] {
  const parts = quote
    .split(/\.\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length <= 1) return splitDisplayLines(quote, 3);
  return parts.map((part, index) => (index < parts.length - 1 || quote.trimEnd().endsWith('.') ? `${part}.` : part));
}

const SLOGAN_PHRASE = 'impossible to ignore';

function BeliefSlogan({ text }: { text: string }) {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(SLOGAN_PHRASE);
  if (idx < 0) {
    return <p className="mt-8 text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold leading-snug tracking-[-0.02em] text-obsidian">{text}</p>;
  }
  const before = text.slice(0, idx);
  const phrase = text.slice(idx, idx + SLOGAN_PHRASE.length);
  const after = text.slice(idx + SLOGAN_PHRASE.length);
  return (
    <p className="mt-8 text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold leading-snug tracking-[-0.02em] text-obsidian">
      {before}
      <span className="home-v2-marker-under">{phrase}</span>
      {after}
    </p>
  );
}

export function HomeBeliefSection() {
  const { belief } = homeV2Config.content;
  const reveal = useScrollReveal<HTMLElement>();

  if (!isBeliefPopulated(homeV2Config.content)) return null;

  return (
    <section ref={reveal.ref} className={`bg-paper px-5 py-16 sm:px-8 sm:py-24 lg:px-12 ${reveal.className}`}>
      <div className="mx-auto grid max-w-editorial gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-14">
        {hasText(belief.quote) ? (
          <blockquote className="min-w-0">
            <p className="home-v2-display text-[clamp(2.5rem,10vw,9.75rem)] leading-[0.86] text-obsidian">
              {beliefQuoteLines(belief.quote).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </blockquote>
        ) : null}
        <div className="min-w-0 lg:pb-2">
          {hasText(belief.body) ? (
            <p className="home-v2-body-lg text-obsidian">{belief.body}</p>
          ) : null}
          {hasText(belief.slogan) ? <BeliefSlogan text={belief.slogan} /> : null}
        </div>
      </div>
    </section>
  );
}
