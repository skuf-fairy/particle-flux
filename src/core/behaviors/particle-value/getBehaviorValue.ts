import {EASING_FUNCTIONS} from '../../../utils/easing/easing.functions';
import {getTimelapsesValue} from './getTimelapsesValue';
import {AnyBehavior, lerpFunction, StaticBehavior, TimelapsesBehavior, TransitionBehavior} from './timelapses.types';

export function getBehaviorValue<V>(
  behavior: AnyBehavior<V>,
  lifeTimeNormalizedProgress: number,
  lerp: lerpFunction<V>,
): V {
  const staticBehavior = behavior as StaticBehavior<V>;

  if (staticBehavior.isStatic) {
    return staticBehavior.value;
  }

  const transitionBehavior = behavior as TransitionBehavior<V>;

  if (transitionBehavior.isTransition) {
    return lerp(
      transitionBehavior.min,
      transitionBehavior.max,
      EASING_FUNCTIONS[transitionBehavior.easing](lifeTimeNormalizedProgress),
    );
  }

  return getTimelapsesValue(behavior as TimelapsesBehavior<V>, lifeTimeNormalizedProgress, lerp);
}
