import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClientCard, ProjectCard } from "@/components/Work";
import { ButtonLink } from "@/components/ui";
import { clientWork, projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work | Aditya Mer",
  description:
    "Client projects, AI products and open-source work: websites, SaaS platforms, LLM apps and machine learning models.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 md:pt-36">
        <div className="container-page">
          <header className="max-w-3xl">
            <p className="eyebrow mb-4">Work</p>
            <h1 className="display text-5xl md:text-7xl text-balance">Everything I&apos;ve shipped.</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Client projects first, then the products, packages and experiments I&apos;ve built along the way.
            </p>
          </header>

          <section className="mt-16" aria-labelledby="client-heading">
            <h2 id="client-heading" className="eyebrow mb-6">
              Client work
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {clientWork.map((w) => (
                <ClientCard key={w.slug} work={w} />
              ))}
            </div>
          </section>

          <section className="mt-20" aria-labelledby="projects-heading">
            <h2 id="projects-heading" className="eyebrow mb-6">
              Products, open source &amp; experiments
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.title} project={p} />
              ))}
            </div>
          </section>

          <div className="section flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <p className="display text-3xl md:text-4xl">Have something similar in mind?</p>
            <ButtonLink href="/#contact">Start a project</ButtonLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
