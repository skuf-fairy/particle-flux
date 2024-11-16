import {Multiplicator} from '../../types';
import {EasingName} from '../../utils/easing/easing.types';

interface ScalarBaseBehaviorConfig {
  easing?: EasingName;
  mult?: Multiplicator;
}

export interface ScalarDynamicBehavior extends ScalarBaseBehaviorConfig {
  start: number;
  end: number;
}

export interface ScalarStaticBehavior extends ScalarBaseBehaviorConfig {
  value: number;
}

export type ScalarBehaviorConfig = ScalarDynamicBehavior | ScalarStaticBehavior;
