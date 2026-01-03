"use client";

import { useEffect } from "react";
import Link from "next/link";
import { routes, getAdjacentRoutes, getRouteIndex } from "@/lib/routes";

type LinearPagerProps = {
  currentRoute: string;
};

const LinearPager = ({ currentRoute }: LinearPagerProps) => {
  const { prev, next } = getAdjacentRoutes(currentRoute);
  const total = routes.length;
  const currentIndex = getRouteIndex(currentRoute) + 1;

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
  }, [currentRoute]);

  return (
    <div className="mt-12 flex flex-col items-stretch justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_10px_50px_rgba(0,0,0,0.35)] md:flex-row md:items-center md:px-6">
      <div className="text-xs uppercase tracking-[0.16em] text-foam/70">
        Flow {currentIndex}/{total}
      </div>
      <div className="flex items-center justify-between gap-3 md:justify-end">
        <Link
          href={prev?.path ?? "#"}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-foam transition hover:border-pearl/60 aria-disabled:pointer-events-none aria-disabled:opacity-40"
          aria-disabled={!prev}
          tabIndex={prev ? 0 : -1}
        >
          ← PREV {prev ? `(${prev.label})` : ""}
        </Link>
        <Link
          href={next?.path ?? "#"}
          className="rounded-full border border-white/15 bg-gradient-to-r from-ember/30 to-pearl/30 px-4 py-2 text-sm text-foam transition hover:border-ember/70 aria-disabled:pointer-events-none aria-disabled:opacity-40"
          aria-disabled={!next}
          tabIndex={next ? 0 : -1}
        >
          NEXT → {next ? `(${next.label})` : ""}
        </Link>
      </div>
    </div>
  );
};

export default LinearPager;
