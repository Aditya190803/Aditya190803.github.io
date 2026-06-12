import { projects } from '@/lib/data';
import WorkDetailClient from '@/components/work/WorkDetailClient';

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.title.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default function ProjectDetailPage() {
  return <WorkDetailClient />;
}
