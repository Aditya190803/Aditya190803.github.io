/**
 * A project's real screenshots: desktop in a browser frame, phone overlapping
 * the corner. Plain <img> because the site is a static export.
 */
export default function Shots({
  domain,
  image,
  imageMobile,
  tone,
  eager = false,
  compact = false,
}: {
  domain: string;
  image: string;
  imageMobile?: string;
  tone: string;
  eager?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${compact ? "p-3" : "p-5 md:p-8"}`} style={{ background: tone }}>
      <div className={`overflow-hidden rounded-lg bg-white shadow-[0_20px_40px_-24px_rgba(21,22,27,0.45)] ring-1 ring-black/5 ${imageMobile && !compact ? "mr-[16%]" : ""}`}>
        <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-black/10" />
          <span className="h-2 w-2 rounded-full bg-black/10" />
          <span className="h-2 w-2 rounded-full bg-black/10" />
          <span className="ml-2 truncate text-[0.7rem] text-ink-3">{domain}</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`Home page of ${domain}`}
          width={1600}
          height={1000}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="block aspect-[16/10] w-full object-cover object-top"
        />
      </div>
      {imageMobile && !compact && (
        <div className="absolute bottom-0 right-5 w-[24%] translate-y-[18%] overflow-hidden rounded-[1.1rem] border-[5px] border-ink bg-ink shadow-[0_24px_40px_-16px_rgba(21,22,27,0.5)] md:right-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageMobile}
            alt={`${domain} on a phone`}
            width={560}
            height={1212}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="block aspect-[390/700] w-full object-cover object-top"
          />
        </div>
      )}
    </div>
  );
}
