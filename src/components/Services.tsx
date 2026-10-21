import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="section bg-paper-deep" aria-labelledby="services-title">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="services-title" data-reveal="split" className="display mb-6 text-[clamp(3rem,6.5vw,6rem)]">
              What I can build for you
            </h2>
            <p data-reveal className="measure text-[1.1rem] text-ink-2">
              One person from first sketch to launch day, so nothing gets lost between a designer, a developer and an
              agency account manager.
            </p>
          </div>
        </div>

        <ol className="lg:col-span-7 lg:col-start-6">
          {services.map((s) => (
            <li key={s.title} data-reveal className="border-t border-ink/15 py-10 first:border-t-0 first:pt-0 md:py-12">
              <h3 className="title mb-4 text-[clamp(1.9rem,3.4vw,2.9rem)]">{s.title}</h3>
              <p className="measure mb-7 text-[1.1rem] leading-relaxed text-ink-2">{s.pitch}</p>
              <ul className="flex flex-wrap gap-2">
                {s.includes.map((item) => (
                  <li key={item} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[0.95rem] text-ink-2">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
