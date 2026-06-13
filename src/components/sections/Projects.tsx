'use client';

import { useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects } from '@/lib/data';
import { PageHero } from '@/components/layout/PageHero';
import { ScrollProgressRail } from '@/components/ui/ScrollReveal';
import { EASE_OUT, fadeUp } from '@/lib/motion';
import { useSectionScroll } from '@/lib/useSectionScroll';

function slugify(title: string) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

const categories = [
  'All',
  ...Array.from(new Set(projects.map((p) => p.category))).sort(),
];

function ProjectEntry({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const detailHref = `/projects/${slugify(project.title)}`;

  return (
    <motion.article
      className="group border-t border-[var(--border)] py-12 md:py-16"
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: index * 0.06 }}
    >
      <div className="grid grid-cols-[auto_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-14">
        <span className="font-[family-name:var(--font-display)] text-4xl md:text-7xl font-bold leading-none text-[var(--accent)] select-none">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="min-w-0">
          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-widest text-[var(--fg-muted)] mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span>{project.category}</span>
            {project.featured && (
              <>
                <span className="w-1 h-1 rounded-full bg-[var(--fg-muted)]/40" aria-hidden="true" />
                <span className="text-[var(--accent)]">Featured</span>
              </>
            )}
            {project.stats && (
              <>
                <span className="w-1 h-1 rounded-full bg-[var(--fg-muted)]/40" aria-hidden="true" />
                <span className="text-[var(--accent-green)]">{project.stats}</span>
              </>
            )}
          </div>

          <Link
            href={detailHref}
            className="inline-flex items-start gap-3 text-[var(--fg)] hover:text-[var(--accent)] transition-colors duration-300"
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]">
              {project.title}
            </h2>
            <ArrowUpRight
              size={22}
              strokeWidth={1.5}
              className="shrink-0 mt-2 md:mt-3 text-[var(--fg-muted)]/30 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
            />
          </Link>

          <p className="text-sm md:text-base text-[var(--fg-muted)] leading-relaxed mt-5 max-w-2xl">
            {project.description}
          </p>

          <div className="h-px bg-[var(--accent)]/40 my-6 max-w-[420px]" />

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium text-[var(--fg-muted)]/60"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                GitHub <ExternalLink size={11} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Live demo <ExternalLink size={11} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [active, setActive] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const { heroY, contentY } = useSectionScroll(sectionRef);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const filtered = useMemo(
    () => projects.filter((p) => active === 'All' || p.category === active),
    [active],
  );

  return (
    <section id="projects" ref={sectionRef} className="relative bg-[var(--bg)]/40">
      <div className="section-container pb-24 md:pb-40 page-hero-space">
        <motion.div className="pb-10 md:pb-16" style={{ y: heroY }}>
          <PageHero
            number="02"
            label="Projects"
            title={
              <>
                Selected
                <br />
                <span className="text-[var(--accent)]">work.</span>
              </>
            }
            subtitle="Generative AI, machine learning, and full-stack systems — from research prototypes to production deployments."
          />
        </motion.div>

        <div className="md:grid md:grid-cols-[80px_1fr] md:gap-14">
          <ScrollProgressRail
            progress={progressScale}
            label={`${String(projects.length).padStart(2, '0')} projects`}
          />

          <div>
            <motion.div
              className="flex flex-col gap-4 pb-8"
              style={{ y: contentY }}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className={`relative px-4 py-2 text-xs font-medium transition-colors duration-200 ${
                      active === cat
                        ? 'text-[var(--accent)]'
                        : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
                    }`}
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {cat}
                    {active === cat && (
                      <motion.span
                        layoutId="project-filter"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--accent)]"
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <span
                className="text-[11px] text-[var(--fg-muted)]/50 uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {filtered.length} of {projects.length} shown
              </span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="border-b border-[var(--border)]"
              >
                {filtered.map((project, i) => (
                  <ProjectEntry key={project.title} project={project} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}