import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { profile, services, site } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displaySerif = Instrument_Serif({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const title = `${site.brand} | Freelance Data Science, AI & Software Development`;
const description =
  "Freelance data analytics, machine learning, generative AI and software development. I help businesses turn data into decisions and ideas into shipped products.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "freelance data scientist",
    "freelance machine learning engineer",
    "freelance AI developer",
    "LLM app development",
    "RAG chatbot developer",
    "data analytics consultant",
    "Next.js developer",
    "freelance software developer India",
    "Aditya Mer",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  robots: "index, follow",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title,
    description,
    url: profile.portfolio,
    siteName: site.brand,
    locale: "en_US",
    type: "website",
    images: [{ url: "/logo.png", alt: site.brand }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@aditya190803",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: profile.portfolio,
  },
  metadataBase: new URL(profile.portfolio),
};

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
      { media: "(prefers-color-scheme: dark)", color: "#0e100f" },
    ],
  };
}

// Sets the theme before first paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.brand,
  url: profile.portfolio,
  email: profile.email,
  description,
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
      itemOffered: { "@type": "Service", name: s.title, description: s.summary },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${displaySerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
