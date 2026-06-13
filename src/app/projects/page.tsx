import { Projects } from '@/components/sections/Projects';
import { PageShell } from '@/components/layout/PageShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Aditya Mer',
  description:
    'Case studies across generative AI, machine learning, research, and full-stack engineering — ATS systems, RAG pipelines, and production web apps.',
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <Projects />
    </PageShell>
  );
}