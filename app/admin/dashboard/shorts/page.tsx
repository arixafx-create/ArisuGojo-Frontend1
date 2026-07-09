"use client";

import { useState } from "react";
import { authed, useAuthedApi } from "@/components/admin/useAuthedApi";
import type { Page, Short } from "@/lib/types";
import { formatCount, formatDate } from "@/lib/format";

export default function AdminShortsPage() {
  const [pageNum, setPageNum] = useState(1);
  const list = useAuthedApi<Page<Short>>(
    `/api/shorts?page=${pageNum}&per_page=20&sort=recent`,
    {},
    [pageNum]
  );

  async function toggle(id: string, field: "is_featured" | "is_trending", value: boolean) {
    await authed(`/api/shorts/${id}`, { method: "PATCH", json: { [field]: value } });
    list.reload();
  }
  async function remove(id: string) {
    if (!confirm("Delete this short?")) return;
    await authed(`/api/shorts/${id}`, { method: "DELETE" });
    list.reload();
  }
  async function refresh(youtubeId: string) {
    await authed(`/api/shorts/${youtubeId}/refresh`, { method: "POST" });
    list.reload();
  }

  const totalPages = Math.max(1, Math.ceil((list.data?.total || 0) / 20));

  return (
    <div className="space-y-6">
      <div>
        <div className="chip">✿ Library</div>
        <h1 className="heading text-3xl mt-2">Shorts</h1>
        <p className="opacity-70 text-sm">
          Toggle featured/trending, refresh metadata, or remove a short.
        </p>
      </div>
      <div className="glass rounded-3xl p-4 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left opacity-70">
            <tr>
              <th className="p-2">Short</th>
              <th className="p-2">Views</th>
              <th className="p-2">Published</th>
              <th className="p-2">Featured</th>
              <th className="p-2">Trending</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(list.data?.items || []).map((s) => (
              <tr key={s.id} className="border-t border-sakura-100/70 dark:border-white/5">
                <td className="p-2">
                  <div className="flex items-center gap-3">
                    {s.thumbnail_url && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={s.thumbnail_url}
                        alt=""
                        className="h-12 w-8 rounded object-cover"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="truncate max-w-xs">{s.title}</div>
                      <div className="text-xs opacity-60">{s.youtube_id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-2">{formatCount(s.view_count)}</td>
                <td className="p-2">{formatDate(s.published_at)}</td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={!!s.is_featured}
                    onChange={(e) => toggle(s.id, "is_featured", e.target.checked)}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={!!s.is_trending}
                    onChange={(e) => toggle(s.id, "is_trending", e.target.checked)}
                  />
                </td>
                <td className="p-2 text-right space-x-1">
                  <button
                    className="chip cursor-pointer"
                    onClick={() => refresh(s.youtube_id)}
                  >
                    Refresh
                  </button>
                  <button
                    className="chip cursor-pointer !bg-red-100 !text-red-700"
                    onClick={() => remove(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {list.loading && (
              <tr>
                <td colSpan={6} className="p-4 opacity-70">Loading…</td>
              </tr>
            )}
            {!list.loading && (list.data?.items || []).length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 opacity-70">
                  No shorts yet — import one from the YouTube tab.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPageNum(i + 1)}
              className={
                "chip cursor-pointer " +
                (pageNum === i + 1 ? "!bg-sakura-500 !text-white" : "")
              }
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
