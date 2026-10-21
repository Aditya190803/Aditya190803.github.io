import Link from "next/link";
import { profile, projects, research } from "@/lib/data";

const facts = [
  { k: "Based in", v: "Mumbai, working with clients anywhere" },
  { k: "Studied", v: "B.Tech in AI & Data Science, K. J. Somaiya Institute of Technology" },
  { k: "Published", v: "IEEE TENSYMP 2024 and a Taylor & Francis (CRC Press) book chapter" },
  { k: "Open source", v: "FastWrite, 6,000+ PyPI downloads in its first month" },
];

export default function About() {
  const lab = projects.filter((p) => p.featured && p.title !== "EchoMail");

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 id="about-title" data-reveal="split" className="display mb-10 text-[clamp(2.75rem,6vw,5.75rem)]">
              You work with me, start to finish.
            </h2>
            <div data-reveal className="measure space-y-5 text-[1.15rem] leading-relaxed text-ink-2">
              <p>
                No hand-offs, no junior team you never meet. I&apos;m the person on the call, the person designing your
                pages and the person writing the code, so decisions are quick and nothing gets lost in translation.
              </p>
              <p>
                My background is in applied AI research, which taught me to measure things rather than guess. That
                shows up in the work as fast pages, careful testing, and honest advice about where AI helps a business
                and where it doesn&apos;t.
              </p>
            </div>
          </div>

          <dl className="self-end lg:col-span-4 lg:col-start-9">
            {facts.map((f) => (
              <div key={f.k} data-reveal className="grid grid-cols-[7rem_1fr] gap-4 border-t border-rule py-5">
                <dt className="text-ink-3">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Lab: open source + research, kept compact */}
        <div id="lab" className="mt-28 md:mt-40">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h3 data-reveal className="title text-[clamp(2.2rem,4.5vw,3.75rem)]">From the lab</h3>
            <p data-reveal className="text-ink-2">
              Side projects and research.{" "}
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-static text-ink">
                More on GitHub
              </a>{" "}
              or the{" "}
              <Link href="/resume" className="link-static text-ink">
                full résumé
              </Link>
              .
            </p>
          </div>

          <ul className="grid gap-x-10 md:grid-cols-2">
            {lab.map((p) => {
              const href = p.demo || p.pypi || p.github;
              return (
                <li key={p.title} data-reveal className="border-t border-rule">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-6 py-6"
                  >
                    <span>
                      <span className="title mb-1.5 block text-[1.6rem] transition-colors group-hover:text-cobalt">
                        {p.title}
                      </span>
                      <span className="block text-ink-2">{p.description.split(/[.,]/)[0]}</span>
                    </span>
                    <span aria-hidden="true" className="text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cobalt">
                      ↗
                    </span>
                  </a>
                </li>
              );
            })}
            {research.papers.map((r) => (
              <li key={r.title} data-reveal className="border-t border-rule">
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="group flex items-baseline justify-between gap-6 py-6">
                  <span>
                    <span className="title mb-1.5 block text-[1.45rem] leading-snug transition-colors group-hover:text-cobalt">
                      {r.title}
                    </span>
                    <span className="block text-ink-2">
                      Paper, {r.venueShort.includes(r.year.slice(2)) ? r.venueShort : `${r.venueShort} ${r.year}`}
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cobalt">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
