import {DirectionConfig} from './direction.types';
import {NumberUtils} from '../../utils/NumberUtils';
import {realRandom} from '../../utils/random/RealRandom';
import {Point2d} from '../../types';
import {isStaticDirectionBehaviorConfig} from './direction.typeguards';
import {Vector2Utils} from '../../utils/Vector2Utils';

export function getDirection(config: DirectionConfig): Point2d {
  const angle = isStaticDirectionBehaviorConfig(config)
    ? config.angle
    : realRandom.generateFloatNumber(config.minAngle, config.maxAngle);

  return Vector2Utils.angleToPoint(NumberUtils.degreesToRadians(angle));
}
