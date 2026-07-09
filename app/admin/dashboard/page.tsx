"use client";

import { useAuthedApi } from "@/components/admin/useAuthedApi";
import type { Activity, Analytics, Page } from "@/lib/types";
import { formatCount, formatDate } from "@/lib/format";

export default function DashboardHome() {
  const analytics = useAuthedApi<Analytics>("/api/admin/analytics");
  const activity = useAuthedApi<Page<Activity>>("/api/admin/activity?per_page=8");

  const a = analytics.data;
  const cards = [
    { label: "Shorts", value: formatCount(a?.shorts_total || 0) },
    { label: "Total views", value: formatCount(a?.total_views || 0) },
    { label: "Gallery", value: formatCount(a?.gallery_total || 0) },
    { label: "Favorites", value: formatCount(a?.favorites_total || 0) },
    { label: "Messages", value: formatCount(a?.messages_total || 0) },
    { label: "Unread", value: formatCount(a?.messages_unread || 0) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="chip">✿ Overview</div>
        <h1 className="heading text-3xl mt-2">Dashboard</h1>
        <p className="opacity-70 text-sm">
          Everything you need to run ArisuGojo, in one place.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="glass rounded-2xl p-4">
            <div className="text-xs opacity-70 uppercase tracking-widest">
              {c.label}
            </div>
            <div className="heading text-2xl mt-1">{c.value}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr,1fr]">
        <div className="glass rounded-3xl p-6">
          <div className="heading text-lg">Last sync</div>
          <div className="mt-2 text-sm opacity-80">
            {a?.last_sync_at
              ? formatDate(a.last_sync_at)
              : "No sync yet — run one from the YouTube tab."}
          </div>
        </div>
        <div className="glass rounded-3xl p-6">
          <div className="heading text-lg">Recent activity</div>
          {activity.loading ? (
            <div className="mt-3 text-sm opacity-70">Loading…</div>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {(activity.data?.items || []).slice(0, 8).map((ev) => (
                <li
                  key={ev.id}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="truncate">
                    <span className="opacity-60">{ev.actor_email || "system"}</span>{" "}
                    · {ev.action}
                  </span>
                  <span className="text-xs opacity-60 shrink-0">
                    {formatDate(ev.created_at)}
                  </span>
                </li>
              ))}
              {(activity.data?.items || []).length === 0 && (
                <li className="opacity-70">Nothing here yet.</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
