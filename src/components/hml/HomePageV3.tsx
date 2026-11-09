'use client';

import { HmlPageShell } from './HmlPageShell';
import { HomeWorkSection } from './home-v2/HomeWorkSection';
import { HomeV3Belief } from './home-v3/HomeV3Belief';
import { HomeV3Cursor } from './home-v3/HomeV3Cursor';
import { HomeV3Faq } from './home-v3/HomeV3Faq';
import { HomeV3FinalCta } from './home-v3/HomeV3FinalCta';
import { HomeV3Hero } from './home-v3/HomeV3Hero';
import { HomeV3How } from './home-v3/HomeV3How';
import { HomeV3Kits } from './home-v3/HomeV3Kits';
import { HomeV3Problem } from './home-v3/HomeV3Problem';
import { HomeV3Promises } from './home-v3/HomeV3Promises';
import { HomeV3Services } from './home-v3/HomeV3Services';
import { HomeV3Ticker } from './home-v3/HomeV3Ticker';
import { HomeV3Who } from './home-v3/HomeV3Who';
import './home-v3/home-v3.css';

export function HomePageV3() {
  return (
    <HmlPageShell>
      <div className="home-v3">
        <HomeV3Cursor />
        <HomeV3Hero />
        <HomeV3Ticker />
        <HomeV3Problem />
        <HomeV3Belief />
        <HomeV3Services />
        <HomeV3How />
        <HomeV3Kits />
        <HomeV3Who />
        <HomeV3Promises />
        <HomeWorkSection />
        <HomeV3Faq />
        <HomeV3FinalCta />
      </div>
    </HmlPageShell>
  );
}
