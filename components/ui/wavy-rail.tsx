"use client";

import { useEffect, useMemo, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { cn } from "@/lib/utils";

type WavyRailProps = {
  progress: number; // 0-1
  className?: string;
};

const WavyRail = ({ progress, className }: WavyRailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noise = useRef(createNoise3D());
  const frame = useRef<number>();
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
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
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
      const visibleHeight = Math.max(0, Math.min(1, progress)) * h;
      if (visibleHeight <= 2) {
        frame.current = requestAnimationFrame(render);
        return;
      }
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, h - visibleHeight, w, visibleHeight);
      ctx.clip();
      ctx.globalAlpha = 0.45;
      ctx.shadowColor = "rgba(159, 244, 255, 0.5)";
      ctx.shadowBlur = 12;
      for (let i = 0; i < 4; i += 1) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        const grad = ctx.createLinearGradient(0, h - visibleHeight, 0, h);
        grad.addColorStop(0, neonColors[i % neonColors.length]);
        grad.addColorStop(1, neonColors[(i + 1) % neonColors.length]);
        ctx.strokeStyle = grad;
        for (let y = h - visibleHeight; y <= h; y += 5) {
          const nx = noise.current(0.18 * i, y * 0.008, t) * 6;
          ctx.lineTo(w / 2 + nx, y);
        }
        ctx.stroke();
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

  return (
    <div
      className={cn(
        "relative h-full w-8 overflow-hidden rounded-3xl bg-transparent",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-[-35%] bg-[radial-gradient(circle_at_50%_40%,rgba(159,244,255,0.22),transparent_55%),radial-gradient(circle_at_40%_80%,rgba(255,159,180,0.2),transparent_55%)] blur-3xl"
        style={{ opacity: clamped * 0.35 }}
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      <div
        className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 items-center justify-center text-[14px]"
        style={{ bottom: `${clamped * 100}%` }}
      >
        <span className="drop-shadow-[0_0_10px_rgba(142,240,255,0.8)]">🐟</span>
      </div>
    </div>
  );
};

export default WavyRail;
