import {NumberUtils} from '../../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../../utils/easing/easing-functions';
import {EasingName} from '../../../utils/easing/easing.types';
import {isScalarStaticBehavior, isScalarDynamicBehavior} from '../scalar-behavior/ScalarBehavior.typeguards';
import {VectorBehaviorConfig} from './VectorBehavior.types';
import {realRandom} from '../../../utils/random/RealRandom';
import {ScalarBehaviorConfig} from '../scalar-behavior/ScalarBehavior.types';
import {isRangeValue} from '../../../typeguards';
import {Point2d} from '../../../types';
import {UpdateFunction} from '../../Particle';

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

export function getVectorBehavior(config: VectorBehaviorConfig): UpdateFunction<Point2d> {
  let startValue = {x: 0, y: 0};
  let endValue = {x: 0, y: 0};

  let easingX = EASING_FUNCTIONS[EasingName.linear];
  let easingY = EASING_FUNCTIONS[EasingName.linear];

  if (isScalarStaticBehavior(config.x) && isScalarStaticBehavior(config.y)) {
    startValue = {x: config.x.value, y: config.y.value};
    endValue = {x: config.x.value, y: config.y.value};
  } else if (isScalarDynamicBehavior(config.x) && isScalarDynamicBehavior(config.y)) {
    startValue = {x: config.x.start, y: config.y.start};
    endValue = {x: config.x.end, y: config.y.end};

    easingX = EASING_FUNCTIONS[config.x.easing || EasingName.linear];
    easingY = EASING_FUNCTIONS[config.y.easing || EasingName.linear];
  } else if (isScalarStaticBehavior(config.x) && isScalarDynamicBehavior(config.y)) {
    startValue = {x: config.x.value, y: config.y.start};
    endValue = {x: config.x.value, y: config.y.end};

    easingY = EASING_FUNCTIONS[config.y.easing || EasingName.linear];
  } else if (isScalarDynamicBehavior(config.x) && isScalarStaticBehavior(config.y)) {
    startValue = {x: config.x.start, y: config.y.value};
    endValue = {x: config.x.end, y: config.y.value};

    easingX = EASING_FUNCTIONS[config.x.easing || EasingName.linear];
  }

  let value = {...startValue};

  const multiplierX = getInitialMultiplier(config.x);
  const multiplierY = getInitialMultiplier(config.y);

  return (lifeTimeNormalizedProgress: number): Point2d => {
    value.x = NumberUtils.lerp(startValue.x, endValue.x, easingX(lifeTimeNormalizedProgress)) * multiplierX;
    value.y = NumberUtils.lerp(startValue.y, endValue.y, easingY(lifeTimeNormalizedProgress)) * multiplierY;

    return value;
  };
}
