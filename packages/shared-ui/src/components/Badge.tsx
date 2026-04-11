import type { PropsWithChildren } from "react";

type BadgeTone = "default" | "success" | "warning";

const toneStyles: Record<BadgeTone, string> = {
  default: "bg-slate-700 text-slate-100",
  success: "bg-emerald-700 text-emerald-100",
  warning: "bg-amber-700 text-amber-100",
};

export function Badge({
  tone = "default",
  children,
}: PropsWithChildren<{ tone?: BadgeTone }>) {
  return (
    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${toneStyles[tone as BadgeTone]}`}>
      {children}
    </span>
  );
}
