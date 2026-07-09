import SectionTitle from "@/components/shared/SectionTitle";
import EmptyState from "@/components/shared/EmptyState";
import { safeApi } from "@/lib/api";
import type { Favorite } from "@/lib/types";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 300;
export const metadata = {
  title: "Favorites",
  description: "Anime, music and moments that ArisuGojo can't stop loving.",
};

export default async function FavoritesPage() {
  const favorites = await safeApi<Favorite[]>("/api/favorites", {}, []);
  const grouped = favorites.reduce<Record<string, Favorite[]>>((acc, f) => {
    (acc[f.category] ||= []).push(f);
    return acc;
  }, {});
  const categories = Object.keys(grouped);
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10">
      <SectionTitle
        eyebrow="Curated"
        title="Favorites"
        subtitle="A short list of anime, music and moments I can't stop loving."
      />
      {categories.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="Favorites coming soon ✿" />
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {categories.map((cat) => (
            <section key={cat}>
              <h3 className="heading text-xl mb-4">{cat}</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grouped[cat].map((f) => (
                  <a
                    key={f.id}
                    href={f.link || "#"}
                    target={f.link ? "_blank" : undefined}
                    rel={f.link ? "noopener noreferrer" : undefined}
                    className="glass rounded-3xl overflow-hidden block group"
                  >
                    {f.image_url && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={f.image_url}
                        alt={f.title}
                        loading="lazy"
                        className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="p-4">
                      <div className="text-xs uppercase tracking-widest opacity-70">
                        {f.subtitle || cat}
                      </div>
                      <div className="mt-1 heading text-lg">{f.title}</div>
                      {f.note && (
                        <p className="mt-1 text-sm opacity-75 line-clamp-3">
                          {f.note}
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
