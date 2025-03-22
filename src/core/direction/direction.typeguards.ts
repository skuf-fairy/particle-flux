import {DirectionConfig, DirectionRangeConfig, StaticDirectionConfig} from './direction.types';

export function isStaticDirectionBehaviorConfig(config: DirectionConfig): config is StaticDirectionConfig {
  return 'angle' in config;
}

export function isDirectionRangeBehaviorConfig(config: DirectionConfig): config is DirectionRangeConfig {
  return 'minAngle' in config && 'maxAngle' in config;
}
