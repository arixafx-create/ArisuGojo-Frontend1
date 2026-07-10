import SectionTitle from "@/components/shared/SectionTitle";
import { safeApi } from "@/lib/api";
import type { AboutContent, SocialLink } from "@/lib/types";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 300;
export const metadata = {
  title: "About",
  description: "Meet ArisuGojo — an anime shorts creator sharing sakura vibes and soft edits.",
};

export default async function AboutPage() {
  const [about, socials] = await Promise.all([
    safeApi<AboutContent>("/api/about", {}, {}),
    safeApi<SocialLink[]>("/api/social", {}, []),
  ]);
  const highlights = about?.highlights || [];
  return (
    <div className="mx-auto max-w-4xl px-4 pt-10">
      <SectionTitle eyebrow="Meet the creator" title={about?.headline || "About ArisuGojo"} />
      <div className="mt-8 glass rounded-3xl p-8 md:p-10">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="h-40 w-40 shrink-0 rounded-full overflow-hidden ring-4 ring-sakura-200 dark:ring-white/10 bg-sakura-100">
            {about?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={"https://iili.io/C0kQDtS.md.png"}
                alt="ArisuGojo"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-5xl">
                ✿
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="opacity-85 whitespace-pre-line leading-relaxed">
              {about?.bio ||
                "I make cute anime shorts and sakura-scented edits. Thanks for stopping by ✿"}
            </p>
            {highlights.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
                {highlights.map((h, i) => (
                  <div key={i} className="glass rounded-2xl p-4">
                    <div className="text-xs uppercase tracking-widest opacity-70">
                      {h.label}
                    </div>
                    <div className="mt-1 heading text-lg">{h.value}</div>
                  </div>
                ))}
              </div>
            )}
            {socials.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    {s.platform}
                    {s.handle ? ` · ${s.handle}` : ""}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
