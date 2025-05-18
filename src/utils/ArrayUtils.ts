export class ArrayUtils {
  public static last<T>(array: T[]): T | undefined {
    return array[array.length - 1];
  }

  public static first<T>(array: T[]): T | undefined {
    return array[0];
  }

  // generates an array of ordered numbers from start to stop inclusive
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

  public static clone<T>(array: T[]): T[] {
    return array.slice();
  }
}
