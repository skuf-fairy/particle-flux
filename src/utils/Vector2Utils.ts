import {Point2d} from '../types';
import {NumberUtils} from './NumberUtils';

export class Vector2Utils {
  public static distance(v1: Point2d, v2: Point2d): number {
    return Math.sqrt(Vector2Utils.squaredDistance(v1, v2));
  }

  public static squaredDistance(v1: Point2d, v2: Point2d): number {
    return Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2);
  }

  public static add(v1: Point2d, v2: Point2d): Point2d {
    return {
      x: v1.x + v2.x,
      y: v1.y + v2.y,
    };
  }

  public static subtract(v1: Point2d, v2: Point2d): Point2d {
    return {
      x: v1.x - v2.x,
      y: v1.y - v2.y,
    };
  }

  public static angleInDegreesToPoint(angleInDegrees: number): Point2d {
    return Vector2Utils.angleInRadToPoint(NumberUtils.degreesToRadians(angleInDegrees));
  }

  // Returns a vector with a direction that matches the passed angle.
  public static angleInRadToPoint(angleInRad: number): Point2d {
    return {
      x: Math.cos(angleInRad),
      y: Math.sin(angleInRad),
    };
  }

  // rotation of the coordinate system
  public static rotate(v: Point2d, angle: number): Point2d {
    const s = Math.sin(angle);
    const c = Math.cos(angle);

    return {
      x: v.x * c - v.y * s,
      y: v.x * s + v.y * c,
    };
  }

  public static pointToAngleInDegrees(point: Point2d): number {
    const angleInRad = Math.atan2(point.y, point.x);
    let angleInDeg = angleInRad * (180 / Math.PI);

    // Приводим к диапазону [0, 360)
    if (angleInDeg < 0) {
      angleInDeg += 360;
    }

    return angleInDeg;
  }
}
