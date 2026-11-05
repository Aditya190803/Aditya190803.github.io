import type { MetadataRoute } from "next";
import { profile } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/projects", priority: 0.8 },
    { path: "/research", priority: 0.7 },
    { path: "/resume", priority: 0.7 },
    { path: "/privacy", priority: 0.2 },
  ];
  return pages.map((p) => ({
    url: `${profile.url}${p.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
