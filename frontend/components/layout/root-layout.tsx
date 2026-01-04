"use client";

import { useEffect, useMemo, useState } from "react";
import { MotionConfig, useReducedMotion, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getRouteIndex, routes } from "@/lib/routes";
import StickyNav from "../nav/sticky-nav";
import SmoothScrollProvider from "../providers/smooth-scroll-provider";
import { ScrollBackgroundProvider } from "./scroll-background";
import WavyRail from "../ui/wavy-rail";
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
  const routeIndex = useMemo(() => getRouteIndex(currentPath), [currentPath]);
  const totalRoutes = routes.length;
  const [scrollProgress, setScrollProgress] = useState(0);
  const isComplete = scrollProgress >= 0.999;
  const [barFaded, setBarFaded] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const next = maxScroll > 0 ? scrollTop / maxScroll : 1;
      setScrollProgress(Math.max(0, Math.min(1, next)));
      setBarFaded(scrollTop > 40);
    };
    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [currentPath]);

  useEffect(() => {
    document.documentElement.dataset.motion = prefersReduceMotion ? "reduced" : "full";
  }, [prefersReduceMotion]);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider disable={prefersReduceMotion}>
        <ScrollBackgroundProvider>
          <div className="relative min-h-screen text-foam overflow-x-hidden">
            <div className="pointer-events-none fixed left-0 right-0 top-2 z-40 flex justify-center">
              <div className="w-[min(720px,96vw)] px-3">
                <div className="relative flex items-center gap-2 rounded-full px-2.5 py-1">
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-full border border-white/10 bg-white/5 shadow-[0_10px_26px_rgba(0,0,0,0.35)] backdrop-blur-md transition-opacity duration-200",
                      barFaded ? "opacity-50" : "opacity-100",
                    )}
                  />
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_20%_30%,rgba(142,240,255,0.12),transparent_55%),radial-gradient(circle_at_80%_40%,rgba(255,141,106,0.12),transparent_60%)] transition-opacity duration-200",
                      barFaded ? "opacity-40" : "opacity-70",
                    )}
                  />
                  <div
                    className={cn(
                      "relative rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-foam/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] transition-opacity duration-200",
                      barFaded ? "opacity-60" : "opacity-100",
                    )}
                  >
                    <span
                      className={cn(
                        "tabular-nums",
                        isComplete
                          ? "animate-[hue-rotate_3s_linear_infinite] text-pearl drop-shadow-[0_0_12px_rgba(146,240,255,0.6)]"
                          : "text-foam/80",
                      )}
                    >
                      {routeIndex + 1}/{totalRoutes}
                    </span>
                  </div>
                  <div className="relative flex-1">
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(142,240,255,0.14),rgba(255,141,106,0.14))] transition-opacity duration-200",
                        barFaded ? "opacity-40" : "opacity-60",
                      )}
                    />
                    <WavyRail
                      progress={scrollProgress}
                      orientation="horizontal"
                      thickness={2}
                      showCelebration
                      className="h-2 w-full rounded-full border border-white/10 bg-black/30"
                    />
                  </div>
                </div>
              </div>
            </div>
            <StickyNav expanded={navExpanded} onExpandedChange={setNavExpanded} />
            <motion.main
              className="content-shell relative z-10 mx-auto w-full max-w-[860px] pb-10 pt-0"
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
