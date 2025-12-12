"use client";

import { useReducedMotion } from "framer-motion";

const SalmonScene = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-river-900 via-river-700/60 to-river-900 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(146,240,255,0.18),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,141,106,0.22),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2740%27 height=%2740%27 viewBox=%270 0 40 40%27 fill=%27none%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M0 20C10 10 30 10 40 20C30 30 10 30 0 20Z%27 fill=%27%23ffffff0d%27/%3E%3C/svg%3E')] opacity-60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-foam/60">3D Placeholder</p>
        <p className="font-display text-2xl text-foam">Salmon Upstream Scene</p>
        <p className="max-w-md text-sm text-foam/70">
          {prefersReducedMotion
            ? "Chế độ giảm chuyển động: canvas/3D sẽ tắt để tối ưu hiệu năng."
            : "Slot cho WebGL/ThreeJS + GSAP ScrollTrigger. Kết nối chip dữ liệu theo mốc thác nước."}
        </p>
      </div>
    </div>
  );
};

export default SalmonScene;
