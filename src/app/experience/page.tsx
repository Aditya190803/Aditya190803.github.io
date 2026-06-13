import { Experience } from '@/components/sections/Experience';
import { PageShell } from '@/components/layout/PageShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience | Aditya Mer',
  description: 'Professional experience spanning ML engineering, generative AI, research, and full-stack development.',
};

export default function ExperiencePage() {
  return (
    <PageShell>
      <Experience />
    </PageShell>
  );
}