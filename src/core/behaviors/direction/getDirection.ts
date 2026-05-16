import {
  RangeDirectionConfig,
  SpawnBurstDirectionConfig,
  SpawnParticleDirection,
  StaticDirectionConfig,
} from './direction.types';
import {isStaticDirectionBehaviorConfig} from './direction.typeguards';
import {realRandom} from '../../../utils/random/Random';
import {angleInDegreesToPoint} from '../../../utils/vector2d/angleInDegreesToPoint';

export function getDirection(config: RangeDirectionConfig | StaticDirectionConfig): SpawnParticleDirection {
  const angle = isStaticDirectionBehaviorConfig(config)
    ? config.angle
    : realRandom.randomFloat(config.minAngle, config.maxAngle);

  return {
    vector: angleInDegreesToPoint(angle),
    angle,
  };
}

export function getSpawnBurstDirection(config: SpawnBurstDirectionConfig, index: number): SpawnParticleDirection {
  const angle = config.startAngle + index * config.deltaAngle;

  return {
    vector: angleInDegreesToPoint(angle),
    angle,
  };
}
