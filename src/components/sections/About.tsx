'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { profile } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';

const easeOut = [0.16, 1, 0.3, 1] as const;

/* ── Animated Counter ──────────────────────────────────── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const pillars = [
  { num: '01', title: 'Machine Learning', desc: 'Building production-grade ML systems from data pipeline to deployed model.' },
  { num: '02', title: 'Generative AI', desc: 'LLM applications, multi-agent RAG systems, and fine-tuning at scale.' },
  { num: '03', title: 'Research', desc: 'Published work in NLP, misinformation detection, and AI automation.' },
  { num: '04', title: 'Full Stack', desc: 'React, Next.js, and modern cloud infrastructure for complete AI products.' },
];

export function About() {
  return (
    <section id="about" className="relative bg-[var(--bg)]">
      <div className="section-container w-full pb-24 md:pb-40">

        <SectionHeader number="01" label="About" title="ML Engineer & Builder" />

        {/* ── Stats ─────────────────────────────────────── */}
        <motion.div
          className="flex gap-12 md:gap-20 mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {[
            { value: 4, label: 'Internships' },
            { value: 10, label: 'Projects' },
            { value: 2, label: 'Publications' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
              }}
            >
              <span className="text-4xl md:text-5xl font-bold block leading-none" style={{ fontFamily: 'var(--font-mono)' }}>
                <Counter target={stat.value} suffix="+" />
              </span>
              <span className="text-xs font-medium text-[var(--fg-muted)] mt-2 block uppercase tracking-widest">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Divider ───────────────────────────────────── */}
        <motion.div
          className="h-px bg-[var(--border)] mb-12 md:mb-16 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: easeOut }}
        />

        {/* ── Bio ───────────────────────────────────────── */}
        <motion.p
          className="text-lg md:text-xl leading-relaxed text-[var(--fg-muted)] max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          {profile.bio}
        </motion.p>

        {/* ── Pillars ───────────────────────────────────── */}
        <motion.div
          className="grid md:grid-cols-2 gap-px bg-[var(--border)] mt-20 md:mt-28 border-t border-[var(--border)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {pillars.map((p) => (
            <motion.div
              key={p.num}
              className="pillar-card py-10 md:py-14 px-6 md:px-10 bg-[var(--bg-card)]"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
              }}
            >
              <span className="text-xs font-medium text-[var(--fg-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                {p.num}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold mt-3 mb-3">{p.title}</h3>
              <motion.div
                className="h-px bg-[var(--border)] mb-4 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
              />
              <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
