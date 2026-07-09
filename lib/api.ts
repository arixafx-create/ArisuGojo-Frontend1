export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export type ApiOptions = RequestInit & {
  token?: string;
  json?: unknown;
  cache?: RequestCache;
  next?: { revalidate?: number; tags?: string[] };
};

export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: unknown) {
    super(message);
  }
}

export async function api<T = unknown>(
  path: string,
  opts: ApiOptions = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_URL}${path}`;
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(opts.headers as Record<string, string> | undefined),
  };
  let body = opts.body;
  if (opts.json !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(opts.json);
  }
  if (opts.token) headers["Authorization"] = `Bearer ${opts.token}`;

  // Abort long-hanging fetches so builds/SSR don't wait forever if the
  // API is unavailable at build time.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  let res: Response;
  try {
    res = await fetch(url, {
      ...opts,
      headers,
      body,
      cache: opts.cache ?? "no-store",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
  const text = await res.text();
  const data = text ? safeJson(text) : null;
  if (!res.ok) {
    const detail =
      (data && typeof data === "object" && "detail" in data
        ? (data as { detail?: string }).detail
        : undefined) ||
      res.statusText ||
      "Request failed";
    throw new ApiError(res.status, detail, data);
  }
  return data as T;
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function safeApi<T>(
  path: string,
  opts: ApiOptions = {},
  fallback: T
): Promise<T> {
  try {
    return await api<T>(path, opts);
  } catch {
    return fallback;
  }
}
