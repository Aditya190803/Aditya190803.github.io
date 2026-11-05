import { ArrowUpRight, FileText } from "lucide-react";
import { experience, profile, projects, research } from "@/lib/data";
import SectionHead from "./SectionHead";

const fastwrite = projects.find((p) => p.title === "FastWrite");

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="wrap grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <SectionHead
            id="about-title"
            label="About"
            title="One person, from the first call to launch."
          />
          <div className="t-body measure mt-6 space-y-4">
            <p>
              I&apos;m Aditya Mer, a developer based in Mumbai with a B.Tech in Artificial Intelligence and Data
              Science. I&apos;ve built web products since 2022, through internships at software firms and as the
              developer behind the IASCC website.
            </p>
            <p>
              You work with me directly: the person on the call is the person writing the code. My research
              background means I&apos;ll tell you plainly when AI will help your project, and when a simpler tool
              will do the job better.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/resume" className="btn btn--secondary">
              <FileText size={18} aria-hidden /> View my résumé
            </a>
          </div>
          <p className="t-small muted mt-5">
            Also on{" "}
            <a href={profile.github} className="link" target="_blank" rel="noreferrer">GitHub</a> and{" "}
            <a href={profile.linkedin} className="link" target="_blank" rel="noreferrer">LinkedIn</a>.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="frame rounded-lg bg-white p-6 sm:p-8">
            <span className="plus plus--tl" aria-hidden />
            <span className="plus plus--tr" aria-hidden />
            <span className="plus plus--bl" aria-hidden />
            <span className="plus plus--br" aria-hidden />

            <h3 className="t-label">Published research</h3>
            <ul className="rows mt-3">
              {research.papers.map((p) => (
                <li key={p.url}>
                  <a href={p.url} target="_blank" rel="noreferrer" className="group flex items-start justify-between gap-4 py-4">
                    <span>
                      <span className="block text-[15px] font-medium leading-snug text-ink group-hover:text-accent transition-colors">
                        {p.title}
                      </span>
                      <span className="t-small muted mt-1 block">{p.venue}</span>
                    </span>
                    <ArrowUpRight size={16} className="mt-1 shrink-0 text-muted" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>

            {fastwrite ? (
              <>
                <h3 className="t-label mt-8">Open source</h3>
                <a
                  href={fastwrite.pypi}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-3 flex items-start justify-between gap-4 border-y border-line py-4"
                >
                  <span>
                    <span className="block text-[15px] font-medium text-ink group-hover:text-accent transition-colors">
                      FastWrite, a Python package for writing code docs with LLMs
                    </span>
                    <span className="t-small muted mt-1 block">6,000+ PyPI downloads in its first month</span>
                  </span>
                  <ArrowUpRight size={16} className="mt-1 shrink-0 text-muted" aria-hidden />
                </a>
              </>
            ) : null}

            <h3 className="t-label mt-8">Experience</h3>
            <ul className="rows mt-3">
              {experience.slice(0, 3).map((e) => (
                <li key={e.company} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-[15px] text-ink">
                    {e.role}, <span className="text-ink-2">{e.company}</span>
                  </span>
                  <span className="t-small muted shrink-0 tnum">{e.period.split("–")[1]?.trim() ?? e.period}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
