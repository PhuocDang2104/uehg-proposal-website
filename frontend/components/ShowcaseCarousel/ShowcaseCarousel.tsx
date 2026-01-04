"use client";

import { useEffect, useMemo, useRef, useState, type PointerEventHandler } from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import ShowcaseModal from "./ShowcaseModal";
import { shows, type ShowItem } from "./shows";

const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.28'/%3E%3C/svg%3E\")";

const normalizeOffset = (value: number, width: number) => {
  if (width <= 0) return value;
  let next = value % width;
  if (next > 0) next -= width;
  return next;
};

const ShowcaseCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeShow, setActiveShow] = useState<ShowItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const loopWidthRef = useRef(0);
  const currentXRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const pointerDownRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const paused = isHovered || isDragging;

  const duplicated = useMemo(() => [...shows, ...shows], []);

  useEffect(() => {
    if (!trackRef.current) return undefined;
    const el = trackRef.current;
    const speed = 1.8; // px per frame approx (faster glide)
    let raf = 0;
    const updateLoopWidth = () => {
      loopWidthRef.current = el.scrollWidth / 2;
      currentXRef.current = normalizeOffset(currentXRef.current, loopWidthRef.current);
      el.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
    };

    updateLoopWidth();
    const resizeObserver = new ResizeObserver(updateLoopWidth);
    resizeObserver.observe(el);

    const step = () => {
      if (!paused && !isDraggingRef.current && loopWidthRef.current > 0) {
        const next = normalizeOffset(currentXRef.current - speed, loopWidthRef.current);
        currentXRef.current = next;
        el.style.transform = `translate3d(${next}px, 0, 0)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, [paused]);

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (event.button !== 0 || !trackRef.current) return;
    dragMovedRef.current = false;
    isDraggingRef.current = false;
    setIsDragging(false);
    pointerDownRef.current = true;
    pointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = currentXRef.current;
  };

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!pointerDownRef.current || !trackRef.current) return;
    if (pointerIdRef.current !== event.pointerId) return;
    const delta = event.clientX - dragStartXRef.current;
    if (!isDraggingRef.current && Math.abs(delta) > 6) {
      dragMovedRef.current = true;
      isDraggingRef.current = true;
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (isDraggingRef.current) {
      const next = normalizeOffset(dragStartOffsetRef.current + delta, loopWidthRef.current);
      currentXRef.current = next;
      trackRef.current.style.transform = `translate3d(${next}px, 0, 0)`;
    }
  };

  const handlePointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!pointerDownRef.current) return;
    if (pointerIdRef.current !== event.pointerId) return;
    pointerDownRef.current = false;
    pointerIdRef.current = null;
    if (isDraggingRef.current && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  return (
    <section
      className="relative isolate w-screen overflow-hidden py-12"
      style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1020] via-[#0f182e] to-[#0b1226]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(142,240,255,0.12),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,141,106,0.12),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.04),transparent_40%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-35 mix-blend-soft-light"
        style={{ backgroundImage: noiseTexture }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-2 px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-foam/70">Kho lưu trữ show</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold text-foam sm:text-3xl">
              Các show đã qua
            </h3>
            <p className="text-xs text-foam/70 sm:text-sm">
              Cuộn ngang để xem các show tiêu biểu của UEHG.
            </p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </div>
      </div>

      <div
        className={`relative mt-6 h-[390px] overflow-hidden select-none sm:h-[420px] md:h-[460px] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: "pan-y" }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#0b1020] via-[#0b1020]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0b1020] via-[#0b1020]/80 to-transparent" />

        <div className="absolute inset-0">
          <div
            ref={trackRef}
            className="flex h-full items-center justify-center gap-5 py-6 will-change-transform"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            {duplicated.map((item, idx) => (
              <CardContainer
                key={`${item.id}-${idx}`}
                className="inter-var w-[270px] shrink-0 sm:w-[290px]"
                onClick={() => {
                  if (dragMovedRef.current) return;
                  setActiveShow(item);
                  setModalOpen(true);
                }}
              >
                <CardBody className="bg-gray-50/5 dark:bg-black/50 relative h-[360px] w-full overflow-hidden rounded-xl border border-white/10 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.4)] transition duration-300 ease-out group-hover/card:shadow-[0_26px_70px_rgba(0,0,0,0.45)] group-hover/card:scale-[1.04] flex flex-col gap-4 sm:h-[390px] md:h-[410px]">
                  <div>
                    <CardItem
                      translateZ="60"
                      className="text-base font-bold text-foam transition group-hover/card:text-pearl group-hover/card:translate-z-[80px] sm:text-lg"
                    >
                      {item.title}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="80"
                      className="mt-1 text-xs text-foam/70 transition group-hover/card:translate-z-[90px] sm:text-sm"
                    >
                      {item.subtitle}
                    </CardItem>
                  </div>
                  <CardItem
                    translateZ="120"
                    rotateX={16}
                    rotateZ={-8}
                    className="mt-4 w-full transition group-hover/card:translate-z-[140px]"
                  >
                    <img
                      src={item.posterSrc}
                      alt={item.title}
                      className="h-52 w-full rounded-xl object-cover transition group-hover/card:shadow-2xl group-hover/card:scale-[1.03] sm:h-60 md:h-64"
                      draggable={false}
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </div>

      <ShowcaseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        show={activeShow ?? undefined}
      />
    </section>
  );
};

export default ShowcaseCarousel;
