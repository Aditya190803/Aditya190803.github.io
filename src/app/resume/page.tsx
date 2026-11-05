import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Download } from "lucide-react";
import {
  certifications,
  clientWork,
  education,
  experience,
  flier,
  profile,
  projects,
  research,
  skills,
} from "@/lib/data";
import PrintButton from "./PrintButton";
import "./resume.css";

export const metadata: Metadata = {
  title: "Résumé | Aditya Mer",
  description: `${profile.name}, ${profile.resumeTitle.toLowerCase()} in Mumbai. Freelance work, experience, projects, research, education and skills.`,
  alternates: { canonical: `${profile.portfolio}/resume` },
};

/** "https://www.example.com/path/" -> "example.com/path" */
function prettyUrl(url: string) {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

function Ext({ href, children }: { href: string; children?: ReactNode }) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className="link break-words"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children ?? prettyUrl(href)}
    </a>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="cv-section mt-12 sm:mt-14">
      <h2 className="t-title mb-3">{title}</h2>
      <div className="rows">{children}</div>
    </section>
  );
}

/** One ruled row: title on the left, a small date or note on the right (stacked on phones). */
function Item({
  title,
  meta,
  children,
}: {
  title: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <article className="cv-item py-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="font-medium text-ink">{title}</h3>
        {meta ? <p className="t-label tnum shrink-0 sm:text-right">{meta}</p> : null}
      </div>
      {children ? <div className="mt-2 grid gap-2">{children}</div> : null}
    </article>
  );
}

const freelance = [
  ...clientWork.map((w) => ({
    key: w.slug,
    name: w.client,
    kind: w.kind,
    sector: w.sector,
    year: w.year,
    summary: w.summary,
    url: w.url,
    isPrivate: Boolean(w.private),
    note: undefined as string | undefined,
  })),
  {
    key: "flier",
    name: flier.name,
    kind: "Mail-merge web app",
    sector: "Own product",
    year: undefined,
    summary: flier.summary,
    url: flier.url,
    isPrivate: false,
    note: flier.usedBy ? `Used by ${flier.usedBy}.` : undefined,
  },
];

const featured = projects.filter((p) => p.featured);

export default function ResumePage() {
  return (
    <main className="cv-page min-h-svh bg-ground px-4 pb-24 pt-6 sm:px-8 sm:pt-10">
      <div className="cv-sheet mx-auto w-full max-w-[840px]">
        {/* Action bar */}
        <nav
          aria-label="Résumé actions"
          className="no-print flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6"
        >
          <Link href="/" className="link inline-flex items-center gap-2">
            <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
            Back to site
          </Link>
          <div className="flex flex-wrap gap-3">
            <PrintButton />
            <a href={profile.resumeUrl} download className="btn btn--primary">
              <Download size={18} strokeWidth={1.75} aria-hidden="true" />
              Download PDF
            </a>
          </div>
        </nav>

        {/* Header */}
        <header className="pt-10 sm:pt-14">
          <h1 className="cv-name t-h2">{profile.name}</h1>
          <p className="t-lead mt-3">{profile.resumeTitle}</p>
          <ul className="t-small mt-5 flex flex-wrap gap-x-5 gap-y-2 text-ink-2">
            <li>{profile.location}</li>
            <li>
              <Ext href={`mailto:${profile.email}`}>{profile.email}</Ext>
            </li>
            <li>
              <Ext href={profile.portfolio} />
            </li>
            <li>
              <Ext href={profile.github} />
            </li>
            <li>
              <Ext href={profile.linkedin} />
            </li>
          </ul>
          <p className="t-body measure mt-6">{profile.bio}</p>
        </header>

        <Section title="Freelance work">
          {freelance.map((w) => (
            <Item
              key={w.key}
              title={w.name}
              meta={[w.kind, w.year].filter(Boolean).join(", ")}
            >
              <p className="t-small muted">{w.sector}</p>
              <p className="t-body">
                {w.summary}
                {w.note ? ` ${w.note}` : null}
              </p>
              {w.isPrivate || !w.url ? null : (
                <p className="t-small">
                  <Ext href={w.url} />
                </p>
              )}
            </Item>
          ))}
        </Section>

        <Section title="Experience">
          {experience.map((e) => (
            <Item
              key={`${e.company}-${e.period}`}
              title={
                <>
                  {e.role}, <span className="text-ink-2">{e.company}</span>
                </>
              }
              meta={e.period}
            >
              <p className="t-small muted">{e.location}</p>
              <ul className="t-body list-disc space-y-1 pl-5 marker:text-muted">
                {e.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </Item>
          ))}
        </Section>

        <Section title="Selected projects">
          {featured.map((p) => (
            <Item key={p.title} title={p.title} meta={p.stats}>
              <p className="t-body">{p.description}</p>
              <p className="t-small flex flex-wrap gap-x-5 gap-y-1">
                {p.demo ? <Ext href={p.demo} /> : null}
                {p.github ? <Ext href={p.github} /> : null}
                {p.pypi ? <Ext href={p.pypi} /> : null}
              </p>
            </Item>
          ))}
        </Section>

        <Section title="Research">
          {research.papers.map((r) => (
            <Item key={r.url} title={<Ext href={r.url}>{r.title}</Ext>} meta={r.year}>
              <p className="t-small muted">{r.venue}</p>
            </Item>
          ))}
        </Section>

        <Section title="Education">
          {education.map((ed) => (
            <Item key={ed.degree} title={ed.degree} meta={ed.period}>
              <p className="t-small muted">{ed.institution}</p>
            </Item>
          ))}
        </Section>

        <Section title="Skills">
          {Object.entries(skills).map(([category, list]) => (
            <div
              key={category}
              className="cv-item grid gap-1 py-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6"
            >
              <h3 className="font-medium text-ink">{category}</h3>
              <p className="t-body">{list.join(", ")}</p>
            </div>
          ))}
        </Section>

        <Section title="Certifications">
          {certifications.map((c) => (
            <Item
              key={c.credentialId ?? c.title}
              title={c.url ? <Ext href={c.url}>{c.title}</Ext> : c.title}
              meta={c.date}
            >
              <p className="t-small muted">{c.issuer}</p>
            </Item>
          ))}
        </Section>
      </div>
    </main>
  );
}
