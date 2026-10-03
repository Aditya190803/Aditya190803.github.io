import { BarChart3, BrainCircuit, Code2, Sparkles, Check } from "lucide-react";
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
    <section id="services" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Services"
          title="One person for the data, the model and the product."
          lede="Most projects need more than one skill set. I cover the whole path — from understanding your data to shipping something your team or customers can use."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = icons[s.id as keyof typeof icons] ?? Code2;
            return (
              <Reveal key={s.id} delay={i * 0.05} className="flex flex-col bg-surface p-7 md:p-9">
                <div className="mb-6 flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={20} />
                  </span>
                  <span className="font-mono text-xs text-faint">0{i + 1}</span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.summary}</p>
                <ul className="mt-6 space-y-2.5">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-2.5 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-7 font-mono text-xs text-faint">{s.stack.join(" · ")}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
