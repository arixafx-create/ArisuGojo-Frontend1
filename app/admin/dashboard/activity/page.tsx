"use client";

import { useState } from "react";
import { useAuthedApi } from "@/components/admin/useAuthedApi";
import type { Activity, Page } from "@/lib/types";
import { formatDate } from "@/lib/format";

export default function AdminActivityPage() {
  const [pageNum, setPageNum] = useState(1);
  const list = useAuthedApi<Page<Activity>>(
    `/api/admin/activity?page=${pageNum}&per_page=50`,
    {},
    [pageNum]
  );
  const totalPages = Math.max(1, Math.ceil((list.data?.total || 0) / 50));
  return (
    <div className="space-y-6">
      <div>
        <div className="chip">✿ Activity</div>
        <h1 className="heading text-3xl mt-2">Activity log</h1>
      </div>
      <div className="glass rounded-3xl p-4 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left opacity-70">
            <tr>
              <th className="p-2">When</th>
              <th className="p-2">Who</th>
              <th className="p-2">Action</th>
              <th className="p-2">Target</th>
            </tr>
          </thead>
          <tbody>
            {(list.data?.items || []).map((a) => (
              <tr key={a.id} className="border-t border-sakura-100/70 dark:border-white/5">
                <td className="p-2 whitespace-nowrap">{formatDate(a.created_at)}</td>
                <td className="p-2">{a.actor_email || "system"}</td>
                <td className="p-2">{a.action}</td>
                <td className="p-2 opacity-70">{a.target || ""}</td>
              </tr>
            ))}
            {list.loading && (
              <tr>
                <td colSpan={4} className="p-4 opacity-70">
                  Loading…
                </td>
              </tr>
            )}
            {!list.loading && (list.data?.items || []).length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 opacity-70">
                  No activity yet.
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
