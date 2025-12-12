"use client";

import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "secondary" | "utility";
type ButtonSize = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-ember via-pearl to-iris text-river-900 shadow-lg shadow-ember/30 hover:shadow-ember/40",
  ghost: "border border-white/15 bg-white/5 text-foam hover:border-ember/50 hover:text-pearl",
  secondary:
    "bg-river-700/60 text-foam border border-white/10 hover:border-pearl/50 hover:shadow-[0_10px_40px_rgba(146,240,255,0.18)]",
  utility: "bg-river-900/80 text-foam border border-white/15 hover:border-ember/50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-xs uppercase tracking-[0.12em]",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-3.5 text-base",
};

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & ComponentProps<"button">;

export const Button = ({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonProps) => {
  const styles = clsx(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={rest.type ?? "button"} className={styles} {...rest}>
      {children}
    </button>
  );
};
