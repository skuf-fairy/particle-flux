import {AnyBaseBehaviorConfig} from '../base-behaviors.types';
import {ScalarBehaviorConfig, ScalarDynamicBehaviorConfig, ScalarStaticBehaviorConfig} from './scalar-behavior.types';

export function isScalarDynamicBehaviorConfig(config: AnyBaseBehaviorConfig): config is ScalarDynamicBehaviorConfig {
  return 'start' in config && 'end' in config;
}

export function isScalarStaticBehaviorConfig(config: AnyBaseBehaviorConfig): config is ScalarStaticBehaviorConfig {
  return 'value' in config && !('script' in config) && !('delta' in config);
}

export function isScalarBehaviorConfig(config: AnyBaseBehaviorConfig): config is ScalarBehaviorConfig {
  return 'start' in config && 'end' in config;
}
