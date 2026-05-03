import {Point2d} from '../../types';

export function pointToAngleInDegrees(point: Point2d): number {
  const angleInRad = Math.atan2(point.y, point.x);
  let angleInDeg = angleInRad * (180 / Math.PI);

  // Приводим к диапазону [0, 360)
  if (angleInDeg < 0) {
    angleInDeg += 360;
  }

  return angleInDeg;
}
