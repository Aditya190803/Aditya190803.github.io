'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { research } from '@/lib/data';
import { PageShell } from '@/components/layout/PageShell';
import { DetailHero } from '@/components/layout/DetailHero';
import { DetailSection, RevealItem } from '@/components/layout/DetailSection';
import { Reveal, RevealStagger } from '@/components/ui/ScrollReveal';

export default function ResearchDetailClient() {
  const params = useParams();
  const slug = (params?.slug as string) || '';

  const paper = research.papers.find((p) => p.slug === slug);

  if (!paper) {
    return (
      <PageShell className="flex items-center justify-center">
        <div className="section-container text-center">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold mb-4">Paper not found</h1>
          <Link
            href="/research"
            className="text-sm font-medium text-[var(--accent)] hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ← Back to research
          </Link>
        </div>
      </PageShell>
    );
  }

  const idx = research.papers.indexOf(paper);
  const nextPaper = research.papers[idx + 1] || research.papers[0];

  return (
    <PageShell>
      <DetailHero
        backHref="/research"
        backLabel="Back to research"
        eyebrow={
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs font-medium text-[var(--fg-muted)] uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
              {paper.venueShort} · {paper.year}
            </span>
            <span className="text-xs font-medium text-[var(--accent-green)] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
              ● {paper.status}
            </span>
          </div>
        }
        title={paper.title}
        description={paper.venue}
      />

      <DetailSection number="01" label="Abstract">
        <Reveal>
          <p className="text-xl md:text-2xl leading-relaxed text-[var(--fg)]/70 font-light">{paper.abstract}</p>
        </Reveal>
      </DetailSection>

      <DetailSection number="02" label="Highlights" stagger>
        {paper.highlights.map((h, i) => (
          <RevealItem key={i}>
            <div className="flex items-start gap-6">
              <span
                className="text-xs font-medium text-[var(--fg-muted)]/40 shrink-0 w-8 text-right pt-1"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-base md:text-lg text-[var(--fg)]/70 leading-relaxed">{h}</p>
            </div>
          </RevealItem>
        ))}
      </DetailSection>

      <DetailSection number="03" label="Authors">
        <RevealStagger className="flex flex-wrap gap-x-8 gap-y-3">
          {paper.authors.map((a) => (
            <RevealItem key={a.name}>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-[var(--accent)] hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {a.name}
              </a>
            </RevealItem>
          ))}
        </RevealStagger>
      </DetailSection>

      <DetailSection number="04" label="Topics">
        <RevealStagger className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
          {paper.tags.map((tag) => (
            <RevealItem key={tag}>
              <span
                className="text-sm font-medium text-[var(--fg-muted)] uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                #{tag.replace(/\s+/g, '')}
              </span>
            </RevealItem>
          ))}
        </RevealStagger>
        <Reveal delay={0.15}>
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--fg)] text-sm font-medium hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Read full paper <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </DetailSection>

      {research.papers.length > 1 && (
        <Reveal y={32}>
          <section className="border-t border-[var(--border)]">
            <Link href={`/research/${nextPaper.slug}`} className="block group relative overflow-hidden">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[var(--fg)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
            <div className="section-container relative py-14 md:py-20">
              <div className="flex items-center justify-between gap-8">
                <div className="min-w-0">
                  <span
                    className="text-[11px] font-medium uppercase tracking-widest text-[var(--fg-muted)] group-hover:text-[var(--bg)]/60 transition-colors duration-500"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Next paper — {nextPaper.venueShort} · {nextPaper.year}
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] mt-3 group-hover:text-[var(--bg)] transition-colors duration-500">
                    {nextPaper.title}
                  </h2>
                </div>
                <span className="shrink-0 grid place-items-center w-14 h-14 md:w-20 md:h-20 border border-[var(--fg)] group-hover:border-[var(--bg)] transition-colors duration-500">
                  <ArrowRight
                    size={26}
                    strokeWidth={1.5}
                    className="text-[var(--fg)] group-hover:text-[var(--bg)] group-hover:translate-x-1 transition-all duration-500"
                  />
                </span>
              </div>
            </div>
            </Link>
          </section>
        </Reveal>
      )}
    </PageShell>
  );
}