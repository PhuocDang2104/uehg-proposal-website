"use client";

import { useEffect } from "react";
import { MotionConfig, useReducedMotion, motion } from "framer-motion";
import { useState } from "react";
import StickyNav from "../nav/sticky-nav";
import SmoothScrollProvider from "../providers/smooth-scroll-provider";

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  const prefersReduceMotion = useReducedMotion();
  const [navExpanded, setNavExpanded] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.motion = prefersReduceMotion ? "reduced" : "full";
  }, [prefersReduceMotion]);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider disable={prefersReduceMotion}>
        <div className="relative min-h-screen bg-gradient-to-b from-river-900 via-river-800/90 to-river-900 text-foam">
          <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(146,240,255,0.16),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,141,106,0.18),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(178,162,255,0.12),transparent_30%)] mix-blend-screen opacity-80" />
          <StickyNav expanded={navExpanded} onExpandedChange={setNavExpanded} />
          <motion.main
            className="content-shell relative z-10 mx-auto w-full max-w-4xl pb-12 pt-10"
            initial={false}
            animate={{
              paddingLeft: navExpanded ? "clamp(1.25rem, 8vw + 0.75rem, 24rem)" : "1.25rem",
              paddingRight: "1.25rem",
              x: navExpanded ? 12 : 0,
            }}
            transition={{
              type: prefersReduceMotion ? "tween" : "spring",
              stiffness: 120,
              damping: 18,
              mass: 0.9,
              duration: prefersReduceMotion ? 0.4 : undefined,
            }}
          >
            {children}
          </motion.main>
        </div>
      </SmoothScrollProvider>
    </MotionConfig>
  );
};

export default RootLayout;
