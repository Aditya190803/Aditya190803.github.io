import { BarChart3, BrainCircuit, Code2, Sparkles } from "lucide-react";
import { services } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/ui";

const icons = {
  analytics: BarChart3,
  ml: BrainCircuit,
  genai: Sparkles,
  software: Code2,
} as const;

export default function Services() {
  return (
    <section id="services" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading
          label="Services"
          title="From the spreadsheet to the shipped product."
          lede="Most projects need more than one skill set. I cover the whole path, from understanding your data to putting something in front of your team or your customers."
        />

        <ul className="border-b border-line">
          {services.map((s, i) => {
            const Icon = icons[s.id as keyof typeof icons] ?? Code2;
            return (
              <Reveal
                as="li"
                key={s.id}
                delay={i * 0.04}
                className="grid gap-6 border-t border-line py-10 md:py-12 lg:grid-cols-12 lg:gap-8"
              >
                <div className="flex items-start gap-5 lg:col-span-3 lg:flex-col">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div className="hidden lg:block">
                    <p className="label mb-2 text-faint">Tools</p>
                    <ul className="space-y-1 font-mono text-xs text-muted">
                      {s.stack.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="display text-[1.75rem] leading-tight tracking-[-0.03em] md:text-[2rem]">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md leading-relaxed text-pretty text-muted">
                    {s.summary}
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <p className="label mb-4">What you get</p>
                  <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-3 text-[15px] leading-snug">
                        <span
                          className="mt-[0.55rem] h-1 w-3 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 font-mono text-xs leading-relaxed text-faint lg:hidden">
                    <span className="sr-only">Tools: </span>
                    {s.stack.join("  /  ")}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
