import { Skills } from '@/components/sections/Skills';
import { PageShell } from '@/components/layout/PageShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills | Aditya Mer',
  description: 'Technical skills and tools spanning machine learning, generative AI, full-stack development, and cloud infrastructure.',
};

export default function SkillsPage() {
  return (
    <PageShell>
      <Skills />
    </PageShell>
  );
}