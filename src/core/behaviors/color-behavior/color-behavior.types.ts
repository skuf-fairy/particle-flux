import {ScriptBehaviorConfig, ScriptBehavior} from '../../base-behaviors/script-behavior/ScriptBehavior.types';
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

export interface ColorDynamicBehavior {
  startColor: string;
  endColor: string;
  easing: EasingFunction | null;
  type: ColorBehaviorType.Dynamic;
}

export enum ColorBehaviorType {
  Dynamic = 'Dynamic',
}

export type AnyColorBehavior = ColorDynamicBehavior | ScriptBehavior<string>;
