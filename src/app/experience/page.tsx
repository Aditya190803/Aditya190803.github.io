import { Experience } from '@/components/sections/Experience';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience | Aditya Mer',
  description: 'Professional experience spanning ML engineering, generative AI, research, and full-stack development.',
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] pt-24 md:pt-32">
      <Experience />
    </main>
  );
}
