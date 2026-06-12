'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';

const easeOut = [0.16, 1, 0.3, 1] as const;
const categories = ['All', 'GenAI', 'ML', 'Research', 'Web'];

export function Projects() {
  const [active, setActive] = useState('All');

  const filtered = projects.filter(
    (p) => active === 'All' || p.category === active,
  );

  return (
    <section id="projects" className="pb-24 md:pb-32 bg-[var(--bg)]">
      <div className="section-container mb-16 pt-24 md:pt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <SectionHeader number="02" label="Selected Projects" />

          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
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
                    transition={{ duration: 0.3, ease: easeOut }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="section-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
              exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
            }}
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
                  exit: { opacity: 0, y: 10, transition: { duration: 0.25, ease: easeOut } },
                }}
              >
                <Link
                  href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group block border-t border-[var(--border)] transition-colors duration-200"
                >
                  <div className="py-8 md:py-10 md:grid md:grid-cols-[80px_1fr_60px] md:gap-8 items-start">
                    {/* Number */}
                    <span
                      className="text-xs font-medium text-[var(--fg-muted)]/30 mb-2 md:mb-0 pt-1 block"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Content */}
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span
                          className="text-[10px] font-medium text-[var(--fg-muted)] uppercase tracking-widest"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {project.category}
                        </span>
                        {project.stats && (
                          <span
                            className="text-[10px] font-medium text-[var(--accent-green)] uppercase tracking-wider"
                            style={{ fontFamily: 'var(--font-mono)' }}
                          >
                            {project.stats}
                          </span>
                        )}
                      </div>

                      <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold tracking-tight mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-sm text-[var(--fg-muted)] leading-relaxed max-w-2xl mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex flex-wrap gap-3">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] font-medium text-[var(--fg-muted)]/50"
                              style={{ fontFamily: 'var(--font-mono)' }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-4 ml-auto md:ml-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-[11px] text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                              style={{ fontFamily: 'var(--font-mono)' }}
                            >
                              GitHub <ExternalLink size={10} />
                            </a>
                          )}
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-[11px] text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                              style={{ fontFamily: 'var(--font-mono)' }}
                            >
                              Demo <ExternalLink size={10} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex items-start justify-end pt-1">
                      <span className="text-[var(--fg-muted)]/20 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                        <ArrowUpRight size={20} strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            <div className="border-t border-[var(--border)]" />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
