import { Skills } from '@/components/sections/Skills';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills | Aditya Mer',
  description: 'Technical skills and tools spanning machine learning, generative AI, full-stack development, and cloud infrastructure.',
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] pt-24 md:pt-32">
      <Skills />
    </main>
  );
}
