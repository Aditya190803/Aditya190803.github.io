'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { projects, type Project } from '@/lib/data';
import { useGsapHorizontalScroll } from '@/lib/gsap';

function slugify(title: string) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

function ScrollCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projects/${slugify(project.title)}`}
      className="group flex h-full w-[min(82vw,440px)] shrink-0 flex-col justify-between border border-[var(--border)] bg-[var(--bg-card)] p-7 md:p-10 transition-colors duration-300 hover:border-[var(--accent)] min-h-[380px]"
    >
      <div>
        <div className="mb-6 flex items-center justify-between">
          <span
            className="text-[11px] font-medium text-[var(--accent)]/70"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {String(index + 1).padStart(2, '0')} — {project.category}
          </span>
          {project.stats && (
            <span
              className="text-[10px] font-medium uppercase tracking-wider text-[var(--accent-green)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {project.stats}
            </span>
          )}
        </div>
        <h3 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight transition-colors duration-300 group-hover:text-[var(--accent)] md:text-4xl">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--fg-muted)] md:text-base">{project.description}</p>
      </div>

      <div className="mt-10 flex items-end justify-between">
        <div className="flex flex-wrap gap-3">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium text-[var(--fg-muted)]/60"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tech}
            </span>
          ))}
        </div>
        <ArrowUpRight
          size={22}
          strokeWidth={1.5}
          className="text-[var(--fg-muted)]/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
        />
      </div>
    </Link>
  );
}

/** Pinned horizontal scroll — home-style featured project strip (desktop only). */
export function FeaturedProjectsScroll() {
  const scope = useGsapHorizontalScroll<HTMLElement>();
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <section
        ref={scope}
        className="relative hidden h-[100dvh] overflow-hidden border-t border-[var(--border)] bg-[var(--bg)]/40 md:block"
        aria-label="Featured projects scroll gallery"
      >
        <div className="absolute left-0 top-28 z-10 section-container">
          <span
            className="section-number block text-[var(--fg-muted)]"
          >
            Featured — scroll →
          </span>
        </div>

        <div className="h-scroll-track h-full items-center gap-6 pl-[max(1.5rem,calc((100vw-1100px)/2+1.5rem))] pr-6 pt-24">
          {featured.map((project, i) => (
            <ScrollCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* Mobile / reduced-motion fallback — stacked cards */}
      <div className="border-t border-[var(--border)] bg-[var(--bg)]/40 md:hidden">
        <div className="section-container grid grid-cols-1 gap-6 py-16">
          {featured.map((project, i) => (
            <ScrollCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}