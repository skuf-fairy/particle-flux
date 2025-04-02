import {ScriptBehaviorConfig, ScriptBehaviorState} from '../../base-behaviors/script-behavior/ScriptBehavior.types';
import {EasingFunction, EasingName} from '../../../utils/easing/easing.types';

export interface ColorDynamicBehaviorConfig {
  start: string;
  end: string;
  easing?: EasingName;
}

export interface ColorStaticBehaviorConfig {
  value: string;
}

export type ColorBehaviorConfig = ColorStaticBehaviorConfig | ColorDynamicBehaviorConfig | ScriptBehaviorConfig<string>;

export interface ColorDynamicBehaviorState {
  startColor: string;
  endColor: string;
  easing: EasingFunction;
  type: ColorBehaviorStateType.Dynamic;
}

export enum ColorBehaviorStateType {
  Dynamic = 'Dynamic',
}

export type AnyColorBehaviorState = ColorDynamicBehaviorState | ScriptBehaviorState<string>;
