import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, OutIcon } from "@/components/icons";
import { PageHead } from "@/components/PageHead";
import { papers, profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Research",
  description: "Published research by Aditya Mer at IEEE TENSYMP 2024 and Taylor & Francis (CRC Press) 2025.",
  alternates: { canonical: "/research" },
};

const RELATED = [
  { slug: "verify-news", label: "Verify News" },
  { slug: "fastwrite", label: "FastWrite" },
  { slug: "ai-research-agent", label: "AI Research Agent" },
];

export default function ResearchPage() {
  return (
    <>
      <PageHead title="Research">
        {papers.length} published works from my time studying AI and data science, on misinformation detection and
        automated code documentation.
      </PageHead>
      <section className="page-body">
        {papers.map((p) => (
          <article className="paper rv" id={p.slug} key={p.slug}>
            <div className="meta mono">
              <b>{p.venueShort}</b>
              <span>{p.kind}</span>
              <span>{p.year}</span>
              <span>{p.status}</span>
            </div>
            <div>
              <h2>
                <a href={p.url} target="_blank" rel="noopener">
                  {p.title}
                </a>
              </h2>
              <p className="abs">{p.abstract}</p>
              <ul>
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="authors">
                {p.authors.map((a, i) => (
                  <span key={a.name}>
                    {i > 0 && ", "}
                    {a.name === profile.name || !a.url ? (
                      <span className={a.name === profile.name ? "me" : undefined}>{a.name}</span>
                    ) : (
                      <a href={a.url} target="_blank" rel="noopener">
                        {a.name}
                      </a>
                    )}
                  </span>
                ))}
              </p>
              <p className="tags mono">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </p>
              <div className="links">
                <a href={p.url} target="_blank" rel="noopener">
                  Read on {p.readOn} <OutIcon />
                </a>
              </div>
            </div>
          </article>
        ))}
        <div className="related rv">
          <p className="mono">Related projects</p>
          <div className="links">
            {RELATED.map((r) => (
              <Link key={r.slug} href={`/projects#${r.slug}`}>
                {r.label} <ArrowIcon />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
