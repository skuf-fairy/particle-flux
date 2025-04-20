import {
  AnyColorBehavior,
  ColorBehaviorConfig,
  ColorBehaviorType,
  ColorDynamicBehavior,
  ColorDynamicBehaviorConfig,
  ColorStaticBehaviorConfig,
} from './color-behavior.types';
import {ColorScriptBehavior} from './color-script-behavior/color-script-behavior.types';

export function isColorStaticBehaviorConfig(config: ColorBehaviorConfig): config is ColorStaticBehaviorConfig {
  return 'value' in config;
}

export function isColorDynamicBehaviorConfig(config: ColorBehaviorConfig): config is ColorDynamicBehaviorConfig {
  return 'start' in config && 'end' in config;
}

export function isColorDynamicBehavior(behavior: AnyColorBehavior): behavior is ColorDynamicBehavior {
  return behavior.type === ColorBehaviorType.Dynamic;
}
