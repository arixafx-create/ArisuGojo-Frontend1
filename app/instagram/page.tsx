import SectionTitle from "@/components/shared/SectionTitle";
import EmptyState from "@/components/shared/EmptyState";
import { safeApi } from "@/lib/api";
import type { SocialLink } from "@/lib/types";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 300;
export const metadata = {
  title: "Instagram",
  description: "Follow ArisuGojo on Instagram — sakura-scented anime moments.",
};

export default async function InstagramPage() {
  const socials = await safeApi<SocialLink[]>("/api/social", {}, []);
  const ig =
    socials.find((s) => s.platform.toLowerCase().includes("instagram")) ||
    socials.find((s) => s.url.toLowerCase().includes("instagram"));
  return (
    <div className="mx-auto max-w-4xl px-4 pt-10">
      <SectionTitle
        eyebrow="Off-YouTube"
        title="Instagram"
        subtitle="Behind-the-scenes stills, sakura moments, and softer stories."
      />
      <div className="mt-8">
        {ig ? (
          <div className="glass rounded-3xl p-10 text-center">
            <div className="text-3xl">📸</div>
            <div className="mt-3 heading text-2xl">
              {ig.handle || "@arisugojo"}
            </div>
            <p className="mt-2 opacity-75">
              Head over to Instagram to see everything I post between shorts.
            </p>
            <a
              href={ig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6"
            >
              Follow on Instagram
            </a>
          </div>
        ) : (
          <EmptyState
            title="Instagram link coming soon"
            hint="Admin can add the profile URL from the dashboard."
          />
        )}
      </div>
    </div>
  );
}
