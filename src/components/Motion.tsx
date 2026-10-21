"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Site-wide motion: smooth scrolling, scroll reveals and magnetic buttons.
 *
 *   data-reveal            fade + rise when scrolled into view
 *   data-reveal="split"    headline revealed line by line
 *   data-reveal-delay="n"  extra delay in seconds
 *   data-magnetic          element leans toward the pointer
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

    const splits: SplitText[] = [];
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {});
    let disposed = false;
    const build = () => ctx.add(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const delay = Number(el.dataset.revealDelay ?? 0);
        const trigger = { trigger: el, start: "top 88%", once: true };

        if (el.dataset.reveal === "split") {
          const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
          splits.push(split);
          gsap.set(el, { opacity: 1 });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.09,
            delay,
            scrollTrigger: trigger,
          });
          return;
        }

        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", delay, scrollTrigger: trigger },
        );
      });
    });
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      if (disposed) return;
      build();
      ScrollTrigger.refresh();
    });

    // Magnetic buttons, only for precise pointers.
    if (window.matchMedia("(pointer: fine)").matches) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * 0.28);
          yTo((e.clientY - r.top - r.height / 2) * 0.35);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => {
      disposed = true;
      ctx.revert();
      splits.forEach((s) => s.revert());
      cleanups.forEach((fn) => fn());
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
