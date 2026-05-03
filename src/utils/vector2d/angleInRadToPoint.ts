import {Point2d} from '../../types';

export function angleInRadToPoint(angleInRad: number): Point2d {
  return {
    x: Math.cos(angleInRad),
    y: Math.sin(angleInRad),
  };
}
