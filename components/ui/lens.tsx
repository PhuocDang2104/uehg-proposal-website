"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";

type LensProps = {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  position?: { x: number; y: number };
  isStatic?: boolean;
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
};

export const Lens = ({
  children,
  zoomFactor = 1.5,
  lensSize = 170,
  isStatic = false,
  position = { x: 200, y: 150 },
  hovering,
  setHovering,
}: LensProps) => {
  const [localHover, setLocalHover] = useState(false);
  const [mouse, setMouse] = useState({ x: 100, y: 100 });
  const isHovering = hovering ?? localHover;
  const setIsHovering = setHovering ?? setLocalHover;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const maskStyle = (x: number, y: number) => ({
    maskImage: `radial-gradient(circle ${lensSize / 2}px at ${x}px ${y}px, black 100%, transparent 100%)`,
    WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${x}px ${y}px, black 100%, transparent 100%)`,
    transformOrigin: `${x}px ${y}px`,
  });

  const scaleStyle = (x: number, y: number) => ({
    transform: `scale(${zoomFactor})`,
    transformOrigin: `${x}px ${y}px`,
  });

  return (
    <div
      className="relative z-20 overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {isStatic ? (
        <div className="absolute inset-0 overflow-hidden" style={maskStyle(position.x, position.y)}>
          <div className="absolute inset-0" style={scaleStyle(position.x, position.y)}>
            {children}
          </div>
        </div>
      ) : (
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.58 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 overflow-hidden"
              style={maskStyle(mouse.x, mouse.y)}
            >
              <div className="absolute inset-0" style={scaleStyle(mouse.x, mouse.y)}>
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Lens;
