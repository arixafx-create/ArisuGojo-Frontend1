"use client";

const KEY = "arisugojo.admin.token";

export function saveToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, token);
}

export function loadToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(KEY);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
