import Image from "next/image";
import Link from "next/link";
import {
  clientWork,
  education,
  experience,
  faqs,
  flier,
  homeProjects,
  papers,
  profile,
  projects,
  services,
  steps,
} from "@/lib/data";
import { ArrowIcon, DownIcon, GitHubIcon, LockIcon, OutIcon, PlusIcon } from "./icons";
import { Rule, Section, delay } from "./Site";

const ext = { target: "_blank", rel: "noopener" } as const;

export function Hero() {
  return (
    <section className="hero" aria-labelledby="h1">
      <div>
        <h1 className="name rv" id="h1" style={delay(1)}>
          {profile.name}
        </h1>
        <p className="role rv" style={delay(2)}>
          {profile.intro}
        </p>
        <p className="now mono rv" style={delay(3)}>
          <span>Currently</span>
          <b>
            {profile.current.title} at {profile.current.company}
          </b>
        </p>
        <div className="actions rv" style={delay(4)}>
          <Link className="btn btn-ink" href="#contact">
            Start a project <ArrowIcon />
          </Link>
          <Link className="cue" href="#work">
            See my work <DownIcon />
          </Link>
        </div>
      </div>

      <figure className="flag">
        <a className="stage" href={flier.url} {...ext} aria-label={`${flier.name}, open ${flier.domain}`}>
          <div className="win rv" style={delay(3)}>
            <div className="bar">
              <i />
              <i />
              <i />
              <span>{flier.domain}</span>
            </div>
            <Image src={flier.image} alt="Flier mail-merge app" width={1600} height={1000} priority />
          </div>
          <div className="phone rv" style={delay(5)}>
            <Image src={flier.imageMobile} alt="Flier on a phone" width={560} height={1211} priority />
          </div>
        </a>
        <figcaption className="flag-cap rv" style={delay(4)}>
          <div>
            <p className="eyebrow mono">My product</p>
            <h2>{flier.name}</h2>
            <p className="desc">{flier.tagline}</p>
          </div>
          <div className="flag-links">
            <a className="ghlink" href={flier.github} {...ext} aria-label="Flier source code on GitHub" title="Source on GitHub">
              <GitHubIcon />
            </a>
            <a className="btn btn-line" href={flier.url} {...ext}>
              Visit {flier.domain} <OutIcon />
            </a>
          </div>
          <p className="usedby">
            <span className="mono">Used at</span>
            <b>{flier.usedBy}</b>
          </p>
        </figcaption>
      </figure>
    </section>
  );
}

export function Work() {
  return (
    <Section id="work" title="Work" sub="A few recent client projects, each designed, built and handed over to the team that runs it.">
      <div className="clients">
        {clientWork.map((w, i) => (
          <article className="card rv" style={delay(i)} key={w.slug}>
            {w.private ? (
              <a className="tile" href={w.url} {...ext} aria-label={`${w.client}, ${w.domain}`}>
                <b>{w.tileLabel}</b>
                <span className="mono lock">
                  <LockIcon style={{ width: 12, height: 12 }} />
                  Private work for the firm
                </span>
              </a>
            ) : (
              <a className="shot" href={w.url} {...ext}>
                <Image src={w.image!} alt={`${w.client} website home page`} width={1600} height={1000} />
              </a>
            )}
            <div className="card-body">
              <div>
                <p className="sector mono">{w.sector}</p>
                <h3>{w.client}</h3>
                <p className="kind">{w.kind}</p>
              </div>
              <a className="go" href={w.url} {...ext}>
                {w.domain} <OutIcon />
              </a>
              <p className="sum">{w.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Projects() {
  return (
    <Section id="projects" title="Projects" sub="Open-source tools and experiments I build alongside client work.">
      <div className="fp-grid">
        {homeProjects.map((p, i) => (
          <article className="fp rv" style={delay(i)} key={p.slug}>
            <p className="mono fp-cat">{p.category}</p>
            <h3>
              <Link href={`/projects#${p.slug}`}>{p.title}</Link>
            </h3>
            <p className="fp-d">{p.short}</p>
            {p.stat && (
              <p className="fp-stat">
                <b>{p.stat.value}</b> downloads in its first month
              </p>
            )}
            <div className="links fp-links">
              {p.pypi && (
                <a href={p.pypi} {...ext}>
                  PyPI <OutIcon />
                </a>
              )}
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
            </div>
          </article>
        ))}
      </div>
      <div className="fp-more rv">
        <Link className="btn btn-line" href="/projects">
          See all {projects.length} projects <ArrowIcon />
        </Link>
        <a className="ghlink" href={profile.github} {...ext} aria-label="All my code on GitHub" title="GitHub">
          <GitHubIcon />
        </a>
      </div>
    </Section>
  );
}

export function Services() {
  return (
    <Section id="services" title="Services" sub="Four kinds of work, each quoted as a fixed project.">
      <div className="svc-wrap">
        <ul className="svc2">
          {services.map((s, i) => (
            <li className="rv" style={delay(i)} key={s.title}>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
              <p className="ex mono">
                Example <Link href={s.example.href}>{s.example.label}</Link>
              </p>
            </li>
          ))}
        </ul>
        <aside className="how rv" style={delay(1)} id="process" aria-labelledby="how-h">
          <h3 id="how-h">How a project runs</h3>
          <p className="how-sub">You know the scope and the price before any work starts.</p>
          <ol>
            {steps.map((s) => (
              <li key={s.title}>
                <b>{s.title}</b>
                <span>{s.body}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </Section>
  );
}

export function About() {
  const roles = experience.filter((e) => e.summary || e.note).slice(0, 3);
  const degree = education[0];
  return (
    <Section id="about" title="About">
      <p className="bio rv">
        {profile.bio} <span>{profile.bioMuted}</span>
      </p>
      <div className="row rv">
        <h3 className="mono">Experience</h3>
        <ol className="list">
          {roles.map((e) => (
            <li key={e.company}>
              <span className="mono when">{e.period}</span>
              <div>
                <h4>
                  {e.role}, {e.company}
                </h4>
                {e.summary && <p>{e.summary}</p>}
                {e.note && <p className="mono sub">{e.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="row rv">
        <h3 className="mono">Education</h3>
        <ol className="list">
          <li>
            <span className="mono when">{degree.period}</span>
            <div>
              <h4>{degree.degree}</h4>
              <p>{degree.institution}</p>
            </div>
          </li>
        </ol>
      </div>
      <Link className="resume-link rv" href="/resume">
        Full résumé with skills and certifications <ArrowIcon />
      </Link>
    </Section>
  );
}

export function Research() {
  return (
    <Section id="research" title="Research" sub="Published work from my AI and data science studies.">
      <div className="rlist rv">
        {papers.map((p) => (
          <Link href={`/research#${p.slug}`} key={p.slug}>
            <span className="mono">
              {p.venueShort}, {p.year}
            </span>
            <h3>{p.title}</h3>
            <ArrowIcon />
          </Link>
        ))}
      </div>
      <div className="links sec-foot rv">
        <Link href="/research">
          Abstracts, authors and links <ArrowIcon />
        </Link>
      </div>
    </Section>
  );
}

export function Faq() {
  return (
    <section className="sec sec-pad" id="faq" aria-labelledby="faq-h">
      <Rule />
      <div className="faq-grid">
        <div>
          <h2 className="h2 rv" id="faq-h">
            FAQ
          </h2>
          <p className="sec-sub rv" style={delay(1)}>
            Something else on your mind? Ask it on the first call.
          </p>
        </div>
        <div className="faq rv">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <PlusIcon />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
