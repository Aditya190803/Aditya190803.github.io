import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="wrap flex min-h-[100svh] flex-col justify-center py-24">
      <p className="mb-6 text-ink-3">Error 404</p>
      <h1 className="display mb-8 max-w-[14ch] text-[clamp(3rem,9vw,8rem)]">This page doesn&apos;t exist.</h1>
      <p className="measure mb-10 text-[1.15rem] text-ink-2">
        The link may be old, or the address may have a typo. The work, services and contact form are all on the home
        page.
      </p>
      <div>
        <Link href="/" className="btn btn-primary">
          Go to the home page
        </Link>
      </div>
    </main>
  );
}
