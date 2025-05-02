import {AnyBaseBehaviorConfig} from '../base-behaviors.types';
import {
  ScalarTransitionBehaviorConfig,
  ScalarStaticBehaviorConfig,
  ScalarBehaviorConfig,
} from './scalar-behavior.types';

export function isScalarTransitionBehaviorConfig(
  config: AnyBaseBehaviorConfig,
): config is ScalarTransitionBehaviorConfig {
  return 'start' in config && 'end' in config;
}

export function isScalarStaticBehaviorConfig(config: AnyBaseBehaviorConfig): config is ScalarStaticBehaviorConfig {
  return 'value' in config && !('script' in config) && !('delta' in config);
}

export function isScalarBehaviorConfig(config: AnyBaseBehaviorConfig): config is ScalarBehaviorConfig {
  return isScalarTransitionBehaviorConfig(config) || isScalarStaticBehaviorConfig(config);
}
