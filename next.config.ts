import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Static export to GitHub Pages: no image optimisation server.
  images: { unoptimized: true },
};

export default nextConfig;
