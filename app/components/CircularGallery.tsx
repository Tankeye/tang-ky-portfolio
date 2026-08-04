"use client";

import { useEffect, useRef } from "react";
import "./CircularGallery.css";

export type CircularGalleryItem = {
  color: string;
  label?: string;
  image?: string;
};

type CircularGalleryProps = {
  items: CircularGalleryItem[];
  bend?: number;
  scrollSpeed?: number;
  scrollEase?: number;
};

export default function CircularGallery({
  items,
  bend = 58,
  scrollSpeed = 1,
  scrollEase = 0.075,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !items.length) return;

    let frame = 0;
    let current = 0;
    let target = 0;
    let pointerStart = 0;
    let scrollStart = 0;
    let dragging = false;
    let lastInteraction = performance.now();

    const render = () => {
      const width = container.clientWidth;
      const compact = width < 680;
      const cardWidth = compact ? 156 : Math.min(236, Math.max(188, width * 0.14));
      const gap = compact ? 18 : 30;
      const step = cardWidth + gap;
      const total = step * items.length;

      if (!dragging && performance.now() - lastInteraction > 850) {
        target += compact ? 0.18 : 0.28;
      }
      current += (target - current) * scrollEase;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const raw = index * step - current;
        const wrapped = ((raw + total / 2) % total + total) % total - total / 2;
        const ratio = Math.min(1, Math.abs(wrapped) / Math.max(1, width / 2));
        const arc = bend * ratio * ratio;
        const signedRatio = wrapped / Math.max(1, width / 2);
        const rotation = signedRatio * 7;
        const perspectiveTilt = signedRatio * -11;
        const surfaceSkew = signedRatio * 1.2;
        const scale = 1 - ratio * 0.025;

        card.style.width = `${cardWidth}px`;
        card.style.transform = `translate3d(${wrapped - cardWidth / 2}px, ${arc}px, 0) perspective(900px) rotateY(${perspectiveTilt}deg) rotateZ(${rotation}deg) skewY(${surfaceSkew}deg) scale(${scale})`;
        card.style.zIndex = String(2 + Math.round((1 - ratio) * 10));
      });

      frame = requestAnimationFrame(render);
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      pointerStart = event.clientX;
      scrollStart = target;
      lastInteraction = performance.now();
      container.setPointerCapture(event.pointerId);
      container.classList.add("is-dragging");
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      target = scrollStart + (pointerStart - event.clientX) * scrollSpeed;
      lastInteraction = performance.now();
    };

    const onPointerUp = (event: PointerEvent) => {
      dragging = false;
      lastInteraction = performance.now();
      container.classList.remove("is-dragging");
      if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
    };

    const onWheel = (event: WheelEvent) => {
      const movement = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      target += movement * 0.45 * scrollSpeed;
      lastInteraction = performance.now();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      target += event.key === "ArrowRight" ? 260 : -260;
      lastInteraction = performance.now();
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: true });
    container.addEventListener("keydown", onKeyDown);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("keydown", onKeyDown);
    };
  }, [bend, items, scrollEase, scrollSpeed]);

  return (
    <div
      className="circular-gallery"
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="作品预览画廊，可拖拽或使用方向键浏览"
    >
      {items.map((item, index) => (
        <div
          className="circular-gallery-card"
          key={`${item.color}-${index}`}
          ref={(element) => { cardRefs.current[index] = element; }}
          style={{ background: item.color }}
          aria-hidden="true"
        >
          {item.image ? <img className="circular-gallery-image" src={item.image} alt="" draggable={false} /> : null}
          {item.label ? <span>{item.label}</span> : null}
        </div>
      ))}
    </div>
  );
}
