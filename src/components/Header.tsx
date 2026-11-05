"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile, site } from "@/lib/data";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#flier", label: "Flier" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3 font-medium tracking-tight text-ink" aria-label={`${profile.name}, back to top`}>
      <span aria-hidden className="relative block size-7 rounded-[6px] bg-accent">
        <span className="absolute bottom-[5px] right-[5px] size-2.5 rounded-full bg-white" />
      </span>
      <span className="whitespace-nowrap text-[17px]">{profile.name}</span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Highlight the section in view (no scroll listeners; IntersectionObserver only)
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ground">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <div className="wrap flex h-[var(--nav)] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative py-2 text-[15px] font-medium transition-colors duration-200 hover:text-ink ${
                      isActive ? "text-accent" : "text-muted"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 -bottom-0.5 h-px bg-accent transition-transform duration-200 origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn btn--primary hidden sm:inline-flex !min-h-10 !px-5 text-[15px]">
            {site.cta}
          </a>
          <button
            ref={buttonRef}
            type="button"
            className="grid size-11 place-items-center rounded-sm border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="sheet fixed inset-x-0 bottom-0 top-[var(--nav)] z-40 overflow-y-auto bg-ground lg:hidden"
        data-open={open}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile" className="wrap py-6">
          <ul className="rows">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex h-14 items-center text-xl font-medium text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn--primary mt-8 w-full">
            {site.cta}
          </a>
          <p className="t-small muted mt-6">
            Or email <a className="link" href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </nav>
      </div>
    </header>
  );
}
