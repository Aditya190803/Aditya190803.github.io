/** Typographic cover for projects without screenshots. */
export default function Cover({
  name,
  domain,
  sector,
  tone,
  compact = false,
}: {
  name: string;
  domain: string;
  sector: string;
  tone: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl ${compact ? "h-full p-6" : "aspect-[16/11] p-6 md:p-10"}`}
      style={{ background: tone }}
    >
      <span className="text-[0.95rem] text-ink-2">{sector}</span>
      <span className={`title break-words ${compact ? "text-[2.4rem]" : "text-[clamp(2.4rem,5.5vw,5rem)]"}`}>{name}</span>
      <span className="text-[0.95rem] text-ink-2">{domain}</span>
    </div>
  );
}
