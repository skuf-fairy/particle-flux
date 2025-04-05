import {IParticle, ParticleConfig, Point2d, ViewContainer, ViewParticle, ViewRenderFn} from '../types';
import {
  isScalarBehaviorConfig,
  isScalarDynamicBehavior,
  isScalarStaticBehavior,
} from './base-behaviors/scalar-behavior/ScalarBehavior.typeguards';
import {isScriptBehaviorConfig} from './base-behaviors/script-behavior/ScriptBehavior.typeguards';
import {getDirection} from './direction/getDirection';
import {realRandom} from '../utils/random/RealRandom';
import {Vector2Utils} from '../utils/Vector2Utils';
import {isDeltaBehaviorConfig} from './base-behaviors/delta-behavior/DeltaBehavior.typeguards';
import {isVectorBehaviorConfig} from './base-behaviors/vector-behavior/VectorBehavior.typeguards';
import {
  isColorDynamicBehaviorConfig,
  isColorDynamicBehaviorState,
  isColorScriptBehaviorConfig,
  isColorStaticBehaviorConfig,
} from '../core/behaviors/color-behavior/ColorBehavior.typeguards';
import {parsePath} from '../utils/parsePath';
import {getSpawnPosition} from './spawn-shapes/getSpawnPosition';
import {DEFAULT_LIFE_TIME_CONFIG} from '../constants';
import {getLifeTimeBehaviorState, getLifeTimeNormalizedProgress} from './behaviors/life-time-behavior/LifeTimeBehavior';
import {getScriptBehaviorState, updateScriptBehaviorState} from './base-behaviors/script-behavior/ScriptBehavior';
import {getScalarBehaviorState, updateScalarBehaviorState} from './base-behaviors/scalar-behavior/ScalarBehavior';
import {getDeltaBehaviorState, updateDeltaBehaviorState} from './base-behaviors/delta-behavior/DeltaBehavior';
import {getVectorBehaviorState, updateVectorBehaviorState} from './base-behaviors/vector-behavior/VectorBehavior';

import {
  getColorDynamicBehaviorState,
  updateColorDynamicState,
} from './behaviors/color-behavior/ColorBehavior/ColorDynamicBehavior';
import {
  isDeltaBehaviorState,
  isScalarBehaviorState,
  isScriptBehaviorState,
  isVectorBehaviorState,
} from './base-behaviors/base-behaviors.typeguards';
import {BehaviorStateType} from './base-behaviors/base-behaviors.types';

export const createParticle = (viewContainer: ViewContainer<ViewParticle>): IParticle => ({
  speed: 0,
  deltaPath: {x: 0, y: 0},
  initialPosition: {x: 0, y: 0},
  direction: {x: 0, y: 0},
  view: null,
  next: null,
  prev: null,
  inUse: false,
  age: 0,
  lifeTime: 0,
  speedBehavior: null,
  alphaBehavior: null,
  rotationBehavior: null,
  scaleBehavior: null,
  colorBehavior: null,
  gravityBehavior: null,
  pathFunc: null,
  viewContainer,
});

export function useParticle(
  particle: IParticle,
  viewRenderFn: ViewRenderFn | ViewRenderFn[],
  config: ParticleConfig,
): void {
  particle.inUse = true;

  particle.view = createView(viewRenderFn);

  particle.viewContainer.addChild(particle.view);

  particle.lifeTime = getLifeTimeBehaviorState(config.lifeTime || DEFAULT_LIFE_TIME_CONFIG);
  particle.age = 0;

  particle.initialPosition = config.spawnShape
    ? getSpawnPosition(config.spawnShape, config.spawnPosition)
    : config.spawnPosition || {x: 0, y: 0};

  particle.view.x = particle.initialPosition.x;
  particle.view.y = particle.initialPosition.y;

  if (config.direction) {
    particle.direction = getDirection(config.direction);
  } else {
    particle.direction = {
      x: 0,
      y: 0,
    };
  }

  if (config.speed) {
    if (isScalarStaticBehavior(config.speed)) {
      particle.speed = config.speed.value;
    } else if (isScriptBehaviorConfig(config.speed)) {
      particle.speedBehavior = getScriptBehaviorState(config.speed);
    } else if (isScalarBehaviorConfig(config.speed)) {
      particle.speedBehavior = getScalarBehaviorState(config.speed);
    }
  }

  if (config.alpha) {
    if (isScalarStaticBehavior(config.alpha)) {
      particle.view.alpha = config.alpha.value;
    } else if (isScriptBehaviorConfig(config.alpha)) {
      particle.alphaBehavior = getScriptBehaviorState(config.alpha);
    } else if (isScalarBehaviorConfig(config.alpha)) {
      particle.alphaBehavior = getScalarBehaviorState(config.alpha);
    }
  }

  if (config.rotation) {
    if (isScalarStaticBehavior(config.rotation)) {
      particle.view.angle = config.rotation.value;
    } else if (isDeltaBehaviorConfig(config.rotation)) {
      particle.rotationBehavior = getDeltaBehaviorState(config.rotation);
    } else if (isScalarBehaviorConfig(config.rotation)) {
      particle.rotationBehavior = getScalarBehaviorState(config.rotation);
    } else if (isScriptBehaviorConfig(config.rotation)) {
      particle.rotationBehavior = getScriptBehaviorState(config.rotation);
    }
  }

  if (config.scale) {
    if (isScalarStaticBehavior(config.scale)) {
      particle.view.scale.x = particle.view.scale.y = config.scale.value;
    } else if (isScalarBehaviorConfig(config.scale)) {
      particle.scaleBehavior = getScalarBehaviorState(config.scale);
    } else if (isScriptBehaviorConfig<Point2d>(config.scale)) {
      particle.scaleBehavior = getScriptBehaviorState<Point2d>(config.scale);
    } else if (isVectorBehaviorConfig(config.scale)) {
      particle.scaleBehavior = getVectorBehaviorState(config.scale);
    }
  }

  if (config.color) {
    if (isColorScriptBehaviorConfig(config.color)) {
      particle.colorBehavior = getScriptBehaviorState<string>(config.color);
    } else if (isColorDynamicBehaviorConfig(config.color)) {
      particle.colorBehavior = getColorDynamicBehaviorState(config.color);
    }
  }

  if (config.gravity) {
    if (isScalarStaticBehavior(config.gravity)) {
      particle.gravityBehavior = {
        startValue: config.gravity.value,
        endValue: config.gravity.value,
        easing: (x) => x,
        type: BehaviorStateType.Scalar,
      };
    } else if (isScalarDynamicBehavior(config.gravity)) {
      particle.gravityBehavior = getScalarBehaviorState(config.gravity);
    }
  }

  if (config.path) {
    particle.pathFunc = parsePath(config.path.path);
  }

  updateParticle(particle, 0, 0);
}

