import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center p-4">
      <div className="section-container text-center">
        <span
          className="text-xs font-medium text-[var(--fg)]/20 mb-6 block"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Error 404
        </span>

        <h1 className="font-display text-7xl md:text-9xl font-bold leading-[0.85] tracking-tight mb-6">
          Page not
          <br />
          found
        </h1>

        <p className="text-base md:text-lg text-[var(--fg)]/50 max-w-md mx-auto mb-10 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--fg)] text-sm font-medium hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all duration-300"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          ← Back home
        </Link>
      </div>
    </main>
  );
}
