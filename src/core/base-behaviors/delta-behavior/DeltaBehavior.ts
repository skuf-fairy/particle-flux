import {realRandom} from '../../../utils/random/RealRandom';
import {DeltaBehaviorConfig, DeltaBehaviorState} from './DeltaBehavior.types';
import {isRangeValue} from '../../../typeguards';
import {BehaviorStateType} from '../base-behaviors.types';

const getInitialMultiplier = (config: DeltaBehaviorConfig): number => {
  const multiplier = config.multiplier;

  if (multiplier) {
    if (isRangeValue(multiplier)) {
      return realRandom.generateFloatNumber(multiplier.min, multiplier.max);
    } else {
      return multiplier;
    }
  }

  return 1;
};

export function getDeltaBehaviorState(config: DeltaBehaviorConfig): DeltaBehaviorState {
  return {
    value: config.value * getInitialMultiplier(config),
    delta: config.delta,
    type: BehaviorStateType.Delta,
  };
}

export function updateDeltaBehaviorState(state: DeltaBehaviorState, elapsedDelta: number): number {
  return state.value + state.delta * elapsedDelta;
}
