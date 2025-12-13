"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ReactNode, useMemo } from "react";

type SceneFit = "fit" | "cover" | "adaptive";
type BackgroundType = "gradient" | "image" | "video" | "none";

export type SceneProps = {
  id: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  backgroundType?: BackgroundType;
  backgroundSrc?: string;
  backgroundAlt?: string;
  fit?: SceneFit;
  padding?: string;
  overlay?: ReactNode;
  vignette?: boolean;
  noise?: boolean;
  theme?: "light" | "dark";
};

const Scene = ({
  id,
  children,
  className,
  contentClassName,
  backgroundType = "none",
  backgroundSrc,
  backgroundAlt = "",
  fit = "adaptive",
  padding,
  overlay,
  vignette = true,
  noise = true,
}: SceneProps) => {
  const reduceMotion = useReducedMotion();

  const objectFit = useMemo(() => {
    if (fit === "cover") return "object-cover";
    if (fit === "fit") return "object-contain";
    return "md:object-cover object-contain";
  }, [fit]);

  return (
    <section
      id={id}
      data-theme-id={id}
      className={clsx(
        "relative h-screen w-screen snap-start overflow-hidden",
        "flex items-center justify-center",
        className,
      )}
    >
      <div className="absolute inset-0">
        {backgroundType === "gradient" && backgroundSrc && (
          <div
            className="absolute inset-0"
            style={{
              background:
                backgroundSrc ??
                "radial-gradient(circle at 20% 20%, rgba(146,240,255,0.18), transparent 38%), radial-gradient(circle at 80% 10%, rgba(255,141,106,0.18), transparent 36%), linear-gradient(180deg, #040915 0%, #060c1b 100%)",
            }}
          />
        )}

        {backgroundType === "image" && backgroundSrc && (
          <Image
            src={backgroundSrc}
            alt={backgroundAlt}
            fill
            priority
            className={clsx("pointer-events-none select-none", objectFit)}
          />
        )}

        {backgroundType === "video" && backgroundSrc && !reduceMotion && (
          <video
            className={clsx("absolute inset-0 h-full w-full", objectFit)}
            src={backgroundSrc}
            autoPlay
            loop
            muted
            playsInline
            poster={backgroundAlt}
          />
        )}

        {(reduceMotion || backgroundType === "none") && (
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(142,240,255,0.08),rgba(255,141,106,0.08))]" />
        )}

        {vignette && (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_55%,rgba(0,0,0,0.65)_100%)] mix-blend-multiply" />
        )}
        {noise && (
          <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22 viewBox=%220 0 160 160%22><filter id=%22n%22 x=%220%22 y=%220%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%221%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.06%22/></svg>')] opacity-70 mix-blend-soft-light" />
        )}
        {overlay}
      </div>

      <motion.div
        className="relative z-10 flex h-full w-full items-center justify-center"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 0.72, 0.24, 1] }}
      >
        <div
          className={clsx(
            "relative w-full max-w-[calc(100vh*(16/9))] aspect-[16/9] overflow-hidden",
            "rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-[14px] shadow-[0_24px_70px_rgba(0,0,0,0.45)]",
            contentClassName,
          )}
          style={{
            maxWidth: "min(100vw, calc(100vh * (16 / 9)))",
            maxHeight: "min(100vh, calc(100vw * (9 / 16)))",
            padding: padding ?? "clamp(16px, 3vw, 32px)",
          }}
        >
          <div className="relative h-full w-full overflow-hidden">{children}</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Scene;
