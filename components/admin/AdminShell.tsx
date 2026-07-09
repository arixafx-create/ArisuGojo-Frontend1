"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearToken, loadToken } from "@/lib/auth";
import { api } from "@/lib/api";

const NAV = [
  { href: "/admin/dashboard", label: "Overview", icon: "✿" },
  { href: "/admin/dashboard/shorts", label: "Shorts", icon: "▶" },
  { href: "/admin/dashboard/youtube", label: "YouTube", icon: "♫" },
  { href: "/admin/dashboard/gallery", label: "Gallery", icon: "🖼" },
  { href: "/admin/dashboard/favorites", label: "Favorites", icon: "♡" },
  { href: "/admin/dashboard/content", label: "Homepage", icon: "🏠" },
  { href: "/admin/dashboard/about", label: "About", icon: "☘" },
  { href: "/admin/dashboard/social", label: "Social", icon: "@" },
  { href: "/admin/dashboard/contact", label: "Contact info", icon: "✉" },
  { href: "/admin/dashboard/messages", label: "Messages", icon: "📮" },
  { href: "/admin/dashboard/settings", label: "Settings", icon: "⚙" },
  { href: "/admin/dashboard/activity", label: "Activity", icon: "⏱" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const token = loadToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    api<{ email: string }>("/api/auth/me", { token })
      .then((me) => {
        setEmail(me.email);
        setReady(true);
      })
      .catch(() => {
        clearToken();
        router.replace("/admin/login");
      });
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-full px-6 py-3 text-sm opacity-70">
          ✿ Loading admin…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6 grid gap-6 md:grid-cols-[260px,1fr]">
        <aside className="glass rounded-3xl p-4 h-fit md:sticky md:top-4">
          <div className="px-2 pb-3">
            <div className="heading text-lg">ArisuGojo Admin</div>
            <div className="text-xs opacity-70 truncate">{email}</div>
          </div>
          <nav className="space-y-1">
            {NAV.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={
                    "flex items-center gap-2 px-3 py-2 rounded-2xl text-sm transition " +
                    (active
                      ? "bg-sakura-400 text-white"
                      : "hover:bg-white/50 dark:hover:bg-white/10")
                  }
                >
                  <span className="w-5 text-center">{n.icon}</span>
                  <span>{n.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="hairline my-3" />
          <button
            onClick={() => {
              clearToken();
              router.replace("/admin/login");
            }}
            className="btn-ghost w-full justify-center"
          >
            Sign out
          </button>
          <Link href="/" className="btn-ghost w-full justify-center mt-2">
            ← Back to site
          </Link>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
