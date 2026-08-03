"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import "./ShinyText.css";

type ShinyTextProps = {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  delay?: number;
};

export default function ShinyText({
  text,
  disabled = false,
  speed = 2,
  className = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = "left",
  delay = 0,
}: ShinyTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    const animationDuration = Math.max(speed, .1) * 1000;
    const delayDuration = Math.max(delay, 0) * 1000;
    const directionSign = direction === "left" ? 1 : -1;
    elapsedRef.current = 0;
    lastTimeRef.current = null;

    const animate = (time: number) => {
      if (disabled || pausedRef.current) {
        lastTimeRef.current = null;
        frame = requestAnimationFrame(animate);
        return;
      }
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
        frame = requestAnimationFrame(animate);
        return;
      }

      elapsedRef.current += time - lastTimeRef.current;
      lastTimeRef.current = time;
      let progress = 0;

      if (yoyo) {
        const cycleDuration = animationDuration + delayDuration;
        const cycleTime = elapsedRef.current % (cycleDuration * 2);
        if (cycleTime < animationDuration) progress = cycleTime / animationDuration * 100;
        else if (cycleTime < cycleDuration) progress = 100;
        else if (cycleTime < cycleDuration + animationDuration) progress = 100 - (cycleTime - cycleDuration) / animationDuration * 100;
      } else {
        const cycleDuration = animationDuration + delayDuration;
        const cycleTime = elapsedRef.current % cycleDuration;
        progress = cycleTime < animationDuration ? cycleTime / animationDuration * 100 : 100;
      }

      const directionalProgress = directionSign === 1 ? progress : 100 - progress;
      textRef.current?.style.setProperty("background-position", `${150 - directionalProgress * 2}% center`);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [delay, direction, disabled, speed, yoyo]);

  const style: CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: "200% auto",
    backgroundPosition: "150% center",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <span
      ref={textRef}
      className={`shiny-text ${className}`}
      style={style}
      onMouseEnter={() => { if (pauseOnHover) pausedRef.current = true; }}
      onMouseLeave={() => { if (pauseOnHover) pausedRef.current = false; }}
    >
      {text}
    </span>
  );
}
