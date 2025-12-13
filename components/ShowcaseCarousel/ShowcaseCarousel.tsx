"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import ShowcaseModal from "./ShowcaseModal";
import { shows, type ShowItem } from "./shows";

const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.28'/%3E%3C/svg%3E\")";

const ShowcaseCarousel = () => {
  const [paused, setPaused] = useState(false);
  const [activeShow, setActiveShow] = useState<ShowItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const duplicated = useMemo(() => [...shows, ...shows], []);

  useEffect(() => {
    if (!trackRef.current) return undefined;
    const el = trackRef.current;
    let current = 0;
    let raf = 0;
    const speed = 0.45; // px per frame approx

    const step = () => {
      if (!paused) {
        current -= speed;
        const width = el.scrollWidth / 2;
        if (-current >= width) {
          current += width;
        }
        el.style.transform = `translate3d(${current}px, 0, 0)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <section
      className="relative isolate w-screen overflow-hidden py-14"
      style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1020] via-[#0f182e] to-[#0b1226]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(142,240,255,0.12),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,141,106,0.12),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.04),transparent_40%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-35 mix-blend-soft-light"
        style={{ backgroundImage: noiseTexture }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-3 px-6">
        <p className="text-sm uppercase tracking-[0.2em] text-foam/70">Showcase Archive</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl text-foam md:text-4xl">Our Past Productions</h3>
            <p className="text-sm text-foam/70">Cuộn ngang để xem các show tiêu biểu của UEHG.</p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </div>
      </div>

      <div
        className="relative mt-8 h-[420px] md:h-[460px] overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#0b1020] via-[#0b1020]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0b1020] via-[#0b1020]/80 to-transparent" />

        <div className="absolute inset-0">
          <div
            ref={trackRef}
            className="flex h-full items-center justify-center gap-6 py-8 will-change-transform"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            {duplicated.map((item, idx) => (
              <CardContainer
                key={`${item.id}-${idx}`}
                className="inter-var w-[320px] shrink-0"
                onClick={() => {
                  setActiveShow(item);
                  setModalOpen(true);
                }}
              >
                <CardBody className="bg-gray-50/5 dark:bg-black/50 relative h-[360px] w-full overflow-hidden rounded-xl border border-white/10 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.4)] transition duration-300 ease-out group-hover/card:shadow-[0_26px_70px_rgba(0,0,0,0.45)] group-hover/card:scale-[1.04] flex flex-col justify-between">
                  <div>
                    <CardItem
                      translateZ="60"
                      className="text-lg font-bold text-foam transition group-hover/card:text-pearl group-hover/card:translate-z-[80px]"
                    >
                      {item.title}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="80"
                      className="mt-1 text-sm text-foam/70 transition group-hover/card:translate-z-[90px]"
                    >
                      {item.subtitle}
                    </CardItem>
                  </div>
                  <CardItem
                    translateZ="120"
                    rotateX={16}
                    rotateZ={-8}
                    className="mt-5 w-full transition group-hover/card:translate-z-[140px]"
                  >
                    <img
                      src={item.posterSrc}
                      alt={item.title}
                      className="h-48 w-full rounded-xl object-cover transition group-hover/card:shadow-2xl group-hover/card:scale-[1.03]"
                      draggable={false}
                    />
                  </CardItem>
                  <div className="flex items-center justify-center gap-3 text-[11px] text-foam/70 px-1">
                    <CardItem translateZ={40} translateX={-12} className="group-hover/card:translate-z-60">
                      {item.year}
                    </CardItem>
                    <CardItem translateZ={40} translateX={12} className="group-hover/card:translate-z-60 whitespace-nowrap">
                      {item.location}
                    </CardItem>
                  </div>
                  <div className="mt-3 flex justify-center gap-2 px-1">
                    <CardItem
                      translateZ={40}
                      translateX={-20}
                      as="button"
                      className="px-3 py-1.5 rounded-xl text-[11px] font-normal text-foam border border-white/15 transition group-hover/card:border-pearl/60"
                    >
                      Chi tiết →
                    </CardItem>
                    <CardItem
                      translateZ={40}
                      translateX={20}
                      as="button"
                      className="px-3.5 py-1.5 rounded-xl bg-black text-white text-[11px] font-bold shadow-[0_10px_30px_rgba(255,141,106,0.35)] transition group-hover/card:bg-ember group-hover/card:text-river-900"
                    >
                      Xem show
                    </CardItem>
                  </div>
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
