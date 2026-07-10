import Link from "next/link";
import type { AboutContent, SocialLink } from "@/lib/types";

const LOGO_URL =
  "https://iili.io/C0kQDtS.md.png"; // <-- Paste your direct PNG URL here

export default function AboutSnippet({
  about,
  socials,
}: {
  about?: AboutContent | null;
  socials: SocialLink[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 mt-16">
      <div className="glass rounded-3xl p-8 md:p-10 grid md:grid-cols-[auto,1fr] gap-8 items-center">

        <div className="mx-auto md:mx-0">
          <div className="relative h-40 w-40 rounded-full overflow-hidden ring-4 ring-pink-400/70 shadow-2xl shadow-pink-500/30 bg-transparent">

            <img
              src={LOGO_URL}
              alt="ArisuGojo Logo"
              className="h-full w-full object-cover"
            />

          </div>
        </div>

        <div>
          <div className="chip">✿ About the creator</div>

          <h2 className="heading mt-3 text-3xl md:text-4xl text-balance">
            {about?.headline || "Hi, I'm ArisuGojo"}
          </h2>

          <p className="mt-3 opacity-80 max-w-2xl">
            {about?.bio ||
              "Anime shorts creator sharing cute edits, sakura-scented vibes, and the moments that make anime magical."}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/about" className="btn-outline">
              Read more
            </Link>

            {socials.slice(0, 5).map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                {s.platform}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
