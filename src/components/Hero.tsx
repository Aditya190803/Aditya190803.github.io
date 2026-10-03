import { ArrowRight, CalendarDays } from "lucide-react";
import { clientWork, profile, site } from "@/lib/data";
import { ButtonLink, Reveal } from "@/components/ui";

const stats = [
  { value: `${clientWork.length}+`, label: "client products shipped" },
  { value: "6k+", label: "PyPI downloads in month one" },
  { value: "2", label: "peer-reviewed publications" },
];

/** Decorative chart: observed data + model fit + forecast band. */
function HeroChart() {
  const observed = [
    [20, 150], [50, 138], [80, 142], [110, 120], [140, 124], [170, 104],
    [200, 108], [230, 90], [260, 94],
  ];
  const fit = "M20 150 C 80 140, 140 122, 200 104 S 250 92, 260 92";
  const forecast = "M260 92 C 290 84, 320 74, 360 60";
  const band = "M260 86 C 290 74, 320 58, 360 40 L 360 80 C 320 90, 290 94, 260 98 Z";

  return (
    <div
      aria-hidden="true"
      className="relative rounded-2xl border border-line bg-surface p-5 shadow-[0_1px_0_var(--line),0_24px_48px_-24px_rgba(0,0,0,0.18)]"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs text-muted">forecast.ipynb</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          model: deployed
        </span>
      </div>
      <svg viewBox="0 0 380 180" className="w-full">
        {[40, 80, 120, 160].map((y) => (
          <line key={y} x1="10" x2="370" y1={y} y2={y} stroke="var(--line)" strokeWidth="1" />
        ))}
        <path d={band} fill="var(--accent-soft)" />
        <path d={fit} fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
        <path
          d={forecast}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="5 5"
          strokeLinecap="round"
        />
        {observed.map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="3.5" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
        ))}
        <circle cx="360" cy="60" r="4" fill="var(--accent)" />
      </svg>
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4 font-mono text-[11px] text-muted">
        <div>
          <div className="text-faint">data</div>
          <div className="text-ink">cleaned</div>
        </div>
        <div>
          <div className="text-faint">model</div>
          <div className="text-ink">evaluated</div>
        </div>
        <div>
          <div className="text-faint">app</div>
          <div className="text-ink">shipped</div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)] opacity-60" />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {site.availability}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="display text-[clamp(2.75rem,7vw,5.25rem)] text-balance">
              Data, AI and software,{" "}
              <em className="text-accent">built to ship.</em>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">
              I&apos;m {profile.name}, a freelance engineer. I help businesses and teams turn data into
              decisions, models into products, and ideas into working software.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-9 flex flex-wrap gap-3">
            {site.bookingUrl ? (
              <ButtonLink href={site.bookingUrl} external>
                <CalendarDays size={16} />
                Book a free call
              </ButtonLink>
            ) : (
              <ButtonLink href="/#contact">
                Start a project
                <ArrowRight size={16} />
              </ButtonLink>
            )}
            <ButtonLink href="/#work" variant="secondary">
              See client work
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="display text-3xl md:text-4xl">{s.value}</dd>
                  <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="hidden sm:block">
          <HeroChart />
        </Reveal>
      </div>

      <div className="container-page relative mt-16 md:mt-20">
        <div className="flex flex-col gap-4 border-y border-line py-5 sm:flex-row sm:items-center sm:gap-8">
          <p className="eyebrow shrink-0">Recent clients</p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {clientWork.map((c) => (
              <li key={c.slug} className="text-base font-medium tracking-tight text-ink/80">
                {c.client}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
