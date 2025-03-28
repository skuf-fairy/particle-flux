import {AnyBehaviorConfig} from '../base-behaviors.types';
import {isDeltaBehaviorConfig} from '../delta-behavior/DeltaBehavior.typeguards';
import {ScalarBehaviorConfig, ScalarDynamicBehaviorConfig, ScalarStaticBehaviorConfig} from './ScalarBehavior.types';

export function isScalarDynamicBehavior(config: AnyBehaviorConfig): config is ScalarDynamicBehaviorConfig {
  return 'start' in config && 'end' in config;
}

export function isScalarStaticBehavior(config: AnyBehaviorConfig): config is ScalarStaticBehaviorConfig {
  return 'value' in config;
}

export function isScalarBehaviorConfig(config: AnyBehaviorConfig): config is ScalarBehaviorConfig {
  return !isDeltaBehaviorConfig(config) || ('start' in config && 'end' in config) || 'value' in config;
}
