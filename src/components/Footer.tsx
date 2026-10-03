import Link from "next/link";
import { profile, site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.brand} · Freelance data, AI &amp; software · {profile.location}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a href={`mailto:${profile.email}`} className="hover:text-ink">
              Email
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              GitHub
            </a>
          </li>
          <li>
            <Link href="/research" className="hover:text-ink">
              Research
            </Link>
          </li>
          <li>
            <Link href="/resume" className="hover:text-ink">
              Résumé
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
