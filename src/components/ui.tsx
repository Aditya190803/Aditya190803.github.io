"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl mb-12 md:mb-16", className)}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="display text-4xl sm:text-5xl md:text-6xl text-balance">{title}</h2>
      {lede && <p className="mt-5 text-lg text-muted leading-relaxed text-pretty">{lede}</p>}
    </Reveal>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors";

export const buttonStyles = {
  primary: cn(buttonBase, "bg-ink text-bg hover:bg-accent hover:text-accent-ink"),
  secondary: cn(buttonBase, "border border-line-strong text-ink hover:border-ink"),
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
        "group inline-flex items-center gap-1 text-sm font-medium text-ink underline-offset-4 hover:underline",
        className
      )}
    >
      {children}
      <ArrowUpRight
        size={15}
        className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
      />
    </a>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
      {children}
    </span>
  );
}
