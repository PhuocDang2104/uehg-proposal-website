"use client";

import { useEffect, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollAnimateType = "fade-up" | "fade-left" | "fade-right" | "zoom-in";

type ScrollAnimateProps = {
  as?: ElementType;
  animation?: ScrollAnimateType;
  duration?: number;
  delay?: number;
  className?: string;
  children: ReactNode;
};

type ScrollAnimationOptions = {
  rootMargin?: string;
  threshold?: number | number[];
  selector?: string;
};

export const useScrollAnimations = (
  containerRef: React.RefObject<HTMLElement | null>,
  { rootMargin = "0px 0px -20% 0px", threshold = 0.2, selector = "[data-scroll-anim]" }: ScrollAnimationOptions = {},
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const elements = Array.from(container.querySelectorAll<HTMLElement>(selector));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.setAttribute("data-scroll-visible", "true");
          } else {
            el.removeAttribute("data-scroll-visible");
          }
        });
      },
      { root: null, rootMargin, threshold },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef, rootMargin, selector, threshold]);
};

export const ScrollAnimate = ({
  as: Component = "div",
  animation = "fade-up",
  duration = 650,
  delay = 0,
  className,
  children,
}: ScrollAnimateProps) => {
  const style = {
    "--anim-duration": `${duration}ms`,
    "--anim-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <Component
      data-scroll-anim={animation}
      style={style}
      className={cn("scroll-anim", className)}
    >
      {children}
    </Component>
  );
};
