"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide motion: smooth scrolling and one quiet scroll reveal.
 *
 *   data-reveal            fade + rise when scrolled into view
 *   data-reveal-delay="n"  extra delay in seconds
 *
 * Nothing runs for people who prefer reduced motion.
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.classList.remove("js-motion");
      return;
    }

    root.classList.add("js-motion", "motion-ready");

    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -72 }, autoRaf: false });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {});
    let disposed = false;
    const build = () => ctx.add(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const delay = Number(el.dataset.revealDelay ?? 0);
        const trigger = { trigger: el, start: "top 88%", once: true };

        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", delay, scrollTrigger: trigger },
        );
      });
    });
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      if (disposed) return;
      build();
      ScrollTrigger.refresh();
    });

    return () => {
      disposed = true;
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
