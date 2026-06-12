'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects } from '@/lib/data';

const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: easeOut },
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: '-80px' },
};

const staggerChild = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easeOut },
};

export default function WorkDetailClient() {
  const params = useParams();
  const slug = (params?.slug as string) || '';

  const project = projects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, '-') === slug,
  );

  if (!project) {
    return (
      <main className="min-h-screen bg-[var(--bg)] pt-24 flex items-center justify-center">
        <div className="section-container text-center">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold mb-4">Project not found</h1>
          <Link
            href="/"
            className="text-sm font-medium text-[var(--accent)] hover:opacity-70 transition-opacity"
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
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors duration-300 mb-8"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ← Back to projects
            </Link>
          </motion.div>

          <motion.div
            className="aspect-[16/9] bg-[var(--bg-card)] border border-[var(--border)] mb-12 md:mb-16 flex items-center justify-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-[var(--fg)]/[0.02]" />
            <span className="text-sm text-[var(--fg-muted)] relative z-10" style={{ fontFamily: 'var(--font-mono)' }}>
              {project.title}
            </span>
          </motion.div>

          <div className="max-w-3xl">
            <motion.span
              className="text-xs font-medium text-[var(--fg-muted)] mb-4 block"
              style={{ fontFamily: 'var(--font-mono)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
            >
              {project.category}
            </motion.span>

            <motion.h1
              className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.25 }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl leading-relaxed text-[var(--fg-muted)] mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.35 }}
            >
              {project.description}
            </motion.p>

            {/* Meta bar */}
            <motion.div
              className="flex flex-wrap items-center gap-6 text-sm border-t border-b border-[var(--border)] py-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.4 }}
            >
              <div>
                <span className="text-[var(--fg-muted)] text-xs uppercase tracking-wider block mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                  Category
                </span>
                <span className="text-[var(--fg)]/70">{project.category}</span>
              </div>
              <div>
                <span className="text-[var(--fg-muted)] text-xs uppercase tracking-wider block mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                  Stack
                </span>
                <span className="text-[var(--fg)]/70">{project.technologies.slice(0, 3).join(' · ')}</span>
              </div>
              {project.stats && (
                <div>
                  <span className="text-[var(--fg-muted)] text-xs uppercase tracking-wider block mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    Impact
                  </span>
                  <span className="text-[var(--fg)]/70">{project.stats}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <div>
        {/* Problem Statement */}
        <section className="py-16 md:py-24 border-t border-[var(--border)]">
          <div className="section-container">
            <div className="max-w-3xl">
              <motion.span
                className="text-xs font-medium uppercase tracking-widest text-[var(--fg-muted)] mb-6 block"
                style={{ fontFamily: 'var(--font-mono)' }}
                {...fadeUp}
              >
                01 / Problem
              </motion.span>
              <motion.p
                className="text-xl md:text-2xl leading-relaxed text-[var(--fg)]/70 font-light"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 }}
              >
                {problem}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="py-16 md:py-24 border-t border-[var(--border)]">
          <div className="section-container">
            <div className="max-w-3xl">
              <motion.span
                className="text-xs font-medium uppercase tracking-widest text-[var(--fg-muted)] mb-6 block"
                style={{ fontFamily: 'var(--font-mono)' }}
                {...fadeUp}
              >
                02 / Approach
              </motion.span>
              <motion.div
                className="space-y-8"
                {...staggerContainer}
                transition={{ staggerChildren: 0.08 }}
              >
                {approach.map((item) => (
                  <motion.div
                    key={item.step}
                    className="flex items-start gap-6"
                    {...staggerChild}
                  >
                    <span
                      className="text-xs font-medium text-[var(--fg-muted)]/30 shrink-0 w-8 text-right pt-1"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {item.step}
                    </span>
                    <p className="text-base md:text-lg text-[var(--fg)]/70 leading-relaxed">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Result */}
        <section className="py-16 md:py-24 border-t border-[var(--border)]">
          <div className="section-container">
            <div className="max-w-3xl">
              <motion.span
                className="text-xs font-medium uppercase tracking-widest text-[var(--fg-muted)] mb-6 block"
                style={{ fontFamily: 'var(--font-mono)' }}
                {...fadeUp}
              >
                03 / Result
              </motion.span>
              <motion.p
                className="text-xl md:text-2xl leading-relaxed text-[var(--fg)]/70 font-light mb-8"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 }}
              >
                {result}
              </motion.p>

              {project.lessonsLearned && (
                <motion.div
                  className="p-6 border border-[var(--border)] bg-[var(--bg-card)]"
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: 0.2 }}
                >
                  <h3 className="text-xs font-medium uppercase tracking-widest text-[var(--fg-muted)] mb-3">
                    Key Takeaway
                  </h3>
                  <p className="text-sm text-[var(--fg)]/60 leading-relaxed italic">
                    &ldquo;{project.lessonsLearned}&rdquo;
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Links */}
        <section className="py-16 border-t border-[var(--border)]">
          <div className="section-container">
            <div className="max-w-3xl flex flex-wrap gap-4">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-[var(--fg)] text-sm font-medium hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300"
                  style={{ fontFamily: 'var(--font-mono)' }}
                  {...fadeUp}
                >
                  View on GitHub →
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-[var(--fg)] text-sm font-medium hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300"
                  style={{ fontFamily: 'var(--font-mono)' }}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: 0.05 }}
                >
                  Live Demo →
                </motion.a>
              )}
              {project.pypi && (
                <motion.a
                  href={project.pypi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-[var(--fg)] text-sm font-medium hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300"
                  style={{ fontFamily: 'var(--font-mono)' }}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: 0.1 }}
                >
                  PyPI Package →
                </motion.a>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Next project */}
      <section className="border-t border-[var(--border)]">
        <Link href={`/projects/${nextProject.title.toLowerCase().replace(/\s+/g, '-')}`} className="block group">
          <div className="section-container py-16 md:py-20">
            <div className="max-w-3xl">
              <span className="text-xs font-medium text-[var(--fg-muted)]/40" style={{ fontFamily: 'var(--font-mono)' }}>
                Next project
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight mt-2 group-hover:text-[var(--accent)] transition-colors duration-300">
                {nextProject.title}
              </h2>
              <p className="text-sm text-[var(--fg-muted)] mt-3 max-w-md">
                {nextProject.description}
              </p>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
