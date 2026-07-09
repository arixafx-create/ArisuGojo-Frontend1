"use client";

import { useEffect, useState } from "react";
import { authed, useAuthedApi } from "@/components/admin/useAuthedApi";
import type { AboutContent } from "@/lib/types";

export default function AdminAboutPage() {
  const q = useAuthedApi<AboutContent>("/api/about");
  const [about, setAbout] = useState<AboutContent>({});
  const [highlightsText, setHighlightsText] = useState("[]");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (q.data) {
      setAbout(q.data);
      setHighlightsText(JSON.stringify(q.data.highlights || [], null, 2));
    }
  }, [q.data]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMsg(null);
    try {
      const highlights = JSON.parse(highlightsText || "[]");
      await authed("/api/about", {
        method: "PUT",
        json: { ...about, highlights },
      });
      setMsg("Saved ✿");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="chip">✿ About</div>
        <h1 className="heading text-3xl mt-2">About page</h1>
      </div>
      <form onSubmit={save} className="glass rounded-3xl p-6 space-y-3">
        <div>
          <label className="label">Headline</label>
          <input
            className="input"
            value={about.headline || ""}
            onChange={(e) => setAbout({ ...about, headline: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Avatar URL</label>
          <input
            className="input"
            value={about.avatar_url || ""}
            onChange={(e) => setAbout({ ...about, avatar_url: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Bio</label>
          <textarea
            className="input"
            rows={6}
            value={about.bio || ""}
            onChange={(e) => setAbout({ ...about, bio: e.target.value })}
          />
        </div>
        <div>
          <label className="label">
            Highlights (JSON array of {'{ label, value }'})
          </label>
          <textarea
            className="input font-mono text-xs"
            rows={6}
            value={highlightsText}
            onChange={(e) => setHighlightsText(e.target.value)}
          />
        </div>
        {error && <div className="text-sm text-red-500">{error}</div>}
        {msg && <div className="text-sm text-sakura-600">{msg}</div>}
        <button className="btn-primary" disabled={busy}>
          {busy ? "Saving…" : "Save"}
        </button>
      </form>
    </div>
  );
}
