import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="page-head page-404">
      <p className="mono faint">404</p>
      <h1 className="h1p">This page doesn&apos;t exist</h1>
      <p className="page-sub">It may have moved when the site was redesigned.</p>
      <div className="actions">
        <Link className="btn btn-ink" href="/">
          Back to the home page <ArrowIcon />
        </Link>
        <Link className="cue" href="/projects">
          See all projects
        </Link>
      </div>
    </section>
  );
}
