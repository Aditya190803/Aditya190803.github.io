'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { research } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

function PaperCard({ paper }: { paper: (typeof research.papers)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const inner   = innerRef.current;
    if (!content || !inner) return;
    if (expanded) {
      gsap.to(content, { maxHeight: inner.scrollHeight, duration: 0.6, ease: 'power3.out' });
    } else {
      gsap.to(content, { maxHeight: 0, duration: 0.4, ease: 'power3.inOut' });
    }
  }, [expanded]);

  return (
    <div
      className="paper-card group border-t border-[var(--fg)]/10 py-8 md:py-10"
      style={{ opacity: 0, transform: 'translateY(24px)' }}
    >
      <div className="md:grid md:grid-cols-[80px_1fr] md:gap-12">
        {/* Year */}
        <div className="text-xs font-medium text-[var(--fg)]/30 mb-3 md:mb-0 pt-1 uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
          {paper.year}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-[10px] font-medium text-[var(--fg)]/30 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                  {paper.venueShort}
                </span>
                <span className="text-[10px] px-2 py-0.5 border border-[var(--fg)]/15 text-[var(--fg)]/50 uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                  {paper.status}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight leading-snug">
                {paper.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {paper.authors.map((a) => (
                  <a
                    key={a.name}
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[var(--fg)]/35 hover:text-[var(--fg)] transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {a.name}
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="shrink-0 text-xs font-medium hover:opacity-50 transition-opacity duration-300 border border-[var(--fg)]/20 px-3 py-1.5 uppercase tracking-wider mt-1"
              style={{ fontFamily: 'var(--font-mono)' }}
              aria-expanded={expanded}
            >
              {expanded ? 'Close' : 'Abstract'}
            </button>
          </div>

          {/* Expandable abstract */}
          <div ref={contentRef} className="overflow-hidden" style={{ maxHeight: 0 }}>
            <div ref={innerRef}>
              <p className="text-sm text-[var(--fg)]/55 leading-relaxed mt-6 max-w-2xl">{paper.abstract}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {paper.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-1 border border-[var(--fg)]/10 text-[var(--fg)]/40 uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium mt-5 hover:opacity-50 transition-opacity duration-300"
              >
                Read paper →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);

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
      listRef.current?.querySelectorAll<HTMLElement>('.paper-card').forEach(el => {
        el.style.opacity = '1'; el.style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const cards = listRef.current?.querySelectorAll('.paper-card');
      cards?.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section id="research" ref={sectionRef} className="relative bg-[var(--bg)]">
      <div className="section-container pb-24 md:pb-40">

        {/* ── Header ─────────────────────────────────────── */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <span className="header-el gutter-number block mb-6" style={{ opacity: 0, transform: 'translateY(16px)' }}>
            04 — Research
          </span>
          <h1
            className="header-el font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[0.9] mb-6"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            Published<br />Work
          </h1>
          <p
            className="header-el text-sm text-[var(--fg)]/40 max-w-lg leading-relaxed"
            style={{ opacity: 0, transform: 'translateY(16px)' }}
          >
            Peer-reviewed publications in misinformation detection, AI-powered code documentation, and multi-modal verification.
          </p>
        </div>

        {/* ── Papers list ────────────────────────────────── */}
        <div ref={listRef} className="border-b border-[var(--fg)]/10">
          {research.papers.map((paper, i) => (
            <PaperCard key={i} paper={paper} />
          ))}
        </div>

        {/* ── Stats ──────────────────────────────────────── */}
        <div className="mt-12 md:mt-16 flex gap-12 md:gap-20">
          {[
            { value: research.papers.filter(p => p.status === 'Published').length, label: 'Published' },
            { value: research.papers.reduce((acc, p) => acc + p.authors.length, 0), label: 'Co-authors' },
          ].map(stat => (
            <div key={stat.label}>
              <span className="text-3xl md:text-4xl font-bold block leading-none" style={{ fontFamily: 'var(--font-mono)' }}>
                {stat.value}
              </span>
              <span className="text-xs text-[var(--fg)]/40 mt-2 block uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
