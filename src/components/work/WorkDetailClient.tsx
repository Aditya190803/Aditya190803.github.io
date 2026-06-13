'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/lib/data';
import { PageShell } from '@/components/layout/PageShell';
import { DetailHero } from '@/components/layout/DetailHero';
import { DetailSection, RevealItem } from '@/components/layout/DetailSection';
import { Reveal, RevealStagger } from '@/components/ui/ScrollReveal';
import { fadeUp } from '@/lib/motion';

export default function WorkDetailClient() {
  const params = useParams();
  const slug = (params?.slug as string) || '';

  const project = projects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, '-') === slug,
  );

  if (!project) {
    return (
      <PageShell className="flex items-center justify-center">
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
      </PageShell>
    );
  }

  const currentIdx = projects.indexOf(project);
  const nextProject = projects[currentIdx + 1] || projects[0];

  const problem = `The challenge: ${project.description} Existing solutions either lacked the specific integration required or were too complex for the target users.`;
  const approach = project.features.map((f, i) => ({
    step: String(i + 1).padStart(2, '0'),
    text: f,
  }));
  const result = project.stats
    ? `Shipped and validated in production — ${project.stats}.`
    : 'Successfully deployed and used in production with positive user feedback.';

  return (
    <PageShell>
      <DetailHero
        backHref="/projects"
        backLabel="Back to projects"
        eyebrow={
          <span className="text-xs font-medium text-[var(--fg-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
            {project.category}
          </span>
        }
        title={project.title}
        description={project.description}
        meta={
          <div className="flex flex-wrap items-center gap-6 text-sm border-t border-b border-[var(--border)] py-4">
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
          </div>
        }
      />

      <DetailSection number="01" label="Problem">
        <Reveal>
          <p className="text-xl md:text-2xl leading-relaxed text-[var(--fg)]/70 font-light">{problem}</p>
        </Reveal>
      </DetailSection>

      <DetailSection number="02" label="Approach" stagger>
        {approach.map((item) => (
          <RevealItem key={item.step}>
            <div className="flex items-start gap-6">
              <span
                className="text-xs font-medium text-[var(--fg-muted)]/30 shrink-0 w-8 text-right pt-1"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {item.step}
              </span>
              <p className="text-base md:text-lg text-[var(--fg)]/70 leading-relaxed">{item.text}</p>
            </div>
          </RevealItem>
        ))}
      </DetailSection>

      <DetailSection number="03" label="Result">
        <Reveal>
          <p className="text-xl md:text-2xl leading-relaxed text-[var(--fg)]/70 font-light mb-8">{result}</p>
        </Reveal>
        {project.lessonsLearned && (
          <Reveal delay={0.1}>
            <div className="p-6 border border-[var(--border)] bg-[var(--bg-card)]">
              <h3 className="text-xs font-medium uppercase tracking-widest text-[var(--fg-muted)] mb-3">
                Key Takeaway
              </h3>
              <p className="text-sm text-[var(--fg)]/60 leading-relaxed italic">
                &ldquo;{project.lessonsLearned}&rdquo;
              </p>
            </div>
          </Reveal>
        )}
      </DetailSection>

      <DetailSection number="04" label="Stack">
        <RevealStagger className="flex flex-wrap gap-x-8 gap-y-3">
          {project.technologies.map((tech) => (
            <RevealItem key={tech}>
              <span
                className="text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {tech}
              </span>
            </RevealItem>
          ))}
        </RevealStagger>
      </DetailSection>

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

      <Reveal y={32}>
        <section className="border-t border-[var(--border)]">
          <Link
            href={`/projects/${nextProject.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="block group relative overflow-hidden"
          >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[var(--fg)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
          <div className="section-container relative py-14 md:py-20">
            <div className="flex items-center justify-between gap-8">
              <div className="min-w-0">
                <span
                  className="text-[11px] font-medium uppercase tracking-widest text-[var(--fg-muted)] group-hover:text-[var(--bg)]/60 transition-colors duration-500"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Next project — {String(currentIdx + 2 > projects.length ? 1 : currentIdx + 2).padStart(2, '0')}
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-3 truncate group-hover:text-[var(--bg)] transition-colors duration-500">
                  {nextProject.title}
                </h2>
                <p className="hidden md:block text-sm text-[var(--fg-muted)] mt-3 max-w-md group-hover:text-[var(--bg)]/70 transition-colors duration-500 truncate">
                  {nextProject.description}
                </p>
              </div>
              <span className="shrink-0 grid place-items-center w-14 h-14 md:w-20 md:h-20 border border-[var(--fg)] group-hover:border-[var(--bg)] transition-colors duration-500">
                <ArrowRight
                  size={26}
                  strokeWidth={1.5}
                  className="text-[var(--fg)] group-hover:text-[var(--bg)] group-hover:translate-x-1 transition-all duration-500"
                />
              </span>
            </div>
          </div>
          </Link>
        </section>
      </Reveal>
    </PageShell>
  );
}