import { MetadataRoute } from 'next';
import { projects } from '@/lib/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adityamer.dev';

  const routes = [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/projects`, priority: 0.9 },
    { url: `${baseUrl}/experience`, priority: 0.8 },
    { url: `${baseUrl}/research`, priority: 0.8 },
    { url: `${baseUrl}/skills`, priority: 0.8 },
    { url: `${baseUrl}/contact`, priority: 0.7 },
    { url: `${baseUrl}/resume`, priority: 0.6 },
  ];

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.title.toLowerCase().replace(/\s+/g, '-')}`,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes].map((route) => ({
    ...route,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
  }));
}
