import {Multiplicator} from '../../types';
import {EasingName} from '../../utils/easing/easing.types';

interface ScalarBaseBehaviorConfig {
  easing?: EasingName;
  mult?: Multiplicator;
}

export interface ScalarDynamicBehaviorConfig extends ScalarBaseBehaviorConfig {
  start: number;
  end: number;
}

export interface ScalarStaticBehaviorConfig extends ScalarBaseBehaviorConfig {
  value: number;
}

export type ScalarBehaviorConfig = ScalarDynamicBehaviorConfig | ScalarStaticBehaviorConfig;
