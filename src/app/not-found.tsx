'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageShell } from '@/components/layout/PageShell';
import { ScrollRule } from '@/components/ui/ScrollReveal';
import { EASE_OUT, REVEAL_VIEWPORT } from '@/lib/motion';

export default function NotFound() {
  return (
    <PageShell className="flex flex-col items-center justify-center p-4">
      <div className="section-container text-center page-hero-space">
        <motion.span
          className="text-xs font-medium text-[var(--fg)]/20 mb-6 block"
          style={{ fontFamily: 'var(--font-mono)' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.05 }}
        >
          Error 404
        </motion.span>

        <motion.h1
          className="font-display text-7xl md:text-9xl font-bold leading-[0.85] tracking-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
        >
          Page not
          <br />
          found
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-[var(--fg)]/50 max-w-md mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.18 }}
        >
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </motion.p>

        <ScrollRule className="max-w-xs mx-auto mb-10" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.28 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--fg)] text-sm font-medium hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all duration-300"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ← Back home
          </Link>
        </motion.div>
      </div>
    </PageShell>
  );
}