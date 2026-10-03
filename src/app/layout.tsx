import type { Metadata } from "next";
import { Funnel_Display, Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { clientWork, profile, services, site } from "@/lib/data";

const display = Funnel_Display({
  variable: "--font-display-face",
  subsets: ["latin"],
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
});

const title = `${site.brand} | Freelance Data Scientist, AI & Software Developer`;
const description =
  "Freelance data analytics, machine learning, generative AI and web development. Dashboards, ML models, LLM apps, websites and internal tools, designed, built and shipped for your business. Based in Mumbai, working worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.portfolio),
  title: {
    default: title,
    template: `%s | ${site.brand}`,
  },
  description,
  keywords: [
    "freelance data scientist",
    "freelance data analyst",
    "freelance machine learning engineer",
    "freelance AI developer",
    "generative AI consultant",
    "LLM app development",
    "RAG chatbot developer",
    "AI automation freelancer",
    "freelance web developer",
    "Next.js developer for hire",
    "custom CMS website development",
    "freelance software developer India",
    "freelance developer Mumbai",
    profile.name,
  ],
  authors: [{ name: profile.name, url: profile.portfolio }],
  creator: profile.name,
  publisher: site.brand,
  robots: { index: true, follow: true },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: site.brand,
    locale: "en_US",
    type: "website",
    images: [{ url: "/logo.png", alt: site.brand }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    creator: "@aditya190803",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#f4f5f7" },
      { media: "(prefers-color-scheme: dark)", color: "#0b0d11" },
    ],
  };
}

// Sets the theme before first paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`;

const businessId = `${profile.portfolio}/#business`;
const personId = `${profile.portfolio}/#person`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": businessId,
      name: site.brand,
      url: profile.portfolio,
      email: profile.email,
      image: `${profile.portfolio}/logo.png`,
      description,
      areaServed: "Worldwide",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      founder: { "@id": personId },
      knowsAbout: [
        "Data analytics",
        "Data science",
        "Machine learning",
        "Deep learning",
        "Generative AI",
        "Large language models",
        "Web development",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Freelance services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.summary,
            provider: { "@id": businessId },
            areaServed: "Worldwide",
          },
        })),
      },
      subjectOf: clientWork
        .filter((w) => w.url && !w.internal)
        .map((w) => ({
          "@type": "CreativeWork",
          name: w.client,
          url: w.url,
          description: w.summary,
        })),
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      jobTitle: profile.title,
      url: profile.portfolio,
      email: profile.email,
      worksFor: { "@id": businessId },
      sameAs: [profile.github, profile.linkedin],
    },
    {
      "@type": "WebSite",
      name: site.brand,
      url: profile.portfolio,
      publisher: { "@id": businessId },
    },
  ],
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
      <body className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
