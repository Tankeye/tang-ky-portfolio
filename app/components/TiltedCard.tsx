"use client";

import { PointerEvent, ReactNode, useEffect, useRef } from "react";
import "./TiltedCard.css";

type TiltedCardProps = {
  imageSrc: string;
  altText?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  className?: string;
  overlayContent?: ReactNode;
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  rotateAmplitude = 9,
  scaleOnHover = 1.025,
  className = "",
  overlayContent,
}: TiltedCardProps) {
  const figureRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const motionRef = useRef({ x: 0, y: 0, scale: 1, targetX: 0, targetY: 0, targetScale: 1 });

  const animate = () => {
    const inner = innerRef.current;
    if (!inner) return;
    const motion = motionRef.current;
    motion.x += (motion.targetX - motion.x) * 0.12;
    motion.y += (motion.targetY - motion.y) * 0.12;
    motion.scale += (motion.targetScale - motion.scale) * 0.1;
    inner.style.transform = `rotateX(${motion.x}deg) rotateY(${motion.y}deg) scale3d(${motion.scale}, ${motion.scale}, 1)`;

    const moving = Math.abs(motion.targetX - motion.x) > 0.01
      || Math.abs(motion.targetY - motion.y) > 0.01
      || Math.abs(motion.targetScale - motion.scale) > 0.001;
    frameRef.current = moving ? requestAnimationFrame(animate) : 0;
  };

  const requestAnimation = () => {
    if (!frameRef.current) frameRef.current = requestAnimationFrame(animate);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    motionRef.current.targetX = -y * rotateAmplitude * 2;
    motionRef.current.targetY = x * rotateAmplitude * 2;
    requestAnimation();
  };

  const handlePointerEnter = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    motionRef.current.targetScale = scaleOnHover;
    requestAnimation();
  };

  const handlePointerLeave = () => {
    motionRef.current.targetX = 0;
    motionRef.current.targetY = 0;
    motionRef.current.targetScale = 1;
    requestAnimation();
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return (
    <figure
      ref={figureRef}
      className={`tilted-card-figure ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className="tilted-card-inner" ref={innerRef}>
        <img className="tilted-card-img" src={imageSrc} alt={altText} />
        <div className="tilted-card-shade" aria-hidden="true" />
        {overlayContent ? <div className="tilted-card-overlay">{overlayContent}</div> : null}
      </div>
    </figure>
  );
}
