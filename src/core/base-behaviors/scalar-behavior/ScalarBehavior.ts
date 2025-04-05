import {NumberUtils} from '../../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../../utils/easing/easing-functions';
import {ScalarBehaviorConfig, ScalarBehaviorState, ScalarDynamicBehaviorConfig} from './ScalarBehavior.types';
import {realRandom} from '../../../utils/random/RealRandom';
import {isRangeValue} from '../../../typeguards';
import {BehaviorStateType} from '../base-behaviors.types';

const getInitialMultiplier = (config: ScalarBehaviorConfig): number => {
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

export function getScalarBehaviorState(config: ScalarDynamicBehaviorConfig): ScalarBehaviorState {
  const multiplier: number = getInitialMultiplier(config);

  return {
    startValue: config.start * multiplier,
    endValue: config.end * multiplier,
    easing: config.easing ? EASING_FUNCTIONS[config.easing] : null,
    type: BehaviorStateType.Scalar,
  };
}

export function updateScalarBehaviorState(state: ScalarBehaviorState, lifeTimeNormalizedProgress: number): number {
  return state.easing !== null
    ? NumberUtils.lerp(state.startValue, state.endValue, state.easing(lifeTimeNormalizedProgress))
    : NumberUtils.lerp(state.startValue, state.endValue, lifeTimeNormalizedProgress);
}
