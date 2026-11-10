'use client';

import dynamic from 'next/dynamic';
import { HmlPageShell } from './HmlPageShell';
import { HomeV3Belief } from './home-v3/HomeV3Belief';
import { HomeV3Hero } from './home-v3/HomeV3Hero';
import { HomeV3Problem } from './home-v3/HomeV3Problem';
import { HomeV3Services } from './home-v3/HomeV3Services';
import { HomeV3Ticker } from './home-v3/HomeV3Ticker';
import './home-v3/home-v3.css';

const HomeV3Cursor = dynamic(
  () => import('./home-v3/HomeV3Cursor').then((mod) => mod.HomeV3Cursor),
  { ssr: false },
);
const HomeV3How = dynamic(() => import('./home-v3/HomeV3How').then((mod) => mod.HomeV3How));
const HomeV3Kits = dynamic(() => import('./home-v3/HomeV3Kits').then((mod) => mod.HomeV3Kits));
const HomeV3Who = dynamic(() => import('./home-v3/HomeV3Who').then((mod) => mod.HomeV3Who));
const HomeV3Promises = dynamic(() => import('./home-v3/HomeV3Promises').then((mod) => mod.HomeV3Promises));
const HomeV3Faq = dynamic(() => import('./home-v3/HomeV3Faq').then((mod) => mod.HomeV3Faq));
const HomeV3FinalCta = dynamic(() => import('./home-v3/HomeV3FinalCta').then((mod) => mod.HomeV3FinalCta));
const HomeWorkSection = dynamic(() =>
  import('./home-v2/HomeWorkSection').then((mod) => mod.HomeWorkSection),
);

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
