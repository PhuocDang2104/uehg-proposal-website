"use client";

import clsx from "clsx";
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type HTMLAttributes,
  type JSX,
} from "react";

type TiltState = { x: number; y: number; active: boolean };
const TiltContext = createContext<TiltState>({ x: 0, y: 0, active: false });

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const CardContainer = ({ children, className, onClick }: ContainerProps) => {
  const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0, active: false });
  const maxTilt = 12;

  const handleMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    const rx = (-dy / rect.height) * maxTilt;
    const ry = (dx / rect.width) * maxTilt;
    setTilt({ x: ry, y: rx, active: true });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0, active: false });

  const value = useMemo(() => tilt, [tilt]);

  return (
    <TiltContext.Provider value={value}>
      <div
        className={clsx("relative group/card", className)}
        style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={onClick}
      >
        {children}
      </div>
    </TiltContext.Provider>
  );
};

type BodyProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardBody = ({ children, className }: BodyProps) => {
  const tilt = useContext(TiltContext);
  return (
    <div
      className={clsx("relative transition-transform duration-150 ease-out", className)}
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
    >
      {children}
    </div>
  );
};

type ItemProps<E extends keyof JSX.IntrinsicElements = "div"> = {
  as?: E;
  children: React.ReactNode;
  className?: string;
  translateZ?: number | string;
  translateX?: number | string;
  translateY?: number | string;
  rotateX?: number;
  rotateZ?: number;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

export const CardItem = <E extends keyof JSX.IntrinsicElements = "div">({
  as,
  children,
  className,
  translateZ = 0,
  translateX = 0,
  translateY = 0,
  rotateX = 0,
  rotateZ = 0,
  ...rest
}: ItemProps<E>) => {
  const Component = (as ?? "div") as any;
  const tz = typeof translateZ === "number" ? `${translateZ}px` : translateZ;
  const tx = typeof translateX === "number" ? `${translateX}px` : translateX;
  const ty = typeof translateY === "number" ? `${translateY}px` : translateY;

  return (
    <Component
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transform: `translateX(${tx}) translateY(${ty}) translateZ(${tz}) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};
