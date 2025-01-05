import {Point2d} from '../types';

export class Vector2Utils {
  /**
   * Вычисляет дистанцию между двумя точками
   * @param v1
   * @param v2
   * @returns
   */
  public static distance(v1: Point2d, v2: Point2d): number {
    return Math.sqrt(Vector2Utils.squaredDistance(v1, v2));
  }

  /**
   * Вычисляет дистанцию в квадрате между двумя точками
   * @param v1
   * @param v2
   * @returns
   */
  public static squaredDistance(v1: Point2d, v2: Point2d): number {
    return Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2);
  }

  /**
   * Сложение векторов. Возвращает новый вектор
   * @param v1
   * @param v2
   * @returns
   */
  public static add(v1: Point2d, v2: Point2d): Point2d {
    return {
      x: v1.x + v2.x,
      y: v1.y + v2.y,
    };
  }

  /**
   * Вычитание векторов. Возвращает новый вектор
   * @param v1
   * @param v2
   * @returns
   */
  public static subtract(v1: Point2d, v2: Point2d): Point2d {
    return {
      x: v1.x - v2.x,
      y: v1.y - v2.y,
    };
  }

  /**
   * Возвращает вектор с направлением, который совпадает с переданным углом
   * @param angleInRad угол в радианах
   * @returns вектор, направление которого совпадает с переданным углом
   */
  public static fromAngle(angleInRad: number): Point2d {
    return {
      x: Math.cos(angleInRad),
      y: Math.sin(angleInRad),
    };
  }

  /**
   * Вычисляет угол между двумя векторами
   * @param v1 вектор А
   * @param v2 Вектор Б
   * @returns угол между векторами А и Б
   */
  public static getAngleBetweenVectors(v1: Point2d, v2: Point2d): number {
    return Math.atan2(v2.y - v1.y, v2.x - v1.x);
  }

  // поворот системы координат
  public static rotate(v: Point2d, angle: number): Point2d {
    const s = Math.sin(angle);
    const c = Math.cos(angle);

    return {
      x: v.x * c - v.y * s,
      y: v.x * s + v.y * c,
    };
  }
}
