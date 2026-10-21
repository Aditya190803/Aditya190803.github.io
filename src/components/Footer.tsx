import Link from "next/link";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="wrap py-14 md:py-20">
        <p data-reveal="split" className="display mb-14 text-[clamp(3.5rem,13vw,13rem)] leading-[0.85]" aria-hidden="true">
          Aditya Mer
        </p>
        <div className="flex flex-col gap-8 border-t border-paper/15 pt-8 text-paper/70 md:flex-row md:items-center md:justify-between">
          <p>Independent web design &amp; development, {profile.location}.</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <a href={`mailto:${profile.email}`} className="link hover:text-paper">
                Email
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link hover:text-paper">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link hover:text-paper">
                GitHub
              </a>
            </li>
            <li>
              <Link href="/resume" className="link hover:text-paper">
                Résumé
              </Link>
            </li>
          </ul>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
