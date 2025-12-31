"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TextRevealCardProps = {
  text: string;
  revealText: string;
  className?: string;
  children?: React.ReactNode;
  frame?: boolean;
};

const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const TextRevealCard = ({
  text,
  revealText,
  className,
  children,
  frame = true,
}: TextRevealCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [widthPercentage, setWidthPercentage] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const updatePercentage = (clientX: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (!rect.width) return;
    const relativeX = clamp(clientX - rect.left, 0, rect.width);
    setWidthPercentage((relativeX / rect.width) * 100);
  };

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    updatePercentage(event.clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!event.touches[0]) return;
    updatePercentage(event.touches[0].clientX);
  };

  const handleLeave = () => {
    setIsActive(false);
    setWidthPercentage(0);
  };

  const handleEnter = () => setIsActive(true);

  const rotateDeg = (widthPercentage - 50) * 0.1;

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      onTouchStart={handleEnter}
      onTouchEnd={handleLeave}
      onTouchMove={handleTouchMove}
      className={cn(
        "relative w-full",
        frame
          ? "rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-8"
          : "rounded-none border-transparent bg-transparent p-0 shadow-none",
        className,
      )}
    >
      {frame && (
        <>
          <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_10%_10%,rgba(142,240,255,0.16),transparent_45%),radial-gradient(circle_at_90%_0%,rgba(255,141,106,0.18),transparent_40%)]" />
          <div
            className="pointer-events-none absolute inset-0 rounded-[28px] opacity-40 mix-blend-soft-light"
            style={{ backgroundImage: noiseTexture }}
          />
        </>
      )}
      <div className="relative z-10 space-y-4">
        <div className="relative flex h-24 items-center overflow-hidden md:h-32">
          <motion.div
            style={{ width: "100%" }}
            animate={
              isActive
                ? {
                    opacity: widthPercentage > 0 ? 1 : 0,
                    clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                  }
                : {
                    clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                  }
            }
            transition={isActive ? { duration: 0 } : { duration: 0.4 }}
            className="absolute z-20 will-change-transform"
          >
            <p className="font-display text-3xl font-semibold leading-none text-transparent bg-gradient-to-b from-white to-foam-muted bg-clip-text sm:text-4xl md:text-6xl">
              {revealText}
            </p>
          </motion.div>
          <motion.div
            animate={{
              left: `${widthPercentage}%`,
              rotate: `${rotateDeg}deg`,
              opacity: widthPercentage > 0 ? 1 : 0,
            }}
            transition={isActive ? { duration: 0 } : { duration: 0.4 }}
            className="absolute z-30 h-full w-[6px] bg-gradient-to-b from-transparent via-white/40 to-transparent"
          />
          <motion.div
            animate={{
              clipPath: `inset(0 0 0 ${widthPercentage}%)`,
            }}
            transition={isActive ? { duration: 0 } : { duration: 0.4 }}
            className="relative w-full"
          >
            <p className="font-display text-3xl font-bold leading-none text-transparent bg-gradient-to-b from-white/85 via-foam/70 to-foam/40 bg-clip-text drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)] sm:text-4xl md:text-6xl">
              {text}
            </p>
          </motion.div>
        </div>
        {children ? <div className="space-y-3">{children}</div> : null}
      </div>
    </div>
  );
};

type TextBlockProps = {
  children: React.ReactNode;
  className?: string;
};

export const TextRevealCardTitle = ({ children, className }: TextBlockProps) => {
  return (
    <h2
      className={cn(
        "font-display text-3xl leading-tight text-foam drop-shadow-[0_14px_35px_rgba(0,0,0,0.55)] md:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({ children, className }: TextBlockProps) => {
  return (
    <p className={cn("text-base leading-relaxed text-foam/80 md:text-lg", className)}>
      {children}
    </p>
  );
};
