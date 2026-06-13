'use client';

import { useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { useSectionScroll } from '@/lib/useSectionScroll';

interface DetailSectionProps {
  number: string;
  label: string;
  children: ReactNode;
  stagger?: boolean;
}

/** Case-study section with home-style scroll parallax + fade-up reveals. */
export function DetailSection({ number, label, children, stagger = false }: DetailSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { contentY } = useSectionScroll(ref);

  return (
    <section ref={ref} className="py-16 md:py-24 border-t border-[var(--border)] bg-[var(--bg)]/40">
      <div className="section-container">
        <div className="max-w-3xl">
          <motion.span
            className="text-xs font-medium uppercase tracking-widest text-[var(--fg-muted)] mb-6 block"
            style={{ fontFamily: 'var(--font-mono)' }}
            {...fadeUp}
          >
            {number} / {label}
          </motion.span>

          <motion.div
            className="h-[2px] mb-8 max-w-[240px] origin-left bg-[var(--accent)]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={fadeUp.viewport}
            transition={{ duration: 0.8, ease: fadeUp.transition.ease, delay: 0.1 }}
          />

          <motion.div
            style={{ y: contentY }}
            initial={stagger ? 'hidden' : undefined}
            whileInView={stagger ? 'visible' : undefined}
            viewport={stagger ? fadeUp.viewport : undefined}
            transition={stagger ? { staggerChildren: 0.08 } : undefined}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: fadeUp.transition.ease } },
      }}
    >
      {children}
    </motion.div>
  );
}