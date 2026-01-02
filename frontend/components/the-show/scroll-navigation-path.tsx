"use client";

import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

type PathPoint = { x: number; y: number };
type PathSegment = { start: PathPoint; end: PathPoint; length: number; angle: number };
type ZigzagPath = {
  d: string;
  markers: PathPoint[];
  segments: PathSegment[];
  totalLength: number;
};

type FishEasing = {
  stiffness?: number;
  damping?: number;
  mass?: number;
};

type ScrollNavigationPathProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  activeIndex: number;
  progress: MotionValue<number>;
  amplitude?: number;
  sidePadding?: number;
  strokeWidth?: number;
  fishSize?: number;
  fishEasing?: FishEasing;
  lineCenter?: number;
  centerIndices?: number[];
  className?: string;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const buildZigzagPath = (
  anchors: number[],
  leftX: number,
  rightX: number,
  centerIndices?: number[],
  centerX?: number,
): ZigzagPath => {
  if (!anchors.length) {
    return { d: "", markers: [], segments: [], totalLength: 0 };
  }

  const markers = anchors.map((y, index) => ({
    x: centerIndices?.includes(index) ? (centerX ?? rightX) : index % 2 === 0 ? rightX : leftX,
    y,
  }));

  let d = `M ${markers[0].x} ${markers[0].y}`;
  const segments: PathSegment[] = [];
  let totalLength = 0;

  for (let i = 0; i < markers.length - 1; i += 1) {
    const current = markers[i];
    const next = markers[i + 1];
    const turnY = (current.y + next.y) / 2;

    const points: PathPoint[] = [
      { x: current.x, y: turnY },
      { x: next.x, y: turnY },
      { x: next.x, y: next.y },
    ];

    points.forEach((point, idx) => {
      const start = idx === 0 ? current : points[idx - 1];
      const end = point;
      const length = Math.hypot(end.x - start.x, end.y - start.y);
      const angle = (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI;
      segments.push({ start, end, length, angle });
      totalLength += length;
      d += ` L ${end.x} ${end.y}`;
    });
  }

  return { d, markers, segments, totalLength };
};

const getPointAtProgress = (path: ZigzagPath, progress: number) => {
  if (!path.segments.length || path.totalLength <= 0) {
    const fallback = path.markers[0] ?? { x: 0, y: 0 };
    return { x: fallback.x, y: fallback.y, angle: 90 };
  }

  const target = clamp(progress, 0, 1) * path.totalLength;
  let traveled = 0;

  for (const segment of path.segments) {
    if (traveled + segment.length >= target) {
      const local = (target - traveled) / segment.length;
      const x = segment.start.x + (segment.end.x - segment.start.x) * local;
      const y = segment.start.y + (segment.end.y - segment.start.y) * local;
      return { x, y, angle: segment.angle };
    }
    traveled += segment.length;
  }

  const last = path.segments[path.segments.length - 1];
  return { x: last.end.x, y: last.end.y, angle: last.angle };
};

const FishIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
    <path
      d="M20 20c6-6 16-10 26-10 7 0 12 2 18 6-5 4-11 6-18 6-10 0-20-4-26-10z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M20 20c6 6 16 10 26 10 7 0 12-2 18-6-5-4-11-6-18-6-10 0-20 4-26 10z"
      fill="currentColor"
      opacity="0.9"
    />
    <path d="M10 20l10-8v16l-10-8z" fill="currentColor" />
    <circle cx="45" cy="16" r="2.3" fill="#0b1220" />
  </svg>
);

export const ScrollNavigationPath = ({
  containerRef,
  sectionRefs,
  activeIndex,
  progress,
  amplitude = 260,
  sidePadding = 120,
  strokeWidth = 3,
  fishSize = 28,
  fishEasing,
  lineCenter,
  centerIndices,
  className,
}: ScrollNavigationPathProps) => {
  const reduceMotion = useReducedMotion();
  const [layout, setLayout] = useState({ width: 0, height: 0, anchors: [] as number[] });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateLayout = () => {
      const width = container.clientWidth;
      const height = container.scrollHeight;
      const anchors = sectionRefs.current.map((section) =>
        section ? section.offsetTop + section.offsetHeight / 2 : 0,
      );
      setLayout({ width, height, anchors });
    };

    updateLayout();
    const observer = new ResizeObserver(updateLayout);
    observer.observe(container);
    window.addEventListener("resize", updateLayout);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, [containerRef, sectionRefs]);

  const effectiveSidePadding = useMemo(() => {
    if (layout.width < 640) return Math.min(sidePadding, 32);
    if (layout.width < 1024) return Math.min(sidePadding, 56);
    return Math.min(sidePadding, 96);
  }, [layout.width, sidePadding]);

  const effectiveAmplitude = useMemo(() => {
    const maxAmplitude = Math.max(layout.width - effectiveSidePadding * 2, 0);
    if (layout.width < 640) return Math.min(amplitude, 120, maxAmplitude);
    if (layout.width < 1024) return Math.min(amplitude, 160, maxAmplitude);
    return Math.min(amplitude, maxAmplitude);
  }, [amplitude, effectiveSidePadding, layout.width]);

  const centerX = lineCenter !== undefined ? layout.width * lineCenter : layout.width / 2;
  const minLeft = effectiveSidePadding;
  const maxLeft = Math.max(layout.width - effectiveSidePadding - effectiveAmplitude, minLeft);
  const leftX =
    lineCenter !== undefined
      ? clamp(centerX - effectiveAmplitude / 2, minLeft, maxLeft)
      : effectiveSidePadding;
  const rightX = leftX + effectiveAmplitude;

  const path = useMemo(
    () =>
      buildZigzagPath(layout.anchors.filter((y) => y > 0), leftX, rightX, centerIndices, centerX),
    [layout.anchors, leftX, rightX, centerIndices, centerX],
  );

  const smoothProgress = useSpring(progress, {
    stiffness: fishEasing?.stiffness ?? 140,
    damping: fishEasing?.damping ?? 24,
    mass: fishEasing?.mass ?? 1,
  });

  const animatedProgress = reduceMotion ? progress : smoothProgress;
  const fishX = useTransform(animatedProgress, (value) => getPointAtProgress(path, value).x);
  const fishY = useTransform(animatedProgress, (value) => getPointAtProgress(path, value).y);
  const fishRotate = useTransform(animatedProgress, (value) => getPointAtProgress(path, value).angle);

  const handleMarkerClick = (index: number) => {
    const section = sectionRefs.current[index];
    if (!section) return;
    section.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ height: layout.height }}
    >
      <svg
        width={layout.width}
        height={layout.height}
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        className="absolute inset-0"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={path.d}
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {path.markers.map((marker, index) => (
        <button
          key={`${marker.x}-${marker.y}`}
          type="button"
          onClick={() => handleMarkerClick(index)}
          className={cn(
            "pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/70 transition duration-300",
            index === activeIndex
              ? "h-4 w-4 border-pearl/80 shadow-[0_0_18px_rgba(142,240,255,0.45)]"
              : "h-3 w-3 opacity-70 hover:opacity-100",
          )}
          style={{ left: marker.x, top: marker.y }}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}

      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ x: fishX, y: fishY, rotate: fishRotate }}
      >
        <div
          className="relative text-pearl drop-shadow-[0_10px_18px_rgba(0,0,0,0.5)]"
          style={{ width: fishSize * 1.4, height: fishSize }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-full bg-pearl/25 blur-lg" />
          <FishIcon className="relative h-full w-full" />
        </div>
      </motion.div>
    </div>
  );
};
