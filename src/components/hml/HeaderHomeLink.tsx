import { HmlBrandLogo } from './HmlBrandLogo';

const FOCUS_RING =
  'rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-obsidian';

export type HeaderLogoPreset = 'full' | 'condensed';

type HeaderHomeLinkProps = {
  href: string;
  preset?: HeaderLogoPreset;
  priority?: boolean;
};

const DESKTOP_MARK_CONDENSED = 25;

export function HeaderHomeLink({ href, preset = 'full', priority = false }: HeaderHomeLinkProps) {
  const paddingClass =
    preset === 'condensed' ? 'px-3 py-2' : 'py-[11px] pr-3 pl-[11px]';

  return (
    <a
      href={href}
      aria-label="Human Made Logic"
      className={`inline-flex min-h-[44px] shrink-0 items-center ${paddingClass} ${FOCUS_RING}`}
    >
      {preset === 'full' ? (
        <>
          <span className="relative hidden h-8 w-[225px] shrink-0 items-center overflow-hidden transition-[width,opacity] duration-200 ease-out motion-reduce:transition-none lg:flex">
            <HmlBrandLogo
              variant="horizontal"
              height={32}
              priority={priority}
              alt=""
              className="h-8 w-auto max-w-none"
            />
          </span>
          <span className="block shrink-0 lg:hidden">
            <HmlBrandLogo variant="mark" height={28} priority={priority} alt="" />
          </span>
        </>
      ) : (
        <>
          <span className="hidden h-[26px] w-[21px] shrink-0 items-center justify-center lg:flex">
            <HmlBrandLogo
              variant="mark"
              height={DESKTOP_MARK_CONDENSED}
              priority={priority}
              alt=""
            />
          </span>
          <span className="block shrink-0 lg:hidden">
            <HmlBrandLogo variant="mark" height={28} priority={priority} alt="" />
          </span>
        </>
      )}
    </a>
  );
}