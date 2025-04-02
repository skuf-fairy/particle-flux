import {Multiplier} from '../../../types';
import {BehaviorStateType} from '../base-behaviors.types';

export interface DeltaBehaviorConfig {
  value: number;
  delta: number;
  multiplier?: Multiplier;
}

export interface DeltaBehaviorState {
  value: number;
  delta: number;
  type: BehaviorStateType.Delta;
}
