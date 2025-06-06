import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Sahas Timilsina",
  description: "Portfolio website of Sahas Timilsina",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
