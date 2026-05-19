'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, profile, experience, education } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

/* ── Animated Counter ──────────────────────────────────── */
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
            val: target, duration: 1.4, ease: 'power2.out',
            onUpdate: () => { el.textContent = `${Math.round(obj.val)}${suffix}`; },
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

/* ── Live Clock ────────────────────────────────────────── */
function LiveTime() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      ref.current.textContent = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      }).format(new Date());
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span ref={ref} />;
}

/* ── Scroll-reveal helper ──────────────────────────────── */
function useScrollReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('.sr');
      items.forEach((item) => {
        gsap.fromTo(item, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [ref]);
}

/* ═══════════════════════════════════════════════════════════
   § 1 — HERO
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animate = (el: HTMLElement | null, delay: number) => {
      if (!el) return;
      if (rm) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; return; }
      setTimeout(() => {
        el.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    };
    animate(nameRef.current, 200);
    animate(taglineRef.current, 500);
    animate(metaRef.current, 700);
  }, []);

  return (
    <section className="min-h-dvh flex flex-col justify-center pt-20 md:pt-0 relative z-10">
      <div className="section-container">
        <h1
          ref={nameRef}
          className="font-display font-bold leading-[0.88] tracking-tight mb-6"
          style={{ fontSize: 'clamp(3.2rem, 7vw, 7rem)', opacity: 0, transform: 'translateY(40px)' }}
        >
          <span className="gradient-text">Aditya</span> Mer
        </h1>

        <p
          ref={taglineRef}
          className="text-lg md:text-xl text-[var(--fg-muted)] max-w-2xl leading-relaxed mb-10"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          {profile.bio}
        </p>

        <div
          ref={metaRef}
          className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] font-medium text-[var(--fg-muted)] uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-mono)', opacity: 0, transform: 'translateY(16px)' }}
        >
          <span className="text-[var(--accent)]">ML / DL Engineer</span>
          <span className="opacity-30">·</span>
          <span>GenAI Developer</span>
          <span className="opacity-30">·</span>
          <span>{profile.location}</span>
          <span className="opacity-30">·</span>
          <span><LiveTime /></span>
        </div>

        <div
          className="flex flex-wrap gap-4 mt-10"
          style={{ opacity: metaRef.current ? undefined : 0 }}
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            View Projects →
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-[var(--fg)]/15 text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   § 2 — STATS + DOMAINS
   ═══════════════════════════════════════════════════════════ */
const DOMAINS = [
  { num: '01', title: 'Machine Learning', desc: 'Building production-grade ML systems — from data pipeline to deployed model. Deep learning architectures, optimization, and scalable training.' },
  { num: '02', title: 'Generative AI', desc: 'LLM applications, multi-agent RAG systems, prompt engineering, and fine-tuning at scale.' },
  { num: '03', title: 'Research', desc: 'Published work in NLP, misinformation detection, and AI-powered code documentation.' },
  { num: '04', title: 'Full-Stack', desc: 'React, Next.js, FastAPI, and modern cloud infrastructure for complete AI products.' },
];

function StatsAndDomains() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} className="py-20 md:py-28 border-t border-[var(--fg)]/5">
      <div className="section-container">
        {/* Stats row */}
        <div className="flex flex-wrap gap-12 md:gap-20 mb-16 md:mb-24">
          {[
            { value: 4, label: 'Internships' },
            { value: 10, label: 'Projects' },
            { value: 2, label: 'Publications' },
            { value: 3, label: 'Years ML' },
          ].map((stat) => (
            <div key={stat.label} className="sr" style={{ opacity: 0 }}>
              <span className="text-4xl md:text-5xl font-bold block leading-none" style={{ fontFamily: 'var(--font-mono)' }}>
                <Counter target={stat.value} suffix="+" />
              </span>
              <span className="text-xs font-medium text-[var(--fg-muted)] mt-2 block uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Domain grid */}
        <div className="grid md:grid-cols-2 gap-px bg-[var(--fg)]/8">
          {DOMAINS.map((d) => (
            <div key={d.num} className="sr bg-[var(--bg)] py-10 md:py-14 px-6 md:px-10" style={{ opacity: 0 }}>
              <span className="text-xs font-medium text-[var(--accent)]/50" style={{ fontFamily: 'var(--font-mono)' }}>{d.num}</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold mt-2 mb-3">{d.title}</h3>
              <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   § 3 — FEATURED WORK
   ═══════════════════════════════════════════════════════════ */
function FeaturedWork() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  const featured = projects.filter(p => p.featured).slice(0, 3);

  return (
    <section ref={ref} className="py-20 md:py-28 border-t border-[var(--fg)]/5">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <div>
            <span className="sr gutter-number block mb-4" style={{ opacity: 0 }}>Selected</span>
            <h2 className="sr font-display text-4xl md:text-6xl font-bold tracking-tight" style={{ opacity: 0 }}>Work</h2>
          </div>
          <Link
            href="/work"
            className="sr text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-2)] transition-colors"
            style={{ fontFamily: 'var(--font-mono)', opacity: 0 }}
          >
            View all projects →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {featured.map((project, i) => (
            <Link
              key={project.title}
              href={`/work/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="sr group block p-6 md:p-8 accent-border accent-border-hover bg-[var(--card)] transition-all duration-300"
              style={{ opacity: 0 }}
            >
              <span className="text-[11px] font-medium text-[var(--accent)]/60 mb-4 block" style={{ fontFamily: 'var(--font-mono)' }}>
                {String(i + 1).padStart(2, '0')} — {project.category}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-[var(--accent)] transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map(tech => (
                  <span key={tech} className="px-2 py-1 text-[10px] font-medium border border-[var(--accent)]/12 text-[var(--accent)]/70" style={{ fontFamily: 'var(--font-mono)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   § 4 — EXPERIENCE PREVIEW
   ═══════════════════════════════════════════════════════════ */
function ExperiencePreview() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  const recent = experience.slice(0, 3);

  return (
    <section ref={ref} className="py-20 md:py-28 border-t border-[var(--fg)]/5">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <div>
            <span className="sr gutter-number block mb-4" style={{ opacity: 0 }}>Timeline</span>
            <h2 className="sr font-display text-4xl md:text-6xl font-bold tracking-tight" style={{ opacity: 0 }}>Experience</h2>
          </div>
          <Link
            href="/experience"
            className="sr text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-2)] transition-colors"
            style={{ fontFamily: 'var(--font-mono)', opacity: 0 }}
          >
            Full timeline →
          </Link>
        </div>

        <div className="border-t border-[var(--fg)]/8">
          {recent.map((exp) => (
            <div key={exp.company} className="sr border-b border-[var(--fg)]/8 py-8 md:py-10 md:grid md:grid-cols-[180px_1fr] md:gap-12" style={{ opacity: 0 }}>
              <div className="text-xs font-medium text-[var(--fg-muted)] mb-2 md:mb-0 pt-1 uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                {exp.period}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight">{exp.role}</h3>
                <p className="text-sm text-[var(--accent)] mt-1" style={{ fontFamily: 'var(--font-mono)' }}>{exp.company}</p>
                <ul className="mt-3 space-y-1.5">
                  {exp.highlights.slice(0, 2).map((h, i) => (
                    <li key={i} className="text-sm text-[var(--fg-muted)] leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-px before:bg-[var(--accent)]/30">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   § 5 — FOOTER
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-12 md:py-16 border-t border-[var(--fg)]/5">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-medium gradient-text" style={{ fontFamily: 'var(--font-mono)' }}>Aditya Mer</p>
            <p className="text-xs text-[var(--fg-muted)] mt-1">ML Engineer & GenAI Developer</p>
          </div>
          <div className="flex gap-6">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors" style={{ fontFamily: 'var(--font-mono)' }}>GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors" style={{ fontFamily: 'var(--font-mono)' }}>LinkedIn</a>
            <a href={`mailto:${profile.email}`} className="text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors" style={{ fontFamily: 'var(--font-mono)' }}>Email</a>
          </div>
          <p className="text-xs text-[var(--fg-muted)]/40" style={{ fontFamily: 'var(--font-mono)' }}>© 2026</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsAndDomains />
      <FeaturedWork />
      <ExperiencePreview />
      <Footer />
    </main>
  );
}
