import Image from 'next/image';
import { agency } from '@/config/agency';

const FOOTER_LINK =
  'inline-flex min-h-[44px] items-center text-[16px] text-paper/85 transition-colors hover:text-paper';

const FOOTER_LINK_SM =
  'inline-flex min-h-[44px] items-center text-[14px] text-paper/70 transition-colors hover:text-paper';

const SOCIAL_ICON: Record<string, string> = {
  LinkedIn: '/images/hml/social/linkedin.svg',
  Instagram: '/images/hml/social/instagram.svg',
};

function isExternalSocial(href: string) {
  return href.startsWith('https://') || href.startsWith('http://');
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-obsidian pb-10 text-paper">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-t border-paper/12 pt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="font-grotesk text-[9vw] leading-[0.94] tracking-[-0.05em] sm:text-[6vw] lg:text-[4vw] xl:text-[58px]">
              {agency.name}
            </p>
            <p className="mt-6 max-w-[34ch] text-[15px] leading-[1.6] text-paper/60">{agency.principle}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-paper/45">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {agency.nav.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={FOOTER_LINK}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 text-[11px] uppercase tracking-[0.2em] text-paper/45">Services</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href="/services" className={FOOTER_LINK}>
                  All services
                </a>
              </li>
              <li>
                <a href="/services/branding" className={FOOTER_LINK}>
                  Branding
                </a>
              </li>
              <li>
                <a href="/services/seo-aeo-geo" className={FOOTER_LINK}>
                  SEO/AEO/GEO
                </a>
              </li>
              <li>
                <a href="/services/performance-marketing" className={FOOTER_LINK}>
                  Performance marketing
                </a>
              </li>
              <li>
                <a href="/services/social-media" className={FOOTER_LINK}>
                  Social media
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-paper/45">Elsewhere</h2>
            <ul className="mt-5 space-y-3">
              {agency.social.filter((item) => isExternalSocial(item.href)).map((item) => {
                const icon = SOCIAL_ICON[item.label];
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`${FOOTER_LINK} gap-2.5`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {icon ? (
                        <Image
                          src={icon}
                          alt=""
                          width={20}
                          height={20}
                          className="opacity-85"
                          aria-hidden
                        />
                      ) : null}
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href={`mailto:${agency.email}`}
                  className={`${FOOTER_LINK} underline decoration-paper/25 underline-offset-4`}
                >
                  {agency.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <nav aria-label="Legal" className="mt-12 border-t border-paper/12 pt-8">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-paper/45">Legal</h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {agency.legalNav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={FOOTER_LINK_SM}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-col gap-3 border-t border-paper/12 pt-6 text-[13px] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-balance">{agency.location}</p>
          <p>
            © {year} {agency.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
