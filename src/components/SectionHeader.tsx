import React, { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  iconBg?: string;
  label?: string;
  title: string;
}

export default function SectionHeader({ icon, iconBg = "bg-coral", label, title }: Props) {
  const parts = title.split(" ");
  const first = parts.shift();
  const rest = parts.join(" ");

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <span className={`${iconBg} w-12 h-12 text-white flex items-center justify-center`}>{icon}</span>
        <span className="text-sm font-bold uppercase tracking-widest">{label}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-8 leading-[0.9] tracking-tight">
        {first}
        {rest ? (
          <>
            <br />
            <span className="text-stroke-thin">{` ${rest}`}</span>
          </>
        ) : null}
      </h2>
    </>
  );
}
