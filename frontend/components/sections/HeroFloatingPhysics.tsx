"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Badge } from "../ui/badge";

type MotionParams = {
  R: number;
  strength: number;
  spring: number;
  damping: number;
  maxSpeed: number;
  floatAmplitude: number;
  floatSpeedMin: number;
  floatSpeedRange: number;
};

type ChatResponse = {
  answer?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

const BASE_MOTION: MotionParams = {
  R: 200,
  strength: 1.2,
  spring: 0.01,
  damping: 0.9,
  maxSpeed: 14,
  floatAmplitude: 2,
  floatSpeedMin: 0.1,
  floatSpeedRange: 0.08,
};

const LOW_MOTION: MotionParams = {
  R: 140,
  strength: 0.55,
  spring: 0.008,
  damping: 0.92,
  maxSpeed: 9,
  floatAmplitude: 0.6,
  floatSpeedMin: 0.06,
  floatSpeedRange: 0.04,
};

const FLOATING_SIZE_SCALE = 0.85;

type ItemConfig = {
  id: string;
  src: string;
  size: number;
  xPct: number;
  yPct: number;
  seed: number;
};

type ItemState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  x0: number;
  y0: number;
  floatPhase: number;
  floatSpeed: number;
};

const seeded = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const scaleSize = (size: number) => size * FLOATING_SIZE_SCALE;

const baseFloatingItems: ItemConfig[] = [
  {
    id: "item-1",
    src: "/hero-floating/1.png",
    size: 140,
    xPct: 6,
    yPct: 50,
    seed: 0.12,
  },
  {
    id: "item-2",
    src: "/hero-floating/2.png",
    size: 118,
    xPct: 20,
    yPct: 58,
    seed: 0.28,
  },
  {
    id: "item-3",
    src: "/hero-floating/3.png",
    size: 100,
    xPct: 78,
    yPct: 50,
    seed: 0.44,
  },
  {
    id: "item-4",
    src: "/hero-floating/4.png",
    size: 128,
    xPct: 90,
    yPct: 60,
    seed: 0.6,
  },
  {
    id: "item-5",
    src: "/hero-floating/5.png",
    size: 88,
    xPct: 92,
    yPct: 76,
    seed: 0.76,
  },
  {
    id: "item-6",
    src: "/hero-floating/6.png",
    size: 155,
    xPct: 6,
    yPct: 74,
    seed: 0.92,
  },
  {
    id: "item-7",
    src: "/hero-floating/7.png",
    size: 96,
    xPct: 28,
    yPct: 82,
    seed: 1.08,
  },
  {
    id: "item-8",
    src: "/hero-floating/8.png",
    size: 120,
    xPct: 72,
    yPct: 82,
    seed: 1.24,
  },
  {
    id: "item-9",
    src: "/hero-floating/9.png",
    size: 82,
    xPct: 54,
    yPct: 64,
    seed: 1.4,
  },
  {
    id: "item-10",
    src: "/hero-floating/10.png",
    size: 140,
    xPct: 44,
    yPct: 74,
    seed: 1.56,
  },
];

const noteFloatingItems: ItemConfig[] = [
  {
    id: "note-1",
    src: "/hero-floating/note1.png",
    size: 64,
    xPct: 12,
    yPct: 46,
    seed: 2.08,
  },
  {
    id: "note-2",
    src: "/hero-floating/note2.png",
    size: 56,
    xPct: 22,
    yPct: 66,
    seed: 2.22,
  },
  {
    id: "note-3",
    src: "/hero-floating/note3.png",
    size: 52,
    xPct: 62,
    yPct: 48,
    seed: 2.36,
  },
  {
    id: "note-4",
    src: "/hero-floating/note4.png",
    size: 60,
    xPct: 84,
    yPct: 46,
    seed: 2.48,
  },
  {
    id: "note-5",
    src: "/hero-floating/note5.png",
    size: 58,
    xPct: 88,
    yPct: 68,
    seed: 2.6,
  },
  {
    id: "note-6",
    src: "/hero-floating/note2.png",
    size: 50,
    xPct: 34,
    yPct: 74,
    seed: 2.7,
  },
  {
    id: "note-7",
    src: "/hero-floating/note4.png",
    size: 62,
    xPct: 70,
    yPct: 72,
    seed: 2.82,
  },
];

export const heroFloatingItems: ItemConfig[] = [...baseFloatingItems, ...noteFloatingItems];

