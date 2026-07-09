"use client";

import { useState } from "react";
import { authed, useAuthedApi } from "@/components/admin/useAuthedApi";
import type { Favorite } from "@/lib/types";

const EMPTY: Favorite = {
  id: "",
  category: "Anime",
  title: "",
  subtitle: "",
  image_url: "",
  link: "",
  note: "",
  sort_order: 0,
};

export default function AdminFavoritesPage() {
  const list = useAuthedApi<Favorite[]>("/api/favorites");
  const [draft, setDraft] = useState<Favorite>({ ...EMPTY });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const payload = {
        category: draft.category,
        title: draft.title,
        subtitle: draft.subtitle || null,
        image_url: draft.image_url || null,
        link: draft.link || null,
        note: draft.note || null,
        sort_order: draft.sort_order,
      };
      await authed("/api/favorites", { method: "POST", json: payload });
      setDraft({ ...EMPTY });
      list.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete favorite?")) return;
    await authed(`/api/favorites/${id}`, { method: "DELETE" });
    list.reload();
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="chip">✿ Favorites</div>
        <h1 className="heading text-3xl mt-2">Favorites</h1>
        <p className="opacity-70 text-sm">Anime, songs, and things you love.</p>
      </div>

      <form onSubmit={submit} className="glass rounded-3xl p-6 space-y-3">
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="label">Category</label>
            <input
              className="input"
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label">Title</label>
            <input
              className="input"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label">Subtitle</label>
            <input
              className="input"
              value={draft.subtitle || ""}
              onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="label">Image URL</label>
            <input
              className="input"
              value={draft.image_url || ""}
              onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Link</label>
            <input
              className="input"
              value={draft.link || ""}
              onChange={(e) => setDraft({ ...draft, link: e.target.value })}
            />
          </div>
          <div className="md:col-span-3">
            <label className="label">Note</label>
            <textarea
              className="input"
              rows={2}
              value={draft.note || ""}
              onChange={(e) => setDraft({ ...draft, note: e.target.value })}
            />
          </div>
        </div>
        {error && <div className="text-sm text-red-500">{error}</div>}
        <button className="btn-primary" disabled={busy}>
          {busy ? "Saving…" : "Add favorite"}
        </button>
      </form>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {(list.data || []).map((f) => (
          <div key={f.id} className="glass rounded-3xl p-4">
            <div className="text-xs uppercase tracking-widest opacity-70">
              {f.category}
            </div>
            <div className="heading text-lg mt-1">{f.title}</div>
            {f.subtitle && <div className="text-sm opacity-75">{f.subtitle}</div>}
            {f.note && <div className="text-xs opacity-70 mt-2">{f.note}</div>}
            <button
              onClick={() => remove(f.id)}
              className="chip !bg-red-100 !text-red-700 mt-3 cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}
        {!list.loading && (list.data || []).length === 0 && (
          <div className="opacity-70">Nothing here yet.</div>
        )}
      </div>
    </div>
  );
}
