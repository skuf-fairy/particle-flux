import {Multiplier} from '../../types';
import {EasingName} from '../../utils/easing/easing.types';

interface ScalarBaseBehaviorConfig {
  easing?: EasingName;
  mult?: Multiplier;
}

export interface ScalarDynamicBehaviorConfig extends ScalarBaseBehaviorConfig {
  start: number;
  end: number;
}

export interface ScalarStaticBehaviorConfig extends ScalarBaseBehaviorConfig {
  value: number;
}

export type ScalarBehaviorConfig = ScalarDynamicBehaviorConfig | ScalarStaticBehaviorConfig;
