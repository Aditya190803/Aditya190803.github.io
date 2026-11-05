import { BookOpen, LayoutTemplate, Mail } from "lucide-react";
import { clientWork, site } from "@/lib/data";
import Window from "./Window";

const iascc = clientWork[0];

const proof = [
  { icon: LayoutTemplate, text: "IASCC website and CMS" },
  { icon: Mail, text: "Flier, my own mail-merge product" },
  { icon: BookOpen, text: "Research published at IEEE" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-[calc(var(--nav)+72px)] pb-20 lg:min-h-[100svh] lg:pt-[calc(var(--nav)+96px)] lg:pb-24"
    >
      {/* Background graphics */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid" />
        <div className="glow glow--blue -left-40 top-24 size-[520px]" />
        <div className="glow glow--sky right-[-120px] top-[38%] size-[460px]" />
      </div>

      <div className="wrap grid-12 items-center gap-y-14">
        <div className="col-span-12 lg:col-span-6">
          <p className="pill">
            <span className="dot" aria-hidden />
            {site.availability}
            <span className="text-muted">· {site.city}</span>
          </p>

          <h1 className="t-h1 mt-7">
            Websites and web apps,
            <br />
            <span className="serif-accent text-[1.12em] leading-[0.95]">built to be used.</span>
          </h1>

          <p className="t-lead measure mt-7">
            I&apos;m Aditya, a freelance developer in Mumbai. I design and build websites, online stores and web apps
            for organisations and businesses, and add AI where it saves your team real time.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn btn--primary btn--block-sm">
              {site.cta}
            </a>
            <a href="#work" className="btn btn--secondary btn--block-sm bg-white/70">
              See the work
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {proof.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2 text-[14px] text-muted">
                <Icon size={16} strokeWidth={1.75} className="text-accent" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="frame settle rounded-[24px] bg-white/60 p-2 sm:p-3">
            <span className="plus plus--tl" aria-hidden />
            <span className="plus plus--tr" aria-hidden />
            <span className="plus plus--bl" aria-hidden />
            <span className="plus plus--br" aria-hidden />
            <Window
              src={iascc.image!}
              domain={iascc.domain!}
              alt="Home page of iascc.in, the website for the Integrated Association of Supportive Care in Cancer"
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="shadow-[0_30px_60px_-30px_rgb(20_28_43/0.25)]"
            />
          </div>
          <p className="t-label mt-4 text-right">
            Recent work: <a href={iascc.url} className="link" target="_blank" rel="noreferrer">{iascc.domain}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
