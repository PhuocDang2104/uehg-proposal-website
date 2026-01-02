"use client";

import { useEffect, useMemo, useState } from "react";
import { MotionConfig, useReducedMotion, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import StickyNav from "../nav/sticky-nav";
import SmoothScrollProvider from "../providers/smooth-scroll-provider";
import { ScrollBackgroundProvider } from "./scroll-background";
import WavyRail from "../ui/wavy-rail";
import { getProgress } from "@/lib/routes";
import UEHGAIChatWidget from "../UEHGAIChatWidget";
import ContactTableSection from "@/components/sections/contact-table";
import LinearPager from "@/components/nav/linear-pager";

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  const prefersReduceMotion = useReducedMotion() ?? false;
  const [navExpanded, setNavExpanded] = useState(false);
  const pathname = usePathname();
  const currentPath = useMemo(() => {
    if (!pathname) return "/";
    if (pathname === "/") return "/";
    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  }, [pathname]);
  const routeProgress = useMemo(() => getProgress(currentPath) / 100, [currentPath]);
  const routePercent = Math.round(routeProgress * 100);
  const isComplete = routeProgress >= 0.999;
  const [barFaded, setBarFaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setBarFaded(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = prefersReduceMotion ? "reduced" : "full";
  }, [prefersReduceMotion]);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider disable={prefersReduceMotion}>
        <ScrollBackgroundProvider>
          <div className="relative min-h-screen text-foam overflow-x-hidden">
            <div
              className="pointer-events-none fixed left-0 right-0 top-2 z-40 flex justify-center"
              style={{ opacity: barFaded ? 0.5 : 1, transition: "opacity 220ms ease" }}
            >
              <div className="w-[min(680px,96vw)] px-4">
                <div className="relative flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(142,240,255,0.3),transparent_55%)] blur-md opacity-60" />
                    <div className="relative rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-pearl shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                      <span
                        className={cn(
                          isComplete
                            ? "animate-[hue-rotate_3s_linear_infinite] text-pearl drop-shadow-[0_0_12px_rgba(146,240,255,0.8)]"
                            : "text-pearl",
                        )}
                      >
                        {routePercent}%
                      </span>
                    </div>
                  </div>
                  <WavyRail
                    progress={routeProgress}
                    orientation="horizontal"
                    thickness={7}
                    showCelebration
                    className="h-5 w-full rounded-full border border-white/10 bg-white/5"
                  />
                </div>
              </div>
            </div>
            <StickyNav expanded={navExpanded} onExpandedChange={setNavExpanded} />
            <motion.main
              className="content-shell relative z-10 mx-auto w-full max-w-4xl pb-12 pt-0"
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
              <ContactTableSection />
              <LinearPager currentRoute={currentPath} />
            </motion.main>
            <UEHGAIChatWidget />
          </div>
        </ScrollBackgroundProvider>
      </SmoothScrollProvider>
    </MotionConfig>
  );
};

export default RootLayout;
