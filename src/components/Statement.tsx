"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let split: SplitText | undefined;
    let tween: gsap.core.Tween | undefined;
    let disposed = false;
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (disposed) return;
      split = SplitText.create(el, { type: "words" });
      tween = gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    });
    return () => {
      disposed = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, []);

  return (
    <section className="section" aria-label="About my work">
      <div className="wrap">
        <p ref={ref} className="title max-w-[22ch] text-[clamp(2.2rem,5.6vw,5.4rem)] !leading-[1.05]">
          I design and build websites people trust, and software a hospital relies on. One person from first sketch to
          launch, for clients who care how it looks <em>and</em> how it works.
        </p>
      </div>
    </section>
  );
}
