import {
  DirectionBehaviorConfig,
  DirectionRangeBehaviorConfig,
  StaticDirectionBehaviorConfig,
} from './DirectionBehavior.types';

export function isStaticDirectionBehaviorConfig(
  config: DirectionBehaviorConfig,
): config is StaticDirectionBehaviorConfig {
  return 'angle' in config;
}

export function isDirectionRangeBehaviorConfig(
  config: DirectionBehaviorConfig,
): config is DirectionRangeBehaviorConfig {
  return 'minAngle' in config && 'maxAngle' in config;
}
