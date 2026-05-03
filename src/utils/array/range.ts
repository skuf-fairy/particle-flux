export function range(start: number, stop: number, step: number = 1): number[] {
  if (start > stop) {
    return Array.from({length: (start - stop) / Math.abs(step) + 1}, (value, index) => start - index * Math.abs(step));
  }

  return Array.from({length: (stop - start) / Math.abs(step) + 1}, (value, index) => start + index * Math.abs(step));
}
