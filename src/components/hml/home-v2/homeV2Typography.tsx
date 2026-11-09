'use client';

import type { ReactNode } from 'react';

/** Yellow marker band behind ink text (never yellow text on white). */
export function HomeV2Marker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`home-v2-marker ${className}`}>{children}</span>;
}

export function HomeV2MarkerBlock({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`home-v2-marker-block ${className}`}>{children}</span>;
}

/** H monogram for ticker separators (yellow on ink). */
export function HomeV2HMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="30"
      height="40"
      viewBox="0 0 30 40"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M4 4h7v13h8V4h7v32h-7V21h-8v15H4V4z" />
    </svg>
  );
}

/** Split display headline into wrapped lines for stagger (~4-5 words per line). */
export function splitDisplayLines(text: string, wordsPerLine = 4): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(' '));
  }
  return lines;
}

export function highlightPhraseInText(text: string, phrase: string, wrap: (part: string, i: number) => ReactNode) {
  const index = text.toLowerCase().indexOf(phrase.toLowerCase());
  if (index < 0) return text;
  const before = text.slice(0, index);
  const match = text.slice(index, index + phrase.length);
  const after = text.slice(index + phrase.length);
  return (
    <>
      {before}
      {wrap(match, 0)}
      {after}
    </>
  );
}
