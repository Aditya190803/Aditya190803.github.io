import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://adityamer.dev";
  const pages: [string, number][] = [
    ["", 1],
    ["/work", 0.9],
    ["/research", 0.6],
    ["/resume", 0.5],
  ];

  return pages.map(([path, priority]) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
