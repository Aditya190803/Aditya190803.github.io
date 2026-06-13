'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { profile, education, experience, projects, skills, research, certifications } from '@/lib/data';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal, RevealItem, RevealStagger } from '@/components/ui/ScrollReveal';
import { fadeUp } from '@/lib/motion';
import { useSectionScroll } from '@/lib/useSectionScroll';

export default function ResumePage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { heroY, contentY } = useSectionScroll(sectionRef);

  return (
    <PageShell>
      <div className="section-container pb-4">
        <Reveal>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ← Back
          </Link>
        </Reveal>
      </div>

      <section ref={sectionRef} className="bg-[var(--bg)]/40">
      <div className="section-container pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto">
          <motion.header
            className="border-b border-[var(--border)] pb-8 mb-10 page-hero-space"
            style={{ y: heroY }}
          >
            <div>
              <PageHero
                number="07"
                label="Resume"
                title={profile.name}
                subtitle={profile.title}
                className="mb-6"
              />
              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--fg-muted)]">
                <a href={`mailto:${profile.email}`} className="hover:text-[var(--accent)] transition-colors">
                  {profile.email}
                </a>
                <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                  adityamer.dev
                </a>
                <span>{profile.location}</span>
                </div>
              </Reveal>
            </div>
          </motion.header>

          <motion.div style={{ y: contentY }}>
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
            <RevealStagger className="space-y-8" stagger={0.06}>
              {experience.map((exp) => (
                <RevealItem key={`${exp.company}-${exp.role}`}>
                  <div className="border-l border-[var(--border)] pl-4">
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
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
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
            <RevealStagger className="space-y-4" stagger={0.06}>
              {education.map((edu) => (
                <RevealItem key={edu.degree}>
                  <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-sm">{edu.degree}</h3>
                    <p className="text-sm text-[var(--fg-muted)]">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-[var(--fg-muted)]/60 shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
                    {edu.period}
                  </span>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
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
            <RevealStagger className="grid md:grid-cols-2 gap-6" stagger={0.06}>
              {Object.entries(skills).map(([category, items]) => (
                <RevealItem key={category}>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--fg-muted)] mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {items.map((skill: string) => (
                      <span
                        key={skill}
                        className="text-[12px] text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors duration-200"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
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
            <RevealStagger className="space-y-4" stagger={0.05}>
              {certifications.map((cert) => (
                <RevealItem key={cert.title}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                  <div>
                    <h3 className="font-semibold text-sm">{cert.title}</h3>
                    <p className="text-sm text-[var(--fg-muted)]">{cert.issuer}</p>
                  </div>
                  <span className="text-xs text-[var(--fg-muted)]/60 shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
                    {cert.date}
                  </span>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
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
            <RevealStagger className="space-y-6" stagger={0.06}>
              {research.papers.map((paper) => (
                <RevealItem key={paper.title}>
                  <h3 className="text-sm font-semibold mb-1">{paper.title}</h3>
                  <p className="text-xs text-[var(--fg-muted)] mb-1">{paper.venue} ({paper.year})</p>
                  <p className="text-sm text-[var(--fg)]/60 leading-relaxed">{paper.abstract}</p>
                </RevealItem>
              ))}
            </RevealStagger>
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
            <RevealStagger className="grid md:grid-cols-2 gap-6" stagger={0.06}>
              {projects.filter((p) => p.featured).map((project) => (
                <RevealItem key={project.title}>
                  <div className="border border-[var(--border)] p-4 bg-[var(--bg-card)]">
                  <h3 className="font-semibold mb-1">{project.title}</h3>
                  <p className="text-sm text-[var(--fg)]/60 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] text-[var(--fg-muted)]"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </section>
          </motion.div>
        </div>
      </div>
      </section>
    </PageShell>
  );
}
