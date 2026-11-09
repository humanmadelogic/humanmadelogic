'use client';

import { homeV2Config } from '@/config/home-v2';
import { hasText, isBeliefPopulated } from '@/lib/hml/homeV2';
import { H3Words } from './h3Typography';
import { useH3Reveal } from './useH3Reveal';

const PHRASE = 'impossible to ignore';

export function HomeV3Belief() {
  const { belief } = homeV2Config.content;
  const reveal = useH3Reveal<HTMLElement>();

  if (!isBeliefPopulated(homeV2Config.content)) return null;

  const quoteParts = belief.quote
    .split(/\.\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => (part.endsWith('.') ? part : `${part}.`));

  const sloganIdx = belief.slogan.toLowerCase().indexOf(PHRASE);

  return (
    <section ref={reveal.ref} className={`bg-[var(--h3-tint)] px-5 py-20 sm:px-8 lg:px-12 ${reveal.className}`}>
      <div className="mx-auto grid max-w-editorial min-w-0 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        {hasText(belief.quote) ? (
          <h2 className="h3-display text-[clamp(2rem,7vw,5rem)] leading-[0.92] text-obsidian">
            {quoteParts.map((line) => (
              <span key={line} className="mb-2 block last:mb-0">
                <H3Words text={line} />
              </span>
            ))}
          </h2>
        ) : null}
        <div className="min-w-0">
          {hasText(belief.body) ? <p className="h3-body text-obsidian">{belief.body}</p> : null}
          {hasText(belief.slogan) ? (
            <p className="mt-6 text-[clamp(1.125rem,2vw,1.5rem)] font-semibold leading-snug text-obsidian">
              {sloganIdx >= 0 ? (
                <>
                  {belief.slogan.slice(0, sloganIdx)}
                  <span className="h3-marker">{belief.slogan.slice(sloganIdx, sloganIdx + PHRASE.length)}</span>
                  {belief.slogan.slice(sloganIdx + PHRASE.length)}
                </>
              ) : (
                belief.slogan
              )}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
