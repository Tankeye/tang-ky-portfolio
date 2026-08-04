"use client";

import { CSSProperties, useEffect, useRef } from "react";
import "./Aurora.css";

type AuroraProps = {
  colorStops?: [string, string, string];
  speed?: number;
  blend?: number;
  amplitude?: number;
  className?: string;
};

export default function Aurora({
  colorStops = ["#5227ff", "#7cff67", "#2457ff"],
  speed = 0.5,
  blend = 0.5,
  amplitude = 1,
  className = "",
}: AuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let frame = 0;
    const startedAt = performance.now();

    const move = (now: number) => {
      const elapsed = (now - startedAt) / 1000;
      const pace = Math.max(0.18, speed);

      element.style.setProperty("--aurora-x", `${Math.sin(elapsed * pace * 0.72) * 12}%`);
      element.style.setProperty("--aurora-y", `${Math.cos(elapsed * pace * 0.56) * 8}%`);
      element.style.setProperty("--aurora-x-alt", `${Math.cos(elapsed * pace * 0.48) * 14}%`);
      element.style.setProperty("--aurora-y-alt", `${Math.sin(elapsed * pace * 0.64) * 9}%`);
      element.style.setProperty("--aurora-rotation", `${Math.sin(elapsed * pace * 0.34) * 6}deg`);
      element.style.setProperty("--aurora-pulse", `${1 + Math.sin(elapsed * pace * 0.82) * 0.08}`);

      frame = requestAnimationFrame(move);
    };

    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, [speed]);

  const style = {
    "--aurora-one": colorStops[0],
    "--aurora-two": colorStops[1],
    "--aurora-three": colorStops[2],
    "--aurora-duration": `${Math.max(10, 28 / Math.max(0.1, speed))}s`,
    "--aurora-opacity": Math.min(0.72, Math.max(0.18, blend * 0.72)),
    "--aurora-height": Math.min(1.5, Math.max(0.55, amplitude)),
  } as CSSProperties;

  return (
    <div ref={containerRef} className={`aurora-container ${className}`.trim()} style={style} aria-hidden="true">
      <span className="aurora-wave aurora-wave-one" />
      <span className="aurora-wave aurora-wave-two" />
      <span className="aurora-wave aurora-wave-three" />
    </div>
  );
}
