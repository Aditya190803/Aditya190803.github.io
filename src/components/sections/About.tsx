'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated.current) return;
          hasAnimated.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = `${Math.round(obj.val)}${suffix}`;
            },
          });
          observer.disconnect();
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return <span ref={ref}>0</span>;
}

const pillars = [
  { num: '01', title: 'Machine Learning', desc: 'Building production-grade ML systems from data pipeline to deployed model.' },
  { num: '02', title: 'Generative AI', desc: 'LLM applications, multi-agent RAG systems, and fine-tuning at scale.' },
  { num: '03', title: 'Research', desc: 'Published work in NLP, misinformation detection, and AI automation.' },
  { num: '04', title: 'Full Stack', desc: 'React, Next.js, and modern cloud infrastructure for complete AI products.' },
];

export function About() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const counterRef   = useRef<HTMLDivElement>(null);
  const bioRef       = useRef<HTMLParagraphElement>(null);
  const pillarsRef   = useRef<HTMLDivElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── MOUNT ANIMATION: heading words ──────────────────────────────────────
    const words = headingRef.current?.querySelectorAll('.word');
    if (words) {
      if (rm) {
        words.forEach(w => {
          (w as HTMLElement).style.opacity = '1';
          (w as HTMLElement).style.transform = 'translateY(0)';
        });
      } else {
        words.forEach((w, i) => {
          const el = w as HTMLElement;
          setTimeout(() => {
            el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, 200 + i * 90);
        });
      }
    }

    // ── MOUNT ANIMATION: counters ───────────────────────────────────────────
    const counters = counterRef.current?.querySelectorAll('.counter-el');
    if (counters) {
      if (rm) {
        counters.forEach(el => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'none';
        });
      } else {
        counters.forEach((el, i) => {
          const elem = el as HTMLElement;
          setTimeout(() => {
            elem.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
            elem.style.opacity = '1';
            elem.style.transform = 'translateY(0)';
          }, 700 + i * 100);
        });
      }
    }

    // ── SCROLL ANIMATIONS: divider line, bio, pillars ────────────────────────
    const section = sectionRef.current;
    if (!section || rm) return;

    const ctx = gsap.context(() => {
      // Divider line draw
      if (dividerRef.current) {
        gsap.fromTo(dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.out',
            transformOrigin: 'left',
            scrollTrigger: { trigger: dividerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }

      // Bio paragraph
      if (bioRef.current) {
        gsap.fromTo(bioRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: bioRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      }

      // Pillar cards
      const cards = pillarsRef.current?.querySelectorAll('.pillar-card');
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
              delay: i * 0.08,
              scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
            }
          );
          const line = (card as HTMLElement).querySelector('.pillar-line') as HTMLElement | null;
          if (line) {
            gsap.fromTo(line,
              { scaleX: 0 },
              {
                scaleX: 1, duration: 0.7, ease: 'power3.out',
                delay: i * 0.08 + 0.2,
                scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
                transformOrigin: 'left',
              }
            );
          }
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative bg-[var(--bg)]">
      <div className="section-container w-full pb-24 md:pb-40">

        {/* ── Heading ───────────────────────────────────── */}
        <div className="max-w-5xl mb-12 md:mb-16">
          <span className="gutter-number block mb-6">01 — About</span>
          <h1
            ref={headingRef}
            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.9] tracking-tight"
          >
            {'ML Engineer'.split(' ').map((word, i) => (
              <span
                key={`l1-${i}`}
                className="word inline-block"
                style={{ opacity: 0, transform: 'translateY(50px)' }}
              >
                {word}&nbsp;
              </span>
            ))}
            <br />
            {'& Builder'.split(' ').map((word, i) => (
              <span
                key={`l2-${i}`}
                className="word inline-block"
                style={{ opacity: 0, transform: 'translateY(50px)' }}
              >
                {word}&nbsp;
              </span>
            ))}
          </h1>
        </div>

        {/* ── Stats ─────────────────────────────────────── */}
        <div ref={counterRef} className="flex gap-12 md:gap-20 mb-16 md:mb-20">
          {[
            { value: 4,  label: 'Internships' },
            { value: 10, label: 'Projects' },
            { value: 2,  label: 'Publications' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="counter-el"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <span
                className="text-4xl md:text-5xl font-bold block leading-none"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <Counter target={stat.value} suffix="+" />
              </span>
              <span className="text-xs font-medium text-[var(--fg)]/40 mt-2 block uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Divider ───────────────────────────────────── */}
        <div
          ref={dividerRef}
          className="h-px bg-[var(--fg)]/20 mb-12 md:mb-16"
          style={{ transformOrigin: 'left', transform: 'scaleX(0)' }}
        />

        {/* ── Bio ───────────────────────────────────────── */}
        <p
          ref={bioRef}
          className="text-lg md:text-xl leading-relaxed text-[var(--fg)]/65 max-w-3xl"
          style={{ opacity: 0 }}
        >
          {profile.bio}
        </p>

        {/* ── Pillars ───────────────────────────────────── */}
        <div
          ref={pillarsRef}
          className="grid md:grid-cols-2 gap-px bg-[var(--fg)]/10 mt-20 md:mt-28"
          style={{ borderTop: '1px solid var(--fg)' }}
        >
          {pillars.map((p) => (
            <div
              key={p.num}
              className="pillar-card py-10 md:py-14 px-6 md:px-10 bg-[var(--bg)]"
              style={{ opacity: 0, transform: 'translateY(50px)' }}
            >
              <span className="text-xs font-medium text-[var(--fg)]/30" style={{ fontFamily: 'var(--font-mono)' }}>
                {p.num}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold mt-3 mb-3">{p.title}</h3>
              <div className="h-px bg-[var(--fg)]/15 mb-4 overflow-hidden">
                <div
                  className="pillar-line h-full w-full bg-[var(--fg)]"
                  style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
                />
              </div>
              <p className="text-sm text-[var(--fg)]/55 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
