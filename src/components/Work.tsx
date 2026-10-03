import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { clientWork, projects, services, type ClientWork, type Project } from "@/lib/data";
import { ExternalLink, Reveal, SectionHeading, Tag } from "@/components/ui";

const serviceName = Object.fromEntries(services.map((s) => [s.id, s.title]));

function hostname(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function ClientCard({ work }: { work: ClientWork }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong">
      {/* Browser-frame preview */}
      <div className="border-b border-line bg-surface-2">
        <div className="flex items-center gap-1.5 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="ml-3 flex items-center gap-1.5 truncate rounded-md bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">
            {work.internal && <Lock size={11} />}
            {work.internal ? "internal tool" : work.url ? hostname(work.url) : work.client}
          </span>
        </div>
        <div className="relative flex h-36 items-end px-6 pb-5 md:h-44">
          <span className="display text-4xl text-ink md:text-5xl">{work.client}</span>
          {work.badge && (
            <span className="absolute top-3 right-4 rounded-full bg-accent px-3 py-1 text-[11px] font-medium text-accent-ink">
              {work.badge}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="eyebrow">{work.type}</p>
          <p className="font-mono text-xs text-faint">{work.year}</p>
        </div>
        <p className="leading-relaxed text-muted">{work.summary}</p>
        <ul className="mt-4 space-y-1.5">
          {work.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-sm">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>
        <ul className="mt-5 flex flex-wrap gap-2">
          {work.services.map((id) => (
            <li key={id}>
              <Tag>{serviceName[id]}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          {work.url && !work.internal ? (
            <ExternalLink href={work.url}>Visit {hostname(work.url)}</ExternalLink>
          ) : (
            <span className="text-sm text-muted">Private project — details on request</span>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="eyebrow">{project.category}</p>
        {project.stats && (
          <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent">
            {project.stats.replace(/!$/, "")}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5">
        {project.demo && <ExternalLink href={project.demo}>Live demo</ExternalLink>}
        {project.pypi && <ExternalLink href={project.pypi}>PyPI</ExternalLink>}
        {project.github && <ExternalLink href={project.github}>Code</ExternalLink>}
      </div>
    </article>
  );
}

export default function Work() {
  const featured = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <section id="work" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading
          eyebrow="Client work"
          title="Built for real teams, running in production."
          lede="A selection of recent freelance projects — from organisation websites with their own CMS to platforms used inside a national cancer hospital."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {clientWork.map((w, i) => (
            <Reveal key={w.slug} delay={(i % 2) * 0.05}>
              <ClientCard work={w} />
            </Reveal>
          ))}
        </div>

        <div className="mt-24 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Products &amp; open source</p>
            <h3 className="display text-3xl sm:text-4xl">AI products I&apos;ve built and shipped myself.</h3>
            <p className="mt-4 text-muted">
              Live apps and packages that show how I work with LLMs, ML models and full-stack code.
            </p>
          </div>
          <Link
            href="/work"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium hover:text-accent"
          >
            All projects
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
