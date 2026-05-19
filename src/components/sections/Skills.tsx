'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const techTags = Object.values(skills).flat();

function MarqueeRow({ tags, direction, speed = 30 }: { tags: string[]; direction: 'left' | 'right'; speed?: number }) {
  const doubled = [...tags, ...tags, ...tags, ...tags];
  return (
    <div className="marquee-row overflow-hidden py-2">
      <div
        className={`flex gap-3 w-max ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex items-center px-4 py-2 text-[11px] font-medium border border-[var(--fg)]/15 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all duration-150 whitespace-nowrap select-none uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

const categories = Object.keys(skills) as (keyof typeof skills)[];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const sectionRef   = useRef<HTMLElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mount: animate header
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

    if (rm) return;

    const ctx = gsap.context(() => {
      categoryRefs.current.forEach((el) => {
        if (!el) return;
        const items = el.querySelectorAll('.skill-tag');
        gsap.fromTo(el.querySelector('.cat-header'),
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
        gsap.fromTo(items,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
            stagger: 0.04,
            scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  const displayedCategories = activeCategory
    ? categories.filter(c => c === activeCategory)
    : categories;

  return (
    <section id="skills" ref={sectionRef} className="relative bg-[var(--bg)]">

      {/* ── Header ─────────────────────────────────────── */}
      <div ref={headerRef} className="section-container pb-16 md:pb-20">
        <span className="header-el gutter-number block mb-6" style={{ opacity: 0, transform: 'translateY(16px)' }}>
          02 — Skills
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h1
            className="header-el font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.9]"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            Skills &<br />Tools
          </h1>
          <p
            className="header-el text-sm text-[var(--fg)]/40 max-w-xs leading-relaxed"
            style={{ opacity: 0, transform: 'translateY(20px)', fontFamily: 'var(--font-mono)' }}
          >
            The stack I reach for when turning ideas into systems.
          </p>
        </div>
      </div>

      {/* ── Marquee ────────────────────────────────────── */}
      <div className="border-t border-b border-[var(--fg)]/10 mb-16 md:mb-24">
        <MarqueeRow tags={techTags.filter((_, i) => i % 3 === 0)} direction="left"  speed={38} />
        <MarqueeRow tags={techTags.filter((_, i) => i % 3 === 1)} direction="right" speed={45} />
        <MarqueeRow tags={techTags.filter((_, i) => i % 3 === 2)} direction="left"  speed={42} />
      </div>

      {/* ── Category filter ────────────────────────────── */}
      <div className="section-container">
        <div className="flex flex-wrap gap-3 mb-16 border-b border-[var(--fg)]/10 pb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 text-xs font-medium uppercase tracking-widest border transition-all duration-200 ${
              activeCategory === null
                ? 'bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]'
                : 'border-[var(--fg)]/20 text-[var(--fg)]/50 hover:border-[var(--fg)]/50 hover:text-[var(--fg)]'
            }`}
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-widest border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]'
                  : 'border-[var(--fg)]/20 text-[var(--fg)]/50 hover:border-[var(--fg)]/50 hover:text-[var(--fg)]'
              }`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Skill grid ─────────────────────────────── */}
        <div className="space-y-16 md:space-y-20 pb-24 md:pb-40">
          {displayedCategories.map((cat, idx) => (
            <div
              key={cat}
              ref={el => { categoryRefs.current[idx] = el; }}
            >
              {/* Category header */}
              <div className="cat-header flex items-center gap-6 mb-8" style={{ opacity: 0 }}>
                <span className="text-xs font-medium text-[var(--fg)]/30 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{cat}</h2>
                <div className="flex-1 h-px bg-[var(--fg)]/10" />
                <span className="text-xs text-[var(--fg)]/30" style={{ fontFamily: 'var(--font-mono)' }}>
                  {skills[cat as keyof typeof skills].length} tools
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {skills[cat as keyof typeof skills].map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag group flex items-center gap-2 px-4 py-2.5 border border-[var(--fg)]/15 text-sm font-medium hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)] transition-all duration-200 cursor-default"
                    style={{ opacity: 0 }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[var(--fg)]/30 group-hover:bg-[var(--bg)]/60 transition-colors"
                      aria-hidden="true"
                    />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
