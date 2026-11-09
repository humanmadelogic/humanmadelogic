'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { agency } from '@/config/agency';
import { trapFocus } from '@/lib/hml/focusTrap';

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <span
        aria-hidden="true"
        className="h-[7px] w-[7px] shrink-0 rounded-full bg-signalYellow"
      />
      <span className="text-[14px] font-medium tracking-[-0.03em]">
        {compact ? agency.shortName : agency.name}
      </span>
    </span>
  );
}

/**
 * Full-width navigation at the top of the page that collapses into a compact
 * floating pill once you scroll. Both states are rendered in the same fixed
 * container and cross-faded, so nothing in the document reflows.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const home = pathname === '/';
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const wasMenuOpenRef = useRef(false);
  const menuPanel = useRef<HTMLDivElement>(null);
  const wordmarkHref = home ? '#top' : '/';

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setCondensed(window.scrollY > 120);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (wasMenuOpenRef.current && !menuOpen) {
      requestAnimationFrame(() => menuTriggerRef.current?.focus());
    }
    wasMenuOpenRef.current = menuOpen;
  }, [menuOpen]);

  const openMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    menuTriggerRef.current = event.currentTarget;
    setMenuOpen(true);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    const main = document.getElementById('main');
    main?.setAttribute('inert', '');
    const release =
      menuPanel.current ? trapFocus(menuPanel.current) : () => undefined;
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      main?.removeAttribute('inert');
      release();
    };
  }, [menuOpen]);

  const close = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Full navigation — visible at the top of the page. */}
      <div
        className={`mx-auto flex max-w-editorial items-center justify-between gap-6 px-5 py-5 transition-[opacity,transform,visibility] duration-500 ease-out sm:px-8 lg:px-12 ${
          condensed || menuOpen
            ? 'pointer-events-none invisible -translate-y-2 opacity-0'
            : 'pointer-events-auto visible translate-y-0 opacity-100'
        }`}
      >
        <a href={wordmarkHref} className="inline-flex min-h-[44px] items-center rounded-sm">
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {agency.nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[14px] text-slate transition-colors hover:text-obsidian"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={agency.cta.href}
            className="inline-flex h-11 items-center rounded-full bg-obsidian px-5 text-[14px] font-medium text-paper transition-colors hover:bg-obsidian/85"
          >
            {agency.cta.label}
          </a>
        </div>

        <button
          type="button"
          onClick={openMenu}
          aria-expanded={menuOpen}
          aria-controls="hml-menu"
          className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full border border-obsidian/20 px-4 text-[14px] lg:hidden ${
            condensed ? 'hidden' : ''
          }`}
        >
          Menu
        </button>
      </div>

      {/* Condensed pill — takes over once the page scrolls. */}
      <div
        aria-hidden={!condensed || menuOpen}
        {...(!condensed || menuOpen ? { inert: true } : {})}
        className={`absolute right-5 top-4 flex items-center gap-1 rounded-full border border-obsidian/10 bg-paper/85 p-1.5 shadow-[0_10px_40px_-18px_rgba(21,21,21,0.5)] backdrop-blur-md transition-[opacity,transform,visibility] duration-500 ease-out sm:right-8 lg:right-12 ${
          condensed && !menuOpen
            ? 'pointer-events-auto visible translate-y-0 opacity-100'
            : 'pointer-events-none invisible -translate-y-3 opacity-0'
        }`}
      >
        <a
          href={wordmarkHref}
          tabIndex={condensed && !menuOpen ? 0 : -1}
          className="rounded-full px-3 py-2"
          aria-label="Back to top"
        >
          <Wordmark compact />
        </a>

        <nav aria-label="Primary, condensed" className="hidden items-center gap-1 lg:flex">
          {agency.nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-3 py-2 text-[13px] text-slate transition-colors hover:bg-obsidian/[0.06] hover:text-obsidian"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={agency.cta.href}
          className="hidden h-10 items-center rounded-full bg-obsidian px-4 text-[13px] font-medium text-paper transition-colors hover:bg-obsidian/85 lg:inline-flex"
        >
          {agency.cta.label}
        </a>

        <button
          type="button"
          onClick={openMenu}
          aria-expanded={menuOpen}
          aria-controls="hml-menu"
          aria-hidden={!condensed}
          tabIndex={condensed && !menuOpen ? 0 : -1}
          className={`min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-obsidian/15 px-4 text-[13px] lg:hidden ${
            condensed ? 'inline-flex' : 'hidden'
          }`}
        >
          Menu
        </button>
      </div>

      {/* Full-screen editorial menu. */}
      <div
        ref={menuPanel}
        id="hml-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
        className={`pointer-events-auto fixed inset-0 z-[60] flex min-h-[100dvh] flex-col bg-paper lg:hidden ${
          menuOpen ? 'flex' : 'hidden'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 sm:px-8">
          <Wordmark />
          <button
            type="button"
            onClick={close}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-obsidian/20 px-4 text-[14px]"
          >
            Close
          </button>
        </div>

        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-5 sm:px-8">
          <ul>
            {agency.nav.map((item, index) => (
              <li key={item.label} className="border-b border-obsidian/10 first:border-t">
                <a
                  href={item.href}
                  onClick={close}
                  className="flex min-h-[44px] items-center py-5 text-[13vw] leading-[1.02] tracking-[-0.05em] sm:text-[64px]"
                  style={{
                    transitionDelay: `${60 + index * 45}ms`,
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(14px)',
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '520ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={agency.cta.href}
            onClick={close}
            className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-obsidian px-6 text-[16px] font-medium text-paper"
          >
            {agency.cta.label}
          </a>
        </nav>

        <p className="px-5 pb-8 text-[13px] text-slate sm:px-8">
          <a href={`mailto:${agency.email}`} className="underline decoration-obsidian/20 underline-offset-4">
            {agency.email}
          </a>
        </p>
      </div>
    </header>
  );
}
