import type { Metadata } from 'next';
import Link from 'next/link';
import { HmlPageShell } from '@/components/hml/HmlPageShell';
import { notFoundPage } from '@/config/agency';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Page not found',
  description: 'The page you were looking for does not exist on Human Made Logic.',
  path: '/404',
  noindex: true,
});

export default function NotFound() {
  return (
    <HmlPageShell>
      <section className="pt-28 pb-24 sm:pt-32 sm:pb-32 lg:pt-36">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate">Error {notFoundPage.code}</p>
          <h1 className="mt-6 text-[12vw] leading-[1.02] tracking-[-0.04em] sm:text-[56px]">
            {notFoundPage.heading}
          </h1>
          <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.6] text-slate">{notFoundPage.body}</p>

          <ul className="mt-12 divide-y divide-obsidian/10 border-y border-obsidian/10">
            {notFoundPage.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center justify-between gap-4 py-5 text-[18px] tracking-[-0.02em]"
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden="true"
                    className="text-slate transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </HmlPageShell>
  );
}
