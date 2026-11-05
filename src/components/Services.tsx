import { Bot, Globe, LayoutDashboard, ShoppingBag } from "lucide-react";
import { services } from "@/lib/data";
import SectionHead from "./SectionHead";

const icons = { websites: Globe, stores: ShoppingBag, apps: LayoutDashboard, ai: Bot } as const;

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section">
      <div className="wrap">
        <SectionHead
          id="services-title"
          label="Services"
          title="What I can build for you."
          intro="Four kinds of project, each designed, built, launched and handed over by the same person."
        />

        <ul className="rows mt-12">
          {services.map((s) => {
            const Icon = icons[s.id as keyof typeof icons] ?? Globe;
            return (
              <li key={s.id} className="grid-12 gap-y-4 py-8 lg:py-10">
                <div className="col-span-12 flex items-start gap-4 lg:col-span-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md border border-line bg-white text-accent">
                    <Icon size={20} strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="t-h3 pt-1.5">{s.title}</h3>
                </div>
                <p className="t-body col-span-12 lg:col-span-5 lg:pr-6">{s.pitch}</p>
                <ul className="col-span-12 flex flex-wrap content-start gap-2 lg:col-span-3">
                  {s.includes.map((i) => (
                    <li key={i} className="rounded-full border border-line bg-white px-3 py-1 text-[13px] text-ink-2">
                      {i}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