export function updateParticle(particle: IParticle, elapsedDelta: number, deltaMS: number): void {
  const view = particle.view;

  if (!particle.inUse || view === null) return;

  if (view.destroyed) {
    noUseParticle(particle);
    return;
  }

  particle.age = Math.min(particle.lifeTime, particle.age + deltaMS);

  if (isParticleDead(particle)) {
    noUseParticle(particle);
    return;
  }

  const lifeTimeNormalizedProgress = getLifeTimeNormalizedProgress(particle.age, particle.lifeTime);

  if (particle.speedBehavior !== null) {
    if (isScalarBehaviorState(particle.speedBehavior)) {
      particle.speed = updateScalarBehaviorState(particle.speedBehavior, lifeTimeNormalizedProgress);
    } else if (isScriptBehaviorState(particle.speedBehavior)) {
      particle.speed = updateScriptBehaviorState(particle.speedBehavior, lifeTimeNormalizedProgress);
    }
  }

  if (particle.alphaBehavior !== null) {
    if (isScalarBehaviorState(particle.alphaBehavior)) {
      view.alpha = updateScalarBehaviorState(particle.alphaBehavior, lifeTimeNormalizedProgress);
    } else if (isScriptBehaviorState(particle.alphaBehavior)) {
      view.alpha = updateScriptBehaviorState(particle.alphaBehavior, lifeTimeNormalizedProgress);
    }
  }

  if (particle.rotationBehavior !== null) {
    if (isDeltaBehaviorState(particle.rotationBehavior)) {
      view.angle = updateDeltaBehaviorState(particle.rotationBehavior, elapsedDelta);
    } else if (isScriptBehaviorState(particle.rotationBehavior)) {
      view.angle = updateScriptBehaviorState(particle.rotationBehavior, lifeTimeNormalizedProgress);
    } else if (isScalarBehaviorState(particle.rotationBehavior)) {
      view.angle = updateScalarBehaviorState(particle.rotationBehavior, lifeTimeNormalizedProgress);
    }
  }

  if (particle.scaleBehavior !== null) {
    if (isScalarBehaviorState(particle.scaleBehavior)) {
      view.scale.x = view.scale.y = updateScalarBehaviorState(particle.scaleBehavior, lifeTimeNormalizedProgress);
    } else if (isScriptBehaviorState(particle.scaleBehavior)) {
      view.scale = updateScriptBehaviorState(particle.scaleBehavior, lifeTimeNormalizedProgress);
    } else if (isVectorBehaviorState(particle.scaleBehavior)) {
      view.scale = updateVectorBehaviorState(particle.scaleBehavior, elapsedDelta);
    }
  }

  if (particle.colorBehavior !== null) {
    if (isColorDynamicBehaviorState(particle.colorBehavior)) {
      view.tint = updateColorDynamicState(particle.colorBehavior, lifeTimeNormalizedProgress);
    } else if (isScriptBehaviorState(particle.colorBehavior)) {
      view.tint = updateScriptBehaviorState<string>(particle.colorBehavior, lifeTimeNormalizedProgress);
    }
  }

  const speed = particle.speed * elapsedDelta;

  if (particle.pathFunc !== null) {
    particle.deltaPath.x = particle.deltaPath.x + speed;
    particle.deltaPath.y = particle.pathFunc(particle.deltaPath.x);
    const delta = Vector2Utils.rotate(particle.deltaPath, -Math.PI / 2);

    view.x = particle.initialPosition.x + delta.x;
    view.y = particle.initialPosition.y + delta.y;
  } else {
    // todo наверное лучше накопление
    const gravityShift = particle.gravityBehavior
      ? updateScalarBehaviorState(particle.gravityBehavior, lifeTimeNormalizedProgress)
      : 0;

    view.x += particle.direction.x * speed;
    view.y += (particle.direction.y + gravityShift) * speed;
  }
}

export function noUseParticle(particle: IParticle): void {
  if (particle.view === null) return;

  particle.viewContainer.removeChild(particle.view);
  particle.view = null;
  particle.inUse = false;
}

export function isParticleInUse(particle: IParticle): boolean {
  return particle.inUse;
}

function createView(viewFactory: ViewRenderFn | ViewRenderFn[]): ViewParticle {
  return Array.isArray(viewFactory) ? realRandom.choice(viewFactory)() : viewFactory();
}

function isParticleDead(particle: IParticle): boolean {
  return particle.age === particle.lifeTime;
}
