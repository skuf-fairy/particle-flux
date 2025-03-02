import {Multiplier} from '../../types';
import {EasingName} from '../../utils/easing/easing.types';

export interface ScalarDynamicBehaviorConfig {
  start: number;
  end: number;
  easing?: EasingName;
  multiplier?: Multiplier;
}

export interface ScalarStaticBehaviorConfig {
  value: number;
}

export type ScalarBehaviorConfig = ScalarDynamicBehaviorConfig | ScalarStaticBehaviorConfig;
