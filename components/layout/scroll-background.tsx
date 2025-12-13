"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { backgroundPresets, type BackgroundPreset } from "./background-presets";

type GradientColor = { r: number; g: number; b: number; a?: number };
type RadialLayer = {
  x: number;
  y: number;
  size: number;
  color: GradientColor;
  drift?: { x?: number; y?: number; size?: number; alpha?: number };
};

type ResolvedTheme = {
  linearFrom: GradientColor;
  linearTo: GradientColor;
  linearAngle: number;
  r1: RadialLayer;
  r2: RadialLayer;
  noise: number;
  grainScale: number;
};

type SectionEntry = {
  id: string;
  order: number;
  preset: BackgroundPreset;
  progress: number;
};

type BackgroundContextValue = {
  registerSection: (id: string, preset: BackgroundPreset) => () => void;
  updateSectionPreset: (id: string, preset: BackgroundPreset) => void;
  reportSectionProgress: (id: string, progress: number) => void;
};

const BackgroundContext = createContext<BackgroundContextValue>({
  registerSection: () => () => {},
  updateSectionPreset: () => {},
  reportSectionProgress: () => {},
});

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const mix = (a: number, b: number, t: number) => a * (1 - t) + b * t;
const mixColor = (a: GradientColor, b: GradientColor, t: number): GradientColor => ({
  r: mix(a.r, b.r, t),
  g: mix(a.g, b.g, t),
  b: mix(a.b, b.b, t),
  a: mix(a.a ?? 1, b.a ?? 1, t),
});

const colorToString = (color: GradientColor) =>
  `rgba(${color.r.toFixed(0)}, ${color.g.toFixed(0)}, ${color.b.toFixed(0)}, ${(
    color.a ?? 1
  ).toFixed(3)})`;

const applyDrift = (layer: RadialLayer, progress: number): RadialLayer => {
  const drift = layer.drift ?? {};
  const oscillation = (progress - 0.5) * 2; // -1 to 1
  return {
    ...layer,
    x: clamp(layer.x + (drift.x ?? 0) * oscillation, 4, 96),
    y: clamp(layer.y + (drift.y ?? 0) * oscillation, 4, 96),
    size: clamp(layer.size + (drift.size ?? 0) * oscillation, 18, 64),
    color: {
      ...layer.color,
      a: clamp((layer.color.a ?? 1) + (drift.alpha ?? 0) * oscillation, 0, 0.6),
    },
  };
};

const resolveTheme = (preset: BackgroundPreset, localProgress: number): ResolvedTheme => ({
  linearFrom: preset.linear.from,
  linearTo: preset.linear.to,
  linearAngle: preset.linear.angle ?? 185,
  r1: applyDrift(preset.radials[0], localProgress),
  r2: applyDrift(preset.radials[1], localProgress),
  noise: preset.noise,
  grainScale: preset.grainScale ?? 1,
});

const mixThemes = (a: ResolvedTheme, b: ResolvedTheme, t: number): ResolvedTheme => ({
  linearFrom: mixColor(a.linearFrom, b.linearFrom, t),
  linearTo: mixColor(a.linearTo, b.linearTo, t),
  linearAngle: mix(a.linearAngle, b.linearAngle, t),
  r1: {
    ...a.r1,
    x: mix(a.r1.x, b.r1.x, t),
    y: mix(a.r1.y, b.r1.y, t),
    size: mix(a.r1.size, b.r1.size, t),
    color: mixColor(a.r1.color, b.r1.color, t),
  },
  r2: {
    ...a.r2,
    x: mix(a.r2.x, b.r2.x, t),
    y: mix(a.r2.y, b.r2.y, t),
    size: mix(a.r2.size, b.r2.size, t),
    color: mixColor(a.r2.color, b.r2.color, t),
  },
  noise: mix(a.noise, b.noise, t),
  grainScale: mix(a.grainScale, b.grainScale, t),
});

export const useBackgroundTheme = () => useContext(BackgroundContext);

