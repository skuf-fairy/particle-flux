import {AnyBaseBehaviorConfig} from '../base-behaviors.types';
import {isDeltaBehaviorConfig} from '../delta-behavior/delta-behavior.typeguards';
import {ScalarBehaviorConfig, ScalarDynamicBehaviorConfig, ScalarStaticBehaviorConfig} from './scalar-behavior.types';

export function isScalarDynamicBehavior(config: AnyBaseBehaviorConfig): config is ScalarDynamicBehaviorConfig {
  return 'start' in config && 'end' in config;
}

export function isScalarStaticBehavior(config: AnyBaseBehaviorConfig): config is ScalarStaticBehaviorConfig {
  return 'value' in config;
}

export function isScalarBehaviorConfig(config: AnyBaseBehaviorConfig): config is ScalarBehaviorConfig {
  return !isDeltaBehaviorConfig(config) || ('start' in config && 'end' in config) || 'value' in config;
}
