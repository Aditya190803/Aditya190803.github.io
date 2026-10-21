"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

const needs = ["New website", "Redesign", "Online store", "Web app", "AI feature", "Not sure yet"];
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border-0 border-b border-on-cobalt/35 bg-transparent px-0 py-3 text-[1.15rem] text-on-cobalt placeholder:text-on-cobalt-2/70 focus:border-on-cobalt focus:outline-none focus:ring-0 focus-visible:outline-none transition-colors";

export default function Contact() {
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const toggle = (n: string) => setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const message = String(data.get("message") ?? "");
    const need = picked.join(", ") || "Not specified";

    // Without a form key, fall back to the visitor's email app.
    if (!accessKey) {
      const body = `${message}\n\nLooking for: ${need}\nCompany / website: ${company || "-"}\n\n${name}\n${email}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Project enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Project enquiry from ${name}`,
          from_name: "adityamer.dev",
          name,
          email,
          company,
          looking_for: need,
          message,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("sent");
      form.reset();
      setPicked([]);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-cobalt text-on-cobalt" aria-labelledby="contact-title">
      <div className="wrap section grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="contact-title" data-reveal="split" className="display mb-8 text-[clamp(3.25rem,8vw,7.5rem)]">
            Tell me what you&apos;re building.
          </h2>
          <p data-reveal className="measure mb-10 text-[1.15rem] leading-relaxed text-on-cobalt-2">
            A few lines is plenty. {profile.responseTime} If it&apos;s a good fit, we&apos;ll set up a short call; if
            it isn&apos;t, I&apos;ll point you to someone who can help.
          </p>
          <div data-reveal className="space-y-2">
            <p className="text-on-cobalt-2">Rather email?</p>
            <a href={`mailto:${profile.email}`} className="title link text-[clamp(1.5rem,2.6vw,2.2rem)]">
              {profile.email}
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {status === "sent" ? (
            <div role="status" className="flex h-full flex-col justify-center">
              <p className="display mb-5 text-[clamp(2.5rem,5vw,4rem)]">Enquiry sent.</p>
              <p className="measure mb-8 text-[1.15rem] text-on-cobalt-2">
                I&apos;ll read it and reply within one working day.
              </p>
              <button type="button" className="link self-start" onClick={() => setStatus("idle")}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <form data-reveal onSubmit={onSubmit} className="space-y-10">
              <fieldset>
                <legend className="mb-4 text-on-cobalt-2">What do you need?</legend>
                <div className="flex flex-wrap gap-2">
                  {needs.map((n) => {
                    const on = picked.includes(n);
                    return (
                      <button
                        key={n}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(n)}
                        className={`min-h-11 rounded-full border px-4 text-[0.95rem] transition-colors duration-300 ${
                          on
                            ? "border-on-cobalt bg-on-cobalt text-cobalt"
                            : "border-on-cobalt/35 hover:border-on-cobalt"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid gap-8 sm:grid-cols-2">
                <label className="block">
                  <span className="text-on-cobalt-2">Your name</span>
                  <input name="name" required autoComplete="name" className={field} />
                </label>
                <label className="block">
                  <span className="text-on-cobalt-2">Email</span>
                  <input name="email" type="email" required autoComplete="email" className={field} />
                </label>
              </div>
              <label className="block">
                <span className="text-on-cobalt-2">Company or current website (optional)</span>
                <input name="company" autoComplete="organization" className={field} />
              </label>
              <label className="block">
                <span className="text-on-cobalt-2">About the project</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="What it's for, who it's for, and any deadline"
                  className={`${field} resize-none`}
                />
              </label>

              <div className="flex flex-wrap items-center gap-6">
                <button type="submit" disabled={status === "sending"} className="btn btn-ink disabled:opacity-60" data-magnetic>
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                </button>
                {status === "error" && (
                  <p role="alert" className="text-on-cobalt">
                    Your enquiry wasn&apos;t sent. Check your connection and try again, or email{" "}
                    <a className="link-static" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
