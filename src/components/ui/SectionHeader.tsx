'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  label: string;
  title?: string;
  subtitle?: string;
}

export function SectionHeader({ number, label, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-14 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="section-number block mb-4">
          {number} / {label}
        </span>

        {title && (
          <h2
            className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.95]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="text-base md:text-lg text-[var(--fg-muted)] mt-4 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Accent underline draw-in */}
      <motion.div
        className="h-[2px] mt-6 origin-left"
        style={{ backgroundColor: 'var(--accent)' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
    </div>
  );
}
