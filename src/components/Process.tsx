import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { processSteps, research } from "@/lib/data";
import { ExternalLink, Reveal, SectionHeading } from "@/components/ui";

export function Process() {
  return (
    <section id="process" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading
          label="How I work"
          title="Clear scope, regular demos, no surprises."
          lede="There are no packages or rate cards. Every project is quoted on its own scope, and this is how it runs from first message to handoff."
        />
        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.06} className="relative">
              <div className="flex items-center gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong bg-surface font-mono text-sm text-ink">
                  {i + 1}
                </span>
                {i < processSteps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-line-strong lg:block" aria-hidden="true" />
                )}
              </div>
              <h3 className="mt-6 font-display text-xl font-medium tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ResearchBand() {
  return (
    <section id="research" className="border-t border-line py-16 md:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-3">
          <p className="label flex items-center gap-2">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            Research
          </p>
        </Reveal>
        <Reveal delay={0.05} className="lg:col-span-4">
          <h2 className="font-display text-2xl font-medium tracking-[-0.025em] text-balance md:text-3xl">
            Published work in applied machine learning.
          </h2>
          <p className="mt-4 max-w-sm leading-relaxed text-muted">
            An IEEE TENSYMP paper on misinformation detection, and a Taylor &amp; Francis book
            chapter on automating code documentation with LLMs.
          </p>
          <Link
            href="/research"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-medium hover:text-accent"
          >
            Research, experience and education
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
        <ul className="divide-y divide-line border-y border-line lg:col-span-5">
          {research.papers.map((p, i) => (
            <Reveal as="li" key={p.title} delay={0.1 + i * 0.05} className="py-5">
              <p className="label">
                <span className="text-accent">{p.venueShort}</span> · {p.year}
              </p>
              <h3 className="mt-2 font-medium leading-snug">{p.title}</h3>
              <ExternalLink href={p.url} className="mt-3">
                Read the publication
              </ExternalLink>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
