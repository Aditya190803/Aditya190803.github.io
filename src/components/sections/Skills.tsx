'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { skills } from '@/lib/data';
import { PageHero } from '@/components/layout/PageHero';
import { ScrollProgressRail } from '@/components/ui/ScrollReveal';
import { EASE_OUT, fadeUp, staggerChild, staggerContainer } from '@/lib/motion';
import { useSectionScroll } from '@/lib/useSectionScroll';

const categories = Object.keys(skills) as (keyof typeof skills)[];

function SkillCategory({
  cat,
  idx,
}: {
  cat: keyof typeof skills;
  idx: number;
}) {
  return (
    <motion.div
      className="group grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-12 gap-y-5 border-b border-[var(--border)] py-10 md:py-14"
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: idx * 0.06 }}
    >
      <div className="flex items-baseline gap-5 md:w-[300px]">
        <span
          className="text-xs font-medium text-[var(--accent)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {String(idx + 1).padStart(2, '0')}
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-4xl font-bold tracking-tight group-hover:text-[var(--accent)] transition-colors duration-300">
          {cat}
        </h2>
      </div>

      <motion.div
        className="flex flex-wrap items-baseline gap-x-8 gap-y-3"
        {...staggerContainer}
      >
        {skills[cat].map((skill) => (
          <motion.span
            key={skill}
            className="text-base md:text-lg text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-mono)' }}
            {...staggerChild}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { heroY, contentY } = useSectionScroll(sectionRef);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="skills" ref={sectionRef} className="relative bg-[var(--bg)]/40">
      <div className="section-container pb-24 md:pb-40 page-hero-space">
        <div className="md:grid md:grid-cols-[80px_1fr] md:gap-14">
          <ScrollProgressRail
            progress={progressScale}
            label={`${String(categories.length).padStart(2, '0')} areas`}
          />

          <div>
            <motion.div
              className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16"
              style={{ y: heroY }}
            >
              <PageHero
                number="05"
                label="Skills"
                title={
                  <>
                    Skills &
                    <br />
                    <span className="text-[var(--accent)]">tools.</span>
                  </>
                }
              />
              <motion.p
                className="text-sm text-[var(--fg-muted)] max-w-xs leading-relaxed"
                style={{ fontFamily: 'var(--font-mono)' }}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.2 }}
              >
                The stack I reach for when turning ideas into systems.
              </motion.p>
            </motion.div>

            <motion.div className="border-t border-[var(--border)]" style={{ y: contentY }}>
              {categories.map((cat, idx) => (
                <SkillCategory key={cat} cat={cat} idx={idx} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}