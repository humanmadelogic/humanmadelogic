'use client';

import type { ReactNode } from 'react';

/** Words as inline-block units — no mid-word line breaks. */
export function H3Words({ text, className = '' }: { text: string; className?: string }) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="h3-word">
          {word}
          {index < words.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </span>
  );
}

export function H3Marker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`h3-marker ${className}`}>{children}</span>;
}

export function splitHeadlineLines(text: string, maxWordsPerLine = 4): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += maxWordsPerLine) {
    lines.push(words.slice(i, i + maxWordsPerLine).join(' '));
  }
  return lines;
}

export function H3HMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="28" height="36" viewBox="0 0 30 40" aria-hidden fill="currentColor">
      <path d="M4 4h7v13h8V4h7v32h-7V21h-8v15H4V4z" />
    </svg>
  );
}
