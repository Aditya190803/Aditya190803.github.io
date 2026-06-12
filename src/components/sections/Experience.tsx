'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experience } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" ref={sectionRef} className="relative bg-[var(--bg)]">
      <div className="section-container pb-24 md:pb-40">
        <SectionHeader number="03" label="Experience" title="Where I've Worked" />

        {/* ── Timeline ───────────────────────────────────── */}
        <div className="relative">
          {/* Vertical accent line */}
          <div className="absolute left-0 md:left-[100px] top-0 bottom-0 w-[1px] bg-[var(--border)] hidden md:block">
            <motion.div
              className="w-full bg-[var(--accent)] origin-top"
              style={{ height: '100%', scaleY: lineScale }}
            />
          </div>

          {/* Experience items */}
          <div className="space-y-0">
            {experience.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.role}`}
                className="group border-t border-[var(--border)] py-10 md:py-14 md:grid md:grid-cols-[200px_1fr] md:gap-16"
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: easeOut, delay: i * 0.06 }}
              >
                {/* Left: meta */}
                <div className="mb-4 md:mb-0">
                  <span
                    className="text-xs font-medium text-[var(--fg-muted)] block mb-2 uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="text-xs text-[var(--fg-muted)] block leading-relaxed"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {exp.period}
                  </span>
                  <span
                    className="text-xs text-[var(--fg-muted)]/60 block mt-1"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {exp.location}
                  </span>
                </div>

                {/* Right: content */}
                <div>
                  <div className="mb-5">
                    <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold tracking-tight mb-1 group-hover:opacity-60 transition-opacity duration-300">
                      {exp.role}
                    </h2>
                    <p className="text-sm text-[var(--accent)] font-medium">{exp.company}</p>
                  </div>

                  <motion.div
                    className="h-px bg-[var(--border)] mb-6 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
                  />

                  <ul className="space-y-2.5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-sm text-[var(--fg-muted)] leading-relaxed flex gap-3">
                        <span className="mt-[0.45em] w-1 h-1 rounded-full bg-[var(--fg-muted)]/30 shrink-0" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}

            {/* End marker */}
            <motion.div
              className="border-t border-[var(--border)] pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <span className="text-xs text-[var(--fg-muted)]/40 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                — More to come
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
