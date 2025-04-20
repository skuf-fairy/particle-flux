import {EasingFunction, EasingName} from '../../../utils/easing/easing.types';
import {ColorScriptBehavior, ColorScriptBehaviorConfig} from './color-script-behavior/color-script-behavior.types';

export interface ColorDynamicBehaviorConfig {
  start: string;
  end: string;
  easing?: EasingName;
}

export interface ColorStaticBehaviorConfig {
  value: string;
}

export type ColorBehaviorConfig = ColorStaticBehaviorConfig | ColorDynamicBehaviorConfig | ColorScriptBehaviorConfig;

export interface ColorDynamicBehavior {
  startColor: string;
  endColor: string;
  easing: EasingFunction | null;
  type: ColorBehaviorType.Dynamic;
}

export enum ColorBehaviorType {
  Dynamic = 'Dynamic',
}

export type AnyColorBehavior = ColorDynamicBehavior | ColorScriptBehavior;
