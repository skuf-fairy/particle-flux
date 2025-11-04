import {
  AnyColorBehavior,
  ColorBehaviorConfig,
  ColorBehaviorType,
  ColorTransitionBehavior,
  ColorTransitionBehaviorConfig,
  ColorStaticBehaviorConfig,
} from './color-behavior.types';

export function isColorStaticBehaviorConfig(config: ColorBehaviorConfig): config is ColorStaticBehaviorConfig {
  return 'value' in config;
}

export function isColorTransitionBehaviorConfig(config: ColorBehaviorConfig): config is ColorTransitionBehaviorConfig {
  return 'start' in config && 'end' in config;
}

export function isColorTransitionBehavior(behavior: AnyColorBehavior): behavior is ColorTransitionBehavior {
  return behavior.type === ColorBehaviorType.Transition;
}
