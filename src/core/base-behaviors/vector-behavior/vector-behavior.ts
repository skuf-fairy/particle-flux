import {NumberUtils} from '../../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../../utils/easing/easing-functions';
import {EasingName} from '../../../utils/easing/easing.types';
import {
  isScalarStaticBehaviorConfig,
  isScalarTransitionBehaviorConfig,
} from '../scalar-behavior/scalar-behavior.typeguards';
import {VectorBehaviorConfig, VectorBehavior} from './vector-behavior.types';
import {BaseBehaviorType} from '../base-behaviors.types';
import {Point2d} from '../../../types';
import {getMultiplierValue} from '../../../utils/multiplier';

// eslint-disable-next-line @typescript-eslint/unbound-method
const lerp = NumberUtils.lerp;

export function getVectorBehavior(config: VectorBehaviorConfig): VectorBehavior {
  let startValue = {x: 0, y: 0};
  let endValue = {x: 0, y: 0};

  const multiplierX = getMultiplierValue(config.x.multiplier || 1);
  const multiplierY = getMultiplierValue(config.y.multiplier || 1);

  let easingX = EASING_FUNCTIONS[EasingName.linear];
  let easingY = EASING_FUNCTIONS[EasingName.linear];

  if (isScalarStaticBehaviorConfig(config.x) && isScalarStaticBehaviorConfig(config.y)) {
    startValue = {x: config.x.value * multiplierX, y: config.y.value * multiplierY};
    endValue = {x: config.x.value * multiplierX, y: config.y.value * multiplierY};
  } else if (isScalarTransitionBehaviorConfig(config.x) && isScalarTransitionBehaviorConfig(config.y)) {
    startValue = {x: config.x.start * multiplierX, y: config.y.start * multiplierY};
    endValue = {x: config.x.end * multiplierX, y: config.y.end * multiplierY};

    easingX = EASING_FUNCTIONS[config.x.easing || EasingName.linear];
    easingY = EASING_FUNCTIONS[config.y.easing || EasingName.linear];
  } else if (isScalarStaticBehaviorConfig(config.x) && isScalarTransitionBehaviorConfig(config.y)) {
    startValue = {x: config.x.value * multiplierX, y: config.y.start * multiplierY};
    endValue = {x: config.x.value * multiplierX, y: config.y.end * multiplierY};

    easingY = EASING_FUNCTIONS[config.y.easing || EasingName.linear];
  } else if (isScalarTransitionBehaviorConfig(config.x) && isScalarStaticBehaviorConfig(config.y)) {
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
    type: BaseBehaviorType.Vector,
  };
}

export function getVectorBehaviorValue(behavior: VectorBehavior, lifeTimeNormalizedProgress: number): Point2d {
  behavior.value.x = lerp(behavior.startValue.x, behavior.endValue.x, behavior.easingX(lifeTimeNormalizedProgress));
  behavior.value.y = lerp(behavior.startValue.y, behavior.endValue.y, behavior.easingY(lifeTimeNormalizedProgress));
  return behavior.value;
}
