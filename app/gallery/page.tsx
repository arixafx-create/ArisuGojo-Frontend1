import SectionTitle from "@/components/shared/SectionTitle";
import EmptyState from "@/components/shared/EmptyState";
import { safeApi } from "@/lib/api";
import type { GalleryImage, Page } from "@/lib/types";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 60;
export const metadata = {
  title: "Gallery",
  description: "A soft, sakura-tinted collection of anime edits and stills.",
};

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page || 1));
  const data = await safeApi<Page<GalleryImage>>(
    `/api/gallery?page=${page}&per_page=24`,
    {},
    { items: [], total: 0, page, per_page: 24 }
  );
  const totalPages = Math.max(1, Math.ceil(data.total / data.per_page));
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10">
      <SectionTitle
        eyebrow="Art wall"
        title="Gallery"
        subtitle="A soft, sakura-tinted collection of anime edits and stills."
      />
      {data.items.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="Gallery is warming up ✿" hint="Check back soon." />
        </div>
      ) : (
        <div className="mt-6 columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {data.items.map((g) => (
            <a
              key={g.id}
              href={g.image_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 block break-inside-avoid overflow-hidden rounded-3xl glass"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.image_url}
                alt={g.title || "Gallery image"}
                loading="lazy"
                className="w-full transition duration-500 hover:scale-[1.02]"
              />
              {(g.title || g.description) && (
                <div className="p-3">
                  {g.title && <div className="text-sm font-medium">{g.title}</div>}
                  {g.description && (
                    <div className="text-xs opacity-70 mt-0.5">
                      {g.description}
                    </div>
                  )}
                </div>
              )}
            </a>
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
                href={`/gallery?page=${p}`}
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
