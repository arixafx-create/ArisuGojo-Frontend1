import SectionTitle from "@/components/shared/SectionTitle";
import ShortCard from "@/components/shared/ShortCard";
import EmptyState from "@/components/shared/EmptyState";
import { safeApi } from "@/lib/api";
import type { Page, Short } from "@/lib/types";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 60;
export const metadata = {
  title: "Shorts",
  description: "Every YouTube Short from ArisuGojo — soft edits, cute anime moments and sakura vibes.",
};

export default async function ShortsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page || 1));
  const sort = sp.sort || "recent";
  const data = await safeApi<Page<Short>>(
    `/api/shorts?page=${page}&per_page=24&sort=${sort}`,
    {},
    { items: [], total: 0, page, per_page: 24 }
  );
  const totalPages = Math.max(1, Math.ceil(data.total / data.per_page));
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10">
      <SectionTitle
        eyebrow="Video library"
        title="All shorts"
        subtitle="Explore every anime short — sortable by newest, most-viewed, or featured order."
      />
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {[
          { k: "recent", label: "Newest" },
          { k: "views", label: "Most viewed" },
          { k: "likes", label: "Most liked" },
          { k: "order", label: "Curated" },
        ].map((o) => (
          <a
            key={o.k}
            href={`/shorts?sort=${o.k}`}
            className={
              "chip cursor-pointer " +
              (sort === o.k
                ? "!bg-sakura-500 !text-white"
                : "hover:bg-sakura-200 dark:hover:bg-white/20")
            }
          >
            {o.label}
          </a>
        ))}
      </div>
      {data.items.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No shorts imported yet"
            hint="Admin can add YouTube Shorts URLs from the dashboard."
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.items.map((s) => (
            <ShortCard key={s.id} short={s} />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            return (
              <a
                key={p}
                href={`/shorts?page=${p}&sort=${sort}`}
                className={
                  "chip cursor-pointer " +
                  (p === data.page ? "!bg-sakura-500 !text-white" : "")
                }
              >
                {p}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
