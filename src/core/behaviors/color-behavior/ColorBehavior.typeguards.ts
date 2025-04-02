import {ScriptBehaviorConfig} from '../../base-behaviors/script-behavior/ScriptBehavior.types';
import {
  AnyColorBehaviorState,
  ColorBehaviorConfig,
  ColorBehaviorStateType,
  ColorDynamicBehaviorConfig,
  ColorDynamicBehaviorState,
  ColorStaticBehaviorConfig,
} from './ColorBehavior.types';

export function isColorStaticBehaviorConfig(config: ColorBehaviorConfig): config is ColorStaticBehaviorConfig {
  return 'value' in config;
}

export function isColorDynamicBehaviorConfig(config: ColorBehaviorConfig): config is ColorDynamicBehaviorConfig {
  return 'start' in config && 'end' in config;
}

export function isColorScriptBehaviorConfig(config: ColorBehaviorConfig): config is ScriptBehaviorConfig<string> {
  return 'script' in config;
}

export function isColorDynamicBehaviorState(state: AnyColorBehaviorState): state is ColorDynamicBehaviorState {
  return state.type === ColorBehaviorStateType.Dynamic;
}
