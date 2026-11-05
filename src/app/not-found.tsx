import Link from "next/link";
import { profile } from "@/lib/data";

export default function NotFound() {
  return (
    <main className="flex min-h-[70svh] items-center bg-ground py-24">
      <div className="wrap">
        <p className="t-label tnum">404</p>
        <h1 className="t-h1 mt-4">Page not found</h1>
        <p className="t-lead measure mt-6">
          This page has moved or never existed. The homepage has the work, services and contact details.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn--primary btn--block-sm">
            Go to the homepage
          </Link>
          <a href={`mailto:${profile.email}`} className="btn btn--secondary btn--block-sm">
            Email Aditya
          </a>
        </div>
      </div>
    </main>
  );
}
