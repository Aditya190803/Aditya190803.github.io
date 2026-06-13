import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/providers/PageTransition";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollProgressBar } from "@/components/ui/ScrollProgress";
import { Scene3D } from "@/components/three/Scene3D";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aditya Mer | ML Engineer & GenAI Developer",
  description:
    "ML Engineer and GenAI Developer building scalable AI systems from research to production. Interactive lab demos, research publications, and project case studies.",
  keywords: [
    "ML Engineer", "GenAI Developer", "AI Research", "Deep Learning",
    "Aditya Mer", "Machine Learning", "Generative AI", "LLM",
  ],
  authors: [{ name: "Aditya Mer" }],
  creator: "Aditya Mer",
  publisher: "Aditya Mer",
  robots: "index, follow",
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "Aditya Mer | ML Engineer & GenAI Developer",
    description:
      "ML Engineer and GenAI Developer — interactive lab demos, research publications, and project case studies.",
    url: "https://adityamer.dev",
    siteName: "Aditya Mer",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Aditya Mer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Mer | ML Engineer & GenAI Developer",
    description:
      "ML Engineer and GenAI Developer — interactive lab demos, research publications, and project case studies.",
    creator: "@aditya190803",
    images: ["/og.png"],
  },
  alternates: { canonical: "https://adityamer.dev" },
  metadataBase: new URL("https://adityamer.dev"),
};

export function generateViewport(): Viewport {
  return { width: "device-width", initialScale: 1 };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      style={{ colorScheme: "light" }}
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      {/* suppressHydrationWarning: some browser extensions inject attributes
          (e.g. bis_register, __processed_*) onto <body> before React hydrates,
          which would otherwise log a hydration mismatch. */}
      <body className="antialiased" suppressHydrationWarning>
        <Scene3D />
        <CustomCursor />
        <ScrollProgressBar />
        <Navbar />
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
