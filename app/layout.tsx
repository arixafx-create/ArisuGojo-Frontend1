import type { Metadata, Viewport } from "next";
import { Playfair_Display, Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Providers from "@/components/site/Providers";
import SakuraLayer from "@/components/site/SakuraLayer";
import { SITE_URL } from "@/lib/api";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ArisuGojo",
  description: "Anime edits, JJK, Solo Leveling and latest YouTube Shorts.",

  openGraph: {
    title: "ArisuGojo",
    description: "Anime edits, JJK, Solo Leveling and latest YouTube Shorts.",
    url: "https://arisugojo.online",
    siteName: "ArisuGojo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ArisuGojo",
    description: "Anime edits, JJK, Solo Leveling and latest YouTube Shorts.",
    images: ["/og-image.png"],
  },
};

// Footer fetches social links from the API — render dynamically so that
// unavailable backends during build don't block static generation.
export const runtime = "edge";
export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffe6f0" },
    { media: "(prefers-color-scheme: dark)", color: "#150f22" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${quicksand.variable} ${playfair.variable}`}
    >
      <body>
        <Providers>
          <SakuraLayer />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
