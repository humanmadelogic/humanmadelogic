'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';

/** Transform-only reveal; opacity stays 1 for no-JS and LCP. */
export function useH3Reveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduced]);

  return { ref, className: `h3-reveal${visible ? ' is-in' : ''}` };
}
