import {
  ScalarBehaviorConfig,
  ScalarDynamicBehaviorConfig,
  ScalarStaticBehaviorConfig,
} from './ScalarBehaviorConfig.types';

export function isScalarDynamicBehavior(config: ScalarBehaviorConfig): config is ScalarDynamicBehaviorConfig {
  return 'start' in config && 'end' in config;
}

export function isScalarStaticBehavior(config: ScalarBehaviorConfig): config is ScalarStaticBehaviorConfig {
  return 'value' in config;
}
