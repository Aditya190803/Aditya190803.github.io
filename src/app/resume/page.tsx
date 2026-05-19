'use client';

import Link from 'next/link';
import { profile, education, experience, projects, skills, research, certifications } from '@/lib/data';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ResumePage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) return;

    const ctx = gsap.context(() => {
      const sections = contentRef.current!.querySelectorAll('.resume-section');
      sections.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll('.resume-el'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-20 md:pt-24">
      <div className="section-container pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-50 transition-opacity duration-300"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          ← Back
        </Link>
      </div>

      <div ref={contentRef} className="section-container pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="resume-section border-b border-[var(--fg)]/10 pb-8 mb-10">
            <h1 className="resume-el font-display text-5xl md:text-7xl font-bold tracking-tight mb-3" style={{ opacity: 0 }}>
              {profile.name}
            </h1>
            <p className="resume-el text-lg text-[var(--fg)]/60 mb-6" style={{ opacity: 0 }}>{profile.title}</p>
            <div className="resume-el flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--fg)]/50" style={{ opacity: 0 }}>
              <a href={`mailto:${profile.email}`} className="hover:opacity-50 transition-opacity">
                {profile.email}
              </a>
              <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
                adityamer.dev
              </a>
              <span>{profile.location}</span>
            </div>
          </header>

          {/* Summary */}
          <section className="resume-section mb-12">
            <h2 className="resume-el text-xs font-medium uppercase tracking-widest text-[var(--fg)]/30 mb-4" style={{ fontFamily: 'var(--font-mono)', opacity: 0 }}>
              Summary
            </h2>
            <p className="resume-el text-base leading-relaxed text-[var(--fg)]/70" style={{ opacity: 0 }}>{profile.bio}</p>
          </section>

          {/* Experience */}
          <section className="resume-section mb-12">
            <h2 className="resume-el text-xs font-medium uppercase tracking-widest text-[var(--fg)]/30 mb-6" style={{ fontFamily: 'var(--font-mono)', opacity: 0 }}>
              Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={`${exp.company}-${exp.role}`} className="resume-el border-l border-[var(--fg)]/10 pl-4" style={{ opacity: 0 }}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="font-semibold">{exp.role}</h3>
                      <p className="text-sm text-[var(--fg)]/50">{exp.company}</p>
                    </div>
                    <div className="text-xs text-[var(--fg)]/30 shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
                      {exp.period}
                    </div>
                  </div>
                  <ul className="space-y-1 mt-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-[var(--fg)]/60 pl-4 relative">
                        <span className="absolute left-0 top-[0.6em] w-1 h-1 bg-[var(--fg)]/20" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="resume-section mb-12">
            <h2 className="resume-el text-xs font-medium uppercase tracking-widest text-[var(--fg)]/30 mb-6" style={{ fontFamily: 'var(--font-mono)', opacity: 0 }}>
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.degree} className="resume-el flex justify-between gap-4" style={{ opacity: 0 }}>
                  <div>
                    <h3 className="font-semibold text-sm">{edu.degree}</h3>
                    <p className="text-sm text-[var(--fg)]/50">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-[var(--fg)]/30 shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="resume-section mb-12">
            <h2 className="resume-el text-xs font-medium uppercase tracking-widest text-[var(--fg)]/30 mb-6" style={{ fontFamily: 'var(--font-mono)', opacity: 0 }}>
              Skills
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="resume-el" style={{ opacity: 0 }}>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--fg)]/40 mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill: string) => (
                      <span key={skill} className="px-2 py-1 text-[11px] border border-[var(--fg)]/10 text-[var(--fg)]/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="resume-section mb-12">
            <h2 className="resume-el text-xs font-medium uppercase tracking-widest text-[var(--fg)]/30 mb-6" style={{ fontFamily: 'var(--font-mono)', opacity: 0 }}>
              Certifications
            </h2>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.title} className="resume-el flex flex-col md:flex-row md:items-start md:justify-between gap-1" style={{ opacity: 0 }}>
                  <div>
                    <h3 className="font-semibold text-sm">{cert.title}</h3>
                    <p className="text-sm text-[var(--fg)]/50">{cert.issuer}</p>
                  </div>
                  <span className="text-xs text-[var(--fg)]/30 shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Research */}
          <section className="resume-section mb-12">
            <h2 className="resume-el text-xs font-medium uppercase tracking-widest text-[var(--fg)]/30 mb-6" style={{ fontFamily: 'var(--font-mono)', opacity: 0 }}>
              Research
            </h2>
            <div className="space-y-6">
              {research.papers.map((paper) => (
                <div key={paper.title} className="resume-el" style={{ opacity: 0 }}>
                  <h3 className="text-sm font-semibold mb-1">{paper.title}</h3>
                  <p className="text-xs text-[var(--fg)]/50 mb-1">{paper.venue} ({paper.year})</p>
                  <p className="text-sm text-[var(--fg)]/60 leading-relaxed">{paper.abstract}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="resume-section">
            <h2 className="resume-el text-xs font-medium uppercase tracking-widest text-[var(--fg)]/30 mb-6" style={{ fontFamily: 'var(--font-mono)', opacity: 0 }}>
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.filter((p) => p.featured).map((project) => (
                <div key={project.title} className="resume-el border border-[var(--fg)]/10 p-4" style={{ opacity: 0 }}>
                  <h3 className="font-semibold mb-1">{project.title}</h3>
                  <p className="text-sm text-[var(--fg)]/60 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-[10px] px-1.5 py-0.5 border border-[var(--fg)]/10 text-[var(--fg)]/40">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
