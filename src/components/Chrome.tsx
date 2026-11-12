"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Brand } from "./Site";

const NAV = [
  { href: "/#work", label: "Work", match: "/#work" },
  { href: "/projects", label: "Projects", match: "/projects" },
  { href: "/research", label: "Research", match: "/research" },
  { href: "/resume", label: "Résumé", match: "/resume" },
];

export function Header() {
  const path = usePathname();
  return (
    <header className="hdr">
      <div className="frame hdr-in">
        <Brand />
        <nav className="nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path === n.match ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn-ink btn-sm" href="/#contact">
          Start a project
        </Link>
      </div>
    </header>
  );
}

/**
 * Fades sections in once as they scroll into view. Content is only hidden when
 * the `js` class is on <html> (set in layout), so it stays visible without JS.
 */
export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv:not(.in), .rule:not(.in)"));
    // Mark the card a deep link landed on. `:target` misses client-side navigations.
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) document.getElementById(hash)?.classList.add("landed");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }),
      { rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);
  return null;
}
