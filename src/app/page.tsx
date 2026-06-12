'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { Mail, Github, Linkedin, FileText } from 'lucide-react';
import { projects, profile, experience, research } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';

/* ── Animation presets ─────────────────────────────────── */
const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: easeOut },
};

const staggerContainer = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-80px' as const },
};

const staggerChild = {
  variants: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  },
};

/* ── Animated Counter ──────────────────────────────────── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════
   § 1 — HERO
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, -80]);

  return (
    <section ref={sectionRef} className="min-h-dvh flex flex-col relative z-10 overflow-hidden">
      {/* Massive faint background watermark */}
      <motion.div
        className="absolute -bottom-8 -right-8 md:right-0 select-none pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: easeOut }}
      >
        <span
          className="font-[family-name:var(--font-mono)] font-bold text-[var(--fg)]/[0.025] leading-none block"
          style={{ fontSize: 'clamp(12rem, 35vw, 28rem)' }}
        >
          AM
        </span>
      </motion.div>

      {/* Top-right index */}
      <motion.div
        className="absolute top-6 right-6 md:right-12 text-[10px] font-medium text-[var(--fg-muted)]/25 uppercase tracking-widest hidden md:block"
        style={{ fontFamily: 'var(--font-mono)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4, ease: easeOut }}
      >
        01 — Home
      </motion.div>

      <motion.div
        className="flex-1 flex flex-col justify-end section-container pt-24 pb-16 md:pb-20"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        {/* Role tag */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.3 }}
        >
          <span className="w-8 h-[1px] bg-[var(--accent)]" />
          <span className="text-[11px] font-medium text-[var(--accent)] uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
            ML / DL Engineer · GenAI Developer
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="font-[family-name:var(--font-display)] font-bold leading-[0.85] tracking-tight text-[var(--fg)]"
          style={{ fontSize: 'clamp(4.5rem, 12vw, 11rem)' }}
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.12, delayChildren: 0.45 } },
          }}
        >
          {['Aditya', 'Mer'].map((word, i) => (
            <motion.span
              key={i}
              className="block"
              variants={{
                initial: { opacity: 0, y: 80 },
                animate: { opacity: 1, y: 0, transition: { duration: 1, ease: easeOut } },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="w-full h-px bg-[var(--border)] mt-10 md:mt-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.8 }}
          style={{ transformOrigin: 'left' }}
        />

        {/* Bottom row: descriptor + actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-8 md:mt-10">
          {/* Left: short descriptor */}
          <motion.div
            className="max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.9 }}
          >
            <p className="text-sm md:text-base text-[var(--fg-muted)] leading-relaxed">
              {profile.tagline}
            </p>
          </motion.div>

          {/* Right: CTAs + socials */}
          <motion.div
            className="flex flex-col items-start md:items-end gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 1 }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 text-sm font-medium border border-[var(--fg)] px-7 py-3 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all duration-400"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              View Projects
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>

            <div className="flex items-center gap-5">
              <a href={`mailto:${profile.email}`} className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors duration-300" aria-label="Email">
                <Mail size={16} strokeWidth={1.5} />
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors duration-300" aria-label="GitHub">
                <Github size={16} strokeWidth={1.5} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin size={16} strokeWidth={1.5} />
              </a>
              <a href={profile.resumeUrl} className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors duration-300" aria-label="Resume">
                <FileText size={16} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — positioned bottom-left */}
      <motion.div
        className="absolute bottom-8 left-6 md:left-12 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6, ease: easeOut }}
      >
        <div className="h-10 w-[1px] bg-[var(--fg-muted)]/15 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[var(--fg-muted)]/40"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: '40%' }}
          />
        </div>
        <span className="text-[9px] font-medium uppercase tracking-widest text-[var(--fg-muted)]/30" style={{ fontFamily: 'var(--font-mono)' }}>
          Scroll
        </span>
      </motion.div>
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
  return (
    <section className="py-20 md:py-28 border-t border-[var(--border)]">
      <div className="section-container">
        <SectionHeader number="01" label="Expertise" />

        {/* Stats row */}
        <motion.div className="flex flex-wrap gap-12 md:gap-20 mb-16 md:mb-24" {...staggerContainer}>
          {[
            { value: 4, label: 'Internships' },
            { value: 10, label: 'Projects' },
            { value: 2, label: 'Publications' },
            { value: 3, label: 'Years ML' },
          ].map((stat) => (
            <motion.div key={stat.label} {...staggerChild}>
              <span className="text-4xl md:text-5xl font-bold block leading-none" style={{ fontFamily: 'var(--font-mono)' }}>
                <Counter target={stat.value} suffix="+" />
              </span>
              <span className="text-xs font-medium text-[var(--fg-muted)] mt-2 block uppercase tracking-widest">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Domain grid */}
        <motion.div className="grid md:grid-cols-2 gap-px bg-[var(--border)]" {...staggerContainer}>
          {DOMAINS.map((d) => (
            <motion.div key={d.num} className="bg-[var(--bg)] py-10 md:py-14 px-6 md:px-10" {...staggerChild}>
              <span className="text-xs font-medium text-[var(--fg-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>{d.num}</span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold mt-2 mb-3">{d.title}</h3>
              <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   § 3 — FEATURED PROJECTS
   ═══════════════════════════════════════════════════════════ */
function FeaturedProjects() {
  const featured = projects.filter(p => p.featured).slice(0, 3);

  return (
    <section className="py-20 md:py-28 border-t border-[var(--border)]">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <SectionHeader number="02" label="Selected Projects" />
          <motion.div {...fadeUp}>
            <Link
              href="/projects"
              className="text-sm font-medium text-[var(--accent)] hover:opacity-70 transition-opacity"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              View all projects →
            </Link>
          </motion.div>
        </div>

        <motion.div className="grid md:grid-cols-3 gap-4" {...staggerContainer} transition={{ staggerChildren: 0.1 }}>
          {featured.map((project, i) => (
            <motion.div key={project.title} {...staggerChild}>
              <Link
                href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group block p-6 md:p-8 bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-[11px] font-medium text-[var(--accent)]/60 mb-4 block" style={{ fontFamily: 'var(--font-mono)' }}>
                  {String(i + 1).padStart(2, '0')} — {project.category}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="text-[10px] font-medium text-[var(--fg-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>{tech}</span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   § 4 — EXPERIENCE PREVIEW
   ═══════════════════════════════════════════════════════════ */
function ExperiencePreview() {
  const recent = experience.slice(0, 3);

  return (
    <section className="py-20 md:py-28 border-t border-[var(--border)]">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <SectionHeader number="03" label="Experience" />
          <motion.div {...fadeUp}>
            <Link href="/experience" className="text-sm font-medium text-[var(--accent)] hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-mono)' }}>
              Full timeline →
            </Link>
          </motion.div>
        </div>

        <div className="border-t border-[var(--border)]">
          {recent.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              className="border-b border-[var(--border)] py-8 md:py-10 md:grid md:grid-cols-[180px_1fr] md:gap-12"
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
            >
              <div className="text-xs font-medium text-[var(--fg-muted)] mb-2 md:mb-0 pt-1 uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                {exp.period}
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">{exp.role}</h3>
                <p className="text-sm text-[var(--accent)] mt-1" style={{ fontFamily: 'var(--font-mono)' }}>{exp.company}</p>
                <ul className="mt-3 space-y-1.5">
                  {exp.highlights.slice(0, 2).map((h, idx) => (
                    <li key={idx} className="text-sm text-[var(--fg-muted)] leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-px before:bg-[var(--accent)]/30">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   § 5 — RESEARCH PREVIEW
   ═══════════════════════════════════════════════════════════ */
function ResearchPreview() {
  const previewPapers = research.papers.slice(0, 2);

  return (
    <section className="py-20 md:py-28 border-t border-[var(--border)]">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <SectionHeader number="04" label="Research" />
          <motion.div {...fadeUp}>
            <Link href="/research" className="text-sm font-medium text-[var(--accent)] hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-mono)' }}>
              All publications →
            </Link>
          </motion.div>
        </div>

        <div className="space-y-0">
          {previewPapers.map((paper, i) => (
            <motion.div
              key={paper.title}
              className="border-t border-[var(--border)] py-8 md:py-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.06 }}
            >
              <div className="md:grid md:grid-cols-[80px_1fr] md:gap-12">
                <div className="text-xs font-medium text-[var(--fg-muted)] mb-3 md:mb-0 pt-1 uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                  {paper.year}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-[10px] font-medium text-[var(--fg-muted)] uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>{paper.venueShort}</span>
                    <span className="text-[10px] px-2 py-0.5 border border-[var(--border)] text-[var(--fg-muted)] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>{paper.status}</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold tracking-tight leading-snug mb-3">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed max-w-2xl mb-4">{paper.abstract}</p>
                  <a href={paper.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:opacity-70 transition-opacity">
                    Read paper →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-[var(--border)]" />
        </div>
      </div>
    </section>
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
      <FeaturedProjects />
      <ExperiencePreview />
      <ResearchPreview />
    </main>
  );
}
