import type { Metadata } from "next";
import "./globals.css";
import TerminalStatusBar from "@/components/TerminalStatusBar";
import { IBM_Plex_Mono } from "next/font/google";

const terminalMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-terminal-mono",
});


export const metadata: Metadata = {
  title: "Sahas Timilsina",
  description: "Portfolio website of Sahas Timilsina – Computer Engineer passionate about music, classic cinema, and software craftsmanship.",
  keywords: ["Sahas Timilsina", "Portfolio", "Computer Engineer", "Software Developer", "Full Stack", "Go Developer", "React Developer"],
  authors: [{ name: "Sahas Timilsina", url: "https://sahastimilsina.com.np" }],
  creator: "Sahas Timilsina",
  publisher: "Sahas Timilsina",
  metadataBase: new URL("https://sahastimilsina.com.np"),
  openGraph: {
    title: "Sahas Timilsina",
    description: "Portfolio website of Sahas Timilsina – Computer Engineer passionate about music, classic cinema, and software craftsmanship.",
    url: "https://sahastimilsina.com.np",
    siteName: "Sahas Timilsina",
    locale: "en_US",
    type: "website",
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
  return (
    <html lang="en" className={terminalMono.variable}>
      <body>
        {children}
        <TerminalStatusBar />
      </body>
    </html>
  );
}
