import {EasingFunction} from '../../../utils/easing/easing.types';
import {ScalarBehaviorConfig} from '../scalar-behavior/ScalarBehavior.types';
import {Point2d} from '../../../types';
import {BehaviorStateType} from '../base-behaviors.types';

export interface VectorBehaviorConfig {
  x: ScalarBehaviorConfig;
  y: ScalarBehaviorConfig;
}

export interface VectorBehaviorState {
  startValue: Point2d;
  endValue: Point2d;
  easingX: EasingFunction;
  easingY: EasingFunction;
  value: Point2d;
  type: BehaviorStateType.Vector;
}
