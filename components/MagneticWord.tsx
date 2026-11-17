'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  calculateVirtualPointer,
  computeMagneticTarget,
  lerp,
  computeCenterFromOffsets,
  Point,
} from '@/lib/magneticPhysics';

interface MagneticWordProps {
  text?: string;
  className?: string;
}

export function MagneticWord({ text = 'Virtanex', className = '' }: MagneticWordProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const outerLetterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const innerLetterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const letters = useMemo(() => text.split(''), [text]);

  const prefersReducedMotion = usePrefersReducedMotion();

  // Animation & physics state in refs (zero React re-renders in RAF loop)
  const letterCentersRef = useRef<Point[]>([]);
  const containerSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const pointerPosRef = useRef<Point | null>(null);
  const lastRealPointerTimeRef = useRef<number>(-9999);
  const currentPositionsRef = useRef<{ x: number; y: number }[]>(
    text.split('').map(() => ({ x: 0, y: 0 }))
  );

  // Recalculate letter centres based on un-transformed outer span offsets
  const updateMeasurements = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const w = container.offsetWidth || 1;
    const h = container.offsetHeight || 1;
    containerSizeRef.current = { w, h };

    const centers: Point[] = [];
    outerLetterRefs.current.forEach((outerEl) => {
      if (outerEl) {
        centers.push(
          computeCenterFromOffsets(
            outerEl.offsetLeft,
            outerEl.offsetWidth,
            outerEl.offsetTop,
            outerEl.offsetHeight
          )
        );
      } else {
        centers.push({ x: 0, y: 0 });
      }
    });
    letterCentersRef.current = centers;
  };

  useEffect(() => {
    updateMeasurements();

    const handleResize = () => {
      updateMeasurements();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [letters.length]);

  useEffect(() => {
    // If reduced motion is preferred, keep letters static and don't start RAF
    if (prefersReducedMotion) {
      innerLetterRefs.current.forEach((el) => {
        if (el) el.style.transform = 'translate3d(0px, 0px, 0)';
      });
      return;
    }

    const startTime = performance.now();

    // Pointer event listeners (window mousemove, touchmove, mouseleave)
    const handlePointerMove = (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      pointerPosRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
      lastRealPointerTimeRef.current = performance.now();
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onMouseLeave = () => {
      pointerPosRef.current = null;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });

    let rafId: number;

    const tick = (now: number) => {
      const elapsedSeconds = (now - startTime) / 1000;
      const timeSinceRealPointer = now - lastRealPointerTimeRef.current;
      const { w, h } = containerSizeRef.current;

      // Active pointer: real pointer if recent (< 1200ms), else virtual pointer
      let activePointer: Point;
      if (pointerPosRef.current && timeSinceRealPointer < 1200) {
        activePointer = pointerPosRef.current;
      } else {
        activePointer = calculateVirtualPointer(elapsedSeconds, w, h);
      }

      const centers = letterCentersRef.current;
      const positions = currentPositionsRef.current;

      for (let i = 0; i < letters.length; i++) {
        const center = centers[i] || { x: 0, y: 0 };
        const { targetX, targetY } = computeMagneticTarget(center, activePointer, 140, 18);

        // Smoothly lerp towards target with 0.12 easing factor
        const curr = positions[i] || { x: 0, y: 0 };
        const nextX = lerp(curr.x, targetX, 0.12);
        const nextY = lerp(curr.y, targetY, 0.12);

        positions[i] = { x: nextX, y: nextY };

        const innerEl = innerLetterRefs.current[i];
        if (innerEl) {
          innerEl.style.transform = `translate3d(${nextX.toFixed(2)}px, ${nextY.toFixed(2)}px, 0)`;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [prefersReducedMotion, letters.length]);

  return (
    <span
      ref={containerRef}
      className={`relative inline-block select-none ${className}`}
      style={{ letterSpacing: '-0.045em', lineHeight: 0.9 }}
    >
      {letters.map((char, i) => {
        const isLast = i === letters.length - 1;
        return (
          <span
            key={i}
            ref={(el) => {
              outerLetterRefs.current[i] = el;
            }}
            className="anim-letter relative inline-block will-change-transform"
            style={{
              animationDelay: `${i * 80}ms`,
            }}
            aria-hidden="true"
          >
            {/* Inner span receives magnetic translation */}
            <span
              ref={(el) => {
                innerLetterRefs.current[i] = el;
              }}
              className="inline-block will-change-transform"
            >
              {char}
            </span>

            {/* Static ° glyph as a superscript positioned relative to final letter */}
            {isLast && (
              <span
                className="absolute top-[0.15em] -right-[0.1em] text-[0.2em] text-[#B87333] select-none pointer-events-none"
                aria-hidden="true"
              >
                °
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
