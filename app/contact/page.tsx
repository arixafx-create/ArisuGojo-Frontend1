import SectionTitle from "@/components/shared/SectionTitle";
import ContactForm from "@/components/site/ContactForm";
import { safeApi } from "@/lib/api";
import type { ContactInfo, SocialLink } from "@/lib/types";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 300;
export const metadata = {
  title: "Contact",
  description: "Say hi to ArisuGojo — collabs, feedback, or just a soft hello.",
};

export default async function ContactPage() {
  const [info, socials] = await Promise.all([
    safeApi<ContactInfo>("/api/contact/info", {}, {}),
    safeApi<SocialLink[]>("/api/social", {}, []),
  ]);
  return (
    <div className="mx-auto max-w-4xl px-4 pt-10">
      <SectionTitle
        eyebrow="Say hi"
        title="Contact"
        subtitle="Collabs, feedback, or just a soft hello — everything reaches me."
      />
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="glass rounded-3xl p-6">
          <h3 className="heading text-lg">Direct</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {info.email && (
              <li>
                <span className="opacity-60">General:</span>{" "}
                <a href={`mailto:${info.email}`} className="link-underline">
                  {info.email}
                </a>
              </li>
            )}
            {info.business_email && (
              <li>
                <span className="opacity-60">Business:</span>{" "}
                <a
                  href={`mailto:${info.business_email}`}
                  className="link-underline"
                >
                  {info.business_email}
                </a>
              </li>
            )}
            {info.location && (
              <li>
                <span className="opacity-60">Location:</span> {info.location}
              </li>
            )}
            {info.note && <li className="opacity-80 mt-2">{info.note}</li>}
          </ul>
          {socials.length > 0 && (
            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest opacity-70 mb-2">
                Or reach me on
              </div>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
