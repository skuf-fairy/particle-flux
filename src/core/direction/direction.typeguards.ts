import {
  DirectionConfig,
  RangeDirectionConfig,
  SpawnBurstDirectionConfig,
  StaticDirectionConfig,
} from './direction.types';

export function isStaticDirectionBehaviorConfig(config: DirectionConfig): config is StaticDirectionConfig {
  return 'angle' in config;
}

export function isDirectionRangeBehaviorConfig(config: DirectionConfig): config is RangeDirectionConfig {
  return 'minAngle' in config && 'maxAngle' in config;
}

export function isSpawnBurstDirectionBehaviorConfig(config: DirectionConfig): config is SpawnBurstDirectionConfig {
  return 'start' in config && 'spacing' in config;
}
