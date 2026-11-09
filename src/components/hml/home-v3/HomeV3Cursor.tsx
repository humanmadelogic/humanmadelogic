'use client';

import { useEffect, useRef, useState } from 'react';
import { useFinePointer } from '@/lib/hml/useMediaQuery';
import { useReducedMotion } from '@/lib/hml/useReducedMotion';

export function HomeV3Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dot = useRef<HTMLDivElement>(null);
  const [ring, setRing] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!fine || reduced) return;

    document.documentElement.classList.add('h3-cursor-on');
    const onMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
    };
    const onOver = (event: MouseEvent) => {
      const el = event.target;
      if (el instanceof Element && el.closest('a, button, summary, [role="button"]')) {
        setRing(true);
      }
    };
    const onOut = (event: MouseEvent) => {
      const el = event.target;
      if (el instanceof Element && el.closest('a, button, summary, [role="button"]')) {
        setRing(false);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    let raf = 0;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.35;
      pos.current.y += (target.current.y - pos.current.y) * 0.35;
      const node = dot.current;
      if (node) {
        node.style.left = `${pos.current.x}px`;
        node.style.top = `${pos.current.y}px`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('h3-cursor-on');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <div
      ref={dot}
      aria-hidden
      className={`h3-cursor-dot ${ring ? 'is-ring' : ''}`}
      style={{ width: 8, height: 8, left: 0, top: 0 }}
    />
  );
}
