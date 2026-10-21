"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { profile } from "@/lib/data";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
];

type LenisLike = { stop(): void; start(): void; scrollTo(target: string, opts?: { offset?: number }): void };
const getLenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    document.body.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const lenis = getLenis();
    lenis?.start();
    if (lenis) lenis.scrollTo(href, { offset: -72 });
    else document.querySelector(href)?.scrollIntoView();
    history.replaceState(null, "", href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
        scrolled && !open ? "bg-paper/85 shadow-[0_1px_0_var(--rule)] backdrop-blur-md" : ""
      }`}
    >
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="title relative z-10 text-[1.6rem] leading-none" onClick={() => setOpen(false)}>
          Aditya Mer
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="link text-[0.95rem] text-ink-2 hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn btn-primary hidden !min-h-11 !px-5 text-[0.95rem] sm:inline-flex">
            Contact
          </a>
          <button
            type="button"
            className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-rule md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-paper transition-[clip-path] duration-700 ease-[var(--ease-out)] md:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile" className="wrap flex h-full flex-col justify-between pb-10 pt-28">
          <ul className="space-y-1">
            {[...nav, { href: "#contact", label: "Contact" }].map((item, i) => (
              <li
                key={item.href}
                className="transition-[opacity,transform] duration-700 ease-[var(--ease-out)]"
                style={{
                  transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(1.5rem)",
                }}
              >
                <a href={item.href} className="display block py-1 text-[3.25rem]" onClick={(e) => goTo(e, item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="space-y-2 text-ink-2">
            <a href={`mailto:${profile.email}`} className="link-static block text-lg text-ink">
              {profile.email}
            </a>
            <p>{profile.location}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
