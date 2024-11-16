import {ScriptBehaviorConfig} from '../../base-behaviors/ScriptBehavior/ScriptBehavior.types';
import {EasingName} from '../../utils/easing/easing.types';

export interface ColorDynamicBehaviorConfig {
  start: string;
  end: string;
  easing?: EasingName;
}

export interface ColorStaticBehaviorConfig {
  value: string;
}

export type ColorBehaviorConfig = ColorStaticBehaviorConfig | ColorDynamicBehaviorConfig | ScriptBehaviorConfig<string>;

export function isColorStaticBehaviorConfig(config: ColorBehaviorConfig): config is ColorStaticBehaviorConfig {
  return 'value' in config;
}

export function isColorDynamicBehaviorConfig(config: ColorBehaviorConfig): config is ColorDynamicBehaviorConfig {
  return 'start' in config && 'end' in config;
}

export function isColorScriptBehaviorConfig(config: ColorBehaviorConfig): config is ScriptBehaviorConfig<string> {
  return 'script' in config;
}
