import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  description: "Portfolio of Aditya Mer, an ML/DL Engineer and GenAI Developer specializing in building scalable AI systems from research to production.",
  keywords: ["ML Engineer", "GenAI Developer", "AI Research", "Deep Learning", "Portfolio"],
  authors: [{ name: "Aditya Mer" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Aditya Mer | ML/DL Engineer & GenAI Developer",
    description: "Portfolio of Aditya Mer, an ML/DL Engineer and GenAI Developer specializing in building scalable AI systems from research to production.",
    url: "https://adityamer.live",
    siteName: "Aditya Mer Portfolio",
    locale: "en_US",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
