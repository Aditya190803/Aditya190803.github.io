"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { featured, profile, work } from "@/lib/data";

const NAME = "Aditya Mer";

type Entry = { name: string; kind: string; year?: string; href: string; tone: string; domain: string; ink?: boolean };

const entries: Entry[] = [
  {
    name: featured.name,
    kind: `Product, used at ${featured.usedBy}`,
    year: "2025",
    href: "#flier",
    tone: "var(--cobalt)",
    domain: featured.domain,
    ink: true,
  },
  ...work.map((w) => ({ name: w.client, kind: w.kind, year: w.year, href: "#work", tone: w.tone, domain: w.domain })),
];

function MumbaiTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return <span>{time ?? "--:--"} IST</span>;
}

/** Small "website" drawing used in the hover preview. */
function Preview({ e }: { e: Entry }) {
  return (
    <div
      className="flex h-full w-full flex-col justify-between rounded-xl p-5"
      style={{ background: e.tone, color: e.ink ? "var(--on-cobalt)" : "var(--ink)" }}
    >
      <div className="flex items-center gap-1.5 opacity-60">
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        <span className="ml-2 text-xs">{e.domain}</span>
      </div>
      <div className="space-y-2">
        <p className="title text-[2.1rem] leading-none">{e.name}</p>
        <div className="space-y-1.5 opacity-40">
          <span className="block h-1.5 w-4/5 rounded-full bg-current" />
          <span className="block h-1.5 w-3/5 rounded-full bg-current" />
        </div>
      </div>
      <p className="text-sm opacity-75">{e.kind}</p>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // Fit the name to the full width of the layout.
  useEffect(() => {
    const h = nameRef.current;
    if (!h) return;
    const fit = () => {
      const parent = h.parentElement!;
      const styles = getComputedStyle(parent);
      const width = parent.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
      h.style.fontSize = "100px";
      // Leave room for letters to thicken under the cursor.
      h.style.fontSize = `${Math.floor((100 * width * 0.955) / h.scrollWidth)}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(h.parentElement!);
    return () => ro.disconnect();
  }, []);

  // Intro, then letters that thicken near the cursor.
  useEffect(() => {
    const el = root.current;
    const h = nameRef.current;
    if (!el || !h) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chars = Array.from(h.querySelectorAll<HTMLElement>("[data-char]"));

    let tl: gsap.core.Timeline | undefined;
    if (!reduce) {
      gsap.set(h, { opacity: 1 });
      tl = gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.15 })
        .from(chars, { yPercent: 110, duration: 1.5, stagger: 0.045 })
        .fromTo(
          el.querySelectorAll("[data-hero]"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.06 },
          "-=1.1",
        );
    }

    if (reduce || !window.matchMedia("(pointer: fine)").matches) return () => tl?.kill();

    const base = 380;
    const weights = chars.map(() => base);
    let px = -9999;
    let py = -9999;
    let raf = 0;
    let running = false;

    const loop = () => {
      const fontSize = parseFloat(h.style.fontSize) || 200;
      const reach = fontSize * 1.1;
      let moving = false;
      chars.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / reach);
        const target = base + t * t * 340;
        const next = weights[i] + (target - weights[i]) * 0.12;
        if (Math.abs(next - weights[i]) > 0.2) moving = true;
        weights[i] = next;
        c.style.fontVariationSettings = `"wght" ${next.toFixed(1)}, "opsz" 72`;
      });
      // Idle when settled so nothing runs in the background.
      if (moving) raf = requestAnimationFrame(loop);
      else running = false;
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      kick();
    };
    const onLeave = () => {
      px = -9999;
      py = -9999;
      kick();
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      tl?.kill();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Floating preview that trails the cursor over the work index.
  useEffect(() => {
    const p = preview.current;
    if (!p || !window.matchMedia("(pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(p, { xPercent: -50, yPercent: -50, scale: 0.85, opacity: 0 });
    const xTo = gsap.quickTo(p, "x", { duration: reduce ? 0 : 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(p, "y", { duration: reduce ? 0 : 0.7, ease: "power3.out" });
    const rTo = gsap.quickTo(p, "rotation", { duration: 0.8, ease: "power3.out" });
    let lastX = 0;
    const move = (e: PointerEvent) => {
      // Sit to the left of the cursor so the list stays readable.
      xTo(e.clientX - p.offsetWidth * 0.5 - 56);
      yTo(e.clientY);
      if (!reduce) rTo(Math.max(-12, Math.min(12, (e.clientX - lastX) * 0.6)));
      lastX = e.clientX;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    if (!preview.current) return;
    gsap.to(preview.current, {
      opacity: active === null ? 0 : 1,
      scale: active === null ? 0.85 : 1,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [active]);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[6.5rem] md:pt-[7.5rem]"
      aria-labelledby="hero-name"
    >
      <div className="wrap grid flex-1 content-start gap-10 md:grid-cols-12 md:gap-8">
        <div data-hero className="md:col-span-4">
          <p className="measure text-[1.15rem] leading-relaxed text-ink-2 md:text-[1.2rem]">
            Designer and developer in Mumbai. I make websites, online stores and web apps for organisations and brands,
            and built{" "}
            <a href="#flier" className="link-static text-ink">
              Flier
            </a>
            , the email tool in use at {featured.usedBy}.
          </p>
        </div>

        <div className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
          <p data-hero className="mb-3 flex justify-between text-[0.95rem] text-ink-3">
            <span>Selected work</span>
            <span className="tabular-nums">{String(entries.length).padStart(2, "0")}</span>
          </p>
          <ul onPointerLeave={() => setActive(null)}>
            {entries.map((e, i) => (
              <li key={e.name} data-hero className="border-t border-rule last:border-b">
                <a
                  href={e.href}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className={`group grid grid-cols-[2rem_1fr_auto] items-baseline gap-3 py-3.5 transition-colors duration-300 md:py-4 ${
                    active !== null && active !== i ? "text-ink-3" : ""
                  }`}
                >
                  <span className="text-[0.9rem] tabular-nums text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <span className="title text-[1.5rem] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-2 md:text-[1.75rem]">
                    {e.name}
                  </span>
                  <span className="hidden text-right text-[0.95rem] text-ink-3 sm:block">{e.kind}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap order-first mb-10 mt-2 md:order-none md:mb-0 md:mt-12">
        <h1
          id="hero-name"
          ref={nameRef}
          className="display inline-block !leading-[0.8] [font-size:18vw] md:whitespace-nowrap [html.js-motion_&]:opacity-0"
          aria-label={NAME}
        >
          {NAME.split(" ").map((word, w) => (
            <span key={word} className="block md:inline" aria-hidden="true">
              {w > 0 && <span className="hidden md:inline-block">{"\u00a0"}</span>}
              {word.split("").map((c, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.07em] align-bottom">
                  <span data-char className="inline-block" style={{ fontVariationSettings: '"wght" 380, "opsz" 72' }}>
                    {c}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      <div data-hero className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-ink py-5 text-[0.95rem] text-ink-2">
          <span>Independent designer &amp; developer</span>
          <span className="hidden sm:inline">
            {profile.location.split(",")[0]}, <MumbaiTime />
          </span>
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cobalt opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cobalt" />
            </span>
            {profile.availability}
          </span>
        </div>
      </div>

      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[15rem] w-[21rem] rounded-xl shadow-[0_30px_60px_-20px_rgba(21,22,27,0.35)] md:block"
        style={{ opacity: 0 }}
      >
        {active !== null && <Preview e={entries[active]} />}
      </div>
    </section>
  );
}
