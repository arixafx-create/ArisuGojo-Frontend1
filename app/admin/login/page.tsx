"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { loadToken, saveToken } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loadToken()) router.replace("/admin/dashboard");
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api<{ access_token: string }>("/api/auth/login", {
        method: "POST",
        json: { email, password },
      });
      saveToken(res.access_token);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="glass-strong rounded-3xl p-8 w-full max-w-sm space-y-4"
      >
        <div>
          <div className="text-2xl">✿</div>
          <h1 className="heading text-2xl mt-2">Admin sign-in</h1>
          <p className="text-sm opacity-70 mt-1">
            The rest of the site is public — this is just for the creator.
          </p>
        </div>
        <div>
          <label className="label">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="admin@arisugojo.com"
          />
        </div>
        <div>
          <label className="label">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="••••••••"
          />
        </div>
        {error && <div className="text-sm text-red-500">{error}</div>}
        <button
          disabled={loading}
          type="submit"
          className="btn-primary w-full justify-center"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
