import { agency } from '@/config/agency';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-obsidian pb-10 text-paper">
      <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-t border-paper/12 pt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="text-[9vw] leading-[0.94] tracking-[-0.05em] sm:text-[6vw] lg:text-[4vw] xl:text-[58px]">
              {agency.name}
            </p>
            <p className="mt-6 max-w-[34ch] text-[15px] leading-[1.6] text-paper/60">
              {agency.principle}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-paper/45">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {agency.nav.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-[16px] text-paper/85 transition-colors hover:text-paper">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 text-[11px] uppercase tracking-[0.2em] text-paper/45">Services</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href="/services" className="text-[16px] text-paper/85 transition-colors hover:text-paper">
                  All services
                </a>
              </li>
              <li>
                <a href="/services/branding" className="text-[16px] text-paper/85 transition-colors hover:text-paper">
                  Branding
                </a>
              </li>
              <li>
                <a href="/services/seo-aeo-geo" className="text-[16px] text-paper/85 transition-colors hover:text-paper">
                  SEO/AEO/GEO
                </a>
              </li>
              <li>
                <a
                  href="/services/performance-marketing"
                  className="text-[16px] text-paper/85 transition-colors hover:text-paper"
                >
                  Performance marketing
                </a>
              </li>
              <li>
                <a href="/services/social-media" className="text-[16px] text-paper/85 transition-colors hover:text-paper">
                  Social media
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-paper/45">Elsewhere</h2>
            <ul className="mt-5 space-y-3">
              {agency.social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-[16px] text-paper/85 transition-colors hover:text-paper">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${agency.email}`}
                  className="text-[16px] text-paper/85 underline decoration-paper/25 underline-offset-4 transition-colors hover:text-paper"
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
                <a href={item.href} className="text-[14px] text-paper/70 transition-colors hover:text-paper">
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
