"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import "./CircularGallery.css";

export type CircularGalleryItem = {
  color: string;
  label?: string;
  image?: string;
  title?: string;
  targetId?: string;
};

type CircularGalleryProps = {
  items: CircularGalleryItem[];
  bend?: number;
  scrollSpeed?: number;
  scrollEase?: number;
};

type CardTiltMotion = {
  x: number;
  y: number;
  scale: number;
  targetX: number;
  targetY: number;
  targetScale: number;
};

const createCardTiltMotion = (): CardTiltMotion => ({
  x: 0,
  y: 0,
  scale: 1,
  targetX: 0,
  targetY: 0,
  targetScale: 1,
});

export default function CircularGallery({
  items,
  bend = 58,
  scrollSpeed = 1,
  scrollEase = 0.075,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const tiltRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tiltMotionRef = useRef<Array<CardTiltMotion>>([]);
  const dragSuppressedClickRef = useRef(false);

  const getTiltMotion = (index: number) => {
    if (!tiltMotionRef.current[index]) tiltMotionRef.current[index] = createCardTiltMotion();
    return tiltMotionRef.current[index];
  };

  const resetTilt = (index: number) => {
    const motion = getTiltMotion(index);
    motion.targetX = 0;
    motion.targetY = 0;
    motion.targetScale = 1;
  };

  const handleTiltMove = (index: number, event: ReactPointerEvent<HTMLDivElement>) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDragging = containerRef.current?.classList.contains("is-dragging");
    if (event.pointerType === "touch" || reduceMotion || isDragging) {
      resetTilt(index);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - rect.left) / rect.width - 0.5;
    const vertical = (event.clientY - rect.top) / rect.height - 0.5;
    const motion = getTiltMotion(index);
    motion.targetX = vertical * -14;
    motion.targetY = horizontal * 14;
    motion.targetScale = 1.025;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !items.length) return;

    let frame = 0;
    let current = 0;
    let target = 0;
    let pointerStart = 0;
    let scrollStart = 0;
    let dragging = false;
    let pressedTargetId: string | null = null;
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

        const tilt = tiltRefs.current[index];
        if (tilt) {
          const motion = getTiltMotion(index);
          motion.x += (motion.targetX - motion.x) * 0.12;
          motion.y += (motion.targetY - motion.y) * 0.12;
          motion.scale += (motion.targetScale - motion.scale) * 0.1;
          tilt.style.transform = `rotateX(${motion.x}deg) rotateY(${motion.y}deg) scale3d(${motion.scale}, ${motion.scale}, ${motion.scale})`;
        }
      });

      frame = requestAnimationFrame(render);
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      tiltMotionRef.current.forEach((_, index) => resetTilt(index));
      dragSuppressedClickRef.current = false;
      pointerStart = event.clientX;
      scrollStart = target;
      pressedTargetId = (event.target as HTMLElement).closest<HTMLElement>("[data-gallery-target]")?.dataset.galleryTarget ?? null;
      lastInteraction = performance.now();
      container.setPointerCapture(event.pointerId);
      container.classList.add("is-dragging");
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      if (Math.abs(pointerStart - event.clientX) > 6) dragSuppressedClickRef.current = true;
      target = scrollStart + (pointerStart - event.clientX) * scrollSpeed;
      lastInteraction = performance.now();
    };

    const onPointerUp = (event: PointerEvent) => {
      const shouldJump = event.type === "pointerup" && !dragSuppressedClickRef.current && pressedTargetId;
      dragging = false;
      lastInteraction = performance.now();
      container.classList.remove("is-dragging");
      if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);

      if (shouldJump) {
        const destination = document.getElementById(shouldJump);
        if (destination) {
          const hash = `#${shouldJump}`;
          if (window.location.hash !== hash) window.history.pushState(null, "", hash);
          destination.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      pressedTargetId = null;
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
      {items.map((item, index) => {
        const content = (
          <div
            className="circular-gallery-card-tilt"
            ref={(element) => { tiltRefs.current[index] = element; }}
            onPointerEnter={(event) => handleTiltMove(index, event)}
            onPointerMove={(event) => handleTiltMove(index, event)}
            onPointerLeave={() => resetTilt(index)}
            onPointerCancel={() => resetTilt(index)}
          >
            {item.image ? <img className="circular-gallery-image" src={item.image} alt="" draggable={false} /> : null}
            {item.label ? <span>{item.label}</span> : null}
          </div>
        );

        return item.targetId ? (
          <a
            className="circular-gallery-card is-linked"
            href={`#${item.targetId}`}
            key={`${item.color}-${index}`}
            ref={(element) => { cardRefs.current[index] = element; }}
            style={{ background: item.color }}
            data-gallery-target={item.targetId}
            aria-label={`跳转到${item.title ?? "对应项目"}`}
            onClick={(event) => {
              if (dragSuppressedClickRef.current) event.preventDefault();
            }}
          >
            {content}
          </a>
        ) : (
          <div
            className="circular-gallery-card"
            key={`${item.color}-${index}`}
            ref={(element) => { cardRefs.current[index] = element; }}
            style={{ background: item.color }}
            aria-hidden="true"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
