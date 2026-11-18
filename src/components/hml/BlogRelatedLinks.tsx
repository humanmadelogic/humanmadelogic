import Link from 'next/link';
import type { BlogRelatedLink } from '@/config/blog';

export function BlogRelatedLinks({ links }: { links: BlogRelatedLink[] }) {
  if (!links.length) return null;
  return (
    <nav aria-label="Related pages" className="mt-10 border-t border-obsidian/10 pt-8">
      <h2 className="text-[13px] uppercase tracking-[0.18em] text-slate">Related</h2>
      <ul className="mt-4 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[15px] text-obsidian underline decoration-obsidian/25 underline-offset-2 hover:decoration-obsidian/50"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}