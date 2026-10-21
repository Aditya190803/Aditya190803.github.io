"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featured } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const recipients = featured.demoRecipients;

function Field({ value, token, resolved }: { value: string; token: string; resolved: boolean }) {
  const text = resolved ? value : `{{${token}}}`;
  return (
    <span
      key={text}
      className={`field-swap inline-block rounded-[4px] bg-cobalt/10 px-1 ${resolved ? "text-ink" : "text-cobalt"}`}
    >
      {text}
    </span>
  );
}

export default function Featured() {
  const section = useRef<HTMLElement>(null);
  const demo = useRef<HTMLDivElement>(null);
  // -1 = template view (placeholders), 0..n-1 = sending to recipient i, n = done
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!section.current || !demo.current) return;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const st = ScrollTrigger.create({
      trigger: demo.current,
      start: "top 70%",
      // Desktop: demo is sticky, so play it across the whole section.
      // Mobile: demo sits at the end, so play it across its own height.
      endTrigger: wide ? section.current : demo.current,
      end: wide ? "bottom 80%" : "bottom 30%",
      onUpdate: (self) => {
        const n = recipients.length;
        const next = Math.min(n, Math.floor(self.progress * (n + 1.5)) - 1);
        setStep((prev) => (prev === next ? prev : next));
      },
    });
    return () => st.kill();
  }, []);

  const n = recipients.length;
  const active = recipients[Math.max(0, Math.min(step, n - 1))];
  const resolved = step >= 0;
  const sent = Math.max(0, Math.min(step, n));

  return (
    <section ref={section} id="flier" className="section bg-paper-deep" aria-labelledby="flier-title">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p data-reveal className="mb-6 text-ink-2">
            Featured product, in use at <strong className="font-medium text-ink">{featured.usedBy}</strong>
          </p>
          <h2 id="flier-title" data-reveal="split" className="display mb-8 text-[clamp(2.75rem,6vw,5.5rem)]">
            {featured.headline}
          </h2>
          <p data-reveal className="measure mb-12 text-[1.15rem] leading-relaxed text-ink-2">
            {featured.summary}
          </p>

          <dl className="space-y-7">
            {featured.points.map((p) => (
              <div key={p.title} data-reveal>
                <dt className="title mb-2 text-[1.6rem]">{p.title}</dt>
                <dd className="measure text-ink-2">{p.body}</dd>
              </div>
            ))}
          </dl>

          <div data-reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href={featured.url} target="_blank" rel="noopener noreferrer" className="btn btn-ink border border-ink">
              Visit {featured.domain}
              <span aria-hidden="true">↗</span>
            </a>
            <a href={featured.github} target="_blank" rel="noopener noreferrer" className="link text-ink-2 hover:text-ink">
              Read the source on GitHub
            </a>
          </div>
          <p data-reveal className="mt-10 text-[0.95rem] text-ink-3">
            Built with {featured.stack.join(", ")}.
          </p>
        </div>

        {/* Live demo: the template personalises itself as you scroll */}
        <div className="lg:col-span-7 lg:col-start-6">
          <div ref={demo} className="lg:sticky lg:top-28">
            <figure
              data-reveal
              className="overflow-hidden rounded-2xl bg-paper shadow-[0_1px_0_var(--rule),0_30px_60px_-30px_rgba(21,22,27,0.25)] ring-1 ring-rule"
            >
              <div className="flex items-center gap-2 border-b border-rule px-5 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rule" />
                <span className="h-2.5 w-2.5 rounded-full bg-rule" />
                <span className="h-2.5 w-2.5 rounded-full bg-rule" />
                <span className="ml-3 text-sm text-ink-3">New campaign</span>
              </div>

              <div className="grid md:grid-cols-[1fr_15rem]">
                <div className="p-6 md:p-8">
                  <div className="mb-5 space-y-2 border-b border-rule pb-5 text-[0.95rem]">
                    <p className="flex gap-3">
                      <span className="w-16 shrink-0 text-ink-3">To</span>
                      <span>
                        <Field token="email" value={`${active.name.toLowerCase()}@example.com`} resolved={resolved} />
                      </span>
                    </p>
                    <p className="flex gap-3">
                      <span className="w-16 shrink-0 text-ink-3">Subject</span>
                      <span>
                        Your seat at <Field token="event" value={active.event} resolved={resolved} />
                      </span>
                    </p>
                  </div>
                  <div className="space-y-4 text-[1.05rem] leading-relaxed">
                    <p>
                      Hi <Field token="name" value={active.name} resolved={resolved} />,
                    </p>
                    <p className="text-ink-2">
                      Thanks for registering. Your place at <Field token="event" value={active.event} resolved={resolved} /> is
                      confirmed, and the joining details are below.
                    </p>
                    <p className="text-ink-2">See you there.</p>
                  </div>
                </div>

                <div className="border-t border-rule bg-paper-deep/60 p-6 md:border-l md:border-t-0">
                  <p className="mb-4 text-sm text-ink-3">recipients.csv</p>
                  <ul className="space-y-1.5">
                    {recipients.map((r, i) => {
                      const isSent = i < sent;
                      const isActive = i === step;
                      return (
                        <li
                          key={r.name}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 text-[0.95rem] transition-colors duration-300 ${
                            isActive ? "bg-cobalt text-on-cobalt" : isSent ? "text-ink-2" : "text-ink-3"
                          }`}
                        >
                          <span>{r.name}</span>
                          <span className="text-xs">{isActive ? "Sending" : isSent ? "Sent" : "Queued"}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-6">
                    <div className="h-1 overflow-hidden rounded-full bg-rule">
                      <div
                        className="h-full rounded-full bg-cobalt transition-[width] duration-500 ease-[var(--ease-out)]"
                        style={{ width: `${(sent / n) * 100}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-ink-3">
                      {sent === n ? "All sent" : `${sent} of ${n} sent`}
                    </p>
                  </div>
                </div>
              </div>
            </figure>
            <figcaption className="mt-4 text-[0.95rem] text-ink-3">
              Scroll to watch one template become a personal email for each person. Illustration of the Flier composer.
            </figcaption>
          </div>
        </div>
      </div>
    </section>
  );
}
