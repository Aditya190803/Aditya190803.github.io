"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { site } from "@/lib/data";
import { cn, initials } from "@/lib/utils";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Client work" },
  { href: "/#process", label: "Process" },
  { href: "/work", label: "Archive" },
  { href: "/research", label: "Research" },
];

function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: the theme still applies for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="grid h-10 w-10 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-ink"
    >
      <Sun size={17} className="hidden dark:block" />
      <Moon size={17} className="dark:hidden" />
    </button>
  );
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid h-8 w-8 place-items-center rounded-lg bg-ink font-display text-[13px] font-semibold tracking-tight text-bg",
        className,
      )}
    >
      {initials(site.brand)}
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const cta = site.bookingUrl
    ? { href: site.bookingUrl, label: "Book a call", external: true }
    : { href: "/#contact", label: "Start a project", external: false };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        open
          ? "border-line bg-bg"
          : scrolled
            ? "border-line bg-bg/85 backdrop-blur-xl"
            : "border-transparent",
      )}
    >
      <nav
        className="container-page flex h-16 items-center justify-between gap-4"
        aria-label="Main"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-[17px] font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <BrandMark />
          {site.brand}
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a
            href={cta.href}
            {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="hidden rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-accent-ink sm:inline-flex"
          >
            {cta.label}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-lg text-ink hover:bg-surface-2 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line lg:hidden">
          <ul className="container-page flex flex-col py-2">
            {links.map((l) => (
              <li key={l.href} className="border-b border-line last:border-0">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-2xl font-medium tracking-tight"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 pb-5 sm:hidden">
              <a
                href={cta.href}
                onClick={() => setOpen(false)}
                {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex w-full justify-center rounded-lg bg-ink px-5 py-3.5 text-[15px] font-medium text-bg"
              >
                {cta.label}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
