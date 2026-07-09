"use client";

import { useState } from "react";
import { authed, useAuthedApi } from "@/components/admin/useAuthedApi";
import type { ContactMessage, Page } from "@/lib/types";
import { formatDate } from "@/lib/format";

export default function AdminMessagesPage() {
  const [pageNum, setPageNum] = useState(1);
  const list = useAuthedApi<Page<ContactMessage>>(
    `/api/contact/messages?page=${pageNum}&per_page=20`,
    {},
    [pageNum]
  );

  async function markRead(id: string) {
    await authed(`/api/contact/messages/${id}/read`, { method: "POST" });
    list.reload();
  }
  async function remove(id: string) {
    if (!confirm("Delete message?")) return;
    await authed(`/api/contact/messages/${id}`, { method: "DELETE" });
    list.reload();
  }

  const totalPages = Math.max(1, Math.ceil((list.data?.total || 0) / 20));

  return (
    <div className="space-y-6">
      <div>
        <div className="chip">✿ Inbox</div>
        <h1 className="heading text-3xl mt-2">Contact messages</h1>
      </div>
      <div className="space-y-3">
        {(list.data?.items || []).map((m) => (
          <div key={m.id} className="glass rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">
                  {m.name}{" "}
                  <span className="opacity-60 text-sm">&lt;{m.email}&gt;</span>
                </div>
                <div className="text-xs opacity-60">
                  {formatDate(m.created_at)}
                  {!m.is_read && (
                    <span className="chip !bg-sakura-500 !text-white ml-2">
                      new
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {!m.is_read && (
                  <button
                    onClick={() => markRead(m.id)}
                    className="chip cursor-pointer"
                  >
                    Mark read
                  </button>
                )}
                <button
                  onClick={() => remove(m.id)}
                  className="chip !bg-red-100 !text-red-700 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
            {m.subject && (
              <div className="mt-2 font-medium text-sm">Subject: {m.subject}</div>
            )}
            <p className="mt-2 text-sm whitespace-pre-line opacity-90">
              {m.message}
            </p>
          </div>
        ))}
        {!list.loading && (list.data?.items || []).length === 0 && (
          <div className="opacity-70">No messages yet.</div>
        )}
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
