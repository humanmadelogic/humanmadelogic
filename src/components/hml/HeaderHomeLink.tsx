import { HmlBrandLogo } from './HmlBrandLogo';

const FOCUS_RING =
  'rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-obsidian';

type HeaderHomeLinkProps = {
  href: string;
  /** Condensed floating pill: horizontal logo at 26px (min spec). */
  compact?: boolean;
  priority?: boolean;
  /** Home scroll anchor on the homepage. */
  homeAnchor?: boolean;
};

export function HeaderHomeLink({ href, compact = false, priority = false, homeAnchor = false }: HeaderHomeLinkProps) {
  const desktopHeight = compact ? 26 : 32;
  const paddingClass = compact ? 'px-2 py-1' : 'py-[11px] pr-3 pl-[11px]';

  const logoAlt = homeAnchor ? '' : 'Human Made Logic';

  return (
    <a
      href={href}
      className={`inline-flex min-h-[44px] shrink-0 items-center ${paddingClass} ${FOCUS_RING}`}
      {...(homeAnchor ? { 'aria-label': 'Human Made Logic, back to top' } : {})}
    >
      <span className="hidden shrink-0 lg:block">
        <HmlBrandLogo variant="horizontal" height={desktopHeight} priority={priority} alt={logoAlt} />
      </span>
      <span className="block shrink-0 lg:hidden">
        <HmlBrandLogo variant="mark" height={28} priority={priority} alt={logoAlt} />
      </span>
    </a>
  );
}