import SectionTitle from "@/components/shared/SectionTitle";

export const runtime = "edge";

export const metadata = {
  title: "Terms",
  description: "Terms of use for the ArisuGojo website.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-16">
      <SectionTitle eyebrow="Legal" title="Terms of Use" />
      <div className="glass rounded-3xl p-8 mt-8 space-y-4 text-sm leading-relaxed opacity-90">
        <p>
          By accessing arisugojo.com you agree to the following terms. If you do
          not agree, please stop using the site.
        </p>
        <h2 className="heading text-lg">Content ownership</h2>
        <p>
          All original artwork, video clips, thumbnails and text on this site
          belong to ArisuGojo unless credited otherwise. Please don't republish,
          resell or reupload content without permission. Sharing links to the
          original videos is always welcome ✿
        </p>
        <h2 className="heading text-lg">Third-party content</h2>
        <p>
          Embedded YouTube videos remain the property of their respective
          creators and channels. Fair-use commentary and edits are made in
          good faith; if you believe your work has been used inappropriately,
          contact us via the contact page.
        </p>
        <h2 className="heading text-lg">Acceptable use</h2>
        <p>
          Don't attempt to disrupt, spam, scrape at abusive volumes, or
          otherwise interfere with the site's normal operation. We may block
          access if this happens.
        </p>
        <h2 className="heading text-lg">Disclaimer</h2>
        <p>
          This site is provided "as-is" without warranty of any kind. We are not
          responsible for any indirect damages arising from your use of the
          site.
        </p>
        <h2 className="heading text-lg">Changes</h2>
        <p>
          These terms may be updated periodically. Continued use of the site
          after changes constitutes acceptance.
        </p>
        <p className="opacity-60">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
