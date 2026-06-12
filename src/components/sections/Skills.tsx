'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';

const easeOut = [0.16, 1, 0.3, 1] as const;
const categories = Object.keys(skills) as (keyof typeof skills)[];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayedCategories = activeCategory
    ? categories.filter((c) => c === activeCategory)
    : categories;

  return (
    <section id="skills" className="relative bg-[var(--bg)]">
      {/* ── Header ─────────────────────────────────────── */}
      <div className="section-container pb-16 md:pb-20 pt-24 md:pt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <SectionHeader number="05" label="Skills" title="Skills & Tools" />
          <motion.p
            className="text-sm text-[var(--fg-muted)] max-w-xs leading-relaxed"
            style={{ fontFamily: 'var(--font-mono)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            The stack I reach for when turning ideas into systems.
          </motion.p>
        </div>
      </div>

      {/* ── Category filter ────────────────────────────── */}
      <div className="section-container">
        <motion.div
          className="flex flex-wrap gap-3 mb-16 border-b border-[var(--border)] pb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`relative px-4 py-2 text-xs font-medium uppercase tracking-widest transition-colors duration-200 ${
              activeCategory === null
                ? 'text-[var(--accent)]'
                : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
            }`}
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            All
            {activeCategory === null && (
              <motion.span
                layoutId="skill-filter"
                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--accent)]"
                transition={{ duration: 0.3, ease: easeOut }}
              />
            )}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
              className={`relative px-4 py-2 text-xs font-medium uppercase tracking-widest transition-colors duration-200 ${
                activeCategory === cat
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
              }`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {cat}
              {activeCategory === cat && (
                <motion.span
                  layoutId="skill-filter"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--accent)]"
                  transition={{ duration: 0.3, ease: easeOut }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Skill grid ─────────────────────────────── */}
      <div className="section-container pb-24 md:pb-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory ?? 'all'}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
              exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
            }}
            className="space-y-16 md:space-y-20"
          >
            {displayedCategories.map((cat, idx) => (
              <motion.div
                key={cat}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
                  exit: { opacity: 0, y: 15, transition: { duration: 0.3, ease: easeOut } },
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-6 mb-8">
                  <span
                    className="text-xs font-medium text-[var(--fg-muted)] uppercase tracking-widest"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold tracking-tight">
                    {cat}
                  </h2>
                  <div className="flex-1 h-px bg-[var(--border)]" />
                  <span
                    className="text-xs text-[var(--fg-muted)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {skills[cat].length} tools
                  </span>
                </div>

                {/* Skills as bordered cells */}
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-[var(--border)] border border-[var(--border)]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.03 } },
                  }}
                >
                  {skills[cat].map((skill) => (
                    <motion.div
                      key={skill}
                      className="bg-[var(--bg-card)] px-4 py-3 text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg)] transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-mono)' }}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
                      }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
