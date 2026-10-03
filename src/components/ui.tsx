"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

/**
 * Section opener: a mono label in the left rail, the heading on the right.
 * The same 12-column split is reused by section bodies so content lines up.
 */
export function SectionHeading({
  label,
  title,
  lede,
  className,
  children,
}: {
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className={cn("mb-12 grid gap-5 md:mb-16 lg:grid-cols-12 lg:gap-8", className)}>
      <p className="label flex items-center gap-2 self-start lg:col-span-3 lg:pt-4">
        <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
        {label}
      </p>
      <div className="lg:col-span-9">
        <h2 className="display max-w-4xl text-[2.5rem] text-balance sm:text-5xl md:text-6xl">
          {title}
        </h2>
        {lede && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{lede}</p>
        )}
        {children}
      </div>
    </Reveal>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[15px] font-medium transition-colors duration-200";

export const buttonStyles = {
  primary: cn(buttonBase, "bg-ink text-bg hover:bg-accent hover:text-accent-ink"),
  secondary: cn(buttonBase, "border border-line-strong bg-surface text-ink hover:border-ink"),
};

export function ButtonLink({
  href,
  variant = "primary",
  external,
  children,
  className,
}: {
  href: string;
  variant?: keyof typeof buttonStyles;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const cls = cn(buttonStyles[variant], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/**
 * The site's main call to action. "Book a call" once `site.bookingUrl` is set,
 * otherwise a link to the inquiry form.
 */
export function PrimaryCta({ className }: { className?: string }) {
  if (site.bookingUrl) {
    return (
      <ButtonLink href={site.bookingUrl} external className={className}>
        <CalendarDays size={16} aria-hidden="true" />
        Book a call
      </ButtonLink>
    );
  }
  return (
    <ButtonLink href="/#contact" className={className}>
      Start a project
      <ArrowRight size={16} aria-hidden="true" />
    </ButtonLink>
  );
}

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-1 text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        size={15}
        aria-hidden="true"
        className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
      />
    </a>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-surface-2 px-2 py-1 font-mono text-[11px] leading-none text-muted">
      {children}
    </span>
  );
}

/** Green "live" dot with a soft pulse. */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)} aria-hidden="true">
      <span className="pulse-ring absolute inset-0 rounded-full bg-live" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
    </span>
  );
}
