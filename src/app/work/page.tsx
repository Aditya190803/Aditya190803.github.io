import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PrimaryCta } from "@/components/ui";
import { clientWork, projects } from "@/lib/data";
import { hostname } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work archive",
  description:
    "Every client project, product and open-source package: websites with custom CMSs, a SaaS email platform, e-commerce, LLM apps, ML models and Python packages.",
  alternates: { canonical: "/work" },
};

type Row = {
  name: string;
  kind: string;
  description: string;
  tech?: string;
  links: { label: string; href: string }[];
  note?: string;
  internalHref?: string;
};

const clientRows: Row[] = clientWork.map((w) => ({
  name: w.client,
  kind: w.type,
  description: w.summary,
  links: w.url && !w.internal ? [{ label: hostname(w.url), href: w.url }] : [],
  note: w.internal ? "Private" : undefined,
  internalHref: `/#${w.slug}`,
}));

const projectRows: Row[] = projects.map((p) => ({
  name: p.title,
  kind: p.category,
  description: p.stats ? `${p.description} ${p.stats}.` : p.description,
  tech: p.technologies.join(", "),
  links: [
    ...(p.demo ? [{ label: "Live app", href: p.demo }] : []),
    ...(p.pypi ? [{ label: "PyPI", href: p.pypi }] : []),
    ...(p.github ? [{ label: "Source", href: p.github }] : []),
  ],
}));

function ArchiveTable({ id, title, rows }: { id: string; title: string; rows: Row[] }) {
  return (
    <section aria-labelledby={id} className="mt-16 md:mt-20">
      <div className="flex items-baseline justify-between border-b border-ink pb-3">
        <h2 id={id} className="font-display text-xl font-medium tracking-[-0.015em]">
          {title}
        </h2>
        <p className="label tabular-nums">{rows.length}</p>
      </div>
      <ul className="divide-y divide-line">
        {rows.map((r) => (
          <li key={r.name} className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-12">
            <div className="md:col-span-3">
              <h3 className="font-display text-lg font-medium tracking-[-0.015em]">
                {r.internalHref ? (
                  <Link href={r.internalHref} className="hover:text-accent">
                    {r.name}
                  </Link>
                ) : (
                  r.name
                )}
              </h3>
              <p className="label mt-1">{r.kind}</p>
            </div>
            <div className="md:col-span-6">
              <p className="text-[15px] leading-relaxed text-muted">{r.description}</p>
              {r.tech && (
                <p className="mt-2 font-mono text-[11px] leading-relaxed text-faint">{r.tech}</p>
              )}
            </div>
            <ul className="flex flex-wrap content-start gap-x-4 gap-y-1.5 md:col-span-3 md:justify-end">
              {r.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium hover:text-accent"
                  >
                    {l.label}
                    <ArrowUpRight size={14} className="text-faint" aria-hidden="true" />
                  </a>
                </li>
              ))}
              {r.note && (
                <li className="inline-flex items-center gap-1.5 text-sm text-faint">
                  <Lock size={13} aria-hidden="true" />
                  {r.note}
                </li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 md:pt-40">
        <div className="container-page">
          <header className="max-w-3xl">
            <p className="label">Archive</p>
            <h1 className="display mt-5 text-5xl md:text-7xl">Everything I&apos;ve shipped.</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Client projects first, then my own products, packages and experiments.
            </p>
          </header>

          <ArchiveTable id="clients" title="Client work" rows={clientRows} />
          <ArchiveTable
            id="projects"
            title="Products, open source and experiments"
            rows={projectRows}
          />

          <div className="section flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <p className="display max-w-xl text-4xl md:text-5xl">Have something similar in mind?</p>
            <PrimaryCta />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
