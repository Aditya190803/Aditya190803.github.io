'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { profile, education, experience, projects, skills, research, certifications } from '@/lib/data';

const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: easeOut },
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: '-60px' },
};

const staggerChild = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easeOut },
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] pt-20 md:pt-24">
      <div className="section-container pb-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: easeOut }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ← Back
          </Link>
        </motion.div>
      </div>

      <div className="section-container pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="border-b border-[var(--border)] pb-8 mb-10">
            <motion.h1
              className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-bold tracking-tight mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              {profile.name}
            </motion.h1>
            <motion.p
              className="text-lg text-[var(--fg-muted)] mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
            >
              {profile.title}
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--fg-muted)]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
            >
              <a href={`mailto:${profile.email}`} className="hover:text-[var(--accent)] transition-colors">
                {profile.email}
              </a>
              <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                adityamer.dev
              </a>
              <span>{profile.location}</span>
            </motion.div>
          </header>

          {/* Summary */}
          <section className="mb-12">
            <motion.h2
              className="text-xs font-medium uppercase tracking-widest text-[var(--fg-muted)] mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}
              {...fadeUp}
            >
              Summary
            </motion.h2>
            <motion.p
              className="text-base leading-relaxed text-[var(--fg)]/70"
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
            >
              {profile.bio}
            </motion.p>
          </section>

          {/* Experience */}
          <section className="mb-12">
            <motion.h2
              className="text-xs font-medium uppercase tracking-widest text-[var(--fg-muted)] mb-6"
              style={{ fontFamily: 'var(--font-mono)' }}
              {...fadeUp}
            >
              Experience
            </motion.h2>
            <motion.div
              className="space-y-8"
              {...staggerContainer}
              transition={{ staggerChildren: 0.06 }}
            >
              {experience.map((exp) => (
                <motion.div
                  key={`${exp.company}-${exp.role}`}
                  className="border-l border-[var(--border)] pl-4"
                  {...staggerChild}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="font-semibold">{exp.role}</h3>
                      <p className="text-sm text-[var(--fg-muted)]">{exp.company}</p>
                    </div>
                    <div className="text-xs text-[var(--fg-muted)]/60 shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
                      {exp.period}
                    </div>
                  </div>
                  <ul className="space-y-1 mt-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-[var(--fg)]/60 pl-4 relative">
                        <span className="absolute left-0 top-[0.6em] w-1 h-1 bg-[var(--fg-muted)]/20" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Education */}
          <section className="mb-12">
            <motion.h2
              className="text-xs font-medium uppercase tracking-widest text-[var(--fg-muted)] mb-6"
              style={{ fontFamily: 'var(--font-mono)' }}
              {...fadeUp}
            >
              Education
            </motion.h2>
            <motion.div
              className="space-y-4"
              {...staggerContainer}
              transition={{ staggerChildren: 0.06 }}
            >
              {education.map((edu) => (
                <motion.div
                  key={edu.degree}
                  className="flex justify-between gap-4"
                  {...staggerChild}
                >
                  <div>
                    <h3 className="font-semibold text-sm">{edu.degree}</h3>
                    <p className="text-sm text-[var(--fg-muted)]">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-[var(--fg-muted)]/60 shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
                    {edu.period}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Skills */}
          <section className="mb-12">
            <motion.h2
              className="text-xs font-medium uppercase tracking-widest text-[var(--fg-muted)] mb-6"
              style={{ fontFamily: 'var(--font-mono)' }}
              {...fadeUp}
            >
              Skills
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              {...staggerContainer}
              transition={{ staggerChildren: 0.06 }}
            >
              {Object.entries(skills).map(([category, items]) => (
                <motion.div key={category} {...staggerChild}>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--fg-muted)] mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-[11px] border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] transition-colors duration-200"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Certifications */}
          <section className="mb-12">
            <motion.h2
              className="text-xs font-medium uppercase tracking-widest text-[var(--fg-muted)] mb-6"
              style={{ fontFamily: 'var(--font-mono)' }}
              {...fadeUp}
            >
              Certifications
            </motion.h2>
            <motion.div
              className="space-y-4"
              {...staggerContainer}
              transition={{ staggerChildren: 0.05 }}
            >
              {certifications.map((cert) => (
                <motion.div
                  key={cert.title}
                  className="flex flex-col md:flex-row md:items-start md:justify-between gap-1"
                  {...staggerChild}
                >
                  <div>
                    <h3 className="font-semibold text-sm">{cert.title}</h3>
                    <p className="text-sm text-[var(--fg-muted)]">{cert.issuer}</p>
                  </div>
                  <span className="text-xs text-[var(--fg-muted)]/60 shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
                    {cert.date}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Research */}
          <section className="mb-12">
            <motion.h2
              className="text-xs font-medium uppercase tracking-widest text-[var(--fg-muted)] mb-6"
              style={{ fontFamily: 'var(--font-mono)' }}
              {...fadeUp}
            >
              Research
            </motion.h2>
            <motion.div
              className="space-y-6"
              {...staggerContainer}
              transition={{ staggerChildren: 0.06 }}
            >
              {research.papers.map((paper) => (
                <motion.div key={paper.title} {...staggerChild}>
                  <h3 className="text-sm font-semibold mb-1">{paper.title}</h3>
                  <p className="text-xs text-[var(--fg-muted)] mb-1">{paper.venue} ({paper.year})</p>
                  <p className="text-sm text-[var(--fg)]/60 leading-relaxed">{paper.abstract}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Projects */}
          <section>
            <motion.h2
              className="text-xs font-medium uppercase tracking-widest text-[var(--fg-muted)] mb-6"
              style={{ fontFamily: 'var(--font-mono)' }}
              {...fadeUp}
            >
              Featured Projects
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              {...staggerContainer}
              transition={{ staggerChildren: 0.06 }}
            >
              {projects.filter((p) => p.featured).map((project) => (
                <motion.div
                  key={project.title}
                  className="border border-[var(--border)] p-4 bg-[var(--bg-card)]"
                  {...staggerChild}
                >
                  <h3 className="font-semibold mb-1">{project.title}</h3>
                  <p className="text-sm text-[var(--fg)]/60 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-1.5 py-0.5 border border-[var(--border)] text-[var(--fg-muted)]"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>
      </div>
    </main>
  );
}
