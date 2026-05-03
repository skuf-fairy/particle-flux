export function getOrderedMinMax(a: number, b: number): [number, number] {
  return a > b ? [b, a] : [a, b];
}
