import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { ProjectList } from "@/components/ProjectList";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Open-source tools, side projects and experiments by Aditya Mer, from GenAI apps to ML models.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHead title="Projects">
        Open source, side projects and experiments. My client work is on the{" "}
        <Link className="cue" href="/#work">
          home page
        </Link>
        .
      </PageHead>
      <section className="page-body">
        <ProjectList projects={projects} />
      </section>
    </>
  );
}
