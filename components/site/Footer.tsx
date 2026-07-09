import Link from "next/link";
import { safeApi } from "@/lib/api";
import type { SocialLink } from "@/lib/types";

export default async function Footer() {
  const links = await safeApi<SocialLink[]>("/api/social?visible=true", {}, []);
  return (
    <footer className="relative z-10 mt-24">
      <div className="mx-auto max-w-6xl px-4 pb-10">
        <div className="glass rounded-3xl p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="heading text-xl">ArisuGojo ✿</div>
              <p className="mt-2 text-sm opacity-75 max-w-sm">
                A cozy little corner of the internet for anime shorts, sakura
                vibes and soft edits.
              </p>
            </div>
            <div className="text-sm">
              <div className="font-semibold mb-2">Explore</div>
              <ul className="space-y-1.5 opacity-80">
                <li>
                  <Link href="/shorts" className="link-underline">
                    Shorts
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="link-underline">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/favorites" className="link-underline">
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="link-underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="link-underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-sm">
              <div className="font-semibold mb-2">Elsewhere</div>
              <ul className="space-y-1.5 opacity-80">
                {links.length === 0 && (
                  <li className="opacity-60">Links coming soon.</li>
                )}
                {links.map((l) => (
                  <li key={l.id}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    >
                      {l.platform}
                      {l.handle ? ` — ${l.handle}` : ""}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hairline my-6" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs opacity-70">
            <div>© {new Date().getFullYear()} ArisuGojo. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="link-underline">
                Privacy
              </Link>
              <Link href="/terms" className="link-underline">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
