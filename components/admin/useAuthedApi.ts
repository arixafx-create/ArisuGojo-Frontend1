"use client";

import { useEffect, useState } from "react";
import { api, ApiOptions } from "@/lib/api";
import { loadToken } from "@/lib/auth";

export function useAuthedApi<T>(path: string, opts: ApiOptions = {}, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const token = loadToken() || undefined;
    api<T>(path, { ...opts, token })
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, reloadCount, ...deps]);

  return { data, error, loading, reload: () => setReloadCount((n) => n + 1) };
}

export async function authed<T>(path: string, opts: ApiOptions = {}) {
  const token = loadToken() || undefined;
  return api<T>(path, { ...opts, token });
}
