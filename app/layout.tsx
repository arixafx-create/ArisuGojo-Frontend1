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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ArisuGojo — Anime Shorts & Sakura Vibes",
    template: "%s · ArisuGojo",
  },
  description:
    "Cute anime shorts, sakura-scented edits, and cozy stories by ArisuGojo. Watch the latest YouTube Shorts, browse the gallery, and say hi.",
  keywords: [
    "ArisuGojo",
    "anime shorts",
    "anime creator",
    "sakura",
    "YouTube shorts",
    "anime edits",
  ],
  authors: [{ name: "ArisuGojo" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "ArisuGojo — Anime Shorts & Sakura Vibes",
    description:
      "Cute anime shorts, sakura-scented edits, and cozy stories by ArisuGojo.",
    siteName: "ArisuGojo",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArisuGojo — Anime Shorts & Sakura Vibes",
    description:
      "Cute anime shorts, sakura-scented edits, and cozy stories by ArisuGojo.",
  },
  icons: {
    icon: "/favicon.svg",
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
