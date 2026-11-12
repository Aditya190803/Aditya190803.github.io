import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "./icons";
import { Field } from "./ScrollFx";
import { delay } from "./Site";

/** Title block for the sub-pages (projects, research, résumé, privacy). */
export function PageHead({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="page-head">
      <Field />
      <Link className="crumb mono rv" href="/">
        <ArrowIcon />
        Home
      </Link>
      <h1 className="h1p rv mask" style={delay(1)}>
        <span>{title}</span>
      </h1>
      <p className="page-sub rv" style={delay(2)}>
        {children}
      </p>
    </section>
  );
}
