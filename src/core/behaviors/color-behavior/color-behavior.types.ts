import {EasingFunction, EasingName} from '../../../utils/easing/easing.types';
import {ColorScriptBehavior, ColorScriptBehaviorConfig} from './color-script-behavior/color-script-behavior.types';

export interface ColorTransitionBehaviorConfig {
  start: string;
  end: string;
  easing?: EasingName;
}

export interface ColorStaticBehaviorConfig {
  value: string;
}

export type ColorBehaviorConfig = ColorStaticBehaviorConfig | ColorTransitionBehaviorConfig | ColorScriptBehaviorConfig;

export interface ColorTransitionBehavior {
  startColor: string;
  endColor: string;
  easing: EasingFunction | null;
  type: ColorBehaviorType.Transition;
}

export enum ColorBehaviorType {
  Transition = 'Transition',
}

export type AnyColorBehavior = ColorTransitionBehavior | ColorScriptBehavior;
