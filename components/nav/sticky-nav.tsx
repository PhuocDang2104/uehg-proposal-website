"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { routes, getProgress } from "@/lib/routes";
import { Button } from "../ui/button";
import WavyRail from "../ui/wavy-rail";

type PianoKey = {
  id: number;
  isBlack: boolean;
  whiteIndex: number;
  group: number;
};

const buildKeys = (): PianoKey[] => {
  const result: PianoKey[] = [];
  let whiteIndex = -1;
  for (let i = 0; i < 88; i += 1) {
    const midi = 21 + i; // A0
    const pitchClass = midi % 12;
    const isBlack = [1, 3, 6, 8, 10].includes(pitchClass);
    if (!isBlack) whiteIndex += 1;
    result.push({
      id: i,
      isBlack,
      whiteIndex,
      group: Math.min(routes.length - 1, Math.floor(i / 11)),
    });
  }
  return result;
};

const keys = buildKeys();

type StickyNavProps = {
  expanded?: boolean;
  onExpandedChange?: (open: boolean) => void;
};

const StickyNav = ({ expanded: expandedProp, onExpandedChange }: StickyNavProps) => {
  const pathname = usePathname();
  const currentPath = useMemo(() => {
    if (!pathname) return "/";
    if (pathname === "/") return "/";
    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  }, [pathname]);
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const progress = useMemo(() => getProgress(currentPath), [currentPath]);
  const [internalExpanded, setInternalExpanded] = useState(expandedProp ?? false);
  const expanded = expandedProp ?? internalExpanded;
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const audioCtxRef = useRef<AudioContext | null>(null);

  const ensureAudioContext = () => {
    if (!audioCtxRef.current) {
      const Ctx =
        window.AudioContext ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).webkitAudioContext;
      audioCtxRef.current = Ctx ? new Ctx() : null;
    }
    return audioCtxRef.current;
  };

  const playNote = (frequency: number) => {
    if (!soundEnabled) return;
    const ctx = ensureAudioContext();
    if (!ctx) return;
    if (ctx.state !== "running") return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.value = frequency;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  };

  useEffect(() => {
    if (!soundEnabled) return undefined;
    const handler = () => {
      const ctx = ensureAudioContext();
      if (ctx && ctx.state !== "running") {
        ctx.resume().catch(() => {});
      }
    };
    window.addEventListener("pointerdown", handler);
    return () => window.removeEventListener("pointerdown", handler);
  }, [soundEnabled]);

  const noteFrequencies = useMemo(
    () => [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25],
    [],
  );

  const handleHoverNote = (idx: number) => {
    const freq = noteFrequencies[idx % noteFrequencies.length];
    playNote(freq);
  };

  const activeGroup = useMemo(
    () => routes.findIndex((r) => r.path === currentPath),
    [currentPath],
  );

  const highlightedGroup = hoveredGroup ?? activeGroup;

  const containerVariants = {
    closed: {
      width: "4rem",
      opacity: 0,
      transition: { duration: reduceMotion ? 0 : 0.08, ease: "easeIn" },
    },
    open: {
      width: "22rem",
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0.25 : 0.55,
        ease: reduceMotion ? "easeOut" : [0.2, 0.9, 0.2, 1],
      },
    },
  };

  const liquidVariants = {
    closed: {
      scaleX: 0.42,
      scaleY: 0.55,
      opacity: 0,
      x: -6,
      transition: { duration: reduceMotion ? 0 : 0.2, ease: "easeOut" },
    },
    open: {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      x: 0,
      transition: { duration: reduceMotion ? 0.25 : 0.55, ease: "easeOut" },
    },
  };

  const setExpandedState = (next: boolean) => {
    if (expandedProp === undefined) {
      setInternalExpanded(next);
    }
    onExpandedChange?.(next);
  };
  const handleOpen = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setExpandedState(true);
  };
  const handleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setExpandedState(false), 130);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: reduceMotion ? 0 : 0.25 + i * 0.05, duration: 0.26, ease: "easeOut" },
    }),
    exit: { opacity: 0, y: 6, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <aside className="fixed left-3 top-3 bottom-3 z-50 flex items-start">
      <div className="relative flex h-full items-start gap-2">
        <svg width="0" height="0">
          <defs>
            <filter id="nav-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        <AnimatePresence>
          {expanded && (
            <motion.div
              key="liquid-shell"
              className="pointer-events-none absolute -left-8 top-0 bottom-0 w-[32rem] -z-10"
              initial="closed"
              animate="open"
              exit="closed"
              variants={liquidVariants}
              style={{ filter: "url(#nav-goo)" }}
            >
              <motion.div
                className="absolute left-0 top-2 bottom-2 w-[12rem] rounded-[28px] bg-gradient-to-b from-[#06101f] via-[#07233a] to-[#050d1b] blur-[18px] opacity-95"
                animate={{ x: [-4, 6, -2, 4, 0] }}
                transition={{ duration: 9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
              />
              <motion.div
                className="absolute left-4 top-4 bottom-4 w-[28rem] rounded-[56px] bg-[linear-gradient(180deg,rgba(6,20,38,0.92),rgba(8,36,64,0.95),rgba(6,18,32,0.9))] blur-[22px] opacity-95"
                animate={{ x: [0, 10, -6, 4, 0] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
              />
              <motion.div
                className="absolute left-2 top-6 bottom-6 w-[28rem] rounded-[999px] bg-[radial-gradient(circle_at_20%_20%,rgba(88,197,255,0.32),transparent_40%),radial-gradient(circle_at_70%_40%,rgba(86,196,255,0.28),transparent_48%),radial-gradient(circle_at_50%_70%,rgba(80,132,255,0.25),transparent_52%)] mix-blend-screen"
                animate={{ x: [0, 8, -4, 6, 0] }}
                transition={{ duration: 7.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                style={{ filter: "blur(30px)" }}
              />
              <motion.div
                className="absolute left-6 top-2 bottom-2 w-[6rem] rounded-[999px] bg-[linear-gradient(180deg,rgba(110,226,255,0.38),rgba(58,129,255,0.22),rgba(6,20,38,0))] mix-blend-screen"
                animate={{ x: [0, 10, 2, 8, 0], opacity: [0.45, 0.6, 0.4, 0.55, 0.45] }}
                transition={{ duration: 6.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                style={{ filter: "blur(24px)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex h-full flex-col items-center">
          <div className="group relative flex h-14 w-14 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-ember/40 via-pearl/35 to-iris/35 blur-lg opacity-0 transition duration-300 group-hover:opacity-100" />
            <button
              type="button"
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
              onFocus={handleOpen}
              onBlur={handleClose}
              onClick={handleOpen}
              className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/75 text-sm font-semibold text-foam shadow-[0_10px_40px_rgba(0,0,0,0.45)] ring-ember/40 transition duration-500 hover:scale-[1.08] hover:border-ember/60 hover:shadow-[0_18px_60px_rgba(255,141,106,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            >
              UEHG
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(146,240,255,0.18),transparent_35%)] opacity-0 transition duration-300 group-hover:opacity-100" />
            </button>
          </div>
          <div className="absolute -left-4 top-16 bottom-16">
            <WavyRail progress={progress / 100} />
          </div>
        </div>

        <motion.div
          className="relative h-full"
          initial={expanded ? "open" : "closed"}
          animate={expanded ? "open" : "closed"}
          variants={containerVariants}
          style={{ filter: "url(#nav-goo)" }}
          onMouseLeave={handleClose}
        >
          <div className="pointer-events-none absolute inset-[-18%] -z-10">
            <AnimatePresence>
              {!expanded && (
                <motion.div
                  key="ripple"
                  className="absolute inset-0 rounded-3xl"
                  initial={{ opacity: 0.35, scale: 0.9 }}
                  animate={{ opacity: 0, scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_40%_40%,rgba(142,240,255,0.22),transparent_55%),radial-gradient(circle_at_60%_60%,rgba(255,141,106,0.2),transparent_55%)] blur-3xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                key="nav-shell"
                className="relative z-10 flex h-full w-[22rem] max-h-[calc(100vh-1.5rem)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-river-900/85 backdrop-blur-lg shadow-[0_16px_60px_rgba(0,0,0,0.45)]"
                initial={{ opacity: 0, x: -12, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: { delay: reduceMotion ? 0 : 0.18, duration: 0.35 },
                }}
                exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.1 } }}
                onMouseEnter={handleOpen}
              >
                <div className="relative flex flex-1 min-h-0 flex-col">
                  <motion.div
                    className="pointer-events-none absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 0.35,
                      transition: { delay: reduceMotion ? 0 : 0.25, duration: 0.6, ease: "easeOut" },
                    }}
                  >
                    <div className="absolute inset-[-10%] bg-[radial-gradient(circle_at_20%_20%,rgba(142,240,255,0.12),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,141,106,0.14),transparent_40%)] blur-xl animate-[pulse_3s_ease-in-out_infinite]" />
                    <div className="absolute inset-[-12%] bg-[radial-gradient(circle_at_60%_30%,rgba(142,240,255,0.08),transparent_45%),radial-gradient(circle_at_30%_80%,rgba(255,141,106,0.1),transparent_45%)] blur-2xl animate-[pulse_4s_ease-in-out_infinite]" />
                  </motion.div>

                <div className="relative flex-1 min-h-0 overflow-hidden">
                  <div className="nav-scroll relative flex flex-1 min-h-0 flex-col space-y-4 px-4 pt-4 pb-6 overflow-y-auto" style={{ overscrollBehavior: "contain" }}>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-ember/90 via-pearl/70 to-river-600 text-xs font-semibold text-river-900 shadow-lg">
                          UE
                        </div>
                        <div className="leading-tight">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-foam/70">Proposal</p>
                          <p className="text-sm font-semibold text-foam">NBĐ - Ngược Dòng</p>
                        </div>
                      </div>

                      <nav
                        aria-label="Piano Navigation"
                        className="piano-vertical nav-scroll max-h-[360px] min-h-0 overflow-y-auto pr-1"
                      >
                        <div
                          className="piano-stack"
                          onMouseLeave={() => setHoveredGroup(null)}
                          style={
                            {
                              "--white-w": "46px",
                              "--white-h": "10px",
                              "--black-w": "24px",
                            } as React.CSSProperties
                          }
                        >
                          <div className="piano-rows">
                            <div className="piano-white-layer">
                              {keys
                                .filter((k) => !k.isBlack)
                                .map((key) => {
                                  const isHighlighted = highlightedGroup === key.group;
                                  const top = key.whiteIndex * 10;
                                  return (
                                    <span
                                      key={key.id}
                                      className={clsx("piano-white-key", isHighlighted && "piano-key-active")}
                                      style={{
                                        width: "var(--white-w)",
                                        height: "var(--white-h)",
                                        top,
                                      }}
                                      onMouseEnter={() => setHoveredGroup(key.group)}
                                      onClick={() => router.push(routes[key.group].path)}
                                    />
                                  );
                                })}
                            </div>
                            <div className="piano-black-layer">
                              {keys
                                .filter((k) => k.isBlack)
                                .map((key) => {
                                  const isHighlighted = highlightedGroup === key.group;
                                  const top = (key.whiteIndex + 0.5) * 10 - (10 * 0.65) / 2;
                                  return (
                                    <span
                                      key={key.id}
                                      className={clsx("piano-black-key", isHighlighted && "piano-key-active")}
                                      style={{
                                        left: "calc(var(--white-w) - var(--black-w) - 4px)",
                                        top,
                                        width: "var(--black-w)",
                                        height: "calc(var(--white-h) * 0.65)",
                                      }}
                                      onMouseEnter={() => setHoveredGroup(key.group)}
                                      onClick={() => router.push(routes[key.group].path)}
                                    />
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                        <div className="piano-navlist nav-scroll max-h-[320px] min-h-0 overflow-y-auto pr-2">
                          {routes.map((route, idx) => {
                            const isActive = currentPath === route.path;
                            const isHover = hoveredGroup === idx;
                            return (
                              <motion.div
                                key={route.path}
                                custom={idx}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={itemVariants}
                              >
                                <Link
                                  href={route.path}
                                  className={clsx(
                                    "piano-navitem",
                                    isActive && "piano-navitem-active",
                                    isHover && "piano-navitem-hover",
                                  )}
                                  onMouseEnter={() => {
                                    setHoveredGroup(idx);
                                    handleHoverNote(idx);
                                  }}
                                  onMouseLeave={() => setHoveredGroup(null)}
                                  onFocus={() => setHoveredGroup(idx)}
                                  onBlur={() => setHoveredGroup(null)}
                                >
                                  <span className="text-[10px] uppercase tracking-[0.18em] text-foam/60">
                                    {route.eyebrow ?? `0${idx + 1}`}
                                  </span>
                                  <span className="text-sm font-semibold">{route.label}</span>
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>
                      </nav>

                      <div className="space-y-3 pb-4 pt-2">
                        <button
                          type="button"
                          onClick={() => setSoundEnabled((v) => !v)}
                          className={clsx(
                            "w-full rounded-full border px-3 py-2 text-xs uppercase tracking-[0.16em] transition",
                            soundEnabled
                              ? "border-ember/60 bg-ember/15 text-pearl"
                              : "border-white/15 bg-white/5 text-foam hover:border-ember/50",
                          )}
                        >
                          {soundEnabled ? "Audio Hover: ON" : "Audio Hover: OFF"}
                        </button>
                        <div className="flex flex-col gap-2">
                          <Button href="/sponsorship" size="sm" variant="primary">
                            Trở thành Nhà Tài Trợ
                          </Button>
                          <Button href="/contact" size="sm" variant="ghost">
                            Đăng ký quan tâm/Đặt vé
                          </Button>
                          <Button href="/media" size="sm" variant="utility">
                            Tải Sponsorship Kit (PDF)
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </aside>
  );
};

export default StickyNav;
