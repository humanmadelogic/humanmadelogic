'use client';

import { useEffect } from 'react';
import { homeV2Config } from '@/config/home-v2';
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
import './home-v2/home-v2.css';

export function HomePageV2() {
  useEffect(() => {
    document.documentElement.classList.add('home-v2-js');
    return () => {
      document.documentElement.classList.remove('home-v2-js');
    };
  }, []);

  return (
    <HmlPageShell>
      <div className="home-v2">
        <HomeHeroSection />
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
      </div>
    </HmlPageShell>
  );
}
