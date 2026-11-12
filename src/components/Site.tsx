import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { profile } from "@/lib/data";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label={`${profile.name}, home`}>
      <Image src="/logo.png" alt="" width={28} height={28} priority />
      {profile.name}
    </Link>
  );
}

/** Stagger index for the reveal animation (`--d` in CSS). */
export const delay = (n: number) => ({ "--d": n }) as CSSProperties;

/** Hairline rule with "+" marks where it crosses the frame. */
export function Rule() {
  return (
    <>
      <div className="rule">
        <i />
      </div>
      <span className="plus l" />
      <span className="plus r" />
    </>
  );
}

export function Section({
  id,
  title,
  sub,
  children,
  className = "sec sec-pad",
}: {
  id: string;
  title: string;
  sub?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className} id={id} aria-labelledby={`${id}-h`}>
      <Rule />
      <div className="sec-head">
        <div>
          <h2 className="h2 rv mask" id={`${id}-h`}>
            <span>{title}</span>
          </h2>
          {sub && (
            <p className="sec-sub rv" style={delay(1)}>
              {sub}
            </p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

export function Footer() {
  return (
    <footer className="sec foot">
      <Rule />
      <Brand />
      <nav aria-label="Footer">
        <Link href="/#work">Work</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/research">Research</Link>
        <Link href="/resume">Résumé</Link>
        <a href={profile.github} target="_blank" rel="noopener">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener">
          LinkedIn
        </a>
        <Link href="/privacy">Privacy</Link>
      </nav>
      <span className="mono faint">© {new Date().getFullYear()} {profile.name}</span>
    </footer>
  );
}
