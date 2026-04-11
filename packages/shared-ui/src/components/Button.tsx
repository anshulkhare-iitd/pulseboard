import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Variant = "primary" | "secondary";

const variantClasses: Record<Variant, string> = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500",
  secondary: "bg-slate-700 text-slate-100 hover:bg-slate-600",
};

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }>) {
  return (
    <button
      className={`rounded-md px-3 py-2 text-sm font-medium transition ${variantClasses[variant as Variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
