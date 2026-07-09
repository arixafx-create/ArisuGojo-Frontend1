"use client";

import { useEffect, useState } from "react";
import { authed, useAuthedApi } from "@/components/admin/useAuthedApi";
import type { ContactInfo } from "@/lib/types";

export default function AdminContactInfoPage() {
  const q = useAuthedApi<ContactInfo>("/api/contact/info");
  const [info, setInfo] = useState<ContactInfo>({});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (q.data) setInfo(q.data);
  }, [q.data]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMsg(null);
    try {
      await authed("/api/contact/info", { method: "PUT", json: info });
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
        <div className="chip">✿ Contact info</div>
        <h1 className="heading text-3xl mt-2">Contact info</h1>
      </div>
      <form onSubmit={save} className="glass rounded-3xl p-6 space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="label">General email</label>
            <input
              className="input"
              type="email"
              value={info.email || ""}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Business email</label>
            <input
              className="input"
              type="email"
              value={info.business_email || ""}
              onChange={(e) =>
                setInfo({ ...info, business_email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label">Location</label>
            <input
              className="input"
              value={info.location || ""}
              onChange={(e) => setInfo({ ...info, location: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="label">Note</label>
            <textarea
              className="input"
              rows={3}
              value={info.note || ""}
              onChange={(e) => setInfo({ ...info, note: e.target.value })}
            />
          </div>
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
