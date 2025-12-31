"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MeteorsProps = {
  number?: number;
  className?: string;
};

export const Meteors = ({ number = 20, className }: MeteorsProps) => {
  const meteors = Array.from({ length: number });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pointer-events-none absolute inset-0"
    >
      {meteors.map((_, idx) => {
        const position = (idx / number) * 100;
        return (
          <span
            key={`meteor-${idx}`}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[60px] before:-translate-y-1/2 before:transform before:bg-gradient-to-r before:from-[#94a3b8] before:to-transparent before:content-['']",
              className,
            )}
            style={{
              top: "-40px",
              left: `${position}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.floor(Math.random() * 6 + 6)}s`,
            }}
          />
        );
      })}
    </motion.div>
  );
};
