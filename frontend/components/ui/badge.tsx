import clsx from "clsx";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "glow";
  className?: string;
};

export const Badge = ({ children, variant = "default", className }: BadgeProps) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.14em]",
        variant === "default" && "border border-white/20 bg-white/10 text-foam",
        variant === "glow" &&
          "border border-ember/40 bg-gradient-to-r from-ember/20 via-pearl/10 to-iris/20 text-pearl",
        className,
      )}
    >
      {children}
    </span>
  );
};
