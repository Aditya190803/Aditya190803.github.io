import { Research } from '@/components/sections/Research';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research | Aditya Mer',
  description: 'Published research in misinformation detection, AI-powered code documentation, and NLP.',
};

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] pt-24 md:pt-32">
      <Research />
    </main>
  );
}
