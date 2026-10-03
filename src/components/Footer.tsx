import Link from "next/link";
import { profile, services, site } from "@/lib/data";
import { BrandMark } from "@/components/Navbar";

const linkCls = "text-muted transition-colors hover:text-ink";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page grid gap-12 py-14 md:grid-cols-12 md:gap-8 md:py-16">
        <div className="md:col-span-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight"
          >
            <BrandMark />
            {site.brand}
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Freelance data science, AI and software development. Based in {profile.location},
            working with clients anywhere.
          </p>
        </div>

        <nav aria-label="Services" className="md:col-span-3">
          <p className="label mb-4">Services</p>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link href="/#services" className={linkCls}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Site" className="md:col-span-2">
          <p className="label mb-4">Site</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/#work" className={linkCls}>
                Client work
              </Link>
            </li>
            <li>
              <Link href="/work" className={linkCls}>
                Archive
              </Link>
            </li>
            <li>
              <Link href="/research" className={linkCls}>
                Research
              </Link>
            </li>
            <li>
              <Link href="/resume" className={linkCls}>
                Résumé
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Contact" className="md:col-span-2">
          <p className="label mb-4">Contact</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/#contact" className={linkCls}>
                Project inquiry
              </Link>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className={linkCls}>
                Email
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className={linkCls}
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-6 font-mono text-xs text-faint">
          © {new Date().getFullYear()} {site.brand}
        </p>
      </div>
    </footer>
  );
}
