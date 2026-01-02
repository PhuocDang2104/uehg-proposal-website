"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

type ScrollTrackerOptions = {
  containerRef: React.RefObject<HTMLElement>;
  sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  rootMargin?: string;
  threshold?: number | number[];
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const useScrollTracker = ({
  containerRef,
  sectionRefs,
  rootMargin = "-45% 0px -45% 0px",
  threshold = [0.2, 0.45, 0.7],
}: ScrollTrackerOptions): { activeIndex: number; progress: MotionValue<number> } => {
  const progress = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const containerBottom = containerTop + rect.height;
      const cursor = window.scrollY + window.innerHeight * 0.5;
      const raw = (cursor - containerTop) / Math.max(containerBottom - containerTop, 1);
      progress.set(clamp(raw, 0, 1));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [containerRef, progress]);

  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const ratios = new Map<HTMLElement, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target as HTMLElement, entry.intersectionRatio);
        });

        let bestIndex = activeIndexRef.current;
        let bestRatio = 0;
        sections.forEach((section, index) => {
          const ratio = ratios.get(section) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        });

        if (bestRatio > 0.05 && bestIndex !== activeIndexRef.current) {
          activeIndexRef.current = bestIndex;
          setActiveIndex(bestIndex);
        }
      },
      { root: null, rootMargin, threshold },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [rootMargin, sectionRefs, threshold]);

  return { activeIndex, progress };
};
