export function lerp(v1: number, v2: number, progress: number): number {
  return (1 - progress) * v1 + progress * v2;
}
