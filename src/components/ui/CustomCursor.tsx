'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    x: -100,
    y: -100,
    tx: -100,
    ty: -100,
    size: 8,
    tsize: 8,
    isHollow: false,
    tisHollow: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const move = (e: MouseEvent) => {
      state.current.tx = e.clientX;
      state.current.ty = e.clientY;
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive =
        t.tagName === 'A' ||
        t.tagName === 'BUTTON' ||
        !!t.closest('a') ||
        !!t.closest('button') ||
        t.getAttribute('role') === 'button' ||
        t.classList.contains('cursor-pointer');

      state.current.tisHollow = interactive;
      state.current.tsize = interactive ? 32 : 8;
    };

    const raf = () => {
      const s = state.current;
      s.x = lerp(s.x, s.tx, 0.1);
      s.y = lerp(s.y, s.ty, 0.1);
      s.size = lerp(s.size, s.tsize, 0.12);

      if (Math.abs(s.size - s.tsize) < 0.5) {
        s.isHollow = s.tisHollow;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${s.x - s.size / 2}px, ${s.y - s.size / 2}px)`;
        dotRef.current.style.width = `${s.size}px`;
        dotRef.current.style.height = `${s.size}px`;
        dotRef.current.style.backgroundColor = s.isHollow ? 'transparent' : 'var(--fg)';
        dotRef.current.style.border = s.isHollow ? '1px solid var(--fg)' : 'none';
      }

      requestAnimationFrame(raf);
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);

    const id = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      cancelAnimationFrame(id);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
      style={{
        width: 8,
        height: 8,
        backgroundColor: 'var(--fg)',
        willChange: 'transform, width, height',
      }}
      aria-hidden="true"
    />
  );
}
