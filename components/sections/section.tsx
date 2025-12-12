import clsx from "clsx";
import type { ReactNode } from "react";
import { Badge } from "../ui/badge";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export const Section = ({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  align = "left",
}: SectionProps) => {
  return (
    <section
      id={id}
      className={clsx(
        "relative w-full space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] md:p-10",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(146,240,255,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,141,106,0.12),transparent_25%)]" />
      <div
        className={clsx(
          "relative z-10 max-w-4xl space-y-4",
          align === "center" && "mx-auto text-center",
        )}
      >
        {eyebrow && <Badge variant="glow">{eyebrow}</Badge>}
        {title && (
          <h2 className="font-display text-3xl leading-tight text-foam md:text-4xl">{title}</h2>
        )}
        {description && <p className="text-foam/80">{description}</p>}
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
};
