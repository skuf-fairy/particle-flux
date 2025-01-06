import {ScriptBehaviorConfig} from '../../base-behaviors/ScriptBehavior/ScriptBehavior.types';
import {ColorBehaviorConfig, ColorDynamicBehaviorConfig, ColorStaticBehaviorConfig} from './ColorBehavior.types';

export function isColorStaticBehaviorConfig(config: ColorBehaviorConfig): config is ColorStaticBehaviorConfig {
  return 'value' in config;
}

export function isColorDynamicBehaviorConfig(config: ColorBehaviorConfig): config is ColorDynamicBehaviorConfig {
  return 'start' in config && 'end' in config;
}

export function isColorScriptBehaviorConfig(config: ColorBehaviorConfig): config is ScriptBehaviorConfig<string> {
  return 'script' in config;
}
