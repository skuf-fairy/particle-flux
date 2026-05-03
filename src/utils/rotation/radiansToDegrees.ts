import {normalizeDegrees} from './normalizeDegrees';

export function radiansToDegrees(angleInRad: number): number {
  return normalizeDegrees(angleInRad * (180 / Math.PI)); // [0...360]
}
