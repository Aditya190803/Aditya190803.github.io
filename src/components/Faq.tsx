import { faqs } from "@/lib/data";

export default function Faq() {
  return (
    <section id="faq" className="section pt-0" aria-labelledby="faq-title">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <h2 id="faq-title" data-reveal className="display text-[clamp(2.75rem,6vw,5.5rem)] lg:col-span-4">
          Questions clients ask
        </h2>
        <div className="lg:col-span-7 lg:col-start-6">
          {faqs.map((f) => (
            <details key={f.q} data-reveal className="group border-t border-rule last:border-b">
              <summary className="flex items-center justify-between gap-6 py-6 md:py-7">
                <span className="title text-[clamp(1.4rem,2.4vw,1.9rem)]">{f.q}</span>
                <span
                  aria-hidden="true"
                  className="faq-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20 text-lg transition-transform duration-300"
                >
                  +
                </span>
              </summary>
              <p className="measure pb-7 text-[1.1rem] leading-relaxed text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
