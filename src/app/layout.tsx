import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreakingTicker from "@/components/BreakingTicker";

const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? "";

export const metadata: Metadata = {
  title: "NepaliWave — Nepal's Independent Voice",
  description:
    "NepaliWave brings you Nepal's top stories — politics, business, sports, and more — with an independent, AI-powered editorial twist.",
  openGraph: {
    title: "NepaliWave — Nepal's Independent Voice",
    description: "Nepal's top stories, independently told.",
    siteName: "NepaliWave",
    locale: "en_GB",
    type: "website",
  },
  other: {
    "google-adsense-account": "ca-pub-1123519517370708",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {PUBLISHER_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F4F5F7" }}>
        <Header />
        <BreakingTicker />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
