'use client';

import { useEffect, useRef } from 'react';

/**
 * Minimal ink cursor: a 10px filled dot + a lagging ring.
 * Only enabled on fine pointers and when reduced-motion is off.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add('has-custom-cursor');

    const ring = ringRef.current!;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...target };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest('a, button, [role="button"], input, textarea');
      ring.style.width = interactive ? '54px' : '38px';
      ring.style.height = interactive ? '54px' : '38px';
      ring.style.borderColor = interactive
        ? 'var(--accent)'
        : 'color-mix(in oklch, var(--fg) 45%, transparent)';
    };

    const tick = () => {
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring hidden md:block" aria-hidden="true" />
      {/* Dot removed — the ring alone provides a refined, less intrusive custom cursor
          that doesn't create bright/white artifacts over editorial typography on any page. */}
    </>
  );
}
