"use client";

import { useEffect, useState } from "react";
import { authed, useAuthedApi } from "@/components/admin/useAuthedApi";
import type { HomepageSection } from "@/lib/types";

export default function AdminContentPage() {
  const list = useAuthedApi<HomepageSection[]>("/api/homepage");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newSection, setNewSection] = useState("");

  useEffect(() => {
    if (list.data) {
      const map: Record<string, string> = {};
      for (const s of list.data) map[s.section] = JSON.stringify(s.data, null, 2);
      setDrafts(map);
    }
  }, [list.data]);

  async function save(section: string) {
    setBusy(section);
    setError(null);
    try {
      const parsed = JSON.parse(drafts[section] || "{}");
      await authed("/api/homepage", {
        method: "PUT",
        json: { section, data: parsed },
      });
      list.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(null);
    }
  }

  async function addSection() {
    if (!newSection.trim()) return;
    await authed("/api/homepage", {
      method: "PUT",
      json: { section: newSection.trim(), data: {} },
    });
    setNewSection("");
    list.reload();
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="chip">✿ Homepage</div>
        <h1 className="heading text-3xl mt-2">Homepage content</h1>
        <p className="opacity-70 text-sm">
          Edit each homepage section as JSON — clean and flexible.
        </p>
      </div>

      <div className="glass rounded-3xl p-6 flex gap-3">
        <input
          className="input"
          placeholder="new-section-key"
          value={newSection}
          onChange={(e) => setNewSection(e.target.value)}
        />
        <button onClick={addSection} className="btn-outline">
          Add section
        </button>
      </div>

      <div className="space-y-4">
        {(list.data || []).map((s) => (
          <div key={s.section} className="glass rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="heading text-lg">{s.section}</div>
              <button
                onClick={() => save(s.section)}
                disabled={busy === s.section}
                className="btn-primary"
              >
                {busy === s.section ? "Saving…" : "Save"}
              </button>
            </div>
            <textarea
              className="input font-mono text-xs"
              rows={8}
              value={drafts[s.section] ?? ""}
              onChange={(e) =>
                setDrafts({ ...drafts, [s.section]: e.target.value })
              }
            />
          </div>
        ))}
        {error && <div className="text-sm text-red-500">{error}</div>}
      </div>
    </div>
  );
}
