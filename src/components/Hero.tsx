import { ArrowUpRight, Lock } from "lucide-react";
import { clientWork, profile, site } from "@/lib/data";
import { ButtonLink, PrimaryCta, Reveal, StatusDot } from "@/components/ui";
import { hostname } from "@/lib/utils";

/** The hero's proof: every client engagement, with a live link where one exists. */
function ClientLog() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgba(14,17,22,0.04),0_24px_60px_-32px_rgba(14,17,22,0.25)]">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <p className="label">Shipped for clients</p>
        <p className="label tabular-nums">{clientWork.length} projects</p>
      </div>
      <ul className="divide-y divide-line">
        {clientWork.map((w, i) => (
          <Reveal
            as="li"
            key={w.slug}
            delay={0.35 + i * 0.08}
            className="group relative grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-0.5 px-5 py-4 transition-colors hover:bg-surface-2/60 sm:grid-cols-[9.5rem_1fr_auto]"
          >
            <a
              href={`#${w.slug}`}
              className="font-display text-lg font-medium tracking-tight after:absolute after:inset-0"
            >
              {w.client}
            </a>
            <span className="col-start-1 row-start-2 text-sm text-muted sm:col-start-auto sm:row-start-auto">
              {w.type}
            </span>
            <span className="relative z-10 col-start-2 row-span-2 row-start-1 sm:col-start-auto sm:row-span-1 sm:row-start-auto">
              {w.url && !w.internal ? (
                <a
                  href={w.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md px-2 py-1 font-mono text-xs text-muted transition-colors hover:bg-bg hover:text-accent"
                >
                  <StatusDot />
                  <span className="hidden md:inline">{hostname(w.url)}</span>
                  <span className="md:hidden">Live</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                  <span className="sr-only">(opens {w.client} in a new tab)</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-2 py-1 font-mono text-xs text-faint">
                  <Lock size={12} aria-hidden="true" />
                  Private
                </span>
              )}
            </span>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-28">
      <div className="container-page">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-3.5 pl-3 text-sm text-muted">
            <StatusDot />
            <span>
              <span className="font-medium text-ink">{site.availability}</span>
              <span className="hidden sm:inline"> · {profile.location}, working remotely</span>
            </span>
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="display mt-8 max-w-[15ch] text-[clamp(2.9rem,7.6vw,6.75rem)] leading-[0.94] tracking-[-0.045em]">
            Turn data and ideas into software people use<span className="text-accent">.</span>
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={0.14} className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-pretty text-muted">
              I&apos;m {profile.name}, a freelance engineer. Analytics, machine learning, an LLM app
              or a full website: I take the project from the first conversation to launch, and hand
              over something your team can run.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryCta />
              <ButtonLink href="/#work" variant="secondary">
                See client work
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.22} className="lg:col-span-7">
            <ClientLog />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
