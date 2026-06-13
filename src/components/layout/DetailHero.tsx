'use client';

import { useRef, type ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EASE_OUT, fadeUp } from '@/lib/motion';
import { useSectionScroll } from '@/lib/useSectionScroll';

interface DetailHeroProps {
  backHref: string;
  backLabel: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: string;
  meta?: ReactNode;
}

/** Detail-page hero with home-style section parallax. */
export function DetailHero({
  backHref,
  backLabel,
  eyebrow,
  title,
  description,
  meta,
}: DetailHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { heroY } = useSectionScroll(sectionRef);

  return (
    <section ref={sectionRef} className="page-hero-space pb-16 md:pb-24 border-b border-[var(--border)] bg-[var(--bg)]/40">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={fadeUp.viewport}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors duration-300 mb-8"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ← {backLabel}
          </Link>
        </motion.div>

        <motion.div className="max-w-3xl" style={{ y: heroY }}>
          {eyebrow && (
            <motion.div
              className="mb-4"
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.08 }}
            >
              {eyebrow}
            </motion.div>
          )}

          <motion.h1
            className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-6"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.12 }}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              className="text-lg md:text-xl leading-relaxed text-[var(--fg-muted)] mb-8"
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
            >
              {description}
            </motion.p>
          )}

          {meta && (
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.28 }}
            >
              {meta}
            </motion.div>
          )}

          <motion.div
            className="h-[2px] mt-8 max-w-sm origin-left bg-[var(--accent)]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={fadeUp.viewport}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.35 }}
          />
        </motion.div>
      </div>
    </section>
  );
}