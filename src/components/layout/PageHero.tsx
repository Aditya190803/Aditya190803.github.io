'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT, fadeUp } from '@/lib/motion';

interface PageHeroProps {
  number: string;
  label: string;
  title: ReactNode;
  subtitle?: string;
  className?: string;
}

/** Editorial page masthead — entrance reveal (parallax applied by parent section). */
export function PageHero({ number, label, title, subtitle, className }: PageHeroProps) {
  return (
    <div className={className}>
      <motion.span
        className="section-number block mb-4"
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.05 }}
      >
        {number} / {label}
      </motion.span>

      <motion.h1
        className="font-[family-name:var(--font-display)] font-bold tracking-tight leading-[0.9]"
        style={{ fontSize: 'clamp(2.75rem, 7vw, 6rem)' }}
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.1 }}
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          className="text-base md:text-lg text-[var(--fg-muted)] mt-6 max-w-xl leading-relaxed"
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.18 }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        className="h-[2px] mt-8 max-w-md origin-left bg-[var(--accent)]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={fadeUp.viewport}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.28 }}
      />
    </div>
  );
}