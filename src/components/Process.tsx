import { steps } from "@/lib/data";
import SectionHead from "./SectionHead";

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section section--alt relative isolate overflow-hidden">
      <div className="bg-grid -z-10 opacity-80" aria-hidden />
      <div className="wrap">
        <SectionHead
          id="process-title"
          label="How we'll work"
          title="A clear process, with no surprises."
          intro="You know the price before work starts, and you see the project take shape every week on a private preview link."
        />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="card relative p-7">
              <span className="grid size-9 place-items-center rounded-full border border-line bg-ground text-[14px] font-medium text-accent tnum">
                {i + 1}
              </span>
              <h3 className="t-title mt-6">{step.title}</h3>
              <p className="t-body mt-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
