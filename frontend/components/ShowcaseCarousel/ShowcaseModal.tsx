"use client";

import { useEffect, useRef } from "react";
import type { ShowItem } from "./shows";

type ShowcaseModalProps = {
  open: boolean;
  onClose: () => void;
  show?: ShowItem;
};

const ShowcaseModal = ({ open, onClose, show }: ShowcaseModalProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    const firstFocus = dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]");
    firstFocus?.focus();
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open || !show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Chi tiết ${show.title}`}
      className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={dialogRef}
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b1020] via-[#0f1a32] to-[#0c1224] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative w-full md:w-5/12">
            <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_20%_20%,rgba(142,240,255,0.14),transparent_50%),radial-gradient(circle_at_70%_0%,rgba(255,141,106,0.12),transparent_45%)] blur-2xl" />
            <img
              src={show.posterSrc}
              alt={show.title}
              className="relative z-10 h-full w-full rounded-xl object-cover shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
            />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-pearl/70">{show.year}</p>
                <h3 className="font-display text-2xl text-foam">{show.title}</h3>
                <p className="text-sm text-foam/80">{show.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-9 w-9 rounded-full border border-white/15 bg-white/5 text-foam transition hover:border-pearl/60 hover:text-pearl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                data-autofocus
              >
                ×
              </button>
            </div>
            <p className="text-sm text-foam/80">
              <strong className="text-foam">{show.location}</strong>
            </p>
            <p className="text-sm text-foam/80">{show.fullDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseModal;
