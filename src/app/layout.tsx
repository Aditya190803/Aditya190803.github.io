import type { Metadata, Viewport } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Motion from "@/components/Motion";
import { profile, work, featured } from "@/lib/data";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const title = "Aditya Mer: web design & development, Mumbai";
const description =
  "Independent web designer and developer in Mumbai. Custom websites, online stores and web apps for organisations and brands, including IASCC, Younique India and Shah Kapadia & Associates. Builder of Flier, in use at Tata Memorial Hospital.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.portfolio),
  title: { default: title, template: "%s | Aditya Mer" },
  description,
  keywords: [
    "freelance web developer Mumbai",
    "web designer Mumbai",
    "website design India",
    "Next.js developer",
    "e-commerce website developer",
    "web app development",
    "AI integration",
    "Aditya Mer",
  ],
  authors: [{ name: profile.name, url: profile.portfolio }],
  creator: profile.name,
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title,
    description,
    url: profile.portfolio,
    siteName: "Aditya Mer",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Aditya Mer: websites people trust" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@aditya190803",
    images: ["/og.png"],
  },
  alternates: { canonical: profile.portfolio },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3f3ef",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Aditya Mer",
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
  makesOffer: ["Website design", "Website development", "E-commerce development", "Web app development", "AI integration"].map(
    (name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } }),
  ),
  subjectOf: [...work.map((w) => w.url), featured.url],
};

// Runs before first paint: hide reveal targets only when motion will play,
// and un-hide them if scripts fail to start.
const motionBoot = `(function(){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('js-motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('js-motion')},3500)}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${schibsted.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <Motion />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
