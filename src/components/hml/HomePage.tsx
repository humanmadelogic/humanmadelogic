'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFinePointer, useMediaQuery } from '@/lib/hml/useMediaQuery';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';
import { usePointerVelocity } from '@/lib/hml/usePointerVelocity';
import { homePage } from '@/config/agency';
import { HmlPageShell } from './HmlPageShell';
import { LoadingTransition } from './LoadingTransition';
import { Hero } from './Hero';
import { AgencyStatement } from './AgencyStatement';
import { Capabilities } from './Capabilities';
import { WorkPlaceholder } from './WorkPlaceholder';
import { FinalCTA } from './FinalCTA';

const WebGLLayer = dynamic(() => import('./webgl/WebGLLayer'), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    );
  } catch {
    return false;
  }
}

function HomeMain() {
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [canRender3D, setCanRender3D] = useState(false);

  usePointerVelocity(finePointer && !reducedMotion);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setCanRender3D(supportsWebGL()));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const webgl = canRender3D && isDesktop && finePointer;

  return (
    <>
      <LoadingTransition />
      {webgl && <WebGLLayer reducedMotion={reducedMotion} />}
      <Hero />
      <AgencyStatement />
      <Capabilities />
      <section className="pb-16 pt-2">
        <div className="mx-auto max-w-editorial px-5 sm:px-8 lg:px-12">
          <Link
            href={homePage.quickLinks.viewAllServices.href}
            className="inline-flex h-12 items-center rounded-full border border-obsidian/20 px-6 text-[15px] transition-colors hover:border-obsidian/45"
          >
            {homePage.quickLinks.viewAllServices.label}
          </Link>
          <Link
            href={homePage.quickLinks.aboutUs.href}
            className="ml-3 inline-flex h-12 items-center rounded-full border border-obsidian/20 px-6 text-[15px] transition-colors hover:border-obsidian/45"
          >
            {homePage.quickLinks.aboutUs.label}
          </Link>
        </div>
      </section>
      <WorkPlaceholder />
      <FinalCTA />
    </>
  );
}

export function HomePage() {
  return (
    <HmlPageShell>
      <HomeMain />
    </HmlPageShell>
  );
}
