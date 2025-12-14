"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export type BackgroundTheme = {
  id: string;
  gradient: string;
  overlay?: string;
  noiseOpacity?: number;
};

type GlobalBackgroundProps = {
  themes: BackgroundTheme[];
};

const GlobalBackground = ({ themes }: GlobalBackgroundProps) => {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(themes[0]?.id ?? "default");

  const themeMap = useMemo(() => {
    const map = new Map<string, BackgroundTheme>();
    themes.forEach((t) => map.set(t.id, t));
    return map;
  }, [themes]);

  useEffect(() => {
    if (themes.length === 0) return undefined;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-theme-id]"));
    if (sections.length === 0) return undefined;

    const handleScroll = () => {
      const midViewport = window.innerHeight / 2;
      let best: { id: string; dist: number } | null = null;
      sections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - midViewport);
        const id = el.dataset.themeId;
        if (!id) return;
        if (!best || dist < best.dist) {
          best = { id, dist };
        }
      });
      if (best && best.id !== activeId) {
        setActiveId(best.id);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeId, themes]);

  const activeTheme = themeMap.get(activeId) ?? themes[0];

  if (!activeTheme) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTheme.id}
          className="absolute inset-0"
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reduceMotion ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.22, 0.72, 0.24, 1] }}
          style={{
            background: activeTheme.gradient,
          }}
        />
      </AnimatePresence>

      {activeTheme.overlay && (
        <div
          className="absolute inset-0"
          style={{
            background: activeTheme.overlay,
            transition: "background 800ms ease",
          }}
        />
      )}

      {!reduceMotion && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(146,240,255,0.1), transparent 45%), radial-gradient(circle at 80% 10%, rgba(255,141,106,0.08), transparent 45%)",
            mixBlendMode: "screen",
            opacity: 0.4,
          }}
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22 viewBox=%220 0 160 160%22><filter id=%22n%22 x=%220%22 y=%220%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.1%22/></svg>')",
          mixBlendMode: "soft-light",
          opacity: activeTheme.noiseOpacity ?? 0.35,
          transition: "opacity 800ms ease",
        }}
      />
    </div>
  );
};

export default GlobalBackground;
