import Link from 'next/link';
import { breadcrumbItemsFromCopy } from '@/lib/hml/breadcrumbFromCopy';

export function Breadcrumb({ trail }: { trail: string }) {
  const items = breadcrumbItemsFromCopy(trail);
  return (
    <nav aria-label="Breadcrumb" className="pt-24 sm:pt-28">
      <ol className="mx-auto flex max-w-editorial flex-wrap gap-x-2 gap-y-1 px-5 text-[13px] text-slate sm:px-8 lg:px-12">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden className="text-obsidian/25">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-obsidian">
                {item.label}
              </Link>
            ) : (
              <span className="text-obsidian">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}