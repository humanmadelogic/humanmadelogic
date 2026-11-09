'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return { ref, visible, className: visible ? 'is-revealed' : 'home-v2-reveal-pending' };
}
