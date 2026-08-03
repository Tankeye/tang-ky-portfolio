"use client";

import { MouseEvent, ReactNode, useCallback, useEffect, useRef } from "react";
import "./ClickSpark.css";

type Spark = {
  x: number;
  y: number;
  angle: number;
  startTime: number;
};

type ClickSparkProps = {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
  children: ReactNode;
};

export default function ClickSpark({
  sparkColor = "#b7ff00",
  sparkSize = 12,
  sparkRadius = 22,
  sparkCount = 8,
  duration = 480,
  easing = "ease-out",
  extraScale = 1,
  children,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationRef = useRef(0);

  const ease = useCallback((value: number) => {
    if (easing === "linear") return value;
    if (easing === "ease-in") return value * value;
    if (easing === "ease-in-out") return value < 0.5
      ? 2 * value * value
      : -1 + (4 - 2 * value) * value;
    return value * (2 - value);
  }, [easing]);

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    context.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio);
    sparksRef.current = sparksRef.current.filter((spark) => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= duration) return false;

      const progress = elapsed / duration;
      const eased = ease(progress);
      const distance = eased * sparkRadius * extraScale;
      const lineLength = sparkSize * (1 - eased);
      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      context.globalAlpha = 1 - progress;
      context.strokeStyle = sparkColor;
      context.lineWidth = 1.6;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
      return true;
    });
    context.globalAlpha = 1;

    animationRef.current = sparksRef.current.length
      ? requestAnimationFrame(draw)
      : 0;
  }, [duration, ease, extraScale, sparkColor, sparkRadius, sparkSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      canvas.getContext("2d")?.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const now = performance.now();
    sparksRef.current.push(...Array.from({ length: sparkCount }, (_, index) => ({
      x: event.clientX,
      y: event.clientY,
      angle: (Math.PI * 2 * index) / sparkCount,
      startTime: now,
    })));

    if (!animationRef.current) animationRef.current = requestAnimationFrame(draw);
  };

  return (
    <div className="click-spark-root" onClick={handleClick}>
      <canvas className="click-spark-canvas" ref={canvasRef} aria-hidden="true" />
      {children}
    </div>
  );
}
