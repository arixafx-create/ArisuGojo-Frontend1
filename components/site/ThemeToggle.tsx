"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="btn-ghost w-10 h-10 p-0 justify-center"
      >
        <span className="opacity-0">.</span>
      </button>
    );
  }
  const active = theme === "system" ? resolvedTheme : theme;
  const next = active === "dark" ? "light" : "dark";
  return (
    <button
      onClick={() => setTheme(next)}
      aria-label="Toggle theme"
      className="btn-ghost w-10 h-10 p-0 justify-center"
    >
      {active === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
