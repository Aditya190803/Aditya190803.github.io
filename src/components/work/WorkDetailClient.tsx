'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function WorkDetailClient() {
  const params = useParams();
  const slug = (params?.slug as string) || '';
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const project = projects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, '-') === slug,
  );

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current!.querySelectorAll('.hero-el'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );

      const sections = contentRef.current!.querySelectorAll('.case-section');
      sections.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.case-el'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [slug]);

  if (!project) {
    return (
      <main className="min-h-screen bg-[var(--bg)] pt-24 flex items-center justify-center">
        <div className="section-container text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Project not found</h1>
          <Link
            href="/"
            className="text-sm font-medium hover:opacity-50 transition-opacity"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ← Back home
          </Link>
        </div>
      </main>
    );
  }

  const currentIdx = projects.indexOf(project);
  const nextProject = projects[currentIdx + 1] || projects[0];

  const problem = `The challenge: ${project.description} Existing solutions either lacked the specific integration required or were too complex for the target users.`;
  const approach = project.features.map((f, i) => ({
    step: String(i + 1).padStart(2, '0'),
    text: f,
  }));
  const result = project.lessonsLearned
    ? `Key outcome: ${project.lessonsLearned}`
    : 'Successfully deployed and used in production with positive user feedback.';

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24">
        <div ref={heroRef} className="section-container">
          <Link
            href="/#work"
            className="hero-el inline-flex items-center gap-2 text-sm font-medium hover:opacity-50 transition-opacity duration-300 mb-8"
            style={{ fontFamily: 'var(--font-mono)', opacity: 0 }}
          >
            ← Back to work
          </Link>

          <div className="hero-el aspect-[16/9] bg-[var(--fg)]/5 border border-[var(--fg)]/10 mb-12 md:mb-16 flex items-center justify-center relative overflow-hidden" style={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-[var(--fg)]/[0.02]" />
            <span className="text-sm text-[var(--fg)]/20 relative z-10" style={{ fontFamily: 'var(--font-mono)' }}>
              {project.title}
            </span>
          </div>

          <div className="max-w-3xl">
            <span
              className="hero-el text-xs font-medium text-[var(--fg)]/30 mb-4 block"
              style={{ fontFamily: 'var(--font-mono)', opacity: 0 }}
            >
              {project.category}
            </span>

            <h1 className="hero-el font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-6" style={{ opacity: 0 }}>
              {project.title}
            </h1>

            <p className="hero-el text-lg md:text-xl leading-relaxed text-[var(--fg)]/60 mb-8" style={{ opacity: 0 }}>
              {project.description}
            </p>

            {/* Meta bar */}
            <div className="hero-el flex flex-wrap items-center gap-6 text-sm border-t border-b border-[var(--fg)]/10 py-4" style={{ opacity: 0 }}>
              <div>
                <span className="text-[var(--fg)]/30 text-xs uppercase tracking-wider block mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                  Category
                </span>
                <span className="text-[var(--fg)]/70">{project.category}</span>
              </div>
              <div>
                <span className="text-[var(--fg)]/30 text-xs uppercase tracking-wider block mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                  Stack
                </span>
                <span className="text-[var(--fg)]/70">{project.technologies.slice(0, 3).join(' · ')}</span>
              </div>
              {project.stats && (
                <div>
                  <span className="text-[var(--fg)]/30 text-xs uppercase tracking-wider block mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    Impact
                  </span>
                  <span className="text-[var(--fg)]/70">{project.stats}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <div ref={contentRef}>
        {/* Problem Statement */}
        <section className="case-section py-16 md:py-24 border-t border-[var(--fg)]/10">
          <div className="section-container">
            <div className="max-w-3xl">
              <span className="case-el text-xs font-medium uppercase tracking-widest text-[var(--fg)]/30 mb-6 block" style={{ fontFamily: 'var(--font-mono)', opacity: 0 }}>
                Problem
              </span>
              <p className="case-el text-xl md:text-2xl leading-relaxed text-[var(--fg)]/70 font-light" style={{ opacity: 0 }}>
                {problem}
              </p>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="case-section py-16 md:py-24 border-t border-[var(--fg)]/10">
          <div className="section-container">
            <div className="max-w-3xl">
              <span className="case-el text-xs font-medium uppercase tracking-widest text-[var(--fg)]/30 mb-6 block" style={{ fontFamily: 'var(--font-mono)', opacity: 0 }}>
                Approach
              </span>
              <div className="space-y-8">
                {approach.map((item) => (
                  <div key={item.step} className="case-el flex items-start gap-6" style={{ opacity: 0 }}>
                    <span
                      className="text-xs font-medium text-[var(--fg)]/20 shrink-0 w-8 text-right pt-1"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {item.step}
                    </span>
                    <p className="text-base md:text-lg text-[var(--fg)]/70 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Result */}
        <section className="case-section py-16 md:py-24 border-t border-[var(--fg)]/10">
          <div className="section-container">
            <div className="max-w-3xl">
              <span className="case-el text-xs font-medium uppercase tracking-widest text-[var(--fg)]/30 mb-6 block" style={{ fontFamily: 'var(--font-mono)', opacity: 0 }}>
                Result
              </span>
              <p className="case-el text-xl md:text-2xl leading-relaxed text-[var(--fg)]/70 font-light mb-8" style={{ opacity: 0 }}>
                {result}
              </p>

              {project.lessonsLearned && (
                <div className="case-el p-6 border border-[var(--fg)]/10" style={{ opacity: 0 }}>
                  <h3 className="text-xs font-medium uppercase tracking-widest text-[var(--fg)]/30 mb-3">
                    Key Takeaway
                  </h3>
                  <p className="text-sm text-[var(--fg)]/60 leading-relaxed italic">
                    &ldquo;{project.lessonsLearned}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Links */}
        <section className="case-section py-16 border-t border-[var(--fg)]/10">
          <div className="section-container">
            <div className="max-w-3xl flex flex-wrap gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-el px-6 py-3 border border-[var(--fg)] text-sm font-medium hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all duration-300"
                  style={{ opacity: 0 }}
                >
                  View on GitHub →
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-el px-6 py-3 border border-[var(--fg)] text-sm font-medium hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all duration-300"
                  style={{ opacity: 0 }}
                >
                  Live Demo →
                </a>
              )}
              {project.pypi && (
                <a
                  href={project.pypi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-el px-6 py-3 border border-[var(--fg)] text-sm font-medium hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all duration-300"
                  style={{ opacity: 0 }}
                >
                  PyPI Package →
                </a>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Next project */}
      <section className="border-t border-[var(--fg)]/10">
        <Link
          href={`/work/${nextProject.title.toLowerCase().replace(/\s+/g, '-')}`}
          className="block group"
        >
          <div className="section-container py-16 md:py-20">
            <div className="max-w-3xl">
              <span className="text-xs font-medium text-[var(--fg)]/20" style={{ fontFamily: 'var(--font-mono)' }}>
                Next project
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mt-2 group-hover:opacity-50 transition-opacity duration-300">
                {nextProject.title}
              </h2>
              <p className="text-sm text-[var(--fg)]/40 mt-3 max-w-md">
                {nextProject.description}
              </p>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
