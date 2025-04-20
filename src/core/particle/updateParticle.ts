import {GRAVITY_DEFAULT_MULTIPLIER} from '../../constants';
import {ViewParticle, IParticle} from '../../types';
import {Vector2Utils} from '../../utils/Vector2Utils';
import {
  isScalarBehavior,
  isScriptBehavior,
  isDeltaBehavior,
  isVectorBehavior,
} from '../base-behaviors/base-behaviors.typeguards';
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

export function updateParticle<View extends ViewParticle>(
  particle: IParticle<View>,
  elapsedDelta: number,
  deltaMS: number,
): void {
  const view = particle.view;

  particle.age = Math.min(particle.lifeTime, particle.age + deltaMS);

  const lifeTimeNormalizedProgress = getLifeTimeNormalizedProgress(particle.age, particle.lifeTime);

  if (particle.speedBehavior !== null) {
    if (isScalarBehavior(particle.speedBehavior)) {
      particle.speed = getScalarBehaviorValue(particle.speedBehavior, lifeTimeNormalizedProgress);
    } else if (isNumberScriptBehavior(particle.speedBehavior)) {
      particle.speed = getNumberScriptBehaviorValue(particle.speedBehavior, lifeTimeNormalizedProgress);
    }
  }

  const speed = particle.speed * elapsedDelta;

  if (particle.pathFunc) {
    particle.deltaPath.x = particle.deltaPath.x + speed;
    particle.deltaPath.y = particle.pathFunc(particle.deltaPath.x);
    const delta = Vector2Utils.rotate(particle.deltaPath, -Math.PI / 2);

    view.x = particle.initialPosition.x + delta.x;
    view.y = particle.initialPosition.y + delta.y;
  } else if (!particle.gravityBehavior) {
    view.x += particle.direction.x * speed;
    view.y += particle.direction.y * speed;
  } else {
    const gravityBehavior = particle.gravityBehavior;

    let gravityShift: number = 0;
    if (typeof gravityBehavior === 'number') {
      gravityShift = gravityBehavior;
    } else if (isScalarBehavior(gravityBehavior)) {
      gravityShift = getScalarBehaviorValue(gravityBehavior, lifeTimeNormalizedProgress);
    } else if (isNumberScriptBehavior(gravityBehavior)) {
      gravityShift = getNumberScriptBehaviorValue(gravityBehavior, lifeTimeNormalizedProgress);
    } else if (isDeltaBehavior(gravityBehavior)) {
      gravityShift = getDeltaBehaviorValue(gravityBehavior, elapsedDelta);
    }

    particle.deltaDirection.y += (gravityShift / GRAVITY_DEFAULT_MULTIPLIER) * elapsedDelta;
    particle.direction.y += particle.deltaDirection.y;

    view.x += particle.direction.x * speed;
    view.y += particle.direction.y * speed;
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
      view.scale.x = view.scale.y = getScalarBehaviorValue(particle.scaleBehavior, lifeTimeNormalizedProgress);
    } else if (isNumberScriptBehavior(particle.scaleBehavior)) {
      const scaleValue = getNumberScriptBehaviorValue(particle.scaleBehavior, lifeTimeNormalizedProgress);
      view.scale.x = view.scale.y = scaleValue;
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
