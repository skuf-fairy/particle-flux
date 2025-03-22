import {NumberUtils} from '../../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../../utils/easing/easing-functions';
import {EasingFunction, EasingName} from '../../../utils/easing/easing.types';
import {isScalarDynamicBehavior, isScalarStaticBehavior} from './ScalarBehavior.typeguards';
import {ScalarBehaviorConfig} from './ScalarBehavior.types';
import {realRandom} from '../../../utils/random/RealRandom';
import {isRangeValue} from '../../../typeguards';
import {UpdateFunction} from '../../Particle';

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

export function getScalarBehavior(config: ScalarBehaviorConfig): UpdateFunction<number> {
  let startValue: number = 0;
  let endValue: number = 0;
  let easing: EasingFunction = EASING_FUNCTIONS[EasingName.linear];
  let multiplier: number = getInitialMultiplier(config);

  if (isScalarStaticBehavior(config)) {
    startValue = config.value;
    endValue = config.value;
  }

  if (isScalarDynamicBehavior(config)) {
    startValue = config.start;
    endValue = config.end;
    easing = EASING_FUNCTIONS[config.easing || EasingName.linear];
  }

  return (lifeTimeNormalizedProgress: number): number =>
    NumberUtils.roundWith2Precision(
      NumberUtils.lerp(startValue, endValue, easing(lifeTimeNormalizedProgress)) * multiplier,
    );
}
