import { getLenis } from '@/components/providers/SmoothScroll';

/** Current scroll offset — respects Lenis when smooth scroll is active. */
export function getScrollY(): number {
  const lenis = getLenis();
  return lenis ? lenis.scroll : (typeof window !== 'undefined' ? window.scrollY : 0);
}

/** Document scroll progress 0→1. */
export function getPageProgress(): number {
  if (typeof window === 'undefined') return 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, getScrollY() / max) : 0;
}