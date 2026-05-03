import {normalizeDegrees} from './normalizeDegrees';

export function degreesToRadians(angleInDegrees: number): number {
  return (normalizeDegrees(angleInDegrees) * Math.PI) / 180;
}
