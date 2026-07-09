import ShortCard from "@/components/shared/ShortCard";
import EmptyState from "@/components/shared/EmptyState";
import SectionTitle from "@/components/shared/SectionTitle";
import type { Short } from "@/lib/types";

export default function ShortRow({
  eyebrow,
  title,
  subtitle,
  shorts,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  shorts: Short[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 mt-16">
      <SectionTitle eyebrow={eyebrow} title={title} subtitle={subtitle} />
      {shorts.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No shorts yet"
            hint="Import a YouTube Shorts URL from the admin dashboard."
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {shorts.map((s) => (
            <ShortCard key={s.id} short={s} />
          ))}
        </div>
      )}
    </section>
  );
}
