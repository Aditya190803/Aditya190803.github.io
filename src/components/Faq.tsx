import { faqs } from "@/lib/data";
import SectionHead from "./SectionHead";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section section--alt">
      <div className="wrap grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <SectionHead id="faq-title" label="FAQ" title="Questions clients usually ask." />
          <p className="t-body mt-5">
            Something else on your mind? <a href="#contact" className="link">Ask me directly</a>.
          </p>
        </div>
        <dl className="col-span-12 grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {faqs.map((f) => (
            <div key={f.q} className="border-t border-line py-6">
              <dt className="text-[17px] font-medium leading-snug">{f.q}</dt>
              <dd className="t-body mt-2">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
