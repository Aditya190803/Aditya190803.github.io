"use client";

import { useState } from "react";
import { ArrowUpRight, Check, FileSpreadsheet, Github, Send } from "lucide-react";
import { flier } from "@/lib/data";
import SectionHead from "./SectionHead";

type Recipient = (typeof flier.demo.recipients)[number];

/** Renders a template, either showing {{tokens}} or filling them for one recipient. */
function Template({ text, r }: { text: string; r: Recipient | null }) {
  const parts = text.split(/(\{\{\w+\}\})/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\{\{(\w+)\}\}$/);
        if (!m) return <span key={i}>{part}</span>;
        const key = m[1] as keyof Recipient;
        return r ? (
          <span key={i} className="filled">
            {r[key]}
          </span>
        ) : (
          <span key={i} className="var">
            {part}
          </span>
        );
      })}
    </>
  );
}

function Demo() {
  const { recipients, subject, body } = flier.demo;
  const [index, setIndex] = useState<number | null>(0);
  const r = index === null ? null : recipients[index];

  return (
    <div className="window shadow-[0_30px_60px_-30px_rgb(20_28_43/0.25)]">
      <div className="window__bar">
        <div className="window__dots" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <p className="mx-auto text-[13px] font-medium text-muted">Flier: new campaign</p>
        <div className="w-[42px]" aria-hidden />
      </div>

      <div className="grid md:grid-cols-[minmax(0,230px)_minmax(0,1fr)]">
        {/* Recipients from the CSV */}
        <div className="border-b border-line bg-ground p-4 md:border-b-0 md:border-r">
          <p className="flex items-center gap-2 px-2 text-[13px] font-medium text-muted">
            <FileSpreadsheet size={15} aria-hidden /> guests.csv · {recipients.length} rows
          </p>
          <div role="radiogroup" aria-label="Preview the email for" className="mt-3 grid grid-cols-2 gap-1 md:grid-cols-1">
            <button
              type="button"
              role="radio"
              aria-checked={index === null}
              onClick={() => setIndex(null)}
              className={`flex min-h-11 items-center rounded-sm px-3 text-left text-[14px] transition-colors duration-150 ${
                index === null ? "bg-white font-medium text-ink shadow-[0_0_0_1px_var(--line)]" : "text-ink-2 hover:bg-white/70"
              }`}
            >
              Template
            </button>
            {recipients.map((p, i) => (
              <button
                key={p.name}
                type="button"
                role="radio"
                aria-checked={index === i}
                onClick={() => setIndex(i)}
                className={`flex min-h-11 items-center gap-2.5 rounded-sm px-3 text-left text-[14px] transition-colors duration-150 ${
                  index === i ? "bg-white font-medium text-ink shadow-[0_0_0_1px_var(--line)]" : "text-ink-2 hover:bg-white/70"
                }`}
              >
                <span
                  aria-hidden
                  className={`grid size-6 shrink-0 place-items-center rounded-full text-[12px] font-medium ${
                    index === i ? "bg-accent text-white" : "bg-alt text-muted"
                  }`}
                >
                  {p.name[0]}
                </span>
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Message preview */}
        <div className="p-5 sm:p-7" aria-live="polite">
          <dl className="grid grid-cols-[64px_1fr] gap-y-2 border-b border-line pb-4 text-[14px]">
            <dt className="text-muted">To</dt>
            <dd className="text-ink-2">{r ? `${r.name} <${r.email}>` : "Each row of guests.csv"}</dd>
            <dt className="text-muted">Subject</dt>
            <dd className="font-medium text-ink">
              <Template text={subject} r={r} />
            </dd>
          </dl>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-2">
            {body.map((line) => (
              <p key={line}>
                <Template text={line} r={r} />
              </p>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <p className="flex items-center gap-2 text-[13px] text-muted">
              <Check size={15} className="text-accent" aria-hidden />
              Sends from your own Gmail
            </p>
            <span className="inline-flex h-9 items-center gap-2 rounded-sm bg-ink px-3.5 text-[13px] font-medium text-white" aria-hidden>
              <Send size={14} /> Send to {recipients.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Flier() {
  return (
    <section id="flier" aria-labelledby="flier-title" className="section section--alt relative isolate overflow-hidden">
      <div className="bg-dots -z-10 opacity-70" aria-hidden />
      <div className="wrap grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <SectionHead
            id="flier-title"
            label="My own product"
            title="Flier: personal emails to a whole list, from your Gmail."
            intro={flier.summary}
          />
          {flier.usedBy ? (
            <p className="pill mt-6">
              <span className="dot" aria-hidden />
              In use at {flier.usedBy}
            </p>
          ) : null}
          <ul className="rows mt-8">
            {flier.points.map((p) => (
              <li key={p.title} className="py-4">
                <h3 className="text-[16px] font-medium">{p.title}</h3>
                <p className="t-small mt-1 text-ink-2">
                  <Template text={p.body} r={null} />
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            <a href={flier.url} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1">
              Try {flier.domain} <ArrowUpRight size={16} aria-hidden />
            </a>
            <a href={flier.github} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1.5">
              <Github size={16} aria-hidden /> Read the source
            </a>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:pl-6">
          <p className="t-label mb-3">Pick a recipient to preview their email</p>
          <Demo />
          <p className="t-small muted mt-4">
            Built with {flier.stack.join(", ")}.
          </p>
        </div>
      </div>
    </section>
  );
}
