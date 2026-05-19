'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const listRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mount: header
    const headerEls = headerRef.current?.querySelectorAll<HTMLElement>('.header-el');
    if (headerEls) {
      if (rm) {
        headerEls.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
      } else {
        headerEls.forEach((el, i) => {
          setTimeout(() => {
            el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, 100 + i * 80);
        });
      }
    }

    if (rm) {
      listRef.current?.querySelectorAll<HTMLElement>('.exp-card').forEach(el => {
        el.style.opacity = '1'; el.style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const cards = listRef.current?.querySelectorAll('.exp-card');
      cards?.forEach((card, i) => {
        // Alternate: even from left, odd from right
        const fromX = i % 2 === 0 ? -50 : 50;
        gsap.fromTo(card,
          { opacity: 0, x: fromX, y: 20 },
          {
            opacity: 1, x: 0, y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
        // Highlight bar draw
        const bar = (card as HTMLElement).querySelector<HTMLElement>('.bar-draw');
        if (bar) {
          gsap.fromTo(bar,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: 'power3.out',
              transformOrigin: 'left',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative bg-[var(--bg)]">
      <div className="section-container pb-24 md:pb-40">

        {/* ── Header ─────────────────────────────────────── */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <span className="header-el gutter-number block mb-6" style={{ opacity: 0, transform: 'translateY(16px)' }}>
            03 — Experience
          </span>
          <h1
            className="header-el font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.9]"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            Where I&apos;ve<br />Worked
          </h1>
        </div>

        {/* ── Timeline list ──────────────────────────────── */}
        <div ref={listRef} className="space-y-0">
          {experience.map((exp, i) => (
            <div
              key={`${exp.company}-${exp.role}`}
              className="exp-card group border-t border-[var(--fg)]/10 py-10 md:py-14"
              style={{ opacity: 0 }}
            >
              <div className="md:grid md:grid-cols-[200px_1fr] md:gap-16">
                {/* Left: meta */}
                <div className="mb-4 md:mb-0">
                  <span
                    className="text-xs font-medium text-[var(--fg)]/35 block mb-2 uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="text-xs text-[var(--fg)]/40 block leading-relaxed"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {exp.period}
                  </span>
                  <span
                    className="text-xs text-[var(--fg)]/30 block mt-1"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {exp.location}
                  </span>
                </div>

                {/* Right: content */}
                <div>
                  <div className="mb-5">
                    <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-1 group-hover:opacity-60 transition-opacity duration-300">
                      {exp.role}
                    </h2>
                    <p className="text-sm text-[var(--fg)]/50 font-medium">{exp.company}</p>
                  </div>

                  {/* Animated bar */}
                  <div className="h-px bg-[var(--fg)]/10 mb-6 overflow-hidden">
                    <div
                      className="bar-draw h-full w-full bg-[var(--fg)]/40"
                      style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
                    />
                  </div>

                  <ul className="space-y-2.5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-sm text-[var(--fg)]/55 leading-relaxed flex gap-3">
                        <span className="mt-[0.45em] w-1 h-1 rounded-full bg-[var(--fg)]/30 shrink-0" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* End marker */}
          <div className="border-t border-[var(--fg)]/10 pt-8">
            <span className="text-xs text-[var(--fg)]/25 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
              — More to come
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
