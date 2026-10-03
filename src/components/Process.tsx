import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { processSteps, research } from "@/lib/data";
import { ExternalLink, Reveal, SectionHeading } from "@/components/ui";

export function Process() {
  return (
    <section id="process" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading
          eyebrow="How I work"
          title="Clear scope, regular demos, no surprises."
          lede="Every project is quoted individually, based on what you actually need. Here's what working together looks like."
        />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05}>
              <li className="h-full border-t-2 border-ink pt-5">
                <span className="font-mono text-xs text-faint">Step 0{i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ResearchBand() {
  return (
    <section className="section border-t border-line bg-surface-2/60">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="eyebrow mb-4">Research background</p>
          <h2 className="display text-4xl sm:text-5xl text-balance">
            Engineering backed by <em>research</em>.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            Alongside client work I publish applied ML research, most recently on misinformation detection and
            LLM-powered code documentation. It means your model is chosen on evidence, not hype.
          </p>
          <Link
            href="/research"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-medium hover:text-accent"
          >
            Research, experience &amp; certifications
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <ul className="space-y-4">
          {research.papers.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <li className="rounded-2xl border border-line bg-surface p-6">
                <div className="mb-2 flex items-center gap-3 font-mono text-xs text-faint">
                  <span className="text-accent">{p.venueShort}</span>
                  <span>{p.year}</span>
                </div>
                <h3 className="font-semibold leading-snug tracking-tight">{p.title}</h3>
                <ExternalLink href={p.url} className="mt-4">
                  Read paper
                </ExternalLink>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
