"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";

type SmoothScrollProviderProps = {
  children: React.ReactNode;
  disable?: boolean;
};

const SmoothScrollProvider = ({ children, disable = false }: SmoothScrollProviderProps) => {
  const rafId = useRef<number>();

  useEffect(() => {
    if (disable) return undefined;

    const lenis = new Lenis({
      duration: 1.3,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });

    const onRaf = (time: number) => {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(onRaf);
    };

    rafId.current = requestAnimationFrame(onRaf);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      lenis.destroy();
    };
  }, [disable]);

  return <>{children}</>;
};

export default SmoothScrollProvider;