const noiseSvg =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export const HeroFloatingPhysics = () => {
  const prefersReducedMotion = useReducedMotion();
  const motion = useMemo<MotionParams>(
    () => (prefersReducedMotion ? LOW_MOTION : BASE_MOTION),
    [prefersReducedMotion],
  );
  const containerRef = useRef<HTMLElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const itemsStateRef = useRef<ItemState[]>([]);
  const causticCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rippleRef = useRef<{ x: number; y: number; t: number }[]>([]);
  const lastRippleTimeRef = useRef(0);
  const waterAudioRef = useRef<HTMLAudioElement | null>(null);
  const waterFadeFrameRef = useRef<number | null>(null);
  const lastMoveTimeRef = useRef(0);
  const fishRef = useRef<HTMLDivElement | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const [askValue, setAskValue] = useState("");
  const [askResponse, setAskResponse] = useState<string | null>(null);
  const [askError, setAskError] = useState<string | null>(null);
  const [askLoading, setAskLoading] = useState(false);

  const ensureWaterAudio = () => {
    if (!waterAudioRef.current) {
      const audio = new Audio("/audio/water_swimming.mp3");
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0;
      waterAudioRef.current = audio;
    }
    return waterAudioRef.current;
  };

  const fadeAudio = (target: number, duration = 150, onDone?: () => void) => {
    const audio = ensureWaterAudio();
    if (!audio) return;
    if (waterFadeFrameRef.current) cancelAnimationFrame(waterFadeFrameRef.current);
    const start = performance.now();
    const from = Math.min(1, Math.max(0, audio.volume));
    const to = Math.min(1, Math.max(0, target));
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const vol = Math.min(1, Math.max(0, from + (to - from) * t));
      audio.volume = vol;
      if (t < 1) {
        waterFadeFrameRef.current = requestAnimationFrame(step);
      } else {
        if (to === 0) audio.pause();
        if (onDone) onDone();
      }
    };
    waterFadeFrameRef.current = requestAnimationFrame(step);
  };

  const playWaterAudio = () => {
    const audio = ensureWaterAudio();
    if (!audio) return;
    if (audio.paused) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
    fadeAudio(0.8, 150);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("uehg-ai-session");
    if (saved) {
      sessionIdRef.current = saved;
      return;
    }
    const id = crypto.randomUUID();
    localStorage.setItem("uehg-ai-session", id);
    sessionIdRef.current = id;
  }, []);

  const handleAskSubmit = async () => {
    const trimmed = askValue.trim();
    if (!trimmed || askLoading) return;

    setAskLoading(true);
    setAskResponse(null);
    setAskError(null);

    try {
      const sessionId = sessionIdRef.current ?? crypto.randomUUID();
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, session_id: sessionId }),
      });
      if (!response.ok) throw new Error("Chat API error");
      const data = (await response.json()) as ChatResponse;
      setAskResponse(data.answer ?? "Xin loi, hien chua co cau tra loi phu hop.");
      setAskValue("");
    } catch {
      setAskError("Không thể kết nối AI lúc này. Vui lòng thử lại sau.");
    } finally {
      setAskLoading(false);
    }
  };

  const setItemRef = (index: number) => (el: HTMLDivElement | null) => {
    itemsRef.current[index] = el;
  };

  const applyTransforms = (states: ItemState[]) => {
    states.forEach((state, index) => {
      const el = itemsRef.current[index];
      if (!el) return;
      el.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 0)`;
    });
  };

  const updatePointer = (clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const now = performance.now();
    pointerRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
      active: true,
    };
    if (now - lastRippleTimeRef.current > 40) {
      rippleRef.current.push({ x: clientX - rect.left, y: clientY - rect.top, t: now });
      lastRippleTimeRef.current = now;
    }
    playWaterAudio();
    lastMoveTimeRef.current = now;
    const fish = fishRef.current;
    if (fish) {
      fish.style.opacity = "1";
      fish.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%) rotate(-4deg)`;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const computeStates = () => {
      const rect = container.getBoundingClientRect();
      const canvas = causticCanvasRef.current;
      if (canvas) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
      const padding = Math.max(12, Math.min(rect.width, rect.height) * 0.02);
      const nextStates = heroFloatingItems.map((item, index) => {
        const phase = seeded(item.seed + index) * Math.PI * 2;
        const floatSpeed = motion.floatSpeedMin + seeded(item.seed * 1.618) * motion.floatSpeedRange;
        const scaledSize = scaleSize(item.size);
        const maxX = Math.max(padding, rect.width - scaledSize - padding);
        const maxY = Math.max(padding, rect.height - scaledSize - padding);
        const anchorX = clamp((item.xPct / 100) * rect.width, padding, maxX);
        const anchorY = clamp((item.yPct / 100) * rect.height, padding, maxY);
        return {
          x: anchorX,
          y: anchorY,
          vx: 0,
          vy: 0,
          x0: anchorX,
          y0: anchorY,
          floatPhase: phase,
          floatSpeed,
        };
      });
      itemsStateRef.current = nextStates;
      applyTransforms(nextStates);
    };

    computeStates();

    const resizeObserver = new ResizeObserver(computeStates);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [motion]);

  useEffect(() => {
    const canvas = causticCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const maxRadius = 120;
    const duration = 1050;

    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rippleRef.current = rippleRef.current.filter((r) => now - r.t < duration);
      rippleRef.current.forEach((r) => {
        const p = (now - r.t) / duration;
        const radius = maxRadius * p;
        const alpha = (1 - p) * 0.18;
        const gradient = ctx.createRadialGradient(r.x, r.y, radius * 0.2, r.x, r.y, radius);
        gradient.addColorStop(0, `rgba(142,240,255,${alpha * 0.6})`);
        gradient.addColorStop(1, `rgba(142,240,255,0)`);
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    let frameId = 0;

    const step = (now: number) => {
      const states = itemsStateRef.current;
      const pointer = pointerRef.current;
      const idleFactor = pointer.active ? 1 : 0.08;

      states.forEach((state, index) => {
        const t = (now * 0.003 * state.floatSpeed + state.floatPhase) % (Math.PI * 2);
        const idleX = Math.sin(t) * motion.floatAmplitude * idleFactor;
        const idleY = Math.cos(t * 1.18) * (motion.floatAmplitude * 0.9) * idleFactor;

        const targetX = state.x0 + idleX;
        const targetY = state.y0 + idleY;

        if (pointer.active) {
          const item = heroFloatingItems[index];
          const scaledSize = scaleSize(item.size);
          const renderX = state.x + idleX;
          const renderY = state.y + idleY;
          const cx = renderX + scaledSize / 2;
          const cy = renderY + scaledSize / 2;

          const dx = cx - pointer.x;
          const dy = cy - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < motion.R && dist > 0) {
            const F = (1 - dist / motion.R) ** 2 * motion.strength;
            state.vx += (dx / dist) * F;
            state.vy += (dy / dist) * F;
          }
        }

        state.vx += (targetX - state.x) * motion.spring;
        state.vy += (targetY - state.y) * motion.spring;

        state.vx *= motion.damping;
        state.vy *= motion.damping;

        const speed = Math.hypot(state.vx, state.vy);
        if (speed > motion.maxSpeed) {
          const scale = motion.maxSpeed / (speed || 1);
          state.vx *= scale;
          state.vy *= scale;
        }

        state.x += state.vx;
        state.y += state.vy;

        const el = itemsRef.current[index];
        if (el) {
          const renderX = state.x + idleX;
          const renderY = state.y + idleY;
          el.style.transform = `translate3d(${renderX.toFixed(2)}px, ${renderY.toFixed(2)}px, 0)`;
        }
      });

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [motion]);

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
    const fish = fishRef.current;
    if (fish) {
      fish.style.opacity = "0";
    }
    fadeAudio(0, 240);
  };

  useEffect(() => {
    let raf: number;
    const idleCheck = () => {
      const audio = waterAudioRef.current;
      const now = performance.now();
      if (audio) {
        const idleTooLong = now - lastMoveTimeRef.current > 520 || !pointerRef.current.active;
        if (idleTooLong && !audio.paused && audio.volume > 0.02) {
          fadeAudio(0, 180);
        }
      }
      raf = requestAnimationFrame(idleCheck);
    };
    raf = requestAnimationFrame(idleCheck);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (waterFadeFrameRef.current) cancelAnimationFrame(waterFadeFrameRef.current);
      const audio = waterAudioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const gradientBackground = useMemo(
    () =>
      "radial-gradient(circle at 20% 24%, rgba(110, 213, 255, 0.16), transparent 35%), radial-gradient(circle at 82% 18%, rgba(255, 122, 183, 0.14), transparent 32%), linear-gradient(145deg, #05070f, #0a0f1f 48%, #060912)",
    [],
  );

  const causticsSvg = useMemo(
    () =>
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.008 0.02' numOctaves='3' seed='7'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='gamma' exponent='1.4' amplitude='1'/%3E%3CfeFuncG type='gamma' exponent='1.4' amplitude='1'/%3E%3CfeFuncB type='gamma' exponent='1.4' amplitude='1'/%3E%3C/feComponentTransfer%3E%3C/feColorMatrix%3E%3CfeGaussianBlur stdDeviation='0.6'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 -0.2'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23f)' opacity='0.35'/%3E%3C/svg%3E\")",
    [],
  );

  return (
    <section
      ref={containerRef}
      className="relative isolate min-h-[100vh] w-screen overflow-hidden border border-white/10 bg-black/90 shadow-[0_30px_120px_rgba(0,0,0,0.6)] cursor-none"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
      onPointerDown={(event) => updatePointer(event.clientX, event.clientY)}
      onPointerMove={(event) => updatePointer(event.clientX, event.clientY)}
      onPointerLeave={handlePointerLeave}
      onTouchStart={(event) => {
        const touch = event.touches[event.touches.length - 1];
        if (touch) updatePointer(touch.clientX, touch.clientY);
      }}
      onTouchMove={(event) => {
        const touch = event.touches[event.touches.length - 1];
        if (touch) updatePointer(touch.clientX, touch.clientY);
      }}
      onTouchEnd={handlePointerLeave}
    >
      <div
        ref={fishRef}
        className="pointer-events-none fixed z-50 opacity-0 transition-opacity duration-200 ease-out will-change-transform flex items-center justify-center"
        style={{
          width: "38px",
          height: "24px",
          fontSize: "18px",
          filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.35))",
        }}
      >
        <span className="drop-shadow-[0_0_10px_rgba(142,240,255,0.8)]">🐟</span>
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-black"
        style={{
          background: gradientBackground,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(0,0,0,0.55)_78%,rgba(0,0,0,0.95)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{ backgroundImage: noiseSvg, backgroundSize: "240px" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: causticsSvg,
          backgroundSize: "220px",
          animation: "causticsMove 18s ease-in-out infinite alternate",
        }}
      />
      <canvas
        ref={causticCanvasRef}
        className="pointer-events-none absolute inset-0 mix-blend-screen"
      />
      <style>{`
        @keyframes causticsMove {
          0% { transform: translate3d(0px,0px,0); }
          50% { transform: translate3d(-18px, -10px,0); }
          100% { transform: translate3d(12px, 6px,0); }
        }
        .hero-ask-stack {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          width: min(760px, 100%);
        }
        .hero-ask {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          border-radius: 999px;
          position: relative;
          overflow: hidden;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(8, 14, 28, 0.78);
          box-shadow:
            0 18px 40px rgba(4, 8, 20, 0.55),
            0 0 0 1px rgba(142, 240, 255, 0.16),
            0 0 28px rgba(142, 240, 255, 0.14),
            0 0 36px rgba(255, 141, 106, 0.14);
          backdrop-filter: blur(12px);
          transition: box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .hero-ask::before {
          content: "";
          position: absolute;
          inset: -250%;
          z-index: 0;
          background: conic-gradient(
            from 110deg at 50% 50%,
            rgba(142, 240, 255, 0.6) 0%,
            rgba(255, 141, 106, 0.55) 35%,
            rgba(188, 162, 255, 0.55) 60%,
            rgba(142, 240, 255, 0.6) 100%
          );
          animation: hero-ask-spin 10s linear infinite;
          opacity: 0.52;
          filter: blur(16px);
          pointer-events: none;
        }
        .hero-ask::after {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(8, 16, 32, 0.92), rgba(10, 18, 36, 0.92));
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.04),
            inset 0 0 20px rgba(142, 240, 255, 0.08),
            inset 0 0 28px rgba(255, 141, 106, 0.08);
          z-index: 0;
          pointer-events: none;
        }
        .hero-ask > * {
          position: relative;
          z-index: 1;
        }
        .hero-ask--still::before {
          animation: none;
        }
        .hero-ask__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--pearl);
          font-size: 18px;
        }
        .hero-ask__input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 0.95rem;
          color: var(--foam);
          outline: none;
          min-width: 0;
          cursor: text;
        }
        .hero-ask__input::placeholder {
          color: rgba(232, 238, 249, 0.55);
        }
        .hero-ask__btn {
          border: none;
          border-radius: 999px;
          padding: 8px 16px;
          font-weight: 600;
          background: linear-gradient(135deg, var(--ember), var(--pearl));
          color: var(--river-900);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 12px 22px rgba(255, 141, 106, 0.25);
        }
        .hero-ask__btn:disabled {
          cursor: not-allowed;
          opacity: 0.7;
          box-shadow: 0 8px 18px rgba(255, 141, 106, 0.18);
        }
        .hero-ask__btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 16px 28px rgba(255, 141, 106, 0.32);
        }
        .hero-ask__input:disabled {
          opacity: 0.7;
        }
        .hero-ask:focus-within {
          box-shadow:
            0 22px 44px rgba(8, 14, 28, 0.55),
            0 0 0 1px rgba(142, 240, 255, 0.32),
            0 0 40px rgba(142, 240, 255, 0.2),
            0 0 48px rgba(255, 141, 106, 0.18);
        }
        .hero-ask-response {
          width: 100%;
          padding: 14px 18px;
          border-radius: 18px;
          background: rgba(8, 16, 34, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
          display: flex;
          flex-direction: column;
          gap: 6px;
          color: var(--foam);
          backdrop-filter: blur(6px);
        }
        .hero-ask-response__label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(232, 238, 249, 0.6);
        }
        .hero-ask-response__text {
          font-size: 0.95rem;
          line-height: 1.6;
          white-space: pre-wrap;
        }
        .hero-ask-response--error {
          border-color: rgba(239, 68, 68, 0.28);
          background: rgba(239, 68, 68, 0.12);
          color: #fecaca;
        }
        .hero-ask-response--error .hero-ask-response__label {
          color: #fecaca;
        }
        @keyframes hero-ask-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        {heroFloatingItems.map((item, index) => {
          const scaledSize = scaleSize(item.size);
          return (
            <div
              key={item.id}
              ref={setItemRef(index)}
              className="absolute origin-center"
              style={{
                width: scaledSize,
                height: scaledSize,
                rotate: `${(seeded(item.seed) - 0.5) * 6}deg`,
                filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.28))",
                transform: "translate3d(0px, 0px, 0)",
                transition: prefersReducedMotion ? "transform 240ms ease" : undefined,
              }}
            >
              <div className="pointer-events-none h-full w-full overflow-hidden rounded-2xl">
                <img
                  src={item.src}
                  alt=""
                  draggable={false}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 py-16 text-center sm:px-10">
        <div className="flex flex-col items-center gap-3">
          <Badge variant="glow">Nơi Bắt Đầu — 2026</Badge>
          <h1 className="max-w-none font-display text-4xl font-bold leading-tight text-foam sm:text-5xl lg:text-6xl md:whitespace-nowrap tracking-tight">
            Nơi Bắt Đầu — Ngược Dòng
          </h1>
          <p className="max-w-2xl text-lg text-foam/80 md:text-xl">
            Đêm guitar dẫn ta ngược dòng như cá hồi, bền bỉ vượt thác để trở về bản nguyên khát vọng,
            nơi tuổi trẻ rực sáng và đủ bản lĩnh bước tiếp giữa mọi cuộn xoáy
          </p>
        </div>
        <div className="hero-ask-stack">
          <div className={`hero-ask ${prefersReducedMotion ? "hero-ask--still" : ""}`}>
            <span className="hero-ask__icon" aria-hidden="true">
              ✦
            </span>
            <input
              className="hero-ask__input"
              placeholder="Chia sẽ tâm trạng hôm nay của bạn tới Gờ nhé?"
              value={askValue}
              onChange={(event) => setAskValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleAskSubmit();
                }
              }}
              aria-label="Chia sẻ tâm trạng với Gờ"
              disabled={askLoading}
            />
            <button
              className="hero-ask__btn"
              type="button"
              onClick={handleAskSubmit}
              disabled={askLoading || !askValue.trim()}
            >
              {askLoading ? "Đang gửi..." : "Gửi"}
            </button>
          </div>
          {(askResponse || askError) && (
            <div
              className={`hero-ask-response ${askError ? "hero-ask-response--error" : ""}`}
              role="status"
              aria-live="polite"
            >
              <div className="hero-ask-response__label">Gờ AI</div>
              <div className="hero-ask-response__text">{askError ?? askResponse}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroFloatingPhysics;
