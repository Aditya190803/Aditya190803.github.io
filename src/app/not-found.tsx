import Navbar from "@/components/Navbar";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="container-page flex min-h-screen flex-col items-start justify-center py-28">
        <p className="eyebrow mb-4">404</p>
        <h1 className="display text-5xl md:text-7xl">This page doesn&apos;t exist.</h1>
        <p className="mt-5 max-w-md text-lg text-muted">
          The link may be old or mistyped. Let&apos;s get you back to something useful.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Go home</ButtonLink>
          <ButtonLink href="/work" variant="secondary">
            See my work
          </ButtonLink>
        </div>
      </main>
    </>
  );
}
