'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experience } from '@/lib/data';
import { PageHero } from '@/components/layout/PageHero';
import { ScrollProgressRail } from '@/components/ui/ScrollReveal';
import { EASE_OUT, fadeUp } from '@/lib/motion';
import { useSectionScroll } from '@/lib/useSectionScroll';

function ExperienceEntry({
  exp,
  index,
}: {
  exp: (typeof experience)[number];
  index: number;
}) {
  return (
    <motion.article
      className="relative grid grid-cols-[auto_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-14 py-12 md:py-20 border-t border-[var(--border)]"
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: index * 0.08 }}
    >
      <span className="font-[family-name:var(--font-display)] text-4xl md:text-7xl font-bold leading-none text-[var(--accent)] select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div>
        <div
          className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] uppercase tracking-widest text-[var(--fg-muted)] mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span>{exp.period}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--fg-muted)]/40" aria-hidden="true" />
          <span>{exp.location}</span>
        </div>

        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95] mb-2">
          {exp.role}
        </h2>

        <p
          className="text-sm md:text-base text-[var(--accent)] font-medium mb-7"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {exp.company}
        </p>

        <div className="h-px bg-[var(--accent)]/40 mb-7 max-w-[420px]" />

        <ul className="space-y-3 max-w-2xl">
          {exp.highlights.map((h, j) => (
            <motion.li
              key={j}
              className="text-sm md:text-base text-[var(--fg-muted)] leading-relaxed flex gap-4"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 + j * 0.08 }}
            >
              <span className="mt-[0.5em] w-4 h-px bg-[var(--accent)]/50 shrink-0" aria-hidden="true" />
              {h}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { heroY, contentY } = useSectionScroll(sectionRef);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" ref={sectionRef} className="relative bg-[var(--bg)]/40">
      <div className="section-container pb-24 md:pb-40 page-hero-space">
        <motion.div className="pb-10 md:pb-16" style={{ y: heroY }}>
          <PageHero
            number="03"
            label="Experience"
            title={
              <>
                Experience
                <br />
                <span className="text-[var(--accent)]">so far.</span>
              </>
            }
            subtitle={`${experience.length} roles across ML research, generative AI, and full-stack engineering — from first internship to production systems.`}
          />
        </motion.div>

        <div className="md:grid md:grid-cols-[120px_1fr] md:gap-14">
          <ScrollProgressRail
            progress={progressScale}
            label={`${String(experience.length).padStart(2, '0')} roles`}
          />

          <motion.div className="border-b border-[var(--border)]" style={{ y: contentY }}>
            {experience.map((exp, i) => (
              <ExperienceEntry key={`${exp.company}-${exp.role}`} exp={exp} index={i} />
            ))}

            <motion.div
              className="pt-10"
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
            >
              <span
                className="text-xs text-[var(--fg-muted)]/40 uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                — More to come
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}