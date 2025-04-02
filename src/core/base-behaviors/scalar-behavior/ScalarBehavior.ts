import {NumberUtils} from '../../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../../utils/easing/easing-functions';
import {EasingFunction, EasingName} from '../../../utils/easing/easing.types';
import {isScalarDynamicBehavior, isScalarStaticBehavior} from './ScalarBehavior.typeguards';
import {ScalarBehaviorConfig, ScalarBehaviorState} from './ScalarBehavior.types';
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

export function getScalarBehaviorState(config: ScalarBehaviorConfig): ScalarBehaviorState {
  let startValue: number = 0;
  let endValue: number = 0;
  let easing: EasingFunction = EASING_FUNCTIONS[EasingName.linear];
  let multiplier: number = getInitialMultiplier(config);

  if (isScalarStaticBehavior(config)) {
    startValue = config.value * multiplier;
    endValue = config.value * multiplier;
  }

  if (isScalarDynamicBehavior(config)) {
    startValue = config.start * multiplier;
    endValue = config.end * multiplier;
    easing = EASING_FUNCTIONS[config.easing || EasingName.linear];
  }

  return {startValue, endValue, easing, type: BehaviorStateType.Scalar};
}

export function updateScalarBehaviorState(state: ScalarBehaviorState, lifeTimeNormalizedProgress: number): number {
  return NumberUtils.lerp(state.startValue, state.endValue, state.easing(lifeTimeNormalizedProgress));
}
