'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: 'GitHub',   href: profile.github,              hint: 'Code' },
  { name: 'LinkedIn', href: profile.linkedin,            hint: 'Network' },
  { name: 'Email',    href: `mailto:${profile.email}`,  hint: 'Direct' },
  { name: 'Resume',   href: profile.resumeUrl,           hint: 'PDF' },
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
      className="group inline-flex items-center gap-4 text-xl md:text-2xl font-medium hover:opacity-50 transition-opacity duration-300"
      style={{ fontFamily: 'var(--font-mono)' }}
      aria-label={copied ? 'Copied!' : 'Copy email'}
    >
      <span>{text}</span>
      <span className="text-xs font-medium border border-[var(--fg)]/20 px-2.5 py-1 opacity-40 group-hover:opacity-100 transition-all duration-300 uppercase tracking-wider">
        {copied ? '✓ Copied' : 'Copy'}
      </span>
    </button>
  );
}

export function Contact() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const emailRef    = useRef<HTMLDivElement>(null);
  const socialsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mount: heading chars
    const chars = headingRef.current?.querySelectorAll<HTMLElement>('.char-reveal');
    if (chars) {
      if (rm) {
        chars.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; });
      } else {
        chars.forEach((c, i) => {
          setTimeout(() => {
            c.style.transition = 'opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)';
            c.style.opacity = '1';
            c.style.transform = 'translateY(0)';
          }, 150 + i * 30);
        });
      }
    }

    if (rm) {
      [emailRef, socialsRef].forEach(ref => {
        ref.current?.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
          el.style.opacity = '1'; el.style.transform = 'none';
        });
      });
      return;
    }

    const ctx = gsap.context(() => {
      if (emailRef.current) {
        gsap.fromTo(emailRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: emailRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }
      const links = socialsRef.current?.querySelectorAll('.social-link');
      if (links) {
        gsap.fromTo(links,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: socialsRef.current, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative bg-[var(--bg)]">
      <div className="section-container pb-32 md:pb-48">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="mb-6">
          <span className="gutter-number block mb-8">06 — Contact</span>
        </div>

        {/* ── Heading ────────────────────────────────────── */}
        <h1
          ref={headingRef}
          className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.9] tracking-tight max-w-4xl mb-16 md:mb-20"
        >
          {"Let's build".split('').map((c, i) => (
            <span key={`a${i}`} className="char-reveal" style={{ opacity: 0, transform: 'translateY(60px)' }}>
              {c === ' ' ? '\u00A0' : c}
            </span>
          ))}
          <br />
          <span className="block mt-2 md:mt-3">something interesting.</span>
        </h1>

        {/* ── Divider ────────────────────────────────────── */}
        <div className="h-px bg-[var(--fg)]/10 mb-12 md:mb-16" />

        {/* ── Email ──────────────────────────────────────── */}
        <div ref={emailRef} className="mb-14 md:mb-16" style={{ opacity: 0 }}>
          <p className="text-xs text-[var(--fg)]/30 mb-3 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
            Primary contact
          </p>
          <ClipboardCopy text={profile.email} />
        </div>

        {/* ── Social links ───────────────────────────────── */}
        <div ref={socialsRef} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--fg)]/10 border border-[var(--fg)]/10">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="social-link group flex flex-col justify-between p-6 md:p-8 bg-[var(--bg)] hover:bg-[var(--fg)]/[0.02] transition-colors duration-300"
              style={{ opacity: 0 }}
            >
              <span className="text-xs text-[var(--fg)]/25 mb-6 uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                {link.hint}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-lg font-display font-bold tracking-tight group-hover:opacity-50 transition-opacity duration-300">
                  {link.name}
                </span>
                <span className="text-[var(--fg)]/20 group-hover:text-[var(--fg)]/60 group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
