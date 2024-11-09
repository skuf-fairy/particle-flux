import {IntRange} from '../types.utils';

export class NumberUtils {
  public static clamp<Min extends number, Max extends number>(
    min: number,
    max: number,
    value: number,
  ): IntRange<Min, Max> {
    return Math.min(Math.max(value, min), max) as IntRange<Min, Max>;
  }

  public static inRange(min: number, max: number, value: number): boolean {
    return value >= min && value <= max;
  }

  public static calcPercentage(value: number, max: number): number {
    return NumberUtils.clamp(0, 100, (value / Math.max(max, 1)) * 100);
  }

  public static lerp(v1: number, v2: number, progress: number): number {
    return (1 - progress) * v1 + progress * v2;
  }

  public static hexToRgb(hexColor: string) {
    // Удаляем символ '#' если он есть
    const hex = hexColor.replace(/^#/, '');
    // Преобразуем HEX в RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return {r, g, b};
  }

  public static rgbToHex(r: number, g: number, b: number) {
    return '#' + (((1 << 24) + (r << 16) + (g << 8) + b) >> 0).toString(16).slice(1).toUpperCase();
  }

  public static lerpColor(color1: string, color2: string, progress: number): string {
    // Преобразуем HEX в RGB
    const rgb1 = NumberUtils.hexToRgb(color1);
    const rgb2 = NumberUtils.hexToRgb(color2);
    // Интерполируем каждый канал
    const r = NumberUtils.lerp(rgb1.r, rgb2.r, progress);
    const g = NumberUtils.lerp(rgb1.g, rgb2.g, progress);
    const b = NumberUtils.lerp(rgb1.b, rgb2.b, progress);

    // Преобразуем обратно в HEX
    return NumberUtils.rgbToHex(r, g, b);
  }

  public static degreesToRadians(angleInDegrees: number): number {
    return (angleInDegrees * Math.PI) / 180;
  }

  // обрезает число до 2 числе после запятой
  public static roundWith2Precision(n: number): number {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

  public static getDecimalPart(n: number): number {
    if (Number.isInteger(n)) {
      return 0;
    }

    const decimalStr = n.toString().split('.')[1];
    return Number(decimalStr);
  }
}
