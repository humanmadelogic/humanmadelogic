'use client';

import Image from 'next/image';
import { useState } from 'react';
import { homeV2Config } from '@/config/home-v2';
import { hasText, isProblemPopulated } from '@/lib/hml/homeV2';
import { ScrollHighlightWords } from './ScrollHighlightWords';

function PainImage({ src }: { src: string }) {
  const [missing, setMissing] = useState(false);
  if (missing) {
    return <div className="aspect-[4/3] w-full rounded-sm bg-[var(--h2v-tint)]" aria-hidden />;
  }
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="(min-width: 768px) 30vw, 90vw"
        onError={() => setMissing(true)}
      />
    </div>
  );
}

export function HomeProblemSection() {
  const { problem } = homeV2Config.content;
  const { problemPainImages } = homeV2Config.assets;

  if (!isProblemPopulated(homeV2Config.content)) return null;

  const lines = problem.lines?.filter((line) => hasText(line)) ?? [];

  return (
    <section className="bg-paper px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-editorial">
        {hasText(problem.statement) ? (
          <ScrollHighlightWords
            text={problem.statement}
            className="home-v2-display max-w-[14ch] break-words text-[clamp(2.25rem,10.5vw,9.375rem)] leading-[0.9] text-obsidian"
          />
        ) : null}
        {lines.length > 0 ? (
          <ul className="mt-14 grid gap-8 border-t-2 border-obsidian pt-8 sm:grid-cols-3 sm:gap-7">
            {lines.map((line, index) => (
              <li key={line} className="min-w-0">
                {problemPainImages[index] ? <PainImage src={problemPainImages[index]} /> : null}
                <span className="home-v2-display mt-4 block text-[clamp(1.75rem,4vw,2.75rem)] text-slate">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 max-w-[400px] text-[18px] font-medium leading-snug tracking-[-0.01em] text-obsidian sm:text-[21px]">
                  {line}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
