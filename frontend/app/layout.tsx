import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import RootLayoutShell from "@/components/layout/root-layout";
import { siteMetadata } from "@/lib/seo";

const sans = Inter({
  variable: "--font-sans-var",
  subsets: ["latin"],
  display: "swap",
});

const display = Montserrat({
  variable: "--font-display-var",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-river-900 text-foam antialiased">
        <RootLayoutShell>{children}</RootLayoutShell>
      </body>
    </html>
  );
}
