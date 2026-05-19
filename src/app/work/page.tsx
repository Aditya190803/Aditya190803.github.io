import { Projects } from '@/components/sections/Projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work | Aditya Mer',
  description: 'Selected projects spanning generative AI, machine learning, and full-stack development.',
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] pt-24 md:pt-32">
      <Projects />
    </main>
  );
}
