"use client";

import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

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

const BASE_MOTION: MotionParams = {
  R: 200,
  strength: 1.2,
  spring: 0.01,
  damping: 0.9,
  maxSpeed: 14,
  floatAmplitude: 10,
  floatSpeedMin: 0.65,
  floatSpeedRange: 0.55,
};

const LOW_MOTION: MotionParams = {
  R: 140,
  strength: 0.55,
  spring: 0.008,
  damping: 0.92,
  maxSpeed: 9,
  floatAmplitude: 4,
  floatSpeedMin: 0.35,
  floatSpeedRange: 0.25,
};

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

export const heroFloatingItems: ItemConfig[] = [
  {
    id: "item-1",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&auto=format&fit=crop",
    size: 120,
    xPct: 18,
    yPct: 26,
    seed: 0.12,
  },
  {
    id: "item-2",
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=420&auto=format&fit=crop",
    size: 96,
    xPct: 34,
    yPct: 18,
    seed: 0.28,
  },
  {
    id: "item-3",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=440&auto=format&fit=crop",
    size: 82,
    xPct: 52,
    yPct: 14,
    seed: 0.44,
  },
  {
    id: "item-4",
    src: "https://images.unsplash.com/photo-1438109491414-7198515b166b?w=420&auto=format&fit=crop",
    size: 110,
    xPct: 68,
    yPct: 24,
    seed: 0.6,
  },
  {
    id: "item-5",
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=420&auto=format&fit=crop",
    size: 68,
    xPct: 82,
    yPct: 34,
    seed: 0.76,
  },
  {
    id: "item-6",
    src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=420&auto=format&fit=crop",
    size: 140,
    xPct: 22,
    yPct: 62,
    seed: 0.92,
  },
  {
    id: "item-7",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=420&auto=format&fit=crop",
    size: 72,
    xPct: 40,
    yPct: 70,
    seed: 1.08,
  },
  {
    id: "item-8",
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=440&auto=format&fit=crop",
    size: 104,
    xPct: 56,
    yPct: 64,
    seed: 1.24,
  },
  {
    id: "item-9",
    src: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=420&auto=format&fit=crop",
    size: 64,
    xPct: 72,
    yPct: 70,
    seed: 1.4,
  },
  {
    id: "item-10",
    src: "https://images.unsplash.com/photo-1438109491414-7198515b166b?w=420&auto=format&fit=crop",
    size: 128,
    xPct: 86,
    yPct: 62,
    seed: 1.56,
  },
];

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
    pointerRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
      active: true,
    };
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const computeStates = () => {
      const rect = container.getBoundingClientRect();
      const nextStates = heroFloatingItems.map((item, index) => {
        const phase = seeded(item.seed + index) * Math.PI * 2;
        const floatSpeed = motion.floatSpeedMin + seeded(item.seed * 1.618) * motion.floatSpeedRange;
        const anchorX = (item.xPct / 100) * rect.width;
        const anchorY = (item.yPct / 100) * rect.height;
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
    let frameId = 0;

    const step = (now: number) => {
      const states = itemsStateRef.current;
      const pointer = pointerRef.current;

      states.forEach((state, index) => {
        const t = (now * 0.003 * state.floatSpeed + state.floatPhase) % (Math.PI * 2);
        const idleX = Math.sin(t) * motion.floatAmplitude;
        const idleY = Math.cos(t * 1.18) * (motion.floatAmplitude * 0.9);

        const targetX = state.x0 + idleX;
        const targetY = state.y0 + idleY;

        if (pointer.active) {
          const item = heroFloatingItems[index];
          const renderX = state.x + idleX;
          const renderY = state.y + idleY;
          const cx = renderX + item.size / 2;
          const cy = renderY + item.size / 2;

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
  };

  const gradientBackground = useMemo(
    () =>
      "radial-gradient(circle at 20% 24%, rgba(110, 213, 255, 0.16), transparent 35%), radial-gradient(circle at 82% 18%, rgba(255, 122, 183, 0.14), transparent 32%), linear-gradient(145deg, #05070f, #0a0f1f 48%, #060912)",
    [],
  );

  return (
    <section
      ref={containerRef}
      className="relative isolate min-h-[100vh] w-screen overflow-hidden border border-white/10 bg-black/90 shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
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
        className="pointer-events-none absolute inset-0 bg-black"
        style={{
          background: gradientBackground,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{ backgroundImage: noiseSvg, backgroundSize: "240px" }}
      />

      <div className="absolute inset-0 pointer-events-none">
        {heroFloatingItems.map((item, index) => (
          <div
            key={item.id}
            ref={setItemRef(index)}
            className="absolute origin-center"
            style={{
              width: item.size,
              height: item.size,
              rotate: `${(seeded(item.seed) - 0.5) * 10}deg`,
              filter: "drop-shadow(0 15px 40px rgba(0,0,0,0.55))",
              transform: "translate3d(0px, 0px, 0)",
              transition: prefersReducedMotion ? "transform 240ms ease" : undefined,
            }}
          >
            <div className="pointer-events-none h-full w-full overflow-hidden rounded-2xl border border-white/10">
              <img
                src={item.src}
                alt=""
                draggable={false}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 py-16 text-center sm:px-10">
        <div className="flex flex-col items-center gap-3">
          <Badge variant="glow">Nơi Bắt Đầu — 2026</Badge>
          <h1 className="max-w-3xl font-display text-4xl leading-tight text-foam md:text-5xl lg:text-6xl">
            Nơi Bắt Đầu — Ngược Dòng
          </h1>
          <p className="max-w-2xl text-lg text-foam/80 md:text-xl">
            Hero “floating images” tạo cảm giác thác nước + cá hồi, phản chiếu ánh sáng đêm. Di chuyển
            nhẹ nhàng, tránh va chạm với con trỏ và trở về vị trí neo bằng lò xo.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/sponsorship" size="md">
            Trở thành Nhà Tài Trợ
          </Button>
          <Button href="/contact" variant="secondary" size="md">
            Đăng ký quan tâm/Đặt vé
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroFloatingPhysics;
