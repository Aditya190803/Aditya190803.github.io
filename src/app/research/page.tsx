import { Research } from '@/components/sections/Research';
import { PageShell } from '@/components/layout/PageShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research | Aditya Mer',
  description: 'Published research in misinformation detection, AI-powered code documentation, and NLP.',
};

export default function ResearchPage() {
  return (
    <PageShell>
      <Research />
    </PageShell>
  );
}