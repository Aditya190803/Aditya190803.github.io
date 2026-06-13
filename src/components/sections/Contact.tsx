'use client';

import { useRef, useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Github, Linkedin, FileText, ArrowUpRight } from 'lucide-react';
import { profile } from '@/lib/data';
import { PageHero } from '@/components/layout/PageHero';
import { EASE_OUT, fadeUp } from '@/lib/motion';
import { useSectionScroll } from '@/lib/useSectionScroll';

const socialLinks = [
  { name: 'GitHub', href: profile.github, icon: Github },
  { name: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
  { name: 'Resume', href: profile.resumeUrl, icon: FileText },
];

function ClipboardCopy({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="group inline-flex items-center gap-4 text-xl md:text-2xl font-medium text-[var(--fg)] hover:text-[var(--accent)] transition-colors duration-300"
      style={{ fontFamily: 'var(--font-mono)' }}
      aria-label={copied ? 'Copied!' : 'Copy email'}
    >
      <span className="relative">
        {text}
        <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
      </span>
      <span className="text-xs font-medium border border-[var(--border)] px-2.5 py-1 opacity-40 group-hover:opacity-100 group-hover:border-[var(--accent)] transition-all duration-300 uppercase tracking-wider">
        {copied ? '✓ Copied' : 'Copy'}
      </span>
    </button>
  );
}

function ContactForm() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    const data = new FormData();
    data.append('access_key', 'YOUR_ACCESS_KEY');
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);
    data.append('subject', `New Contact from ${formData.name}`);
    data.append('from_name', 'Portfolio Contact Form');
    data.append('replyto', formData.email);

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const result = await res.json();
      if (result.success) {
        setFormState('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  if (formState === 'success') {
    return (
      <motion.div
        className="p-8 md:p-10 border border-[var(--accent-green)]/30 bg-[var(--bg-card)] text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <p className="text-sm font-medium text-[var(--accent-green)] mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
          Message sent
        </p>
        <p className="text-[var(--fg-muted)]">Thanks for reaching out. I&apos;ll get back to you soon.</p>
        <button
          onClick={() => setFormState('idle')}
          className="mt-6 text-xs font-medium text-[var(--accent)] hover:opacity-70 transition-opacity uppercase tracking-wider"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Send another →
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-[11px] font-medium text-[var(--fg-muted)] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/40 focus:outline-none focus:border-[var(--accent)] transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[11px] font-medium text-[var(--fg-muted)] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/40 focus:outline-none focus:border-[var(--accent)] transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-[11px] font-medium text-[var(--fg-muted)] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]/40 focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
          placeholder="What are you working on?"
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] text-[var(--fg-muted)]/40" style={{ fontFamily: 'var(--font-mono)' }}>
          Powered by Web3Forms
        </p>
        <button
          type="submit"
          disabled={formState === 'submitting'}
          className="px-6 py-3 border border-[var(--fg)] text-sm font-medium hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {formState === 'submitting' ? 'Sending...' : formState === 'error' ? 'Try again →' : 'Send Message →'}
        </button>
      </div>
      {formState === 'error' && (
        <p className="text-xs text-[var(--accent)]">Something went wrong. Please check your connection or try again.</p>
      )}
    </form>
  );
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress, contentY, heroY } = useSectionScroll(sectionRef);
  const headingY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="contact" ref={sectionRef} className="relative bg-[var(--bg)]/40">
      <div className="section-container pb-32 md:pb-48 page-hero-space">
        <motion.div style={{ y: heroY }}>
          <motion.div style={{ y: headingY }}>
            <PageHero
              number="06"
              label="Contact"
              title={
                <>
                  Let&apos;s build
                  <br />
                  <span className="text-[var(--accent)]">something interesting.</span>
                </>
              }
              className="mb-16 md:mb-20"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-[1fr_360px] gap-16 md:gap-20"
          style={{ y: contentY }}
        >
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <ContactForm />
          </motion.div>

          <div className="space-y-10">
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
              <p className="text-xs text-[var(--fg-muted)] mb-3 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                Or email me directly
              </p>
              <ClipboardCopy text={profile.email} />
            </motion.div>

            <motion.div
              className="border border-[var(--border)] divide-y divide-[var(--border)]"
              initial="hidden"
              whileInView="visible"
              viewport={fadeUp.viewport}
              transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
            >
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.name}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
                    }}
                  >
                    <a
                      href={link.href}
                      target={link.href.startsWith('mailto') || link.href.startsWith('/') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 px-5 py-4 bg-[var(--bg-card)] hover:bg-[var(--bg)] transition-colors duration-300"
                    >
                      <span className="text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors duration-300">
                        <Icon size={16} strokeWidth={1.5} />
                      </span>
                      <span className="text-sm text-[var(--fg-muted)] group-hover:text-[var(--fg)] transition-colors flex-1" style={{ fontFamily: 'var(--font-mono)' }}>
                        {link.name}
                      </span>
                      <ArrowUpRight size={14} className="text-[var(--fg-muted)]/20 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </a>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}