import {
  ScalarBehaviorConfig,
  ScalarDeltaBehaviorConfig,
  ScalarDynamicBehaviorConfig,
  ScalarStaticBehaviorConfig,
} from './ScalarBehaviorConfig.types';

export function isScalarDynamicBehavior(config: ScalarBehaviorConfig): config is ScalarDynamicBehaviorConfig {
  return 'start' in config && 'end' in config;
}

export function isScalarStaticBehavior(config: ScalarBehaviorConfig): config is ScalarStaticBehaviorConfig {
  return 'value' in config;
}

export function isScalarDeltaBehaviorConfig(config: ScalarBehaviorConfig): config is ScalarDeltaBehaviorConfig {
  return 'delta' in config;
}
