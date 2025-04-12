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
import {getScriptBehaviorValue} from '../base-behaviors/script-behavior/script-behavior';
import {getVectorBehaviorValue} from '../base-behaviors/vector-behavior/vector-behavior';
import {isColorDynamicBehavior} from '../behaviors/color-behavior/color-behavior.typeguards';
import {getColorDynamicBehaviorValue} from '../behaviors/color-behavior/color-dynamic-behavior';
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
    } else if (isScriptBehavior(particle.speedBehavior)) {
      particle.speed = getScriptBehaviorValue<number>(particle.speedBehavior, lifeTimeNormalizedProgress);
    }
  }

  const speed = particle.speed * elapsedDelta;

  if (particle.usePathFunc) {
    particle.deltaPath.x = particle.deltaPath.x + speed;
    particle.deltaPath.y = particle.pathFunc!(particle.deltaPath.x);
    const delta = Vector2Utils.rotate(particle.deltaPath, -Math.PI / 2);

    view.x = particle.initialPosition.x + delta.x;
    view.y = particle.initialPosition.y + delta.y;
  } else if (!particle.useGravity) {
    view.x += particle.direction.x * speed;
    view.y += particle.direction.y * speed;
  } else {
    // todo наверное лучше накопление
    const gravityShift =
      typeof particle.gravityBehavior === 'number'
        ? particle.gravityBehavior
        : getScalarBehaviorValue(particle.gravityBehavior, lifeTimeNormalizedProgress);

    view.x += particle.direction.x * speed;
    view.y += (particle.direction.y + gravityShift) * speed;
  }

  if (particle.alphaBehavior !== null) {
    if (isScalarBehavior(particle.alphaBehavior)) {
      view.alpha = getScalarBehaviorValue(particle.alphaBehavior, lifeTimeNormalizedProgress);
    } else if (isScriptBehavior(particle.alphaBehavior)) {
      view.alpha = getScriptBehaviorValue(particle.alphaBehavior, lifeTimeNormalizedProgress);
    }
  }

  if (particle.rotationBehavior !== null) {
    if (isDeltaBehavior(particle.rotationBehavior)) {
      view.angle = getDeltaBehaviorValue(particle.rotationBehavior, elapsedDelta);
    } else if (isScriptBehavior(particle.rotationBehavior)) {
      view.angle = getScriptBehaviorValue(particle.rotationBehavior, lifeTimeNormalizedProgress);
    } else if (isScalarBehavior(particle.rotationBehavior)) {
      view.angle = getScalarBehaviorValue(particle.rotationBehavior, lifeTimeNormalizedProgress);
    }
  }

  if (particle.scaleBehavior !== null) {
    if (isScalarBehavior(particle.scaleBehavior)) {
      view.scale.x = view.scale.y = getScalarBehaviorValue(particle.scaleBehavior, lifeTimeNormalizedProgress);
    } else if (isScriptBehavior(particle.scaleBehavior)) {
      view.scale = getScriptBehaviorValue(particle.scaleBehavior, lifeTimeNormalizedProgress);
    } else if (isVectorBehavior(particle.scaleBehavior)) {
      view.scale = getVectorBehaviorValue(particle.scaleBehavior, elapsedDelta);
    }
  }

  if (particle.colorBehavior !== null) {
    if (isColorDynamicBehavior(particle.colorBehavior)) {
      view.tint = getColorDynamicBehaviorValue(particle.colorBehavior, lifeTimeNormalizedProgress);
    } else if (isScriptBehavior(particle.colorBehavior)) {
      view.tint = getScriptBehaviorValue<string>(particle.colorBehavior, lifeTimeNormalizedProgress);
    }
  }
}
