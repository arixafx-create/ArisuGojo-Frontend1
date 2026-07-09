"use client";

import { useState } from "react";
import { authed } from "@/components/admin/useAuthedApi";
import type { Short } from "@/lib/types";

export default function AdminYoutubePage() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imported, setImported] = useState<Short | null>(null);

  async function onImport(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setResult(null);
    setImported(null);
    try {
      const s = await authed<Short>("/api/shorts/import", {
        method: "POST",
        json: { url },
      });
      setImported(s);
      setResult(`Imported "${s.title}"`);
      setUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
    } finally {
      setBusy(false);
    }
  }

  async function onSync() {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await authed<{ ok: boolean; added?: number; updated?: number }>(
        "/api/shorts/sync",
        { method: "POST" }
      );
      setResult(
        `Sync ${res.ok ? "complete" : "failed"} · added ${res.added ?? 0} · updated ${res.updated ?? 0}`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sync failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="chip">✿ YouTube</div>
        <h1 className="heading text-3xl mt-2">YouTube integration</h1>
        <p className="opacity-70 text-sm">
          Paste a Shorts URL to import it, or run a full sync now. A background
          job also runs every 6 hours.
        </p>
      </div>

      <form onSubmit={onImport} className="glass rounded-3xl p-6 space-y-3">
        <label className="label">YouTube Shorts URL or video ID</label>
        <div className="flex gap-2">
          <input
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input"
            placeholder="https://www.youtube.com/shorts/xxxxxxxxxxx"
          />
          <button className="btn-primary" disabled={busy}>
            {busy ? "Importing…" : "Import"}
          </button>
        </div>
        <p className="text-xs opacity-70">
          The backend automatically extracts the video ID and prevents
          duplicates.
        </p>
      </form>

      <div className="glass rounded-3xl p-6 flex flex-wrap items-center gap-3">
        <div>
          <div className="heading text-lg">Sync now</div>
          <div className="text-xs opacity-70">
            Pulls the latest channel shorts (if a channel ID is configured) and
            refreshes stats for every stored short.
          </div>
        </div>
        <div className="ml-auto">
          <button onClick={onSync} disabled={busy} className="btn-outline">
            {busy ? "Running…" : "Run sync"}
          </button>
        </div>
      </div>

      {result && (
        <div className="glass rounded-3xl p-4 text-sm">
          <span className="chip !bg-sakura-500 !text-white mr-2">Result</span>
          {result}
        </div>
      )}
      {error && (
        <div className="glass rounded-3xl p-4 text-sm text-red-500">{error}</div>
      )}
      {imported && (
        <div className="glass rounded-3xl p-4 flex items-center gap-3">
          {imported.thumbnail_url && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={imported.thumbnail_url}
              alt=""
              className="h-16 w-11 object-cover rounded"
            />
          )}
          <div>
            <div className="font-medium">{imported.title}</div>
            <div className="text-xs opacity-70">{imported.youtube_id}</div>
          </div>
        </div>
      )}
    </div>
  );
}
