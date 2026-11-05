"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { profile, site } from "@/lib/data";

const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const projectTypes = ["Website with a CMS", "Online store", "Web app or internal tool", "AI or data project", "Not sure yet"];

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Without a form key (e.g. local builds), fall back to the visitor's email app.
    if (!accessKey) {
      const body = `${data.message}\n\nName: ${data.name}\nProject type: ${data.type}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        `Project enquiry from ${data.name}`
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Project enquiry from ${data.name}`,
          from_name: "adityamer.dev",
          ...data,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid" />
        <div className="glow glow--blue left-1/2 top-10 size-[560px] -translate-x-1/2" />
      </div>

      <div className="wrap grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <p className="pill">
            <span className="dot" aria-hidden />
            {site.availability}
          </p>
          <h2 id="contact-title" className="t-h1 mt-6">
            Tell me about
            <br />
            <span className="serif-accent text-[1.12em] leading-[0.95]">your project.</span>
          </h2>
          <p className="t-lead measure mt-6">
            Share a few lines about what you need. I&apos;ll reply with questions or a time for a short call, then a
            written proposal with a fixed quote.
          </p>

          <div className="mt-10 card p-6">
            <p className="t-label">Prefer email?</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="link text-[17px] inline-flex items-center gap-2">
                <Mail size={18} aria-hidden /> {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex h-9 items-center gap-1.5 rounded-sm border border-line px-3 text-[13px] font-medium text-ink-2 transition-colors hover:border-[var(--line-strong)]"
              >
                {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            {site.bookingUrl ? (
              <a href={site.bookingUrl} className="btn btn--secondary mt-5" target="_blank" rel="noreferrer">
                Book a call
              </a>
            ) : null}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="card p-6 shadow-[0_30px_60px_-30px_rgb(20_28_43/0.2)] sm:p-8">
            {status === "sent" ? (
              <div className="grid min-h-[420px] place-content-center text-center" role="status">
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent text-white">
                  <Check size={22} aria-hidden />
                </span>
                <p className="t-h3 mt-5">Enquiry sent.</p>
                <p className="t-body mt-2">Thanks. I&apos;ll reply to the email address you gave.</p>
                <button type="button" className="link mx-auto mt-6" onClick={() => setStatus("idle")}>
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="field">
                    <label htmlFor="name">Your name</label>
                    <input id="name" name="name" className="input" required autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" className="input" required autoComplete="email" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="type">What do you need?</label>
                  <select id="type" name="type" className="input" defaultValue={projectTypes[0]}>
                    {projectTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="message">About the project</label>
                  <textarea
                    id="message"
                    name="message"
                    className="input"
                    required
                    placeholder="What you'd like built, who it's for, and any deadline."
                  />
                </div>
                {/* Honeypot for bots */}
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                {status === "error" ? (
                  <p role="alert" className="t-small text-[#b4361f]">
                    The enquiry didn&apos;t send. Please try again, or email {profile.email} directly.
                  </p>
                ) : null}

                <button type="submit" className="btn btn--primary w-full" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
