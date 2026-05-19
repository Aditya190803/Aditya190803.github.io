'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { name: 'Work', href: '/work' },
  { name: 'Experience', href: '/experience' },
  { name: 'Research', href: '/research' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setLoaded(true), rm ? 0 : 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
          scrolled
            ? 'bg-[var(--bg)]/85 backdrop-blur-xl border-b border-[var(--fg)]/5'
            : 'bg-transparent',
        )}
        style={{
          transform: loaded ? 'translateY(0)' : 'translateY(-100%)',
          opacity: loaded ? 1 : 0,
          transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease, background-color 0.5s ease',
        }}
      >
        <div className="section-container flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="text-sm font-medium tracking-tight gradient-text hover:opacity-80 transition-opacity duration-300"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Aditya Mer
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link, i) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-all duration-300 relative group',
                    isActive ? 'text-[var(--accent)]' : 'text-[var(--fg-muted)] hover:text-[var(--fg)]',
                  )}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? 'translateY(0)' : 'translateY(-8px)',
                    transition: `opacity 0.4s ease ${0.5 + i * 0.06}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${0.5 + i * 0.06}s, color 0.3s ease`,
                  }}
                >
                  {link.name}
                  <span className={cn(
                    'absolute -bottom-1 left-0 h-[1px] bg-[var(--accent)] transition-all duration-300',
                    isActive ? 'w-full' : 'w-0 group-hover:w-full',
                  )} />
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={cn('block w-6 h-[1px] bg-[var(--fg)] transition-all duration-300', mobileOpen && 'rotate-45 translate-y-[3px]')} />
            <span className={cn('block w-6 h-[1px] bg-[var(--fg)] transition-all duration-300', mobileOpen && 'opacity-0')} />
            <span className={cn('block w-6 h-[1px] bg-[var(--fg)] transition-all duration-300', mobileOpen && '-rotate-45 -translate-y-[3px]')} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-[var(--bg)]/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-700',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        <nav className="flex flex-col items-center gap-10">
          {links.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-3xl font-medium tracking-tight text-[var(--fg-muted)] hover:text-[var(--accent)] transition-all duration-500"
              style={{
                fontFamily: 'var(--font-mono)',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: mobileOpen ? `${i * 0.08}s` : '0s',
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
