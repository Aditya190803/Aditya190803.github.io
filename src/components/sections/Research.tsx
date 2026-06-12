'use client';

import { useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { research } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';

const easeOut = [0.16, 1, 0.3, 1] as const;

/* ── Animated Counter ──────────────────────────────────── */
function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [val, setVal] = useState(0);

  useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target);
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useState(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  });

  return <span ref={ref}>{val}</span>;
}

function PaperCard({ paper, index }: { paper: (typeof research.papers)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="group border-t border-[var(--border)] py-8 md:py-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: easeOut, delay: index * 0.05 }}
    >
      <div className="md:grid md:grid-cols-[80px_1fr] md:gap-12">
        {/* Year */}
        <div className="text-xs font-medium text-[var(--fg-muted)] mb-3 md:mb-0 pt-1 uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
          {paper.year}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-[10px] font-medium text-[var(--fg-muted)] uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                  {paper.venueShort}
                </span>
                <span className="text-[10px] px-2 py-0.5 border border-[var(--border)] text-[var(--fg-muted)] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                  {paper.status}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold tracking-tight leading-snug">
                {paper.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {paper.authors.map((a) => (
                  <a
                    key={a.name}
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[var(--accent)] hover:opacity-70 transition-opacity duration-200"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {a.name}
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="shrink-0 text-xs font-medium hover:opacity-50 transition-opacity duration-300 border border-[var(--border)] px-3 py-1.5 uppercase tracking-wider mt-1"
              style={{ fontFamily: 'var(--font-mono)' }}
              aria-expanded={expanded}
            >
              {expanded ? 'Close' : 'Abstract'}
            </button>
          </div>

          {/* Expandable abstract */}
          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <div>
              <p className="text-sm text-[var(--fg-muted)] leading-relaxed mt-6 max-w-2xl">{paper.abstract}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {paper.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2 py-1 border border-[var(--accent-green)]/20 text-[var(--accent-green)] uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] mt-5 hover:opacity-70 transition-opacity"
              >
                Read paper →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function Research() {
  return (
    <section id="research" className="relative bg-[var(--bg)]">
      <div className="section-container pb-24 md:pb-40 pt-24 md:pt-32">
        <SectionHeader
          number="04"
          label="Research"
          title="Published Work"
          subtitle="Peer-reviewed publications in misinformation detection, AI-powered code documentation, and multi-modal verification."
        />

        {/* ── Papers list ────────────────────────────────── */}
        <div className="border-b border-[var(--border)]">
          {research.papers.map((paper, i) => (
            <PaperCard key={i} paper={paper} index={i} />
          ))}
        </div>

        {/* ── Stats ──────────────────────────────────────── */}
        <motion.div
          className="mt-12 md:mt-16 flex gap-12 md:gap-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          {[
            { value: research.papers.filter(p => p.status === 'Published').length, label: 'Published' },
            { value: research.papers.reduce((acc, p) => acc + p.authors.length, 0), label: 'Co-authors' },
          ].map(stat => (
            <div key={stat.label}>
              <span className="text-3xl md:text-4xl font-bold block leading-none" style={{ fontFamily: 'var(--font-mono)' }}>
                <Counter target={stat.value} />
              </span>
              <span className="text-xs text-[var(--fg-muted)] mt-2 block uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
