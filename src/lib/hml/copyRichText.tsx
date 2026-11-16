import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';

export type CopyPhraseLink = { phrase: string; href: string; external?: boolean };

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

function splitMarkdownLinks(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let idx = 0;
  MARKDOWN_LINK.lastIndex = 0;
  while ((match = MARKDOWN_LINK.exec(text))) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const label = match[1];
    const href = match[2];
    const external = /^https?:\/\//i.test(href);
    parts.push(
      external ? (
        <a
          key={`${keyPrefix}-md-${idx}`}
          href={href}
          className="underline decoration-obsidian/30 underline-offset-2 hover:decoration-obsidian"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      ) : (
        <Link
          key={`${keyPrefix}-md-${idx}`}
          href={href}
          className="underline decoration-obsidian/30 underline-offset-2 hover:decoration-obsidian"
        >
          {label}
        </Link>
      ),
    );
    last = match.index + match[0].length;
    idx += 1;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : [text];
}

function applyPhraseLinks(text: string, links: CopyPhraseLink[], keyPrefix: string): ReactNode[] {
  if (links.length === 0) return [text];
  const sorted = [...links].sort((a, b) => b.phrase.length - a.phrase.length);
  type Token = { type: 'text'; value: string } | { type: 'link'; link: CopyPhraseLink };
  let tokens: Token[] = [{ type: 'text', value: text }];

  for (const link of sorted) {
    const next: Token[] = [];
    for (const token of tokens) {
      if (token.type === 'link') {
        next.push(token);
        continue;
      }
      let rest = token.value;
      while (rest.length > 0) {
        const at = rest.indexOf(link.phrase);
        if (at < 0) {
          next.push({ type: 'text', value: rest });
          break;
        }
        if (at > 0) next.push({ type: 'text', value: rest.slice(0, at) });
        next.push({ type: 'link', link });
        rest = rest.slice(at + link.phrase.length);
      }
    }
    tokens = next;
  }

  return tokens.map((token, i) => {
    if (token.type === 'text') return token.value;
    const { href, phrase, external } = token.link;
    return external ? (
      <a
        key={`${keyPrefix}-ph-${i}`}
        href={href}
        className="underline decoration-obsidian/30 underline-offset-2 hover:decoration-obsidian"
        rel="noopener noreferrer"
      >
        {phrase}
      </a>
    ) : (
      <Link
        key={`${keyPrefix}-ph-${i}`}
        href={href}
        className="underline decoration-obsidian/30 underline-offset-2 hover:decoration-obsidian"
      >
        {phrase}
      </Link>
    );
  });
}

type Props = {
  text: string;
  phraseLinks?: CopyPhraseLink[];
  className?: string;
  id?: string;
};

export function CopyRichText({ text, phraseLinks = [], className, id }: Props) {
  const hasMarkdown = /\[([^\]]+)\]\(([^)]+)\)/.test(text);
  if (hasMarkdown) {
    return <p className={className} id={id}>{splitMarkdownLinks(text, id ?? 'copy')}</p>;
  }
  const withPhrases = applyPhraseLinks(text, phraseLinks, id ?? 'copy');
  return (
    <p className={className} id={id}>
      {withPhrases.map((node, i) => (
        <Fragment key={i}>{node}</Fragment>
      ))}
    </p>
  );
}