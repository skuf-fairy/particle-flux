import {Point2d} from '../../types';

export function rotate(v: Point2d, angle: number): Point2d {
  const s = Math.sin(angle);
  const c = Math.cos(angle);

  return {
    x: v.x * c - v.y * s,
    y: v.x * s + v.y * c,
  };
}
