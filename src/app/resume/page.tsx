import type { Metadata } from "next";
import Link from "next/link";
import { profile, education, experience, projects, skills, research, work, featured } from "@/lib/data";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${profile.name}, ${profile.resumeTitle.toLowerCase()} based in ${profile.location}.`,
  alternates: { canonical: `${profile.portfolio}/resume` },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-rule py-9 md:grid-cols-[11rem_1fr] md:gap-10 print:break-inside-avoid-page print:py-5">
      <h2 className="title text-[1.6rem] print:text-[1.2rem]">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <main id="main" className="min-h-screen pb-24 print:pb-0">
      <div className="wrap no-print flex h-[4.5rem] items-center justify-between">
        <Link href="/" className="title text-[1.6rem] leading-none">
          Aditya Mer
        </Link>
        <div className="flex items-center gap-3">
          <PrintButton />
          <a href={profile.resumeUrl} download className="btn btn-primary !min-h-11 !px-5 text-[0.95rem]">
            Download PDF
          </a>
        </div>
      </div>

      <article className="wrap max-w-5xl pt-12 md:pt-20 print:pt-0">
        <header className="mb-12 print:mb-6">
          <h1 className="display mb-4 text-[clamp(3rem,8vw,6rem)] print:text-5xl">{profile.name}</h1>
          <p className="mb-6 text-[1.25rem] text-ink-2">{profile.resumeTitle}</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2 text-ink-2">
            <li><a className="link-static" href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a className="link-static" href={profile.portfolio}>adityamer.dev</a></li>
            <li><a className="link-static" href={profile.linkedin}>linkedin.com/in/adityamer</a></li>
            <li><a className="link-static" href={profile.github}>github.com/aditya190803</a></li>
            <li>{profile.location}</li>
          </ul>
        </header>

        <Section title="Summary">
          <p className="measure text-[1.1rem] leading-relaxed text-ink-2">{profile.bio}</p>
        </Section>

        <Section title="Freelance">
          <ul className="space-y-5">
            <li>
              <p className="font-medium">{featured.name}, {featured.domain}</p>
              <p className="text-ink-2">Mail-merge web app, designed and built end to end. In use at {featured.usedBy}.</p>
            </li>
            {work.map((w) => (
              <li key={w.slug}>
                <p className="font-medium">{w.client}, {w.domain}</p>
                <p className="text-ink-2">{w.kind} for a {w.sector.toLowerCase()} client.</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Experience">
          <ul className="space-y-8">
            {experience.map((e) => (
              <li key={e.company + e.role} className="print:break-inside-avoid">
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-6">
                  <p className="font-medium">{e.role}, {e.company}</p>
                  <p className="text-ink-3">{e.period}</p>
                </div>
                <ul className="space-y-1 text-ink-2">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-ink-3" />
                      {h}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Publications">
          <ul className="space-y-5">
            {research.papers.map((r) => (
              <li key={r.title}>
                <a href={r.url} className="link-static font-medium">{r.title}</a>
                <p className="text-ink-2">{r.venue}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Projects">
          <ul className="grid gap-5 sm:grid-cols-2">
            {projects.filter((p) => p.featured).map((p) => (
              <li key={p.title}>
                <a href={p.demo || p.pypi || p.github} className="link-static font-medium">{p.title}</a>
                <p className="text-ink-2">{p.stats ?? p.technologies.slice(0, 3).join(", ")}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Skills">
          <dl className="space-y-3">
            {Object.entries(skills).map(([k, v]) => (
              <div key={k} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-ink-3">{k}</dt>
                <dd className="text-ink-2">{v.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Education">
          <ul className="space-y-4">
            {education.map((e) => (
              <li key={e.degree} className="flex flex-wrap items-baseline justify-between gap-x-6">
                <span>
                  <span className="font-medium">{e.degree}</span>
                  <span className="block text-ink-2">{e.institution}</span>
                </span>
                <span className="text-ink-3">{e.period}</span>
              </li>
            ))}
          </ul>
        </Section>
      </article>
    </main>
  );
}
