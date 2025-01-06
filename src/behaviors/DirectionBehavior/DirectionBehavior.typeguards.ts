import {DirectionBehaviorConfig, StaticDirectionBehaviorConfig} from './DirectionBehavior.types';

export function isStaticDirectionBehaviorConfig(
  config: DirectionBehaviorConfig,
): config is StaticDirectionBehaviorConfig {
  return 'angle' in config;
}
