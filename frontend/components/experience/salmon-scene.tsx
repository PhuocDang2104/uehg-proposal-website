"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import Lens from "../ui/lens";

const SalmonScene = () => {
  const prefersReducedMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-river-900 via-river-700/60 to-river-900 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(146,240,255,0.18),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,141,106,0.22),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2740%27 height=%2740%27 viewBox=%270 0 40 40%27 fill=%27none%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M0 20C10 10 30 10 40 20C30 30 10 30 0 20Z%27 fill=%27%23ffffff0d%27/%3E%3C/svg%3E')] opacity-60" />
      <div className="relative z-10 flex flex-col gap-4 p-6">
        <Lens zoomFactor={1.6} lensSize={180} hovering={hovering} setHovering={setHovering}>
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/nbd_resource/NBD_banner.png"
              alt="NBD Poster"
              width={1200}
              height={800}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </Lens>
        <div
          className={`space-y-2 transition-opacity duration-200 ${hovering ? "opacity-40" : "opacity-100"}`}
        >
          <h3 className="font-display text-2xl text-foam">Cá hồi bơi ngược dòng</h3>
          <p className="text-sm text-foam/75">
            Poster NBĐ được soi kỹ bằng hiệu ứng phóng đại, làm rõ chất liệu và ánh sáng khi rê chuột.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalmonScene;
