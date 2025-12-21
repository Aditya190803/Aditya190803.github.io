import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackToTop from "@/components/BackToTop";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Mer | ML/DL Engineer & GenAI Developer",
  description: "Portfolio of Aditya Mer, an ML/DL Engineer and GenAI Developer specializing in building scalable AI systems, Generative AI, and Deep Learning solutions.",
  keywords: [
    "ML Engineer", 
    "GenAI Developer", 
    "AI Research", 
    "Deep Learning", 
    "Portfolio", 
    "Aditya Mer", 
    "Machine Learning", 
    "Generative AI",
    "Large Language Models",
    "LLM",
    "Computer Vision",
    "NLP"
  ],
  authors: [{ name: "Aditya Mer" }],
  creator: "Aditya Mer",
  publisher: "Aditya Mer",
  robots: "index, follow",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Aditya Mer | ML/DL Engineer & GenAI Developer",
    description: "Portfolio of Aditya Mer, an ML/DL Engineer and GenAI Developer specializing in building scalable AI systems from research to production.",
    url: "https://adityamer.live",
    siteName: "Aditya Mer Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Aditya Mer Portfolio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Mer | ML/DL Engineer & GenAI Developer",
    description: "Portfolio of Aditya Mer, an ML/DL Engineer and GenAI Developer specializing in building scalable AI systems.",
    creator: "@aditya190803",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://adityamer.live",
  },
  metadataBase: new URL("https://adityamer.live"),
};

export function generateViewport() {
  return { width: 'device-width', initialScale: 1 };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PageTransition>
          {children}
        </PageTransition>
        <BackToTop />
      </body>
    </html>
  );
}
