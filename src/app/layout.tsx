import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { profile, services, site } from "@/lib/data";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

const title = `${profile.name} | Freelance web and AI developer in Mumbai`;
const description =
  "Independent developer in Mumbai building websites, online stores, web apps and AI features for organisations and businesses. Fixed quotes, weekly previews, and a CMS your team can use.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.portfolio),
  title,
  description,
  keywords: [
    "freelance web developer Mumbai",
    "freelance developer India",
    "website with CMS",
    "e-commerce developer",
    "Next.js developer",
    "AI developer",
    "LLM apps",
    "Aditya Mer",
  ],
  authors: [{ name: profile.name, url: profile.portfolio }],
  creator: profile.name,
  icons: { icon: "/logo.png", apple: "/logo.png" },
  alternates: { canonical: profile.portfolio },
  openGraph: {
    title,
    description,
    url: profile.portfolio,
    siteName: profile.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "The IASCC website, designed and built by Aditya Mer" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f9fafb",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${site.brand} — freelance web and AI development`,
  url: profile.portfolio,
  email: profile.email,
  areaServed: "Worldwide",
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
  founder: {
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    sameAs: [profile.github, profile.linkedin],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.pitch },
    })),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${schibsted.variable} ${instrumentSerif.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
