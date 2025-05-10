import {GRAVITY_DEFAULT_MULTIPLIER} from '../../constants';
import {ViewParticle, IParticle} from '../../types';
import {Vector2Utils} from '../../utils/Vector2Utils';
import {isScalarBehavior, isDeltaBehavior, isVectorBehavior} from '../base-behaviors/base-behaviors.typeguards';
import {getDeltaBehaviorValue} from '../base-behaviors/delta-behavior/delta-behavior';
import {getScalarBehaviorValue} from '../base-behaviors/scalar-behavior/scalar-behavior';
import {getNumberScriptBehaviorValue} from '../base-behaviors/script-behavior/number-script-behavior/number-script-behavior';
import {isNumberScriptBehavior} from '../base-behaviors/script-behavior/number-script-behavior/number-script-behavior.typeguards';
import {getPoint2dScriptBehaviorValue} from '../base-behaviors/script-behavior/point2d-script-behavior/point2d-script-behavior';
import {isPoint2dScriptBehavior} from '../base-behaviors/script-behavior/point2d-script-behavior/point2d-script-behavior.typeguards';
import {getVectorBehaviorValue} from '../base-behaviors/vector-behavior/vector-behavior';
import {isColorDynamicBehavior} from '../behaviors/color-behavior/color-behavior.typeguards';
import {getColorDynamicBehaviorValue} from '../behaviors/color-behavior/color-dynamic-behavior';
import {getColorScriptBehaviorValue} from '../behaviors/color-behavior/color-script-behavior/color-script-behavior';
import {isColorScriptBehavior} from '../behaviors/color-behavior/color-script-behavior/color-script-behavior.typeguards';
import {getLifeTimeNormalizedProgress} from '../behaviors/life-time-behavior/life-time-behavior';

// todo перенести
const scaleCache = {x: 0, y: 0};

export function updateParticle<View extends ViewParticle>(
  particle: IParticle<View>,
  elapsedDelta: number,
  deltaMS: number,
): void {
  const view = particle.view;

  particle.age = Math.min(particle.lifeTime, particle.age + deltaMS);

  const lifeTimeNormalizedProgress = getLifeTimeNormalizedProgress(particle.age, particle.lifeTime);

  let speed = particle.speed;

  if (particle.speedBehavior !== null) {
    if (isScalarBehavior(particle.speedBehavior)) {
      speed = particle.speed = getScalarBehaviorValue(particle.speedBehavior, lifeTimeNormalizedProgress);
    } else if (isNumberScriptBehavior(particle.speedBehavior)) {
      speed = particle.speed = getNumberScriptBehaviorValue(particle.speedBehavior, lifeTimeNormalizedProgress);
    }
  }

  if (particle.pathFunc) {
    particle.deltaPath.x += speed * elapsedDelta;
    particle.deltaPath.y = particle.pathFunc(particle.deltaPath.x);

    const delta = Vector2Utils.rotate(particle.deltaPath, -Math.PI / 2);

    view.x = particle.initialPosition.x + delta.x;
    view.y = particle.initialPosition.y + delta.y;
  } else if (!particle.gravityBehavior) {
    view.x += particle.direction.x * speed * elapsedDelta;
    view.y += particle.direction.y * speed * elapsedDelta;
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

    view.x += particle.direction.x * speed * elapsedDelta;
    view.y += ((oldY + particle.direction.y) / 2) * speed * elapsedDelta;
  }

  if (particle.isRotateByDirection) {
    particle.view.angle = particle.directionRotation = Vector2Utils.pointToAngleInDegrees(particle.direction);
  }

  if (particle.alphaBehavior !== null) {
    if (isScalarBehavior(particle.alphaBehavior)) {
      view.alpha = getScalarBehaviorValue(particle.alphaBehavior, lifeTimeNormalizedProgress);
    } else if (isNumberScriptBehavior(particle.alphaBehavior)) {
      view.alpha = getNumberScriptBehaviorValue(particle.alphaBehavior, lifeTimeNormalizedProgress);
    }
  }

  if (particle.rotationBehavior !== null) {
    if (isDeltaBehavior(particle.rotationBehavior)) {
      view.angle = particle.directionRotation + getDeltaBehaviorValue(particle.rotationBehavior, elapsedDelta);
    } else if (isNumberScriptBehavior(particle.rotationBehavior)) {
      view.angle =
        particle.directionRotation +
        getNumberScriptBehaviorValue(particle.rotationBehavior, lifeTimeNormalizedProgress);
    } else if (isScalarBehavior(particle.rotationBehavior)) {
      view.angle =
        particle.directionRotation + getScalarBehaviorValue(particle.rotationBehavior, lifeTimeNormalizedProgress);
    }
  }

  if (particle.scaleBehavior !== null) {
    if (isScalarBehavior(particle.scaleBehavior)) {
      scaleCache.x = scaleCache.y = getScalarBehaviorValue(particle.scaleBehavior, lifeTimeNormalizedProgress);
      view.scale = scaleCache;
    } else if (isNumberScriptBehavior(particle.scaleBehavior)) {
      scaleCache.x = scaleCache.y = getNumberScriptBehaviorValue(particle.scaleBehavior, lifeTimeNormalizedProgress);
      view.scale = scaleCache;
    } else if (isPoint2dScriptBehavior(particle.scaleBehavior)) {
      view.scale = getPoint2dScriptBehaviorValue(particle.scaleBehavior, lifeTimeNormalizedProgress);
    } else if (isVectorBehavior(particle.scaleBehavior)) {
      view.scale = getVectorBehaviorValue(particle.scaleBehavior, elapsedDelta);
    }
  }

  if (particle.colorBehavior !== null) {
    if (isColorDynamicBehavior(particle.colorBehavior)) {
      view.tint = getColorDynamicBehaviorValue(particle.colorBehavior, lifeTimeNormalizedProgress);
    } else if (isColorScriptBehavior(particle.colorBehavior)) {
      view.tint = getColorScriptBehaviorValue(particle.colorBehavior, lifeTimeNormalizedProgress);
    }
  }
}
