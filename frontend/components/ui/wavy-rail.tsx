"use client";

import { useEffect, useMemo, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { cn } from "@/lib/utils";

type WavyRailProps = {
  progress: number; // 0-1
  className?: string;
  thickness?: number;
  orientation?: "vertical" | "horizontal";
  showCelebration?: boolean;
};

const WavyRail = ({
  progress,
  className,
  thickness = 16,
  orientation = "vertical",
  showCelebration = false,
}: WavyRailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noise = useRef(createNoise3D());
  const frame = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const neonColors = useMemo(
    () => ["#9FF4FF", "#7BD7FF", "#FF9FB4", "#BCA2FF"],
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      sizeRef.current = { w: rect.width, h: rect.height };
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let t = 0;
    const render = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      t += 0.004;
      const clamped = Math.max(0, Math.min(1, progress));
      const visibleHeight = orientation === "vertical" ? clamped * h : clamped * w;
      if (visibleHeight <= 2) {
        frame.current = requestAnimationFrame(render);
        return;
      }
      ctx.save();
      ctx.beginPath();
      if (orientation === "vertical") {
        ctx.rect(0, h - visibleHeight, w, visibleHeight);
      } else {
        ctx.rect(0, 0, visibleHeight, h);
      }
      ctx.clip();
      ctx.globalAlpha = 0.45;
      ctx.shadowColor = "rgba(159, 244, 255, 0.5)";
      ctx.shadowBlur = 12;
      if (orientation === "vertical") {
        for (let i = 0; i < 4; i += 1) {
          ctx.beginPath();
          ctx.lineWidth = Math.max(3, thickness * 0.35);
          const grad = ctx.createLinearGradient(0, h - visibleHeight, 0, h);
          grad.addColorStop(0, neonColors[i % neonColors.length]);
          grad.addColorStop(1, neonColors[(i + 1) % neonColors.length]);
          ctx.strokeStyle = grad;
          const stepY = Math.max(4, thickness * 0.8);
          for (let y = h - visibleHeight; y <= h; y += stepY) {
            const nx = noise.current(0.18 * i, y * 0.008, t) * Math.max(6, thickness);
            ctx.lineTo(w / 2 + nx, y);
          }
          ctx.stroke();
        }
      } else {
        for (let i = 0; i < 4; i += 1) {
          ctx.beginPath();
          ctx.lineWidth = Math.max(3, thickness * 0.35);
          const grad = ctx.createLinearGradient(0, 0, visibleHeight, 0);
          grad.addColorStop(0, neonColors[i % neonColors.length]);
          grad.addColorStop(1, neonColors[(i + 1) % neonColors.length]);
          ctx.strokeStyle = grad;
          const stepX = Math.max(4, thickness * 0.8);
          for (let x = 0; x <= visibleHeight; x += stepX) {
            const ny = noise.current(x * 0.008, 0.18 * i, t) * Math.max(6, thickness);
            ctx.lineTo(x, h / 2 + ny);
          }
          ctx.stroke();
        }
      }
      ctx.restore();
      frame.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      observer.disconnect();
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [neonColors, progress]);

  const clamped = Math.max(0, Math.min(1, progress));
  const isComplete = clamped >= 0.999;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-transparent",
        orientation === "vertical" ? "h-full w-8" : "h-6 w-full",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-[-35%] bg-[radial-gradient(circle_at_50%_40%,rgba(159,244,255,0.22),transparent_55%),radial-gradient(circle_at_40%_80%,rgba(255,159,180,0.2),transparent_55%)] blur-3xl"
        style={{ opacity: clamped * 0.35 }}
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      <div
        className={cn(
          "pointer-events-none absolute flex items-center justify-center text-[14px]",
          orientation === "vertical"
            ? "left-1/2 -translate-x-1/2"
            : "top-1/2 -translate-y-1/2",
        )}
        style={
          orientation === "vertical"
            ? { bottom: `${clamped * 100}%` }
            : { left: `${clamped * 100}%`, transform: "translate(-50%, -35%)" }
        }
      >
        <span
          className={cn(
            "drop-shadow-[0_0_10px_rgba(142,240,255,0.8)] transition-colors duration-700",
            isComplete && showCelebration && "animate-[hue-rotate_4s_linear_infinite]",
          )}
        >
          {isComplete && showCelebration ? "✨" : "🐟"}
        </span>
      </div>
      {isComplete && showCelebration && (
        <>
          <div className="pointer-events-none absolute inset-[-10%] animate-pulse bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.35),transparent_52%)]" />
          <div className="pointer-events-none absolute inset-[-18%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(146,240,255,0.5),rgba(255,141,106,0.35),rgba(146,240,255,0.5))] opacity-35 blur-sm" />
        </>
      )}
    </div>
  );
};

export default WavyRail;
