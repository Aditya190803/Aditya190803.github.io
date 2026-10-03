"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, Loader2, Mail } from "lucide-react";
import { profile, services, site } from "@/lib/data";
import { Reveal, buttonStyles } from "@/components/ui";
import { cn } from "@/lib/utils";

const timelines = ["As soon as possible", "Within a month", "1–3 months", "Just exploring"];

const field =
  "w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-[15px] text-ink placeholder:text-faint transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

const emptyForm = { name: "", email: "", company: "", service: "", timeline: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set =
    (key: keyof typeof emptyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY",
          subject: `New project inquiry: ${form.service || "General"}`,
          from_name: `${site.brand} website`,
          name: form.name,
          email: form.email,
          company: form.company,
          service: form.service,
          timeline: form.timeline,
          message: form.message,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setForm(emptyForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section border-t border-line">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="eyebrow mb-4">Start a project</p>
          <h2 className="display text-4xl sm:text-5xl md:text-6xl text-balance">
            Tell me what you&apos;re building.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Share a few details and I&apos;ll get back to you with questions or a proposal. {site.responseTime}
          </p>

          <div className="mt-10 space-y-4">
            {site.bookingUrl && (
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-accent">
                  <CalendarDays size={18} />
                </span>
                <span>
                  <span className="block font-medium">Book a free 20-minute call</span>
                  <span className="text-sm text-muted">Pick a time that works for you</span>
                </span>
              </a>
            )}
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-accent">
                <Mail size={18} />
              </span>
              <span className="min-w-0">
                <span className="block font-medium">Prefer email?</span>
                <span className="block truncate text-sm text-muted">{profile.email}</span>
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-line bg-surface p-6 md:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-start gap-4 py-10" role="status">
                <CheckCircle2 size={32} className="text-accent" />
                <h3 className="text-2xl font-semibold tracking-tight">Thanks, message received.</h3>
                <p className="text-muted">I&apos;ll read it and reply to you by email soon.</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="text-sm font-medium underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">Name</span>
                    <input required value={form.name} onChange={set("name")} className={field} autoComplete="name" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">Email</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      className={field}
                      autoComplete="email"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">
                    Company <span className="font-normal text-faint">(optional)</span>
                  </span>
                  <input value={form.company} onChange={set("company")} className={field} autoComplete="organization" />
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">What do you need?</span>
                    <select required value={form.service} onChange={set("service")} className={field}>
                      <option value="" disabled>
                        Select a service
                      </option>
                      {services.map((s) => (
                        <option key={s.id}>{s.title}</option>
                      ))}
                      <option>Not sure yet</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">Timeline</span>
                    <select value={form.timeline} onChange={set("timeline")} className={field}>
                      <option value="">Select a timeline</option>
                      {timelines.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Project details</span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="What are you trying to build or solve? Any data, systems or deadlines I should know about?"
                    className={cn(field, "resize-y")}
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(buttonStyles.primary, "w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto")}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send inquiry
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p className="text-sm text-danger" role="alert">
                    Something went wrong. Please try again, or email me at {profile.email}.
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
