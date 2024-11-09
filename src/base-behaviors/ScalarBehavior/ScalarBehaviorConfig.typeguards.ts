import {ScalarBehaviorConfig, ScalarDynamicBehavior, ScalarStaticBehavior} from './ScalarBehaviorConfig.types';

export function isScalarDynamicBehavior(config: ScalarBehaviorConfig): config is ScalarDynamicBehavior {
  return 'start' in config && 'end' in config;
}

export function isScalarStaticBehavior(config: ScalarBehaviorConfig): config is ScalarStaticBehavior {
  return 'value' in config;
}
