import {Multiplier} from '../../../types';
import {EasingFunction, EasingName} from '../../../utils/easing/easing.types';
import {BaseBehaviorType} from '../base-behaviors.types';

export interface ScalarDynamicBehaviorConfig {
  start: number;
  end: number;
  easing?: EasingName;
  multiplier?: Multiplier;
}

export interface ScalarStaticBehaviorConfig {
  value: number;
  multiplier?: Multiplier;
}

export type ScalarBehaviorConfig = ScalarDynamicBehaviorConfig | ScalarStaticBehaviorConfig;

export interface ScalarBehavior {
  startValue: number;
  endValue: number;
  easing: EasingFunction | null;
  type: BaseBehaviorType.Scalar;
}
