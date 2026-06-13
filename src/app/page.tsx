'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { Mail, Github, Linkedin, FileText, ArrowUpRight, ArrowRight } from 'lucide-react';
import { projects, profile, experience, research } from '@/lib/data';
import { PageShell } from '@/components/layout/PageShell';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EASE_OUT } from '@/lib/motion';

const easeOut = EASE_OUT;

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

  // Write the number straight to the DOM node (external system) so we avoid
  // setState-driven re-renders every animation frame.
  useEffect(() => {
    const el = ref.current;
    if (!el || !isInView) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${target}${suffix}`;
      return;
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
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
    <section
      ref={sectionRef}
      className="min-h-dvh relative z-10 flex items-center justify-center overflow-x-clip"
    >
      <motion.div
        className="section-container w-full py-28 flex flex-col items-center text-center relative z-10"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        {/* Role tag */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.3 }}
        >
          <span className="w-8 h-[1px] bg-[var(--accent)]" />
          <span className="text-[11px] font-medium text-[var(--accent)] uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
            ML / DL Engineer · GenAI Developer
          </span>
        </motion.div>

        {/* Name — massive masked staggered reveal */}
        <motion.h1
          className="font-[family-name:var(--font-display)] font-bold leading-[0.92] tracking-tight text-[var(--fg)]"
          style={{ fontSize: 'clamp(4rem, 10vw, 9rem)' }}
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.14, delayChildren: 0.45 } },
          }}
        >
          {['Aditya', 'Mer'].map((word, i) => (
            <span
              key={i}
              className="block overflow-hidden pt-[0.18em] pb-[0.14em] -mt-[0.18em] -mb-[0.14em]"
            >
              <motion.span
                className="block"
                variants={{
                  initial: { y: '110%' },
                  animate: { y: '0%', transition: { duration: 1, ease: easeOut } },
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="w-full max-w-xl h-px bg-[var(--border)] mt-8 md:mt-10 mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.8 }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Descriptor */}
        <motion.p
          className="text-sm md:text-base text-[var(--fg-muted)] leading-relaxed mt-6 md:mt-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.9 }}
        >
          {profile.tagline}
        </motion.p>

        {/* CTA + socials — inline row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 mt-8 md:mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 1.05 }}
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 text-sm font-medium border border-[var(--fg)] px-7 py-3 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all duration-300"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            View Projects
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <span className="w-6 h-[1px] bg-[var(--border)] hidden md:block" />

          <div className="flex items-center gap-4">
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
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--fg-muted)]">
        <span className="text-[10px] uppercase tracking-[0.25em]" style={{ fontFamily: 'var(--font-mono)' }}>
          Scroll
        </span>
        <span className="w-px h-8 bg-gradient-to-b from-[var(--fg-muted)] to-transparent" />
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Subtle counter-parallax: stats drift up, domain grid drifts in.
  const statsY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const gridY = useTransform(scrollYProgress, [0, 1], [60, -20]);

  return (
    <section ref={ref} className="py-20 md:py-28 border-t border-[var(--border)] relative z-10 bg-[var(--bg)]/40">
      <div className="section-container">
        <SectionHeader number="01" label="Expertise" />

        {/* Stats row */}
        <motion.div className="flex flex-wrap gap-12 md:gap-20 mb-16 md:mb-24" style={{ y: statsY }} {...staggerContainer}>
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
        <motion.div className="grid md:grid-cols-2 gap-px bg-[var(--border)]" style={{ y: gridY }} {...staggerContainer}>
          {DOMAINS.map((d) => (
            <motion.div key={d.num} className="bg-[var(--bg-card)] py-10 md:py-14 px-6 md:px-10" {...staggerChild}>
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
   § 3 — FEATURED PROJECTS (pinned horizontal scroll on desktop)
   ═══════════════════════════════════════════════════════════ */
function slugify(title: string) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <Link
      href={`/projects/${slugify(project.title)}`}
      className="group flex h-full flex-col justify-between p-7 md:p-10 bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-300 min-h-[380px]"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-[11px] font-medium text-[var(--accent)]/70" style={{ fontFamily: 'var(--font-mono)' }}>
            {String(index + 1).padStart(2, '0')} — {project.category}
          </span>
          {project.stats && (
            <span className="text-[10px] font-medium text-[var(--accent-green)] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
              {project.stats}
            </span>
          )}
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold tracking-tight mb-4 group-hover:text-[var(--accent)] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm md:text-base text-[var(--fg-muted)] leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex items-end justify-between mt-10">
        <div className="flex flex-wrap gap-3">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="text-[10px] font-medium text-[var(--fg-muted)]/60" style={{ fontFamily: 'var(--font-mono)' }}>
              {tech}
            </span>
          ))}
        </div>
        <ArrowUpRight
          size={22}
          strokeWidth={1.5}
          className="text-[var(--fg-muted)]/30 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
        />
      </div>
    </Link>
  );
}

function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="border-t border-[var(--border)] relative z-10 bg-[var(--bg)]/40 py-20 md:py-28">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <SectionHeader number="02" label="Selected Projects" />
          <Link
            href="/projects"
            className="text-sm font-medium text-[var(--accent)] hover:opacity-70 transition-opacity shrink-0"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            View all projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
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
  const recent = experience.slice(0, 3);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -30]);

  return (
    <section ref={ref} className="py-20 md:py-28 border-t border-[var(--border)] relative z-10 bg-[var(--bg)]/40">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <SectionHeader number="03" label="Experience" />
          <motion.div {...fadeUp}>
            <Link href="/experience" className="text-sm font-medium text-[var(--accent)] hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-mono)' }}>
              Full timeline →
            </Link>
          </motion.div>
        </div>

        <motion.div className="border-t border-[var(--border)]" style={{ y: contentY }}>
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
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   § 5 — RESEARCH PREVIEW
   ═══════════════════════════════════════════════════════════ */
function ResearchPreview() {
  const previewPapers = research.papers.slice(0, 2);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="py-20 md:py-28 border-t border-[var(--border)] relative z-10 bg-[var(--bg)]/40">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <SectionHeader number="04" label="Research" />
          <motion.div {...fadeUp}>
            <Link href="/research" className="text-sm font-medium text-[var(--accent)] hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-mono)' }}>
              All publications →
            </Link>
          </motion.div>
        </div>

        <motion.div className="space-y-0" style={{ y: contentY }}>
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
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   § 6 — CONTACT CTA
   ═══════════════════════════════════════════════════════════ */
function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Gentle counter-parallax on the headline as the section scrolls through.
  const headingY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="py-24 md:py-40 border-t border-[var(--border)] relative z-10 bg-[var(--bg)]/40">
      <div className="section-container text-center">
        <motion.p
          className="text-xs font-medium text-[var(--accent)] uppercase tracking-widest mb-6"
          style={{ fontFamily: 'var(--font-mono)' }}
          {...fadeUp}
        >
          Open to work
        </motion.p>
        <motion.h2
          className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight max-w-4xl mx-auto"
          style={{ y: headingY }}
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
        >
          Let&apos;s build something interesting.
        </motion.h2>
        <motion.div className="mt-12" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 text-sm font-medium bg-[var(--fg)] text-[var(--bg)] px-8 py-4 hover:bg-[var(--accent)] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Get in touch
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <PageShell className="bg-transparent" offsetNav={false}>
      <HeroSection />
      <StatsAndDomains />
      <FeaturedProjects />
      <ExperiencePreview />
      <ResearchPreview />
      <ContactCTA />
    </PageShell>
  );
}
