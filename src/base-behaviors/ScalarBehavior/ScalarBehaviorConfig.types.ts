import {EasingName} from '../../utils/easing/easing.types';
import {Multiplicator} from '../base-behaviors.typeguards';

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
