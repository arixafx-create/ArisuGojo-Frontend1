import { formatCount } from "@/lib/format";

export default function StatsStrip({
  shorts,
  views,
  gallery,
  favorites,
}: {
  shorts: number;
  views: number;
  gallery: number;
  favorites: number;
}) {
  const items = [
    { label: "Shorts", value: formatCount(shorts) },
    { label: "Total views", value: formatCount(views) },
    { label: "Gallery pieces", value: formatCount(gallery) },
    { label: "Favorites", value: formatCount(favorites) },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="glass rounded-3xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((s) => (
          <div key={s.label} className="text-center">
            <div className="heading text-3xl md:text-4xl bg-gradient-to-r from-sakura-500 to-sakura-300 bg-clip-text text-transparent">
              {s.value}
            </div>
            <div className="text-xs uppercase tracking-widest mt-1 opacity-70">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
