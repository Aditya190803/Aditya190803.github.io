"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/data";
import { OutIcon, PlusIcon } from "./icons";
import { delay } from "./Site";

const ext = { target: "_blank", rel: "noopener" } as const;

export function ProjectList({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("all");
  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter by category">
        {["all", ...categories].map((c) => (
          <button key={c} className="chip" type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {c === "all" ? "All" : c}
            <span>{c === "all" ? projects.length : projects.filter((p) => p.category === c).length}</span>
          </button>
        ))}
      </div>
      <div className="pgrid">
        {shown.map((p, i) => (
          // Cards added by a filter change skip the scroll reveal and show straight away.
          <article className={`pcard rv${filter === "all" ? "" : " in"}`} id={p.slug} style={delay(i % 2)} key={p.slug}>
            <div className="top mono">
              <span>{p.category}</span>
              {p.featured && <span>Featured</span>}
            </div>
            <h2>{p.title}</h2>
            <p className="d">{p.description}</p>
            {p.stat && (
              <p className="stat">
                <b style={{ fontWeight: 500 }}>{p.stat.value}</b>&nbsp;{p.stat.label}
              </p>
            )}
            {p.note === "flier" && (
              <p className="note-flier">
                The open-source version of <Link href="/#top">Flier</Link>, my product.
              </p>
            )}
            <p className="tags mono">
              {p.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </p>
            <details>
              <summary>
                <PlusIcon />
                What it does and what I learned
              </summary>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              {p.lesson && <p className="lesson">{p.lesson}</p>}
            </details>
            <div className="links">
              {p.demo && (
                <a href={p.demo} {...ext}>
                  Live <OutIcon />
                </a>
              )}
              {p.github && (
                <a href={p.github} {...ext}>
                  Code <OutIcon />
                </a>
              )}
              {p.pypi && (
                <a href={p.pypi} {...ext}>
                  PyPI <OutIcon />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
