"use client";

import { useRef, useState } from "react";
import { authed, useAuthedApi } from "@/components/admin/useAuthedApi";
import { API_URL } from "@/lib/api";
import { loadToken } from "@/lib/auth";
import type { GalleryImage, Page } from "@/lib/types";

export default function AdminGalleryPage() {
  const list = useAuthedApi<Page<GalleryImage>>(
    "/api/gallery?page=1&per_page=48&visible=false"
  );
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    if (title) fd.append("title", title);
    if (description) fd.append("description", description);
    try {
      const token = loadToken();
      const res = await fetch(`${API_URL}/api/gallery/upload`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: fd,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Upload failed");
      }
      setTitle("");
      setDescription("");
      if (fileRef.current) fileRef.current.value = "";
      list.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete image?")) return;
    await authed(`/api/gallery/${id}`, { method: "DELETE" });
    list.reload();
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="chip">✿ Gallery</div>
        <h1 className="heading text-3xl mt-2">Gallery images</h1>
        <p className="opacity-70 text-sm">
          Upload sakura-scented artwork. Images are stored on Cloudinary.
        </p>
      </div>

      <form onSubmit={onUpload} className="glass rounded-3xl p-6 space-y-3">
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="label">Image</label>
            <input ref={fileRef} type="file" accept="image/*" className="input" />
          </div>
          <div>
            <label className="label">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Sakura afternoon"
            />
          </div>
          <div>
            <label className="label">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input"
              placeholder="Optional"
            />
          </div>
        </div>
        {error && <div className="text-sm text-red-500">{error}</div>}
        <button className="btn-primary" disabled={uploading}>
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(list.data?.items || []).map((g) => (
          <div key={g.id} className="glass rounded-3xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={g.image_url}
              alt={g.title || ""}
              className="h-40 w-full object-cover"
            />
            <div className="p-3 text-sm">
              <div className="font-medium truncate">{g.title || "Untitled"}</div>
              {g.description && (
                <div className="text-xs opacity-70 truncate">{g.description}</div>
              )}
              <button
                onClick={() => remove(g.id)}
                className="chip !bg-red-100 !text-red-700 mt-2 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {!list.loading && (list.data?.items || []).length === 0 && (
          <div className="col-span-full opacity-70">No images yet.</div>
        )}
      </div>
    </div>
  );
}
