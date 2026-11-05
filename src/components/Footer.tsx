import { profile } from "@/lib/data";
import { Logo } from "./Header";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "/resume", label: "Résumé" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ground">
      <div className="wrap flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="t-small muted mt-3">Freelance web and AI developer, Mumbai. Working with clients anywhere.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-ink-2 transition-colors hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-ink-2 transition-colors hover:text-accent">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-ink-2 transition-colors hover:text-accent">
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="wrap rail" aria-hidden />
      <p className="wrap t-small muted py-6">© {new Date().getFullYear()} {profile.name}</p>
    </footer>
  );
}
