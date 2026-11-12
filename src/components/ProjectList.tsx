"use client";

import Link from "next/link";
import { useState } from "react";
import { flushSync } from "react-dom";
import type { Project } from "@/lib/data";
import { OutIcon, PlusIcon } from "./icons";
import { delay } from "./Site";

const ext = { target: "_blank", rel: "noopener" } as const;

export function ProjectList({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("all");
  // Once a filter has been used, cards stay revealed (the scroll observer only runs once per page).
  const [touched, setTouched] = useState(false);

  function pick(c: string) {
    const apply = () => {
      setTouched(true);
      setFilter(c);
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Let the cards slide to their new places where the browser supports it.
    if (!reduce && "startViewTransition" in document) document.startViewTransition(() => flushSync(apply));
    else apply();
  }
  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter by category">
        {["all", ...categories].map((c) => (
          <button key={c} className="chip" type="button" aria-pressed={filter === c} onClick={() => pick(c)}>
            {c === "all" ? "All" : c}
            <span>{c === "all" ? projects.length : projects.filter((p) => p.category === c).length}</span>
          </button>
        ))}
      </div>
      <div className="pgrid">
        {shown.map((p, i) => (
          // Cards shown after a filter change skip the scroll reveal and show straight away.
          <article
            className={`pcard rv${touched ? " in" : ""}`}
            id={p.slug}
            style={{ ...delay(i % 2), viewTransitionName: `p-${p.slug}` }}
            key={p.slug}
          >
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
