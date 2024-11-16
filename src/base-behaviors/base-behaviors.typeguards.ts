import {ScalarBehaviorConfig} from './ScalarBehavior/ScalarBehaviorConfig.types';
import {ScriptBehaviorConfig} from './ScriptBehavior/ScriptBehavior.types';
import {VectorBehaviorConfig} from './VectorBehavior/VectorBehavior.types';

export type AnyBehaviorConfig = ScalarBehaviorConfig | VectorBehaviorConfig | ScriptBehaviorConfig<any>;

export function isScalarBehaviorConfig(config: AnyBehaviorConfig): config is ScalarBehaviorConfig {
  return ('start' in config && 'end' in config) || 'value' in config;
}

export function isVectorBehaviorConfig(config: AnyBehaviorConfig): config is VectorBehaviorConfig {
  return 'x' in config && 'y' in config;
}

export function isScriptBehaviorConfig(config: AnyBehaviorConfig): config is ScriptBehaviorConfig<any> {
  return 'script' in config;
}
