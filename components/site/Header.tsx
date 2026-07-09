"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import clsx from "clsx";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shorts", label: "Shorts" },
  { href: "/gallery", label: "Gallery" },
  { href: "/favorites", label: "Favorites" },
  { href: "/instagram", label: "Instagram" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="glass rounded-full px-4 py-2.5 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 pr-2">
            <span className="text-2xl">✿</span>
            <span className="heading text-lg tracking-wide">ArisuGojo</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 ml-2">
            {NAV.map((n) => {
              const active =
                n.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={clsx(
                    "px-3 py-1.5 rounded-full text-sm transition",
                    active
                      ? "bg-sakura-400 text-white shadow-md shadow-sakura-300/40"
                      : "hover:bg-white/50 dark:hover:bg-white/10"
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden btn-ghost w-10 h-10 p-0 justify-center"
              aria-label="Menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden mt-2 glass rounded-3xl p-3">
            <div className="grid grid-cols-2 gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-2xl text-sm hover:bg-white/60 dark:hover:bg-white/10"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
