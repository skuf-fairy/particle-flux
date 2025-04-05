import {NumberUtils} from '../../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../../utils/easing/easing-functions';
import {ScalarBehaviorState, ScalarDynamicBehaviorConfig, ScalarStaticBehaviorConfig} from './ScalarBehavior.types';
import {BehaviorStateType} from '../base-behaviors.types';
import {getMultiplierValue} from '../../../utils/multiplier';

// eslint-disable-next-line @typescript-eslint/unbound-method
const lerp = NumberUtils.lerp;

export function getScalarBehaviorState(config: ScalarDynamicBehaviorConfig): ScalarBehaviorState {
  const multiplier: number = config.multiplier ? getMultiplierValue(config.multiplier) : 1;

  return {
    startValue: config.start * multiplier,
    endValue: config.end * multiplier,
    easing: config.easing ? EASING_FUNCTIONS[config.easing] : null,
    type: BehaviorStateType.Scalar,
  };
}

export function getStaticBehaviorValue(config: ScalarStaticBehaviorConfig): number {
  return config.value * (config.multiplier ? getMultiplierValue(config.multiplier) : 1);
}

export function getScalarBehaviorValue(state: ScalarBehaviorState, lifeTimeNormalizedProgress: number): number {
  return state.easing !== null
    ? lerp(state.startValue, state.endValue, state.easing(lifeTimeNormalizedProgress))
    : lerp(state.startValue, state.endValue, lifeTimeNormalizedProgress);
}
