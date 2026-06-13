import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Consistent page wrapper — same bg, z-index, and top offset on every route. */
export function PageShell({
  children,
  className,
  offsetNav = true,
}: {
  children: ReactNode;
  className?: string;
  /** Reserve space for the fixed navbar. Disable on the home hero. */
  offsetNav?: boolean;
}) {
  return (
    <main
      className={cn(
        'min-h-screen relative z-10 bg-[var(--bg)]/40',
        offsetNav && 'page-shell-offset',
        className,
      )}
    >
      {children}
    </main>
  );
}