import {
  RangeDirectionConfig,
  StaticDirectionConfig,
  SpawnBurstDirectionConfig,
  SpawnParticleDirection,
} from './direction.types';
import {realRandom} from '../../utils/random/RealRandom';
import {isStaticDirectionBehaviorConfig} from './direction.typeguards';
import {Vector2Utils} from '../../utils/Vector2Utils';

export function getDirection(config: RangeDirectionConfig | StaticDirectionConfig): SpawnParticleDirection {
  const angle = isStaticDirectionBehaviorConfig(config)
    ? config.angle
    : realRandom.generateFloatNumber(config.minAngle, config.maxAngle);

  return {
    vector: Vector2Utils.angleInDegreesToPoint(angle),
    angle,
  };
}

export function getSpawnBurstDirection(config: SpawnBurstDirectionConfig, index: number): SpawnParticleDirection {
  const angle = config.start + index * config.spacing;

  return {
    vector: Vector2Utils.angleInDegreesToPoint(angle),
    angle,
  };
}
