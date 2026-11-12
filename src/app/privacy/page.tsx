import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the contact form on adityamer.dev handles your details.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHead title="Privacy">How the contact form on this site handles your details.</PageHead>
      <section className="page-body legal">
        <div className="legal-body">
          <p>
            This site has no analytics, no advertising and no tracking cookies, so there is nothing to consent to and no
            cookie banner.
          </p>
          <p>
            When you send the contact form, your name, email, project type and message are delivered to my inbox through
            Web3Forms. I use them only to reply to your enquiry, and I don&apos;t share them with anyone else.
          </p>
          <p>
            If you&apos;d like me to delete our correspondence, email <a href={`mailto:${profile.email}`}>{profile.email}</a>{" "}
            and I&apos;ll do it within a week.
          </p>
          <p className="mono faint">Last updated November 2026.</p>
        </div>
      </section>
    </>
  );
}
