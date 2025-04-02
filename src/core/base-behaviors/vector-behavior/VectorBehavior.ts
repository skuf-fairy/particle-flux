import {NumberUtils} from '../../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../../utils/easing/easing-functions';
import {EasingName} from '../../../utils/easing/easing.types';
import {isScalarStaticBehavior, isScalarDynamicBehavior} from '../scalar-behavior/ScalarBehavior.typeguards';
import {VectorBehaviorConfig, VectorBehaviorState} from './VectorBehavior.types';
import {realRandom} from '../../../utils/random/RealRandom';
import {ScalarBehaviorConfig} from '../scalar-behavior/ScalarBehavior.types';
import {isRangeValue} from '../../../typeguards';
import {BehaviorStateType} from '../base-behaviors.types';
import {Point2d} from '../../../types';

const getInitialMultiplier = (config: ScalarBehaviorConfig): number => {
  if (config.multiplier) {
    if (isRangeValue(config.multiplier)) {
      return realRandom.generateFloatNumber(config.multiplier.min, config.multiplier.max);
    } else {
      return config.multiplier;
    }
  }

  return 1;
};

export function getVectorBehaviorState(config: VectorBehaviorConfig): VectorBehaviorState {
  let startValue = {x: 0, y: 0};
  let endValue = {x: 0, y: 0};

  const multiplierX = getInitialMultiplier(config.x);
  const multiplierY = getInitialMultiplier(config.y);

  let easingX = EASING_FUNCTIONS[EasingName.linear];
  let easingY = EASING_FUNCTIONS[EasingName.linear];

  if (isScalarStaticBehavior(config.x) && isScalarStaticBehavior(config.y)) {
    startValue = {x: config.x.value * multiplierX, y: config.y.value * multiplierY};
    endValue = {x: config.x.value * multiplierX, y: config.y.value * multiplierY};
  } else if (isScalarDynamicBehavior(config.x) && isScalarDynamicBehavior(config.y)) {
    startValue = {x: config.x.start * multiplierX, y: config.y.start * multiplierY};
    endValue = {x: config.x.end * multiplierX, y: config.y.end * multiplierY};

    easingX = EASING_FUNCTIONS[config.x.easing || EasingName.linear];
    easingY = EASING_FUNCTIONS[config.y.easing || EasingName.linear];
  } else if (isScalarStaticBehavior(config.x) && isScalarDynamicBehavior(config.y)) {
    startValue = {x: config.x.value * multiplierX, y: config.y.start * multiplierY};
    endValue = {x: config.x.value * multiplierX, y: config.y.end * multiplierY};

    easingY = EASING_FUNCTIONS[config.y.easing || EasingName.linear];
  } else if (isScalarDynamicBehavior(config.x) && isScalarStaticBehavior(config.y)) {
    startValue = {x: config.x.start * multiplierX, y: config.y.value * multiplierY};
    endValue = {x: config.x.end * multiplierX, y: config.y.value * multiplierY};

    easingX = EASING_FUNCTIONS[config.x.easing || EasingName.linear];
  }

  return {
    startValue,
    endValue,
    easingX,
    easingY,
    value: {...startValue},
    type: BehaviorStateType.Vector,
  };
}

export function updateVectorBehaviorState(state: VectorBehaviorState, lifeTimeNormalizedProgress: number): Point2d {
  state.value.y = NumberUtils.lerp(state.startValue.x, state.endValue.x, state.easingX(lifeTimeNormalizedProgress));
  state.value.x = NumberUtils.lerp(state.startValue.y, state.endValue.y, state.easingY(lifeTimeNormalizedProgress));
  return state.value;
}
