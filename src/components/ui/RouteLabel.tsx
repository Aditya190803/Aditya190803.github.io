'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function RouteLabel() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const path = pathname === '/' ? 'Home' : pathname.replace(/^\//, '').replace(/-/g, ' ');
    setLabel(path.charAt(0).toUpperCase() + path.slice(1));
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!label) return null;

  return (
    <div
      className="fixed bottom-8 left-8 z-50 pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <span
        className="text-[10px] font-medium uppercase tracking-widest text-[var(--fg)]/20"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </span>
    </div>
  );
}
