export function roundWith2Precision(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
