import {GRAVITY_DEFAULT_MULTIPLIER} from '../../constants';
import {ViewParticle, IParticle} from '../../types';
import {lerpColor} from '../../utils/color/lerpColor';
import {lerp} from '../../utils/lerp';
import {pointToAngleInDegrees} from '../../utils/vector2d/pointToAngleInDegrees';
import {rotate} from '../../utils/vector2d/rotate';
import {getLifeTimeNormalizedProgress} from '../behaviors/life-time-behavior/life-time-behavior';
import {getBehaviorValue} from '../behaviors/particle-value/getBehaviorValue';

export function updateParticle<View extends ViewParticle>(
  particle: IParticle<View>,
  elapsedDelta: number,
  deltaMS: number,
): void {
  const view = particle.view;

  particle.age = Math.min(particle.lifeTime, particle.age + deltaMS);

  const lifeTimeNormalizedProgress = getLifeTimeNormalizedProgress(particle.age, particle.lifeTime);

  particle.speed = particle.speedBehavior
    ? getBehaviorValue(particle.speedBehavior, lifeTimeNormalizedProgress, lerp)
    : 0;

  if (particle.pathFunc) {
    particle.deltaPath.x += particle.speed * elapsedDelta;
    particle.deltaPath.y = particle.pathFunc(particle.deltaPath.x);

    const delta = rotate(particle.deltaPath, Math.atan2(particle.direction.y, particle.direction.x));

    view.x = particle.initialPosition.x + delta.x;
    view.y = particle.initialPosition.y + delta.y;
  } else if (!particle.gravityBehavior) {
    view.x += particle.direction.x * particle.speed * elapsedDelta;
    view.y += particle.direction.y * particle.speed * elapsedDelta;
  } else {
    const gravityBehavior = particle.gravityBehavior;

    const oldY = particle.direction.y;

    if (typeof gravityBehavior === 'number') {
      particle.direction.y += (gravityBehavior * elapsedDelta) / GRAVITY_DEFAULT_MULTIPLIER;
    }

    // else if (isScalarBehavior(gravityBehavior)) {
    //   particle.direction.y +=
    //     getScalarBehaviorValue(gravityBehavior, lifeTimeNormalizedProgress) / GRAVITY_DEFAULT_MULTIPLIER;
    // } else if (isNumberScriptBehavior(gravityBehavior)) {
    //   particle.direction.y +=
    //     getNumberScriptBehaviorValue(gravityBehavior, lifeTimeNormalizedProgress) / GRAVITY_DEFAULT_MULTIPLIER;
    // } else if (isDeltaBehavior(gravityBehavior)) {
    //   particle.direction.y += getDeltaBehaviorValue(gravityBehavior, elapsedDelta) / GRAVITY_DEFAULT_MULTIPLIER;
    // }

    view.x += particle.direction.x * particle.speed * elapsedDelta;
    view.y += ((oldY + particle.direction.y) / 2) * particle.speed * elapsedDelta;
  }

  if (particle.isRotateByDirection) {
    particle.view.angle = particle.directionRotation = pointToAngleInDegrees(particle.direction);
  }

  if (particle.alphaBehavior !== null) {
    view.alpha = getBehaviorValue(particle.alphaBehavior, lifeTimeNormalizedProgress, lerp);
  }

  if (particle.rotationBehavior !== null) {
    view.angle =
      particle.directionRotation + getBehaviorValue(particle.rotationBehavior, lifeTimeNormalizedProgress, lerp);
  }

  if (particle.scaleBehaviorX !== null) {
    view.scale.x = getBehaviorValue(particle.scaleBehaviorX, lifeTimeNormalizedProgress, lerp);
  }

  if (particle.scaleBehaviorY !== null) {
    view.scale.y = getBehaviorValue(particle.scaleBehaviorY, lifeTimeNormalizedProgress, lerp);
  }

  if (particle.colorBehavior !== null) {
    view.tint = getBehaviorValue(particle.colorBehavior, lifeTimeNormalizedProgress, lerpColor);
  }
}
