"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steps } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = list.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items) return;
    const triggers = Array.from(items).map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => self.isActive && setActive(i),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section id="process" className="section" aria-labelledby="process-title">
      <div className="wrap">
        <div className="mb-16 grid gap-6 md:mb-24 md:grid-cols-12 md:items-end">
          <h2 id="process-title" data-reveal className="display text-[clamp(3rem,8vw,7.5rem)] md:col-span-7">
            How a project runs
          </h2>
          <p data-reveal className="measure text-[1.1rem] text-ink-2 md:col-span-5">
            Five steps, a fixed price and a preview link you can open any time. You always know what&apos;s happening and
            what comes next.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-12">
          <div className="hidden md:col-span-5 md:block" aria-hidden="true">
            <div className="sticky top-28 flex items-start text-[clamp(8rem,16vw,15rem)]">
              {/* Window is taller than the glyphs so digits are never clipped. */}
              <div className="relative h-[1.15em] overflow-hidden">
                <div
                  className="display !leading-[1.15em] text-cobalt transition-transform duration-700 ease-[var(--ease-out)]"
                  style={{ transform: `translateY(-${active * 1.15}em)` }}
                >
                  {steps.map((_, i) => (
                    <div key={i} className="h-[1.15em] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  ))}
                </div>
              </div>
              <span className="ml-3 mt-10 text-base text-ink-3">/ {String(steps.length).padStart(2, "0")}</span>
            </div>
          </div>

          <ol ref={list} className="md:col-span-7">
            {steps.map((s, i) => (
              <li
                key={s.title}
                data-step
                className="py-8 md:py-12"
              >
                <div data-reveal>
                  <p className="mb-3 text-cobalt md:hidden">Step {i + 1}</p>
                  <h3
                    className={`title mb-4 text-[clamp(2rem,4vw,3.25rem)] transition-colors duration-500 ${
                      i === active ? "md:text-cobalt" : ""
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className="measure text-[1.15rem] leading-relaxed text-ink-2">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
