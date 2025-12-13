"use client";

import { useEffect } from "react";
import { MotionConfig, useReducedMotion, motion } from "framer-motion";
import { useState } from "react";
import StickyNav from "../nav/sticky-nav";
import SmoothScrollProvider from "../providers/smooth-scroll-provider";
import { ScrollBackgroundProvider } from "./scroll-background";

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
        <ScrollBackgroundProvider>
          <div className="relative min-h-screen text-foam">
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
        </ScrollBackgroundProvider>
      </SmoothScrollProvider>
    </MotionConfig>
  );
};

export default RootLayout;
