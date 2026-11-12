import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { Header, Reveal } from "@/components/Chrome";
import { ScrollFx } from "@/components/ScrollFx";
import { Footer } from "@/components/Site";
import { profile } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", display: "swap", weight: ["400", "500"] });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-plex-mono", display: "swap", weight: ["400", "500"] });

const description =
  "Aditya Mer is a full-stack and AI developer in Mumbai and the maker of Flier. He builds websites, online stores and internal tools for organisations and small businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: { default: "Aditya Mer, full-stack and AI developer in Mumbai", template: "%s | Aditya Mer" },
  description,
  authors: [{ name: profile.name, url: profile.url }],
  creator: profile.name,
  icons: { icon: "/logo.png", apple: "/logo.png" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aditya Mer, full-stack and AI developer in Mumbai",
    description,
    url: profile.url,
    siteName: "Aditya Mer",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, type: "image/png", alt: "Aditya Mer, full-stack and AI developer in Mumbai" }],
  },
  twitter: { card: "summary_large_image", title: "Aditya Mer", description, images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#FAFAF9" };

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.url,
  email: `mailto:${profile.email}`,
  jobTitle: profile.role,
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Hide reveal-animated content only once we know JS is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>
        <ScrollFx />
        <div className="frame-lines" aria-hidden="true" />
        <Header />
        <main id="top">
          <div className="frame">
            {children}
            <Footer />
          </div>
        </main>
        <Reveal />
      </body>
    </html>
  );
}
