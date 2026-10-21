"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { work } from "@/lib/data";
import Shots from "@/components/Shots";
import Cover from "@/components/Cover";

export default function Work() {
  const [open, setOpen] = useState<string | null>(null);
  // Row under the mouse, for the "View project" label that follows it.
  const [hovered, setHovered] = useState<string | null>(null);
  const chip = useRef<HTMLDivElement>(null);
  const moveChip = useRef<(x: number, y: number, instant?: boolean) => void>(() => {});

  useEffect(() => {
    const c = chip.current;
    if (!c) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(c, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 });
    const xTo = gsap.quickTo(c, "x", { duration: reduce ? 0 : 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(c, "y", { duration: reduce ? 0 : 0.45, ease: "power3.out" });
    moveChip.current = (x, y, instant) => {
      if (instant) {
        gsap.set(c, { x: x + 18, y: y + 18 });
        xTo(x + 18, x + 18);
        yTo(y + 18, y + 18);
      } else {
        xTo(x + 18);
        yTo(y + 18);
      }
    };
  }, []);

  useEffect(() => {
    if (!chip.current) return;
    gsap.to(chip.current, { opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6, duration: 0.3, ease: "power3.out" });
  }, [hovered]);

  const isMouse = (e: React.PointerEvent) => e.pointerType === "mouse" || e.pointerType === "pen";

  const toggle = (slug: string) => {
    setOpen((cur) => (cur === slug ? null : slug));
    window.setTimeout(() => ScrollTrigger.refresh(), 700);
  };

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="wrap">
        <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
          <h2 id="work-title" data-reveal="split" className="display text-[clamp(3rem,8vw,7.5rem)] md:col-span-7">
            Client work
          </h2>
          <p data-reveal className="measure text-[1.1rem] text-ink-2 md:col-span-5">
            A cancer-care nonprofit, a jewellery brand and a firm of chartered accountants. Different audiences, same
            goal: a site that earns trust in the first few seconds.
          </p>
        </div>

        <ul
          className="border-b border-rule"
          onPointerLeave={() => setHovered(null)}
          onPointerMove={(e) => isMouse(e) && moveChip.current(e.clientX, e.clientY)}
        >
          {work.map((w) => {
            const isOpen = open === w.slug;
            return (
              <li key={w.slug} data-reveal className="border-t border-rule">
                <h3>
                  <button
                    type="button"
                    className="group relative isolate grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-7 text-left md:grid-cols-12 md:py-10"
                    aria-expanded={isOpen}
                    aria-controls={`work-${w.slug}`}
                    onClick={() => toggle(w.slug)}
                    onPointerEnter={(e) => {
                      if (!isMouse(e)) return;
                      moveChip.current(e.clientX, e.clientY, hovered === null);
                      setHovered(w.slug);
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-[calc(var(--gutter)*-1)] inset-y-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-y-100"
                      style={{ background: w.tone }}
                    />
                    <span className="title text-[clamp(2.1rem,6vw,5.25rem)] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-3 md:col-span-7">
                      {w.client}
                    </span>
                    <span className="col-span-2 row-start-2 text-ink-2 md:col-span-3 md:col-start-8 md:row-start-1">
                      <span className="block">{w.kind}</span>
                      <span className="block text-ink-3">{w.sector}</span>
                    </span>
                    <span className="flex items-center justify-end gap-4 md:col-span-2 md:col-start-11">
                      {w.year && <span className="hidden text-ink-3 md:inline">{w.year}</span>}
                      <span
                        aria-hidden="true"
                        className={`flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-xl transition-transform duration-500 ease-[var(--ease-out)] ${
                          isOpen ? "rotate-45 bg-ink text-paper" : ""
                        }`}
                      >
                        +
                      </span>
                    </span>
                  </button>
                </h3>

                <div
                  id={`work-${w.slug}`}
                  role="region"
                  aria-label={w.client}
                  className="grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  inert={!isOpen}
                  onPointerEnter={() => setHovered(null)}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-10 pb-12 pt-2 md:grid-cols-12 md:pb-16">
                      <a
                        href={w.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/cover block pb-[8%] md:col-span-7"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <div className="transition-transform duration-700 ease-[var(--ease-out)] group-hover/cover:-translate-y-1">
                          {w.image ? (
                            <Shots domain={w.domain} image={w.image} imageMobile={w.imageMobile} tone={w.tone} />
                          ) : (
                            <Cover name={w.client} domain={w.domain} sector={w.sector} tone={w.tone} />
                          )}
                        </div>
                      </a>
                      <div className="md:col-span-5">
                        <p className="measure mb-8 text-[1.15rem] leading-relaxed">{w.summary}</p>
                        <p className="mb-3 text-ink-3">What I did</p>
                        <ul className="space-y-2.5">
                          {w.scope.map((s) => (
                            <li key={s} className="flex gap-3 text-ink-2">
                              <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-ink-3" />
                              {s}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={w.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost mt-10"
                        >
                          Visit {w.domain}
                          <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div ref={chip} className="cursor-chip" aria-hidden="true">
        {hovered && open === hovered ? "Close" : "View project"}
      </div>
    </section>
  );
}
