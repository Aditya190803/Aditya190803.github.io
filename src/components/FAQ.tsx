import { Plus } from "lucide-react";
import { faqs } from "@/lib/data";
import { SectionHeading } from "@/components/ui";

export default function FAQ() {
  return (
    <section id="faq" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading
          label="FAQ"
          title="Questions clients usually ask."
          lede="Pricing, ownership, NDAs and support. Anything else, ask in the form below."
        />
        <div className="lg:ml-[calc(25%+0.5rem)]">
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-lg font-medium tracking-[-0.015em] transition-colors hover:text-accent md:text-xl [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-transform duration-300 group-open:rotate-45">
                    <Plus size={16} aria-hidden="true" />
                  </span>
                </summary>
                <p className="max-w-2xl pr-12 pb-7 leading-relaxed text-pretty text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
