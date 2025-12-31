type GradientColor = { r: number; g: number; b: number; a?: number };
type RadialLayer = {
  x: number;
  y: number;
  size: number;
  color: GradientColor;
  drift?: { x?: number; y?: number; size?: number; alpha?: number };
};

export type BackgroundPreset = {
  name?: string;
  linear: { from: GradientColor; to: GradientColor; angle?: number };
  radials: [RadialLayer, RadialLayer];
  noise: number;
  grainScale?: number;
};

export const backgroundPresets: Record<string, BackgroundPreset> = {
  riverNight: {
    name: "River Night",
    linear: {
      from: { r: 5, g: 12, b: 32, a: 1 },
      to: { r: 8, g: 19, b: 44, a: 1 },
      angle: 180,
    },
    radials: [
      {
        x: 24,
        y: 18,
        size: 36,
        color: { r: 146, g: 240, b: 255, a: 0.18 },
        drift: { x: 8, y: 10, alpha: 0.06 },
      },
      {
        x: 78,
        y: 8,
        size: 30,
        color: { r: 255, g: 141, b: 106, a: 0.16 },
        drift: { x: -6, y: 12, alpha: 0.05 },
      },
    ],
    noise: 0.12,
    grainScale: 1.2,
  },
  emberBloom: {
    name: "Ember Bloom",
    linear: {
      from: { r: 14, g: 12, b: 28, a: 1 },
      to: { r: 22, g: 12, b: 30, a: 1 },
      angle: 185,
    },
    radials: [
      {
        x: 30,
        y: 26,
        size: 42,
        color: { r: 255, g: 173, b: 133, a: 0.22 },
        drift: { x: 10, y: 8, size: 4, alpha: 0.08 },
      },
      {
        x: 64,
        y: 72,
        size: 38,
        color: { r: 188, g: 162, b: 255, a: 0.18 },
        drift: { x: -8, y: -12, alpha: 0.06 },
      },
    ],
    noise: 0.16,
    grainScale: 1.35,
  },
  irisDrift: {
    name: "Iris Drift",
    linear: {
      from: { r: 11, g: 9, b: 34, a: 1 },
      to: { r: 10, g: 20, b: 43, a: 1 },
      angle: 200,
    },
    radials: [
      {
        x: 22,
        y: 30,
        size: 40,
        color: { r: 188, g: 162, b: 255, a: 0.24 },
        drift: { x: 8, y: -6, size: 6, alpha: 0.06 },
      },
      {
        x: 70,
        y: 14,
        size: 34,
        color: { r: 123, g: 215, b: 255, a: 0.18 },
        drift: { x: -10, y: 12, alpha: 0.05 },
      },
    ],
    noise: 0.14,
    grainScale: 1.2,
  },
  lagoonPulse: {
    name: "Lagoon Pulse",
    linear: {
      from: { r: 6, g: 18, b: 32, a: 1 },
      to: { r: 10, g: 30, b: 48, a: 1 },
      angle: 175,
    },
    radials: [
      {
        x: 18,
        y: 70,
        size: 44,
        color: { r: 159, g: 244, b: 255, a: 0.22 },
        drift: { x: 10, y: -14, size: 6, alpha: 0.05 },
      },
      {
        x: 72,
        y: 32,
        size: 36,
        color: { r: 255, g: 159, b: 180, a: 0.18 },
        drift: { x: -8, y: 10, alpha: 0.05 },
      },
    ],
    noise: 0.1,
    grainScale: 1.1,
  },
  noirBase: {
    name: "Noir Base",
    linear: {
      from: { r: 2, g: 2, b: 6, a: 1 },
      to: { r: 6, g: 7, b: 14, a: 1 },
      angle: 185,
    },
    radials: [
      {
        x: 22,
        y: 18,
        size: 34,
        color: { r: 142, g: 240, b: 255, a: 0.08 },
        drift: { x: 6, y: 8, alpha: 0.04 },
      },
      {
        x: 76,
        y: 14,
        size: 30,
        color: { r: 255, g: 141, b: 106, a: 0.08 },
        drift: { x: -6, y: 10, alpha: 0.04 },
      },
    ],
    noise: 0.1,
    grainScale: 1.2,
  },
  noirGlow: {
    name: "Noir Glow",
    linear: {
      from: { r: 2, g: 2, b: 6, a: 1 },
      to: { r: 8, g: 10, b: 18, a: 1 },
      angle: 190,
    },
    radials: [
      {
        x: 26,
        y: 26,
        size: 40,
        color: { r: 142, g: 240, b: 255, a: 0.18 },
        drift: { x: 8, y: 10, size: 4, alpha: 0.06 },
      },
      {
        x: 70,
        y: 10,
        size: 34,
        color: { r: 255, g: 141, b: 106, a: 0.14 },
        drift: { x: -8, y: 12, alpha: 0.05 },
      },
    ],
    noise: 0.12,
    grainScale: 1.25,
  },
  dawnMist: {
    name: "Dawn Mist",
    linear: {
      from: { r: 10, g: 16, b: 36, a: 1 },
      to: { r: 18, g: 14, b: 32, a: 1 },
      angle: 195,
    },
    radials: [
      {
        x: 26,
        y: 24,
        size: 38,
        color: { r: 255, g: 200, b: 174, a: 0.16 },
        drift: { x: 6, y: 12, alpha: 0.05 },
      },
      {
        x: 66,
        y: 68,
        size: 42,
        color: { r: 146, g: 240, b: 255, a: 0.16 },
        drift: { x: -8, y: -8, size: 5, alpha: 0.06 },
      },
    ],
    noise: 0.12,
    grainScale: 1.15,
  },
};

export const resolvePreset = (
  preset?: BackgroundPreset | keyof typeof backgroundPresets,
): BackgroundPreset => {
  if (!preset) return backgroundPresets.riverNight;
  if (typeof preset === "string") {
    return backgroundPresets[preset] ?? backgroundPresets.riverNight;
  }
  return preset;
};
