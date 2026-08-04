"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import "./GradientText.css";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  direction?: "horizontal" | "vertical" | "diagonal";
  pauseOnHover?: boolean;
  yoyo?: boolean;
  showBorder?: boolean;
};

export default function GradientText({
  children,
  className = "",
  colors = ["#5227ff", "#ff9ffc", "#b497cf"],
  animationSpeed = 8,
  direction = "horizontal",
  pauseOnHover = false,
  yoyo = true,
  showBorder = false,
}: GradientTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    let elapsed = 0;
    let previous: number | null = null;
    const duration = Math.max(0.2, animationSpeed) * 1000;

    const animate = (time: number) => {
      if (pausedRef.current) {
        previous = null;
        frame = requestAnimationFrame(animate);
        return;
      }

      if (previous !== null) elapsed += time - previous;
      previous = time;

      const cycle = yoyo ? duration * 2 : duration;
      const cycleTime = elapsed % cycle;
      const progress = yoyo && cycleTime > duration
        ? 100 - ((cycleTime - duration) / duration) * 100
        : (cycleTime / duration) * 100;
      const position = direction === "vertical" ? `50% ${progress}%` : `${progress}% 50%`;

      textRef.current?.style.setProperty("background-position", position);
      overlayRef.current?.style.setProperty("background-position", position);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [animationSpeed, direction, yoyo]);

  const angle = direction === "vertical" ? "to bottom" : direction === "diagonal" ? "to bottom right" : "to right";
  const gradient = `linear-gradient(${angle}, ${[...colors, colors[0]].join(", ")})`;
  const gradientStyle = {
    backgroundImage: gradient,
    backgroundSize: direction === "vertical" ? "100% 300%" : direction === "diagonal" ? "300% 300%" : "300% 100%",
    backgroundRepeat: "repeat",
  } as CSSProperties;

  return (
    <span
      className={`animated-gradient-text ${showBorder ? "with-border" : ""} ${className}`.trim()}
      onMouseEnter={() => { if (pauseOnHover) pausedRef.current = true; }}
      onMouseLeave={() => { if (pauseOnHover) pausedRef.current = false; }}
    >
      {showBorder && <span ref={overlayRef} className="gradient-overlay" style={gradientStyle} />}
      <span ref={textRef} className="gradient-text-content" style={gradientStyle}>{children}</span>
    </span>
  );
}
