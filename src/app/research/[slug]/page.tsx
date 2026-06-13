import { research } from '@/lib/data';
import ResearchDetailClient from '@/components/work/ResearchDetailClient';

export function generateStaticParams() {
  return research.papers.map((p) => ({ slug: p.slug }));
}

export default function ResearchDetailPage() {
  return <ResearchDetailClient />;
}
