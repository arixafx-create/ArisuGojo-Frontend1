import SectionTitle from "@/components/shared/SectionTitle";

export const runtime = "edge";

export const metadata = {
  title: "Privacy Policy",
  description: "How ArisuGojo handles data on this website.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-16">
      <SectionTitle eyebrow="Legal" title="Privacy Policy" />
      <div className="glass rounded-3xl p-8 mt-8 space-y-4 text-sm leading-relaxed opacity-90">
        <p>
          This site (arisugojo.com) is a personal creator portfolio. This page
          explains what data we collect, why we collect it, and your rights.
        </p>
        <h2 className="heading text-lg">What we collect</h2>
        <p>
          When you use the contact form we store the name, email address, subject
          and message you send. When you browse the site, our host may collect
          standard access logs (IP, user agent, timestamp) for security.
        </p>
        <h2 className="heading text-lg">Why we collect it</h2>
        <p>
          Contact-form data is only used to reply to your message. We do not
          sell, rent or share personal information with third parties for
          marketing.
        </p>
        <h2 className="heading text-lg">Third-party services</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>YouTube video embeds — governed by Google's privacy policy.</li>
          <li>Cloudinary — image storage for our gallery.</li>
          <li>Supabase — database and authentication provider.</li>
          <li>Netlify / Railway — hosting providers.</li>
        </ul>
        <h2 className="heading text-lg">Your rights</h2>
        <p>
          You can request removal of any personal data you've submitted by
          emailing the contact address on the contact page. We aim to respond
          within a reasonable time frame.
        </p>
        <h2 className="heading text-lg">Updates</h2>
        <p>
          If this policy changes we'll update the date below. Continued use of
          the site after changes constitutes acceptance.
        </p>
        <p className="opacity-60">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
