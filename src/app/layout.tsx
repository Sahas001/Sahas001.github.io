import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { Chakra_Petch, IBM_Plex_Mono, Newsreader, Space_Mono } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter, { socials } from "@/components/SiteFooter";
import TerminalStatusBar from "@/components/TerminalStatusBar";
import CommandPalette from "@/components/CommandPalette";
import { getAllPosts } from "@/lib/posts";
import { certifications, featuredCertification } from "@/data/certifications";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-chakra",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Sahas Timilsina",
    default: "Sahas Timilsina — Computer Engineer",
  },
  description: "Sahas Timilsina is a computer engineer building with React, Next.js and Go, and working toward AI and deep learning.",
  keywords: ["Sahas Timilsina", "Portfolio", "Computer Engineer", "Software Developer", "Full Stack", "Go Developer", "React Developer", "Deep Learning", "Machine Learning"],
  authors: [{ name: "Sahas Timilsina", url: "https://sahastimilsina.com.np" }],
  creator: "Sahas Timilsina",
  publisher: "Sahas Timilsina",
  metadataBase: new URL("https://sahastimilsina.com.np"),
  alternates: {
    types: { "application/rss+xml": [{ url: "/rss.xml", title: "Sahas Timilsina — Blog" }] },
  },
  openGraph: {
    title: "Sahas Timilsina",
    description: "Sahas Timilsina is a computer engineer building with React, Next.js and Go, and working toward AI and deep learning.",
    url: "https://sahastimilsina.com.np",
    siteName: "Sahas Timilsina",
    locale: "en_US",
    type: "website",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
    other: [
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Only titles and slugs cross into the client-side command palette.
  const postCommands = getAllPosts().map((p) => ({ label: p.title, href: `/blog/${p.id}` }));

  // Structured data so search engines know who this site is about and what credentials they hold.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sahas Timilsina",
    url: "https://sahastimilsina.com.np",
    jobTitle: "Computer Engineer",
    email: "mailto:sahastimilsina@gmail.com",
    alumniOf: { "@type": "CollegeOrUniversity", name: "Pokhara University" },
    sameAs: [...socials.map((s) => s.href), "https://phasethru.dev"],
    knowsAbout: ["Deep learning", "Machine learning", "Large language models", "React", "Next.js", "Go"],
    hasCredential: [featuredCertification, ...certifications].map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.title,
      credentialCategory: c.kind,
      recognizedBy: { "@type": "Organization", name: c.issuer },
      url: c.verifyUrl,
    })),
  };

  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${newsreader.variable} ${plexMono.variable} ${chakra.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          // JSON.stringify output can't close the script tag once "<" is escaped.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <Suspense fallback={null}>
          <SiteHeader />
        </Suspense>
        <main style={{ paddingTop: "var(--header-height)", minHeight: "80vh" }}>{children}</main>
        <SiteFooter />
        <Suspense fallback={null}>
          <TerminalStatusBar />
        </Suspense>
        <CommandPalette posts={postCommands} />
      </body>
    </html>
  );
}
