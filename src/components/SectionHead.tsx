type Props = {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  dark?: boolean;
};

/** Section opener: a small label, the h2 and an optional intro, left aligned. */
export default function SectionHead({ label, title, intro, id }: Props) {
  return (
    <div className="max-w-[760px]">
      <p className="t-label flex items-center gap-2">
        <span aria-hidden className="inline-block size-1.5 rounded-full bg-accent" />
        {label}
      </p>
      <h2 id={id} className="t-h2 mt-4">
        {title}
      </h2>
      {intro ? <p className="t-lead measure mt-5">{intro}</p> : null}
    </div>
  );
}
