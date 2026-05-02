import {
  RangeDirectionConfig,
  SpawnBurstDirectionConfig,
  SpawnParticleDirection,
  StaticDirectionConfig,
} from './direction.types';
import {isStaticDirectionBehaviorConfig} from './direction.typeguards';
import {Vector2Utils} from '../../utils/Vector2Utils';
import {realRandom} from '../../utils/random/Random';

export function getDirection(config: RangeDirectionConfig | StaticDirectionConfig): SpawnParticleDirection {
  const angle = isStaticDirectionBehaviorConfig(config)
    ? config.angle
    : realRandom.randomFloat(config.minAngle, config.maxAngle);

  return {
    vector: Vector2Utils.angleInDegreesToPoint(angle),
    angle,
  };
}

export function getSpawnBurstDirection(config: SpawnBurstDirectionConfig, index: number): SpawnParticleDirection {
  const angle = config.startAngle + index * config.deltaAngle;

  return {
    vector: Vector2Utils.angleInDegreesToPoint(angle),
    angle,
  };
}
