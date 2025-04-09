import {EasingFunction} from '../../../utils/easing/easing.types';
import {ScalarBehaviorConfig} from '../scalar-behavior/scalar-behavior.types';
import {Point2d} from '../../../types';
import {BaseBehaviorType} from '../base-behaviors.types';

export interface VectorBehaviorConfig {
  x: ScalarBehaviorConfig;
  y: ScalarBehaviorConfig;
}

export interface VectorBehavior {
  startValue: Point2d;
  endValue: Point2d;
  easingX: EasingFunction;
  easingY: EasingFunction;
  value: Point2d;
  type: BaseBehaviorType.Vector;
}