export const ScrollBackgroundProvider = ({ children }: { children: ReactNode }) => {
  const prefersReducedMotion = useReducedMotion();
  const backgroundRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<SectionEntry[]>([]);
  const initialTheme = useMemo(() => resolveTheme(backgroundPresets.riverNight, 0.45), []);
  const lastThemeRef = useRef<ResolvedTheme>(initialTheme);

  const phaseValue = useMotionValue(0);
  const phaseSmooth = useSpring(phaseValue, {
    stiffness: prefersReducedMotion ? 1200 : 90,
    damping: prefersReducedMotion ? 120 : 26,
    mass: 1,
    restDelta: 0.0001,
  });

  const applyTheme = useCallback((theme: ResolvedTheme) => {
    const el = backgroundRef.current;
    if (!el) return;
    el.style.setProperty("--bg-linear-start", colorToString(theme.linearFrom));
    el.style.setProperty("--bg-linear-end", colorToString(theme.linearTo));
    el.style.setProperty("--bg-linear-angle", `${theme.linearAngle}deg`);
    el.style.setProperty("--bg-r1-color", colorToString(theme.r1.color));
    el.style.setProperty("--bg-r2-color", colorToString(theme.r2.color));
    el.style.setProperty("--bg-r1-x", `${theme.r1.x}%`);
    el.style.setProperty("--bg-r1-y", `${theme.r1.y}%`);
    el.style.setProperty("--bg-r1-size", `${theme.r1.size}%`);
    el.style.setProperty("--bg-r2-x", `${theme.r2.x}%`);
    el.style.setProperty("--bg-r2-y", `${theme.r2.y}%`);
    el.style.setProperty("--bg-r2-size", `${theme.r2.size}%`);
    el.style.setProperty("--bg-noise-opacity", theme.noise.toFixed(3));
    el.style.setProperty("--bg-grain-scale", theme.grainScale.toFixed(3));
    lastThemeRef.current = theme;
  }, []);

  const computePhaseTarget = useCallback(() => {
    const entries = sectionsRef.current;
    if (!entries.length) {
      return 0;
    }

    const weighted = entries.map((entry) => {
      const local = clamp(entry.progress, 0, 1);
      const visibility = clamp(1 - Math.abs(local * 2 - 1), 0, 1);
      return {
        ...entry,
        weight: visibility,
        local,
      };
    });

    const numerator = weighted.reduce(
      (acc, entry) => acc + entry.weight * (entry.order + entry.local),
      0,
    );
    const denominator = weighted.reduce((acc, entry) => acc + entry.weight, 0);

    if (!Number.isFinite(denominator) || denominator <= 0) return 0;
    return clamp(numerator / denominator, 0, Math.max(entries.length - 1, 0));
  }, []);

  const computeThemeAt = useCallback(
    (phase: number): ResolvedTheme => {
      const entries = sectionsRef.current;
      if (!entries.length) return lastThemeRef.current;

      const maxIndex = entries.length - 1;
      const clampedPhase = clamp(phase, 0, maxIndex);
      const currentIndex = Math.floor(clampedPhase);
      const nextIndex = clamp(currentIndex + 1, 0, maxIndex);
      const localBlend = clampedPhase - currentIndex;

      const currentEntry = entries.find((entry) => entry.order === currentIndex);
      const nextEntry = entries.find((entry) => entry.order === nextIndex);

      const currentTheme = resolveTheme(
        currentEntry?.preset ?? backgroundPresets.riverNight,
        currentEntry?.progress ?? 0,
      );
      const nextTheme = resolveTheme(
        nextEntry?.preset ?? currentEntry?.preset ?? backgroundPresets.riverNight,
        nextEntry?.progress ?? currentEntry?.progress ?? 0,
      );

      return mixThemes(currentTheme, nextTheme, localBlend);
    },
    [],
  );

  const updatePhase = useCallback(() => {
    if (prefersReducedMotion) {
      const entry = sectionsRef.current[0];
      const theme = resolveTheme(entry?.preset ?? backgroundPresets.riverNight, 0.5);
      applyTheme(theme);
      return;
    }
    const target = computePhaseTarget();
    phaseValue.set(target);
  }, [applyTheme, computePhaseTarget, phaseValue, prefersReducedMotion]);

  useMotionValueEvent(phaseSmooth, "change", (latest) => {
    if (prefersReducedMotion) return;
    const nextTheme = computeThemeAt(latest);
    applyTheme(nextTheme);
  });

  useEffect(() => {
    applyTheme(lastThemeRef.current);
  }, [applyTheme]);

  const registerSection = useCallback(
    (id: string, preset: BackgroundPreset) => {
      const existing = sectionsRef.current.find((entry) => entry.id === id);
      if (existing) {
        existing.preset = preset;
        updatePhase();
        return () => {};
      }
      sectionsRef.current.push({
        id,
        preset,
        progress: 0,
        order: sectionsRef.current.length,
      });
      updatePhase();

      return () => {
        sectionsRef.current = sectionsRef.current.filter((entry) => entry.id !== id);
        updatePhase();
      };
    },
    [updatePhase],
  );

  const updateSectionPreset = useCallback(
    (id: string, preset: BackgroundPreset) => {
      const entry = sectionsRef.current.find((item) => item.id === id);
      if (entry) {
        entry.preset = preset;
        updatePhase();
      }
    },
    [updatePhase],
  );

  const reportSectionProgress = useCallback(
    (id: string, progress: number) => {
      const entry = sectionsRef.current.find((item) => item.id === id);
      if (!entry) return;
      entry.progress = progress;
      updatePhase();
    },
    [updatePhase],
  );

  const value = useMemo(
    () => ({ registerSection, updateSectionPreset, reportSectionProgress }),
    [registerSection, reportSectionProgress, updateSectionPreset],
  );

  return (
    <BackgroundContext.Provider value={value}>
      <div
        ref={backgroundRef}
        aria-hidden
        className="gradient-shell"
        style={{
          backgroundColor: "rgb(5, 12, 32)",
          "--bg-linear-start": colorToString(initialTheme.linearFrom),
          "--bg-linear-end": colorToString(initialTheme.linearTo),
          "--bg-linear-angle": `${initialTheme.linearAngle}deg`,
          "--bg-r1-color": colorToString(initialTheme.r1.color),
          "--bg-r2-color": colorToString(initialTheme.r2.color),
          "--bg-r1-x": `${initialTheme.r1.x}%`,
          "--bg-r1-y": `${initialTheme.r1.y}%`,
          "--bg-r1-size": `${initialTheme.r1.size}%`,
          "--bg-r2-x": `${initialTheme.r2.x}%`,
          "--bg-r2-y": `${initialTheme.r2.y}%`,
          "--bg-r2-size": `${initialTheme.r2.size}%`,
          "--bg-noise-opacity": initialTheme.noise.toFixed(3),
          "--bg-grain-scale": initialTheme.grainScale.toFixed(3),
        }}
      />
      <div className="pointer-events-none fixed inset-0 -z-[9] bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.05),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.04),transparent_28%)] mix-blend-screen" />
      {children}
    </BackgroundContext.Provider>
  );
};
