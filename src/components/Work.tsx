import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { clientWork, projects, type ClientWork, type Project } from "@/lib/data";
import { ExternalLink, Reveal, SectionHeading } from "@/components/ui";
import { cn, hostname } from "@/lib/utils";

/** Minimal browser chrome around a screenshot or the private-project placeholder. */
function Frame({ address, children }: { address: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgba(14,17,22,0.04),0_30px_70px_-40px_rgba(14,17,22,0.35)]">
      <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
        </span>
        <span className="mx-auto flex min-w-0 items-center gap-1.5 truncate rounded-md bg-surface-2 px-3 py-1 font-mono text-[11px] text-muted">
          {address}
        </span>
        <span className="w-[1.875rem]" aria-hidden="true" />
      </div>
      <div className="relative aspect-[16/10] bg-surface-2">{children}</div>
    </div>
  );
}

/** Stand-in for private work: an abstract app layout, nothing real. */
function PrivatePreview() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex gap-4 p-5 md:gap-6 md:p-8">
      <div className="hidden w-1/5 flex-col gap-3 sm:flex">
        <div className="h-6 w-2/3 rounded-md bg-line-strong/70" />
        {[80, 65, 72, 58, 70].map((w) => (
          <div key={w} className="h-3 rounded bg-line" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((k) => (
            <div key={k} className="h-14 rounded-lg border border-line bg-surface md:h-20" />
          ))}
        </div>
        <div className="flex-1 rounded-lg border border-line bg-surface p-3 md:p-4">
          {[90, 75, 84, 62, 78, 70].map((w, k) => (
            <div
              key={k}
              className="flex items-center gap-3 border-b border-line py-2 last:border-0 md:py-2.5"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-line-strong" />
              <div className="h-2.5 rounded bg-line" style={{ width: `${w * 0.5}%` }} />
              <div className="ml-auto h-2.5 w-10 rounded bg-line" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 grid place-items-center bg-surface-2/40 backdrop-blur-[3px]">
        <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2 text-sm font-medium text-ink shadow-sm">
          <Lock size={14} />
          Private project
        </span>
      </div>
    </div>
  );
}

export function ClientCase({ work, flip }: { work: ClientWork; flip?: boolean }) {
  const live = work.url && !work.internal;
  return (
    <article
      id={work.slug}
      className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-12 lg:gap-12"
    >
      <Reveal className={cn("lg:col-span-7", flip && "lg:order-2")}>
        <Frame
          address={
            live ? (
              hostname(work.url!)
            ) : (
              <>
                <Lock size={11} aria-hidden="true" /> internal
              </>
            )
          }
        >
          {work.image ? (
            <Image
              src={work.image}
              alt={`Screenshot of the ${work.client} homepage`}
              fill
              unoptimized
              sizes="(min-width: 1024px) 680px, 100vw"
              className="object-cover object-top dark:brightness-[0.85]"
            />
          ) : (
            <PrivatePreview />
          )}
        </Frame>
      </Reveal>

      <Reveal delay={0.08} className={cn("lg:col-span-5", flip && "lg:order-1")}>
        <p className="label">{work.type}</p>
        <h3 className="display mt-3 text-4xl tracking-[-0.035em] md:text-5xl">{work.client}</h3>
        {work.badge && (
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-sm font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {work.badge}
          </p>
        )}
        <p className="mt-5 leading-relaxed text-pretty text-muted">{work.summary}</p>

        {work.highlights.length > 0 && (
          <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
            {work.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[15px] leading-snug">
                <span
                  className="mt-[0.55rem] h-1 w-3 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
          {live ? (
            <ExternalLink href={work.url!}>Visit {hostname(work.url!)}</ExternalLink>
          ) : (
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-1.5 text-sm font-medium underline decoration-line-strong underline-offset-4 hover:text-accent hover:decoration-accent"
            >
              Ask for details
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </Reveal>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-strong md:p-7">
      <div className="flex items-start justify-between gap-3">
        <p className="label">{project.category}</p>
        {project.pypi && !project.demo && <p className="label">Python package</p>}
      </div>
      <h3 className="mt-5 font-display text-2xl font-medium tracking-[-0.025em]">
        {project.title}
      </h3>
      {project.stats && <p className="mt-3 text-sm font-medium text-accent">{project.stats}</p>}
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.description}</p>
      <p className="mt-5 font-mono text-[11px] leading-relaxed text-faint">
        {project.technologies.slice(0, 4).join("  /  ")}
      </p>
      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6">
        {project.demo && <ExternalLink href={project.demo}>Live app</ExternalLink>}
        {project.pypi && <ExternalLink href={project.pypi}>PyPI</ExternalLink>}
        {project.github && <ExternalLink href={project.github}>Source</ExternalLink>}
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading
          label="Client work"
          title="Running in production, for real organisations."
          lede="An email platform used by Tata Memorial Hospital, a national cancer-care association's website, a jewellery brand's online store and a company's internal software."
        />
        <div className="space-y-24 md:space-y-32">
          {clientWork.map((w, i) => (
            <ClientCase key={w.slug} work={w} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Products() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="products" className="section border-t border-line bg-surface-2/50">
      <div className="container-page">
        <SectionHeading
          label="Products & open source"
          title="My own products, live and open source."
          lede="Apps and packages I've built and released myself. Try the live apps, or read the code behind them."
        >
          <Link
            href="/work"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium hover:text-accent"
          >
            Browse the full archive
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </SectionHeading>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 3) * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
