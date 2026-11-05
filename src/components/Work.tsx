import Image from "next/image";
import { ArrowUpRight, Lock } from "lucide-react";
import { clientWork, type ClientWork } from "@/lib/data";
import SectionHead from "./SectionHead";

function Cover({ item }: { item: ClientWork }) {
  if (item.image) {
    return (
      <div className="shot aspect-[16/10] rounded-t-[19px] border-b border-line">
        <Image
          src={item.image}
          alt={`Home page of ${item.domain}, built for ${item.client}`}
          width={1600}
          height={1000}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <div className="relative grid aspect-[16/10] place-items-center overflow-hidden rounded-t-[19px] border-b border-line bg-alt">
      <div className="bg-dots" aria-hidden />
      <div className="relative flex flex-col items-center gap-3 text-center">
        <span className="grid size-12 place-items-center rounded-md border border-line bg-white text-ink">
          <Lock size={20} strokeWidth={1.75} aria-hidden />
        </span>
        <span className="t-small font-medium text-ink-2">Private project</span>
      </div>
    </div>
  );
}

function CardBody({ item }: { item: ClientWork }) {
  return (
    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="t-title">{item.client}</h3>
          <p className="t-small muted mt-1">{item.kind}</p>
        </div>
        <p className="t-small muted shrink-0 text-right tnum">
          {item.sector}
          {item.year ? <><br />{item.year}</> : null}
        </p>
      </div>
      <p className="t-body mt-5">{item.summary}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {item.scope.map((s) => (
          <li key={s} className="rounded-full border border-line px-3 py-1 text-[13px] text-ink-2">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-7">
        {item.url ? (
          <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-accent">
            Visit {item.domain}
            <ArrowUpRight size={16} aria-hidden />
          </span>
        ) : (
          <a href="#contact" className="link text-[15px]">
            Ask about this project
          </a>
        )}
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="section relative">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            id="work-title"
            label="Selected client work"
            title="Sites and software that teams use every day."
            intro="A nonprofit that publishes its own news, a jewellery brand selling online, and a firm that needed its own tool."
          />
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clientWork.map((item) => (
            <li key={item.slug} className="flex">
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card card--link flex w-full flex-col"
                  aria-label={`${item.client}: ${item.kind}. Opens ${item.domain}`}
                >
                  <Cover item={item} />
                  <CardBody item={item} />
                </a>
              ) : (
                <div className="card flex w-full flex-col">
                  <Cover item={item} />
                  <CardBody item={item} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
