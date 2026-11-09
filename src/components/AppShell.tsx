'use client';

import { usePathname } from 'next/navigation';

/**
 * Human Made Logic chrome (header/footer inside page components) for public agency routes.
 * Admin keeps its own layout.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLegacyRelay =
    pathname === '/pricing' ||
    pathname.startsWith('/resources') ||
    pathname === '/privacy' ||
    pathname === '/terms';

  if (isLegacyRelay) return <>{children}</>;

  return <>{children}</>;
}
