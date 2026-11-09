'use client';

import Link from 'next/link';

type Props = {
  href: string;
  label: string;
};

export function ServiceMobileStickyCta({ href, label }: Props) {
  if (!label.trim() || !href.trim()) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 border-t border-obsidian/10 bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
      role="presentation"
    >
      <Link
        href={href}
        className="pointer-events-auto mx-auto flex h-11 max-w-editorial items-center justify-center rounded-full bg-obsidian px-6 text-[14px] font-medium text-paper"
      >
        {label}
      </Link>
    </div>
  );
}
