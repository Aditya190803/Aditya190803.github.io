'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'GenAI', 'ML', 'Research', 'Web'];

export function Projects() {
  const [active, setActive] = useState('All');
  const [hovered, setHovered] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filtered = projects.filter(
    (p) => active === 'All' || p.category === active,
  );

  // Animate cards when they enter viewport
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -80 : 80 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef.current || undefined);

    return () => ctx.revert();
  }, [filtered]);

  // GSAP height animation for filter change
  const handleFilter = (cat: string) => {
    if (cat === active) return;

    const cards = containerRef.current?.querySelectorAll('.project-card');
    if (!cards) {
      setActive(cat);
      return;
    }

    gsap.to(cards, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.03,
      ease: 'power2.in',
      onComplete: () => {
        setActive(cat);
        // Animate in new cards after state update
        requestAnimationFrame(() => {
          const newCards = containerRef.current?.querySelectorAll('.project-card');
          if (newCards) {
            gsap.fromTo(
              newCards,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }
            );
          }
        });
      },
    });
  };

  return (
    <section id="work" className="pb-24 md:pb-32 bg-[var(--bg)]">
      <div className="section-container mb-16">
        <div className="relative">
          <span className="gutter-number absolute -left-6 md:-left-12 top-0">03</span>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
              Selected Work
            </h2>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className={`px-4 py-2 text-xs font-medium border transition-all duration-300 ${
                    active === cat
                      ? 'bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]'
                      : 'bg-transparent text-[var(--fg)]/50 border-[var(--fg)]/20 hover:border-[var(--fg)]'
                  }`}
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={containerRef}>
        {filtered.map((project, i) => (
          <Link
            key={project.title}
            href={`/work/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="project-card group block"
            onMouseEnter={() => setHovered(project.title)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              ref={(el) => { cardsRef.current[i] = el; }}
              className="section-container"
              style={{ opacity: 0 }}
            >
              <div
                className={`flex flex-col md:flex-row gap-8 md:gap-16 py-12 md:py-16 ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                } border-t border-[var(--fg)]/10`}
              >
                <div className="flex-1 relative">
                  <div className="aspect-[4/3] bg-[var(--fg)]/5 border border-[var(--fg)]/10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[var(--fg)]/3 transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                    <div
                      className="absolute inset-0 border border-[var(--fg)]/5 transition-all duration-700 ease-out"
                      style={{
                        clipPath:
                          hovered === project.title
                            ? 'inset(0px)'
                            : 'inset(2px)',
                      }}
                    />
                    {/* Numbered label on hover */}
                    <div
                      className="absolute top-4 left-4 text-xs font-medium text-[var(--fg)]/60 transition-all duration-300"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        opacity: hovered === project.title ? 1 : 0,
                        transform: hovered === project.title ? 'translateY(0)' : 'translateY(-8px)',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <span
                    className="text-xs font-medium text-[var(--fg)]/30 mb-3"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {project.category}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--fg)]/60 leading-relaxed mb-6 max-w-md">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-[11px] font-medium border border-[var(--fg)]/15 text-[var(--fg)]/50"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:opacity-50 transition-opacity duration-300">
                    View Project
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
