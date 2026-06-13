'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type MotionProps, type MotionValue } from 'framer-motion';
import { EASE_OUT, fadeUp, staggerChild, staggerContainer } from '@/lib/motion';
import { cn } from '@/lib/utils';

/* ── Simple scroll reveal ──────────────────────────────── */
interface RevealProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({ children, className, delay = 0, y = 24, ...rest }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ── Staggered children reveal ───────────────────────── */
const listVariants = {
  hidden: {},
  visible: {},
};

export function RevealStagger({
  children,
  className,
  stagger = 0.06,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Scroll-drawn horizontal rule ──────────────────────── */
export function ScrollRule({
  className,
}: {
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'start 40%'],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className={cn('h-px origin-left bg-[var(--accent)]/40', className)}
      style={{ scaleX }}
    />
  );
}

/* ── Element scroll parallax ───────────────────────────── */
export function Parallax({
  children,
  className,
  speed = 40,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ── Scroll-linked opacity emphasis (for index numbers) ── */
export function ScrollEmphasis({
  children,
  className,
  from = 0.15,
  to = 1,
  style,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 88%', 'start 38%'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [from, to]);

  return (
    <motion.span ref={ref} className={className} style={{ opacity, ...style }}>
      {children}
    </motion.span>
  );
}

/* ── Sticky vertical progress rail ─────────────────────── */
export function ScrollProgressRail({
  progress,
  label,
}: {
  progress: MotionValue<number>;
  label?: string;
}) {
  return (
    <div className="hidden md:block">
      <div className="sticky top-32">
        <div className="relative h-48 w-px bg-[var(--border)] ml-[1px]">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[var(--accent)] origin-top"
            style={{ height: '100%', scaleY: progress }}
          />
        </div>
        {label && (
          <span
            className="block mt-5 text-[11px] uppercase tracking-widest text-[var(--fg-muted)]/60"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

/* Re-export fadeUp for convenience */
export { fadeUp, staggerChild, staggerContainer };