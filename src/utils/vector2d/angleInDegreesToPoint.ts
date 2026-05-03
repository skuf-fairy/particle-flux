import {Point2d} from '../../types';
import {degreesToRadians} from '../rotation/degreesToRadians';
import {angleInRadToPoint} from './angleInRadToPoint';

export function angleInDegreesToPoint(angleInDegrees: number): Point2d {
  return angleInRadToPoint(degreesToRadians(angleInDegrees));
}
