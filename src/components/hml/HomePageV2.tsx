'use client';

import { useEffect } from 'react';
import { homeV2Config } from '@/config/home-v2';
import { resolveHeroH1 } from '@/lib/hml/homeV2';
import { HmlPageShell } from './HmlPageShell';
import { HomeBeliefSection } from './home-v2/HomeBeliefSection';
import { HomeFaqSection } from './home-v2/HomeFaqSection';
import { HomeFinalCtaSection } from './home-v2/HomeFinalCtaSection';
import { HomeHeroSection } from './home-v2/HomeHeroSection';
import { HomeHowWeWorkSection } from './home-v2/HomeHowWeWorkSection';
import { HomeKitsSection } from './home-v2/HomeKitsSection';
import { HomeProblemSection } from './home-v2/HomeProblemSection';
import { HomePromisesSection } from './home-v2/HomePromisesSection';
import { HomeServicesCardsSection } from './home-v2/HomeServicesCardsSection';
import { HomeServicesTicker } from './home-v2/HomeServicesTicker';
import { HomeWhoSection } from './home-v2/HomeWhoSection';
import { HomeWorkSection } from './home-v2/HomeWorkSection';

type Props = {
  hookParam?: string;
};

export function HomePageV2({ hookParam }: Props) {
  const h1 = resolveHeroH1(hookParam);

  useEffect(() => {
    document.documentElement.classList.add('home-v2-js');
    return () => {
      document.documentElement.classList.remove('home-v2-js');
    };
  }, []);

  return (
    <HmlPageShell>
      <HomeHeroSection h1={h1} />
      {homeV2Config.enabled ? <HomeServicesTicker /> : null}
      <HomeProblemSection />
      <HomeBeliefSection />
      <HomeServicesCardsSection />
      <HomeHowWeWorkSection />
      <HomeKitsSection />
      <HomeWhoSection />
      <HomePromisesSection />
      <HomeWorkSection />
      <HomeFaqSection />
      <HomeFinalCtaSection />
    </HmlPageShell>
  );
}
