import { safeApi } from "@/lib/api";
import type {
  AboutContent,
  Analytics,
  HomepageSection,
  Short,
  SocialLink,
} from "@/lib/types";

import Hero from "@/components/home/Hero";
import StatsStrip from "@/components/home/StatsStrip";
import ShortRow from "@/components/home/ShortRow";
import FeaturedShort from "@/components/home/FeaturedShort";
import AboutSnippet from "@/components/home/AboutSnippet";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function HomePage() {
  const [homepage, latest, featured, trending, mostViewed, analytics, about, socials] =
    await Promise.all([
      safeApi<HomepageSection[]>("/api/homepage", {}, []),
      safeApi<Short[]>("/api/shorts/latest?limit=6", {}, []),
      safeApi<Short[]>("/api/shorts/featured?limit=6", {}, []),
      safeApi<Short[]>("/api/shorts/trending?limit=6", {}, []),
      safeApi<Short[]>("/api/shorts/most-viewed?limit=6", {}, []),
      safeApi<Analytics>(
        "/api/admin/analytics",
        {},
        {
          shorts_total: 0,
          gallery_total: 0,
          messages_total: 0,
          messages_unread: 0,
          favorites_total: 0,
          total_views: 0,
        }
      ),
      safeApi<AboutContent>("/api/about", {}, {}),
      safeApi<SocialLink[]>("/api/social", {}, []),
    ]);

  const heroData =
    (homepage.find((s) => s.section === "hero")?.data as Record<string, string>) ||
    {};
  const youtubeLink =
    socials.find(
      (s) =>
        s.platform.toLowerCase().includes("youtube") ||
        s.url.toLowerCase().includes("youtube")
    )?.url || undefined;

  const featuredShort = featured[0] || latest[0] || null;

  return (
    <>
      <Hero
        title={heroData.title || "ArisuGojo"}
        subtitle={
          heroData.subtitle ||
          "Anime shorts • Sakura vibes • Soft edits from a cozy corner of the internet."
        }
        cta={heroData.cta || "Watch on YouTube"}
        youtubeUrl={youtubeLink}
      />
      <StatsStrip
        shorts={analytics.shorts_total}
        views={analytics.total_views}
        gallery={analytics.gallery_total}
        favorites={analytics.favorites_total}
      />
      <FeaturedShort short={featuredShort} />
      <ShortRow
        eyebrow="Fresh drops"
        title="Latest shorts"
        subtitle="Newest anime shorts, straight off the timeline."
        shorts={latest}
      />
      <ShortRow
        eyebrow="Rising"
        title="Trending now"
        subtitle="What's picking up steam this week."
        shorts={trending}
      />
      <ShortRow
        eyebrow="Fan favorites"
        title="Most viewed"
        subtitle="Community classics — the ones you keep coming back to."
        shorts={mostViewed}
      />
      <AboutSnippet about={about} socials={socials} />
    </>
  );
}
