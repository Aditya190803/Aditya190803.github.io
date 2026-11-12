import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import {
  certifications,
  clientWork,
  education,
  experience,
  flier,
  papers,
  profile,
  projects,
  skills,
} from "@/lib/data";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Résumé of Aditya Mer, full-stack developer and ML engineer in Mumbai.",
  alternates: { canonical: "/resume" },
};

function Item({ title, when, sub, items }: { title: React.ReactNode; when?: string; sub?: string; items?: string[] }) {
  return (
    <div className="cv-item">
      <div className="hd">
        <h3>{title}</h3>
        {when && <span className="mono when">{when}</span>}
      </div>
      {sub && <p className="sub">{sub}</p>}
      {items && items.length > 0 && (
        <ul>
          {items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ResumePage() {
  const publicWork = clientWork.filter((w) => !w.private);
  return (
    <>
      <PageHead title="Résumé">
        My experience, education, research and skills in one place. Print it or save it as a PDF.
      </PageHead>
      <section className="page-body">
        <div className="cv-bar noprint">
          <span className="mono faint">Printable, A4</span>
          <PrintButton />
        </div>
        <article className="cv">
          <header className="cv-top">
            <div>
              <h1>{profile.name}</h1>
              <p className="t">{profile.resumeTitle}</p>
            </div>
            <div className="cv-contact">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span>{profile.location}</span>
              <a href={profile.github}>github.com/aditya190803</a>
              <a href={profile.linkedin}>linkedin.com/in/adityamer</a>
            </div>
          </header>

          <section className="cv-sec">
            <h2>Experience</h2>
            <div>
              {experience.map((e) => (
                <Item
                  key={e.company + e.period}
                  title={`${e.role}, ${e.company}`}
                  when={e.period}
                  sub={e.note ? `${e.location}. ${e.note}` : e.location}
                  items={e.highlights}
                />
              ))}
            </div>
          </section>

          <section className="cv-sec">
            <h2>Selected work</h2>
            <div>
              <Item title={`${flier.name}, my product`} when={flier.domain} sub={flier.summary} />
              {publicWork.map((w) => (
                <Item key={w.slug} title={w.client} when={w.year} sub={`${w.kind}. ${w.summary}`} />
              ))}
            </div>
          </section>

          <section className="cv-sec">
            <h2>Research</h2>
            <div>
              {papers.map((p) => (
                <Item
                  key={p.slug}
                  title={
                    <a href={p.url} target="_blank" rel="noopener">
                      {p.title}
                    </a>
                  }
                  when={p.year}
                  sub={p.venue}
                />
              ))}
            </div>
          </section>

          <section className="cv-sec">
            <h2>Projects</h2>
            <div>
              {projects
                .filter((p) => p.featured)
                .map((p) => (
                  <Item key={p.slug} title={p.title} when={p.category} sub={p.description} />
                ))}
            </div>
          </section>

          <section className="cv-sec">
            <h2>Education</h2>
            <div>
              {education.map((e) => (
                <Item key={e.degree} title={e.degree} when={e.period} sub={e.institution} />
              ))}
            </div>
          </section>

          <section className="cv-sec">
            <h2>Skills</h2>
            <dl className="cv-skills">
              {Object.entries(skills).map(([k, v]) => (
                <div key={k} style={{ display: "contents" }}>
                  <dt>{k}</dt>
                  <dd>{v.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="cv-sec">
            <h2>Certifications</h2>
            <ul className="cv-certs">
              {certifications.map((c) => (
                <li key={c.title}>
                  <span>
                    {c.url ? (
                      <a href={c.url} target="_blank" rel="noopener">
                        {c.title}
                      </a>
                    ) : (
                      c.title
                    )}
                  </span>
                  <span className="muted">
                    {c.issuer}, {c.date}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </section>
    </>
  );
}
