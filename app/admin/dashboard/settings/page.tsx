"use client";

import { useEffect, useState } from "react";
import { authed, useAuthedApi } from "@/components/admin/useAuthedApi";
import type { SiteSetting } from "@/lib/types";

export default function AdminSettingsPage() {
  const list = useAuthedApi<SiteSetting[]>("/api/settings");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newKey, setNewKey] = useState("");

  useEffect(() => {
    if (list.data) {
      const map: Record<string, string> = {};
      for (const s of list.data) map[s.key] = JSON.stringify(s.value, null, 2);
      setDrafts(map);
    }
  }, [list.data]);

  async function save(key: string) {
    setBusy(key);
    setError(null);
    try {
      const value = JSON.parse(drafts[key] || "{}");
      await authed("/api/settings", { method: "PUT", json: { key, value } });
      list.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(null);
    }
  }

  async function addKey() {
    if (!newKey.trim()) return;
    await authed("/api/settings", {
      method: "PUT",
      json: { key: newKey.trim(), value: {} },
    });
    setNewKey("");
    list.reload();
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="chip">✿ Settings</div>
        <h1 className="heading text-3xl mt-2">Site settings</h1>
        <p className="opacity-70 text-sm">
          Free-form JSON values for site meta, SEO, YouTube sync config, etc.
        </p>
      </div>
      <div className="glass rounded-3xl p-6 flex gap-3">
        <input
          className="input"
          placeholder="new-setting-key"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
        <button onClick={addKey} className="btn-outline">
          Add key
        </button>
      </div>
      <div className="space-y-4">
        {(list.data || []).map((s) => (
          <div key={s.key} className="glass rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="heading text-lg">{s.key}</div>
              <button
                onClick={() => save(s.key)}
                disabled={busy === s.key}
                className="btn-primary"
              >
                {busy === s.key ? "Saving…" : "Save"}
              </button>
            </div>
            <textarea
              className="input font-mono text-xs"
              rows={8}
              value={drafts[s.key] ?? ""}
              onChange={(e) => setDrafts({ ...drafts, [s.key]: e.target.value })}
            />
          </div>
        ))}
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
}
