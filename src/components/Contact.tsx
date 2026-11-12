"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { profile } from "@/lib/data";
import { ArrowIcon, CheckIcon, CopyIcon } from "./icons";
import { Rule } from "./Site";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const TYPES = [
  "Website for an organisation or firm",
  "Online store",
  "Web app or internal tool",
  "AI and data work",
  "Not sure yet",
];

type Status = { kind: "idle" | "sending" | "sent" | "error"; text: string };

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>({
    kind: "idle",
    text: ACCESS_KEY ? "I reply within one working day" : "Opens in your email app",
  });

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      /* clipboard blocked: the address is still visible to copy by hand */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  async function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("name") ?? "");
    const email = String(f.get("email") ?? "");
    const type = String(f.get("type") ?? "");
    const message = String(f.get("message") ?? "");

    // Without a Web3Forms key (local builds), fall back to the visitor's email app.
    if (!ACCESS_KEY) {
      const body = `Name: ${name}\nEmail: ${email}\nProject type: ${type}\n\n${message}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`New project: ${type}`)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus({ kind: "sending", text: "Sending…" });
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New project: ${type}`,
          from_name: name,
          name,
          email,
          project_type: type,
          message,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || !data.success) throw new Error("send failed");
      form.reset();
      setStatus({ kind: "sent", text: "Thanks, your message is on its way. I'll reply within one working day." });
    } catch {
      setStatus({ kind: "error", text: `That didn't send. Please email ${profile.email} instead.` });
    }
  }

  return (
    <section className="sec sec-pad" id="contact" aria-labelledby="contact-h">
      <Rule />
      <h2 className="contact-h rv mask" id="contact-h">
        <span>Let&apos;s work together</span>
      </h2>
      <div className="contact-grid">
        <div className="contact-side">
          <p className="mono faint" style={{ margin: "0 0 12px" }}>
            Email
          </p>
          <div className="mail">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button className="copy mono" type="button" onClick={copy} aria-live="polite">
              {/* Re-keyed so the swap between the two states fades instead of snapping. */}
              <span className="swap" key={copied ? "done" : "idle"}>
                {copied ? <CheckIcon /> : <CopyIcon />}
                {copied ? "Copied" : "Copy"}
              </span>
            </button>
          </div>
          <p>
            Tell me what you&apos;re planning and who it&apos;s for. I&apos;ll reply to set up a short call, then send a
            written proposal with a fixed quote.
          </p>
          <p className="avail-plain mono">{profile.availability}</p>
        </div>

        <form onSubmit={submit}>
          <div className="f">
            <label className="mono" htmlFor="f-name">
              Name
            </label>
            <input id="f-name" name="name" autoComplete="name" required />
          </div>
          <div className="f">
            <label className="mono" htmlFor="f-email">
              Email
            </label>
            <input id="f-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="f full">
            <label className="mono" htmlFor="f-type">
              Project type
            </label>
            <select id="f-type" name="type" defaultValue={TYPES[0]}>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="f full">
            <label className="mono" htmlFor="f-msg">
              Message
            </label>
            <textarea id="f-msg" name="message" rows={4} placeholder="What you need, who it's for, and any dates" required />
          </div>
          <div className="form-foot">
            <span className={`mono form-note ${status.kind}`} role="status">
              <span className="swap" key={status.kind}>
                {status.text}
                {status.kind === "idle" && ACCESS_KEY && (
                  <>
                    {". "}
                    <Link href="/privacy">Privacy</Link>
                  </>
                )}
              </span>
            </span>
            <button className="btn btn-ink" type="submit" disabled={status.kind === "sending"}>
              Start a project <ArrowIcon />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
