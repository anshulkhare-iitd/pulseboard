import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{ title?: string }>;

export function Card({ title, children }: CardProps) {
  return (
    <section className="rounded-lg border border-slate-700 bg-slate-900 p-4 shadow-sm">
      {title ? <h3 className="mb-3 text-sm font-semibold text-slate-100">{title}</h3> : null}
      {children}
    </section>
  );
}
