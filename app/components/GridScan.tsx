"use client";

import { CSSProperties, useEffect, useRef } from "react";
import "./GridScan.css";

type GridScanProps = {
  linesColor?: string;
  scanColor?: string;
  scanOpacity?: number;
  lineThickness?: number;
  gridSize?: number;
  scanDuration?: number;
  scanDelay?: number;
  sensitivity?: number;
  className?: string;
  style?: CSSProperties;
};

export default function GridScan({
  linesColor = "#52648d",
  scanColor = "#b7ff00",
  scanOpacity = 0.32,
  lineThickness = 1,
  gridSize = 82,
  scanDuration = 3.4,
  scanDelay = 1.6,
  sensitivity = 0.5,
  className = "",
  style,
}: GridScanProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!container || !canvas || !context) return;

    let frame = 0;
    let width = 1;
    let height = 1;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        targetX = 0;
        targetY = 0;
        return;
      }
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const draw = (timestamp: number) => {
      context.clearRect(0, 0, width, height);
      currentX += (targetX - currentX) * 0.045;
      currentY += (targetY - currentY) * 0.045;

      const vanishX = width * 0.5 + currentX * 86 * sensitivity;
      const vanishY = height * 0.48 + currentY * 48 * sensitivity;
      const aspect = width / height;
      const focal = height * 1.08;
      const near = 1.22;
      const far = 18;
      const halfHeight = 1.04;
      const halfWidth = aspect * 1.2;

      const project = (x: number, y: number, z: number) => ({
        x: vanishX + (x * focal) / z,
        y: vanishY + (y * focal) / z,
      });

      const rectAt = (z: number) => [
        project(-halfWidth, -halfHeight, z),
        project(halfWidth, -halfHeight, z),
        project(halfWidth, halfHeight, z),
        project(-halfWidth, halfHeight, z),
      ];

      const strokePath = (points: Array<{ x: number; y: number }>, close = false) => {
        context.beginPath();
        points.forEach((point, index) => index
          ? context.lineTo(point.x, point.y)
          : context.moveTo(point.x, point.y));
        if (close) context.closePath();
        context.stroke();
      };

      const fillQuad = (points: Array<{ x: number; y: number }>) => {
        context.beginPath();
        points.forEach((point, index) => index
          ? context.lineTo(point.x, point.y)
          : context.moveTo(point.x, point.y));
        context.closePath();
        context.fill();
      };

      const centerShade = context.createRadialGradient(vanishX, vanishY, 0, vanishX, vanishY, height * 0.48);
      centerShade.addColorStop(0, "rgba(0,0,0,.68)");
      centerShade.addColorStop(0.32, "rgba(0,0,0,.34)");
      centerShade.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = centerShade;
      context.fillRect(0, 0, width, height);

      const cycle = (scanDuration + scanDelay) * 1000;
      const active = scanDuration * 1000;
      const cycleTime = timestamp % cycle;
      if (cycleTime < active && !reducedMotion) {
        const raw = cycleTime / active;
        const phase = raw < 0.5 ? raw * 2 : (1 - raw) * 2;
        const scanZ = far - (far - near) * phase;
        context.save();
        context.globalCompositeOperation = "screen";
        context.fillStyle = scanColor;
        for (let layer = 7; layer >= 0; layer -= 1) {
          const spread = 0.22 + layer * 0.19;
          const outer = rectAt(Math.max(near, scanZ - spread));
          const inner = rectAt(Math.min(far, scanZ + spread));
          context.globalAlpha = scanOpacity * (1 - layer / 8) * 0.34;
          fillQuad([outer[0], outer[1], inner[1], inner[0]]);
          fillQuad([outer[1], outer[2], inner[2], inner[1]]);
          fillQuad([outer[2], outer[3], inner[3], inner[2]]);
          fillQuad([outer[3], outer[0], inner[0], inner[3]]);
        }
        const scanRect = rectAt(scanZ);
        context.globalAlpha = Math.min(0.9, scanOpacity * 2.2);
        context.strokeStyle = scanColor;
        context.lineWidth = 1.4;
        context.shadowColor = scanColor;
        context.shadowBlur = 18;
        strokePath(scanRect, true);
        context.restore();
      }

      const drawTunnel = (color: string, offsetX: number, alpha: number) => {
        context.save();
        context.translate(offsetX, 0);
        context.strokeStyle = color;
        context.lineWidth = lineThickness;
        context.globalAlpha = alpha;

        const columns = Math.max(10, Math.round(width / gridSize));
        for (let index = 0; index <= columns; index += 1) {
          const x = -halfWidth + (index / columns) * halfWidth * 2;
          strokePath([project(x, -halfHeight, near), project(x, -halfHeight, far)]);
          strokePath([project(x, halfHeight, near), project(x, halfHeight, far)]);
        }

        const rows = Math.max(7, Math.round(height / gridSize));
        for (let index = 0; index <= rows; index += 1) {
          const y = -halfHeight + (index / rows) * halfHeight * 2;
          strokePath([project(-halfWidth, y, near), project(-halfWidth, y, far)]);
          strokePath([project(halfWidth, y, near), project(halfWidth, y, far)]);
        }

        const depthLines = 24;
        for (let index = 0; index <= depthLines; index += 1) {
          const phase = index / depthLines;
          const z = near * Math.pow(far / near, phase);
          context.globalAlpha = alpha * (0.45 + phase * 0.55);
          strokePath(rectAt(z), true);
        }
        context.restore();
      };

      drawTunnel("#132bff", 1.1, 0.2);
      drawTunnel("#00ff78", -1.1, 0.18);
      drawTunnel(linesColor, 0, 0.62);

      frame = reducedMotion ? 0 : requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, [gridSize, lineThickness, linesColor, scanColor, scanDelay, scanDuration, scanOpacity, sensitivity]);

  return (
    <div ref={containerRef} className={`gridscan ${className}`.trim()} style={style} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
