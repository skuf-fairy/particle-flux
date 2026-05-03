import {lerp} from '../lerp';
import {hexToRgb} from './hexToRgb';
import {rgbToHex} from './rgbToHex';

export function lerpColor(color1: string, color2: string, progress: number): string {
  // Convert HEX to RGB
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  // Interpolation of each channel
  const r = lerp(rgb1.r, rgb2.r, progress);
  const g = lerp(rgb1.g, rgb2.g, progress);
  const b = lerp(rgb1.b, rgb2.b, progress);

  // Convert it back to HEX
  return rgbToHex(r, g, b);
}
