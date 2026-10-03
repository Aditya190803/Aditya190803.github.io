"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import { profile, services, site } from "@/lib/data";
import { Reveal, StatusDot, buttonStyles } from "@/components/ui";
import { cn } from "@/lib/utils";

const timelines = ["As soon as possible", "Within a month", "In 1–3 months", "Just exploring"];

const nextSteps = [
  "I read your message and reply by email, usually with a few questions.",
  "We talk through the details on a short call.",
  "I send a written proposal with scope, timeline and a quote.",
];

const field =
  "w-full rounded-lg border border-line-strong bg-bg px-3.5 py-3 text-[15px] text-ink placeholder:text-faint transition-colors hover:border-faint focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15";

const emptyForm = { name: "", email: "", company: "", service: "", timeline: "", message: "" };

function Field({
  label,
  optional,
  children,
  className,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-faint"> (optional)</span>}
      </span>
      {children}
    </label>
  );
}

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
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <p className="label flex items-center gap-2">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            Start a project
          </p>
          <h2 className="display mt-6 text-[2.75rem] text-balance sm:text-6xl md:text-7xl">
            Tell me what you&apos;re working on.
          </h2>
          <p className="mt-6 inline-flex items-center gap-2.5 text-sm text-muted">
            <StatusDot />
            {site.availability}
          </p>

          <div className="mt-10 border-t border-line pt-8">
            <p className="label mb-5">What happens next</p>
            <ol className="space-y-4">
              {nextSteps.map((s, i) => (
                <li key={s} className="flex gap-4 leading-relaxed">
                  <span className="mt-0.5 font-mono text-sm text-faint">{i + 1}</span>
                  <span className="text-muted">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 space-y-3">
            {site.bookingUrl && (
              <a
                href={site.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-accent">
                  <CalendarDays size={18} aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block font-medium">Book a call</span>
                  <span className="text-sm text-muted">Pick a time that suits you</span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-faint group-hover:text-accent"
                  aria-hidden="true"
                />
              </a>
            )}
            <p className="text-muted">
              Prefer email? Write to
              <a
                href={`mailto:${profile.email}`}
                className="mt-1 block w-fit font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-accent hover:decoration-accent"
              >
                {profile.email}
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-7">
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-[0_1px_2px_rgba(14,17,22,0.04),0_30px_70px_-45px_rgba(14,17,22,0.3)] sm:p-8 md:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-start gap-4 py-12" role="status">
                <CheckCircle2 size={32} className="text-live" aria-hidden="true" />
                <h3 className="font-display text-3xl font-medium tracking-[-0.025em]">
                  Inquiry sent.
                </h3>
                <p className="max-w-sm text-muted">
                  Thanks for the details. I&apos;ll reply by email to the address you gave.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm font-medium underline underline-offset-4 hover:text-accent"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="font-display text-xl font-medium tracking-[-0.015em]">
                  Project inquiry
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name">
                    <input
                      required
                      value={form.name}
                      onChange={set("name")}
                      className={field}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      className={field}
                      autoComplete="email"
                    />
                  </Field>
                </div>

                <Field label="Company" optional>
                  <input
                    value={form.company}
                    onChange={set("company")}
                    className={field}
                    autoComplete="organization"
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Service needed">
                    <select
                      required
                      value={form.service}
                      onChange={set("service")}
                      className={field}
                    >
                      <option value="" disabled>
                        Choose a service
                      </option>
                      {services.map((s) => (
                        <option key={s.id}>{s.title}</option>
                      ))}
                      <option>Not sure yet</option>
                    </select>
                  </Field>
                  <Field label="Timeline" optional>
                    <select value={form.timeline} onChange={set("timeline")} className={field}>
                      <option value="">Choose a timeline</option>
                      {timelines.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Project details">
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="What do you want to build or solve? Mention any data, existing systems or deadlines."
                    className={cn(field, "resize-y")}
                  />
                </Field>

                <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={cn(
                      buttonStyles.primary,
                      "w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto",
                    )}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        Sending inquiry…
                      </>
                    ) : (
                      <>
                        Send inquiry
                        <ArrowRight size={16} aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-faint">
                    Happy to sign an NDA before you share details.
                  </p>
                </div>

                {status === "error" && (
                  <p className="rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
                    The inquiry didn&apos;t send. Try again, or email me directly at {profile.email}
                    .
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
