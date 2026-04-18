import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreakingTicker from "@/components/BreakingTicker";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        <BreakingTicker />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
