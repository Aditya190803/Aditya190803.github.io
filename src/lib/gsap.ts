'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

/* ── Register plugins once (client-side) ───────────────── */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const EASE_OUT_EXPO = 'expo.out';
export const EASE_OUT_POWER = 'power3.out';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export interface RevealOptions {
  /** Selector for the elements to reveal within the scope. */
  selector?: string;
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  /** Re-run when scrolling back up. */
  toggle?: boolean;
}

/**
 * Reusable scroll-triggered reveal hook built on @gsap/react `useGSAP`.
 * Animates elements matching `selector` (default `[data-reveal]`) inside the scope.
 * Honors `prefers-reduced-motion` by rendering elements in their final state.
 */
export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {},
) {
  const scope = useRef<T>(null);

  const {
    selector = '[data-reveal]',
    y = 40,
    x = 0,
    opacity = 0,
    scale = 1,
    duration = 0.9,
    stagger = 0.08,
    ease = EASE_OUT_EXPO,
    start = 'top 82%',
    toggle = true,
  } = options;

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>(selector);
      if (!targets.length) return;

      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, x: 0, y: 0, scale: 1, clearProps: 'all' });
        return;
      }

      gsap.set(targets, { willChange: 'transform, opacity' });

      gsap.fromTo(
        targets,
        { y, x, opacity, scale },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: scope.current,
            start,
            toggleActions: toggle ? 'play none none reverse' : 'play none none none',
          },
        },
      );
    },
    { scope },
  );

  return scope;
}

/**
 * GSAP-driven count-up that fires when the element scrolls into view.
 * Returns a ref to attach to the number container.
 */
export function useGsapCounter<T extends HTMLElement = HTMLSpanElement>(
  target: number,
  opts: { suffix?: string; duration?: number } = {},
) {
  const ref = useRef<T>(null);
  const { suffix = '', duration = 1.4 } = opts;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        el.textContent = `${target}${suffix}`;
        return;
      }

      const counter = { val: 0 };
      el.textContent = `0${suffix}`;

      gsap.to(counter, {
        val: target,
        duration,
        ease: 'power2.out',
        snap: { val: 1 },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.val)}${suffix}`;
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [target] },
  );

  return ref;
}

/**
 * Pinned horizontal scroll. Attach the returned `scope` ref to the pinned
 * wrapper and put a `.h-scroll-track` flex row inside it. The track translates
 * horizontally as the user scrolls vertically through the pinned section.
 */
export function useGsapHorizontalScroll<T extends HTMLElement = HTMLDivElement>(
  options: { trackSelector?: string; endMultiplier?: number } = {},
) {
  const scope = useRef<T>(null);
  const { trackSelector = '.h-scroll-track', endMultiplier = 1 } = options;

  useGSAP(
    () => {
      const track = scope.current?.querySelector<HTMLElement>(trackSelector);
      if (!track) return;

      // Disable on small screens / reduced motion — let it stack vertically.
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      if (isMobile || prefersReducedMotion()) {
        gsap.set(track, { clearProps: 'all' });
        return;
      }

      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount() * endMultiplier,
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: scope.current,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });
    },
    { scope },
  );

  return scope;
}

export { gsap, ScrollTrigger, useGSAP };
