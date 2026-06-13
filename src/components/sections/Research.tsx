'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { research } from '@/lib/data';
import { PageHero } from '@/components/layout/PageHero';
import { ScrollProgressRail } from '@/components/ui/ScrollReveal';
import { EASE_OUT, fadeUp } from '@/lib/motion';
import { useSectionScroll } from '@/lib/useSectionScroll';

function PaperCard({ paper, index }: { paper: (typeof research.papers)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="group border-t border-[var(--border)] py-8 md:py-10"
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: index * 0.08 }}
    >
      <div className="md:grid md:grid-cols-[80px_1fr] md:gap-12">
        <span
          className="text-xs font-medium text-[var(--accent)] mb-3 md:mb-0 pt-1 uppercase tracking-wider block"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {paper.year}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span
                  className="text-[10px] font-medium text-[var(--fg-muted)] uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {paper.venueShort}
                </span>
                <span
                  className="text-[10px] text-[var(--accent-green)] uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  ● {paper.status}
                </span>
              </div>
              <Link
                href={`/research/${paper.slug}`}
                className="group/title inline-flex items-start gap-2 hover:text-[var(--accent)] transition-colors duration-300"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold tracking-tight leading-snug">
                  {paper.title}
                </h3>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 mt-1 text-[var(--fg-muted)]/30 group-hover/title:text-[var(--accent)] transition-colors duration-300"
                />
              </Link>
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
              className="shrink-0 text-xs font-medium text-[var(--accent)] hover:opacity-60 transition-opacity duration-300 uppercase tracking-wider mt-1"
              style={{ fontFamily: 'var(--font-mono)' }}
              aria-expanded={expanded}
            >
              {expanded ? 'Close —' : 'Abstract +'}
            </button>
          </div>

          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <div>
              <p className="text-sm text-[var(--fg-muted)] leading-relaxed mt-6 max-w-2xl">
                {paper.abstract}
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                {paper.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium text-[var(--fg-muted)] uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    #{tag.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-5">
                <Link
                  href={`/research/${paper.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:opacity-70 transition-opacity"
                >
                  View details →
                </Link>
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  External link →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const { heroY, contentY } = useSectionScroll(sectionRef);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="research" ref={sectionRef} className="relative bg-[var(--bg)]/40">
      <div className="section-container pb-24 md:pb-40 page-hero-space">
        <div className="md:grid md:grid-cols-[80px_1fr] md:gap-14">
          <ScrollProgressRail
            progress={progressScale}
            label={`${String(research.papers.length).padStart(2, '0')} papers`}
          />

          <div>
            <motion.div style={{ y: heroY }}>
              <PageHero
                number="04"
                label="Research"
                title={
                  <>
                    Published
                    <br />
                    <span className="text-[var(--accent)]">work.</span>
                  </>
                }
                subtitle="Peer-reviewed publications in misinformation detection, AI-powered code documentation, and multi-modal verification."
                className="mb-14 md:mb-20"
              />
            </motion.div>

            <motion.div className="border-b border-[var(--border)]" style={{ y: contentY }}>
              {research.papers.map((paper, i) => (
                <PaperCard key={paper.slug} paper={paper} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}