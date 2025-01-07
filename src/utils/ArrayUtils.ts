export class ArrayUtils {
  public static last<T>(array: T[]): T | undefined {
    return array[array.length - 1];
  }

  // генерирует массив упорядоченных чисел от start до stop включительно
  // range(1, 5, 1)) => [1,2,3,4,5]
  public static range(start: number, stop: number, step: number = 1): number[] {
    if (start > stop) {
      return Array.from(
        {length: (start - stop) / Math.abs(step) + 1},
        (value, index) => start - index * Math.abs(step),
      );
    }

    return Array.from({length: (stop - start) / Math.abs(step) + 1}, (value, index) => start + index * Math.abs(step));
  }
}
