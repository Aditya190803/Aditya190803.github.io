import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonLink, ExternalLink, Tag } from "@/components/ui";
import { certifications, education, experience, research, skills } from "@/lib/data";

export const metadata: Metadata = {
  title: "Research & background",
  description:
    "Publications, experience, education and certifications: applied ML research in misinformation detection and LLM-powered code documentation.",
  alternates: { canonical: "/research" },
};

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-6 border-t border-line py-14 md:grid-cols-12 md:gap-8"
    >
      <h2 id={id} className="label md:col-span-3 md:pt-1">
        {title}
      </h2>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}

export default function ResearchPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 md:pt-40">
        <div className="container-page">
          <header className="max-w-3xl pb-14">
            <p className="label mb-5">Research &amp; background</p>
            <h1 className="display text-5xl md:text-7xl text-balance">
              The research behind the work.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Publications, internships, education and certifications.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/resume" variant="secondary">
                View résumé
              </ButtonLink>
            </div>
          </header>

          <Block id="publications" title="Publications">
            <ul className="space-y-10">
              {research.papers.map((p) => (
                <li key={p.title}>
                  <div className="mb-2 flex flex-wrap items-center gap-3 font-mono text-xs text-faint">
                    <span className="text-accent">{p.status}</span>
                    <span>{p.venue}</span>
                  </div>
                  <h3 className="font-display text-2xl font-medium leading-snug tracking-[-0.02em]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    {p.authors.map((a, i) => (
                      <span key={a.name}>
                        <span
                          className={a.name === "Aditya Mer" ? "font-medium text-ink" : undefined}
                        >
                          {a.name}
                        </span>
                        {i < p.authors.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                  <p className="mt-3 leading-relaxed text-muted">{p.abstract}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                  <ExternalLink href={p.url} className="mt-4">
                    Read paper
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="experience" title="Experience">
            <ol className="space-y-8">
              {experience.map((e) => (
                <li
                  key={`${e.company}-${e.period}`}
                  className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-6"
                >
                  <div>
                    <h3 className="font-semibold tracking-tight">
                      {e.role} <span className="font-normal text-muted">· {e.company}</span>
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm text-muted">
                      {e.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="order-first font-mono text-xs text-faint sm:order-none sm:pt-1">
                    {e.period}
                  </p>
                </li>
              ))}
            </ol>
          </Block>

          <Block id="education" title="Education">
            <ul className="space-y-5">
              {education.map((e) => (
                <li key={e.degree} className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-6">
                  <div>
                    <h3 className="font-semibold tracking-tight">{e.degree}</h3>
                    <p className="text-sm text-muted">{e.institution}</p>
                  </div>
                  <p className="order-first font-mono text-xs text-faint sm:order-none sm:pt-1">
                    {e.period}
                  </p>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="certifications" title="Certifications">
            <ul className="grid gap-4 sm:grid-cols-2">
              {certifications.map((c) => (
                <li
                  key={c.credentialId ?? c.title}
                  className="rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
                >
                  <p className="font-mono text-xs text-faint">
                    {c.issuer} · {c.date}
                  </p>
                  <h3 className="mt-1.5 font-medium leading-snug">{c.title}</h3>
                  {c.url && (
                    <ExternalLink href={c.url} className="mt-3">
                      Credential
                    </ExternalLink>
                  )}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="skills" title="Toolkit">
            <dl className="grid gap-6 sm:grid-cols-2">
              {Object.entries(skills).map(([group, items]) => (
                <div key={group}>
                  <dt className="font-medium">{group}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted">{items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </Block>
        </div>
      </main>
      <Footer />
    </>
  );
}
