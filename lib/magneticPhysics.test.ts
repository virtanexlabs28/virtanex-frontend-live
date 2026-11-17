import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateVirtualPointer,
  computeMagneticTarget,
  lerp,
  computeCenterFromOffsets,
} from './magneticPhysics';

test('virtual pointer path stays within expected container bounds', () => {
  const w = 800;
  const h = 200;
  // Test over multiple sample points across time
  for (let t = 0; t < 20; t += 0.5) {
    const pt = calculateVirtualPointer(t, w, h);
    // x multiplier is 0.5 + 0.42 * sin(...) -> between 0.08 and 0.92 of w
    assert.ok(pt.x >= w * 0.07 && pt.x <= w * 0.93, `x: ${pt.x} outside bounds`);
    // y multiplier is 0.5 + 0.22 * sin(...) -> between 0.28 and 0.72 of h
    assert.ok(pt.y >= h * 0.27 && pt.y <= h * 0.73, `y: ${pt.y} outside bounds`);
  }
});

test('magnetic pull is zero when pointer is beyond 140px radius', () => {
  const center = { x: 100, y: 100 };
  const distantPointer = { x: 300, y: 300 }; // distance = ~282px > 140px
  const result = computeMagneticTarget(center, distantPointer, 140, 18);
  assert.equal(result.targetX, 0);
  assert.equal(result.targetY, 0);
  assert.ok(result.distance > 140);
});

test('magnetic pull moves toward pointer with magnitude clamped to 18px', () => {
  const center = { x: 100, y: 100 };
  // Pointer is 70px to the right: distance = 70px (< 140px)
  // magnitude should be ((140 - 70) / 140) * 18 = 9px
  const pointerRight = { x: 170, y: 100 };
  const resRight = computeMagneticTarget(center, pointerRight, 140, 18);
  assert.equal(resRight.distance, 70);
  assert.ok(Math.abs(resRight.targetX - 9) < 0.001);
  assert.equal(resRight.targetY, 0);

  // Pointer very close (10px away)
  // magnitude should be ((140 - 10) / 140) * 18 = 16.714px <= 18px
  const pointerClose = { x: 100, y: 110 };
  const resClose = computeMagneticTarget(center, pointerClose, 140, 18);
  assert.ok(Math.abs(resClose.targetY - 16.714) < 0.01);
  assert.equal(resClose.targetX, 0);
  assert.ok(resClose.targetY <= 18);
});

test('lerp smoothly steps towards target with factor 0.12', () => {
  const current = 0;
  const target = 10;
  const step1 = lerp(current, target, 0.12);
  assert.equal(step1, 1.2);
  const step2 = lerp(step1, target, 0.12);
  assert.ok(step2 > step1 && step2 < target);
});

test('computeCenterFromOffsets correctly calculates center relative to container', () => {
  const center = computeCenterFromOffsets(100, 50, 40, 60);
  assert.equal(center.x, 125);
  assert.equal(center.y, 70);
});
