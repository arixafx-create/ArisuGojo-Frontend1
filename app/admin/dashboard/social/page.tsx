"use client";

import { useState } from "react";
import { authed, useAuthedApi } from "@/components/admin/useAuthedApi";
import type { SocialLink } from "@/lib/types";

type Draft = Omit<SocialLink, "id">;
const EMPTY: Draft = {
  platform: "YouTube",
  url: "https://youtube.com/",
  handle: "",
  icon: "",
  sort_order: 0,
  is_visible: true,
};

export default function AdminSocialPage() {
  const list = useAuthedApi<SocialLink[]>("/api/social?visible=false");
  const [draft, setDraft] = useState<Draft>({ ...EMPTY });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await authed("/api/social", { method: "POST", json: draft });
      setDraft({ ...EMPTY });
      list.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete link?")) return;
    await authed(`/api/social/${id}`, { method: "DELETE" });
    list.reload();
  }

  async function toggle(l: SocialLink) {
    await authed(`/api/social/${l.id}`, {
      method: "PATCH",
      json: { ...l, is_visible: !l.is_visible },
    });
    list.reload();
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="chip">✿ Social</div>
        <h1 className="heading text-3xl mt-2">Social links</h1>
      </div>
      <form onSubmit={submit} className="glass rounded-3xl p-6 space-y-3">
        <div className="grid md:grid-cols-4 gap-3">
          <div>
            <label className="label">Platform</label>
            <input
              className="input"
              value={draft.platform}
              onChange={(e) => setDraft({ ...draft, platform: e.target.value })}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="label">URL</label>
            <input
              className="input"
              type="url"
              value={draft.url}
              onChange={(e) => setDraft({ ...draft, url: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label">Handle</label>
            <input
              className="input"
              value={draft.handle || ""}
              onChange={(e) => setDraft({ ...draft, handle: e.target.value })}
            />
          </div>
        </div>
        {error && <div className="text-sm text-red-500">{error}</div>}
        <button className="btn-primary" disabled={busy}>
          {busy ? "Saving…" : "Add link"}
        </button>
      </form>

      <div className="glass rounded-3xl p-4 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left opacity-70">
            <tr>
              <th className="p-2">Platform</th>
              <th className="p-2">URL</th>
              <th className="p-2">Handle</th>
              <th className="p-2">Visible</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(list.data || []).map((l) => (
              <tr
                key={l.id}
                className="border-t border-sakura-100/70 dark:border-white/5"
              >
                <td className="p-2">{l.platform}</td>
                <td className="p-2 truncate max-w-xs">
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {l.url}
                  </a>
                </td>
                <td className="p-2">{l.handle || ""}</td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={l.is_visible}
                    onChange={() => toggle(l)}
                  />
                </td>
                <td className="p-2 text-right">
                  <button
                    onClick={() => remove(l.id)}
                    className="chip !bg-red-100 !text-red-700 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!list.loading && (list.data || []).length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 opacity-70">
                  No links yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
