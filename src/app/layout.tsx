import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { Chakra_Petch, IBM_Plex_Mono, Newsreader, Space_Mono } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TerminalStatusBar from "@/components/TerminalStatusBar";
import CommandPalette from "@/components/CommandPalette";
import { getAllPosts } from "@/lib/posts";

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
  description: "Portfolio website of Sahas Timilsina – Computer Engineer passionate about music, classic cinema, Formula 1, and software craftsmanship.",
  keywords: ["Sahas Timilsina", "Portfolio", "Computer Engineer", "Software Developer", "Full Stack", "Go Developer", "React Developer"],
  authors: [{ name: "Sahas Timilsina", url: "https://sahastimilsina.com.np" }],
  creator: "Sahas Timilsina",
  publisher: "Sahas Timilsina",
  metadataBase: new URL("https://sahastimilsina.com.np"),
  openGraph: {
    title: "Sahas Timilsina",
    description: "Portfolio website of Sahas Timilsina – Computer Engineer passionate about music, classic cinema, Formula 1, and software craftsmanship.",
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

  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${newsreader.variable} ${plexMono.variable} ${chakra.variable}`}
    >
      <body>
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
