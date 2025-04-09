import {Multiplier} from '../../../types';
import {BaseBehaviorType} from '../base-behaviors.types';

export interface DeltaBehaviorConfig {
  value: number;
  delta: number;
  multiplier?: Multiplier;
}

export interface DeltaBehavior {
  value: number;
  delta: number;
  type: BaseBehaviorType.Delta;
}
