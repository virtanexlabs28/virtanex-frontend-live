/**
 * Magnetic headline letters physics and virtual pointer calculations.
 * Pure mathematical functions decoupled from DOM/React for deterministic testing.
 */

export interface Point {
  x: number;
  y: number;
}

export interface LetterCenter {
  x: number;
  y: number;
}

/**
 * Calculates the virtual pointer position when idle or on initial load.
 * Path:
 * x = w * (0.5 + 0.42 * sin(t * 0.7))
 * y = h * (0.5 + 0.22 * sin(t * 1.3))
 * where t is seconds since load, w and h are container size.
 */
export function calculateVirtualPointer(t: number, width: number, height: number): Point {
  const safeW = Math.max(width, 1);
  const safeH = Math.max(height, 1);
  const x = safeW * (0.5 + 0.42 * Math.sin(t * 0.7));
  const y = safeH * (0.5 + 0.22 * Math.sin(t * 1.3));
  return { x, y };
}

/**
 * Computes magnetic pull translation for a letter center toward active pointer.
 * If distance < 140px, target translation is toward the pointer with magnitude
 * ((140 - distance) / 140) * 18px, clamped to 18px.
 * Otherwise target is (0, 0).
 */
export function computeMagneticTarget(
  letterCenter: Point,
  pointer: Point,
  maxRadius: number = 140,
  maxTranslation: number = 18
): { targetX: number; targetY: number; distance: number } {
  const dx = pointer.x - letterCenter.x;
  const dy = pointer.y - letterCenter.y;
  const distance = Math.hypot(dx, dy);

  if (distance >= maxRadius || distance === 0) {
    return { targetX: 0, targetY: 0, distance };
  }

  const rawPull = ((maxRadius - distance) / maxRadius) * maxTranslation;
  const magnitude = Math.min(Math.max(rawPull, 0), maxTranslation);

  const targetX = (dx / distance) * magnitude;
  const targetY = (dy / distance) * magnitude;

  return { targetX, targetY, distance };
}

/**
 * Linear interpolation easing helper.
 */
export function lerp(current: number, target: number, factor: number = 0.12): number {
  return current + (target - current) * factor;
}

/**
 * Computes letter center coordinates relative to wordmark container.
 * Uses offsetLeft + offsetWidth / 2 and offsetTop + offsetHeight / 2.
 */
export function computeCenterFromOffsets(
  offsetLeft: number,
  offsetWidth: number,
  offsetTop: number,
  offsetHeight: number
): Point {
  return {
    x: offsetLeft + offsetWidth / 2,
    y: offsetTop + offsetHeight / 2,
  };
}
