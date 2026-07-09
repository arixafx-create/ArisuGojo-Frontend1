import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/api";

export const runtime = "edge";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/shorts",
    "/gallery",
    "/about",
    "/contact",
    "/instagram",
    "/favorites",
    "/privacy",
    "/terms",
  ];
  const now = new Date();
  return pages.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
}
