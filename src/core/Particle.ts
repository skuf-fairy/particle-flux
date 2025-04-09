import {IParticle, ParticleConfig, Point2d, ViewContainer, ViewParticle, ViewRenderFn} from '../types';
import {
  isScalarBehaviorConfig,
  isScalarDynamicBehavior,
  isScalarStaticBehavior,
} from './base-behaviors/scalar-behavior/scalar-behavior.typeguards';
import {isScriptBehaviorConfig} from './base-behaviors/script-behavior/script-behavior.typeguards';
import {getDirection} from './direction/getDirection';
import {realRandom} from '../utils/random/RealRandom';
import {Vector2Utils} from '../utils/Vector2Utils';
import {isDeltaBehaviorConfig} from './base-behaviors/delta-behavior/delta-behavior.typeguards';
import {isVectorBehaviorConfig} from './base-behaviors/vector-behavior/vector-behavior.typeguards';
import {
  isColorDynamicBehaviorConfig,
  isColorDynamicBehavior,
  isColorScriptBehaviorConfig,
  isColorStaticBehaviorConfig,
} from './behaviors/color-behavior/color-behavior.typeguards';
import {parsePath} from '../utils/parsePath';
import {getSpawnPosition} from './spawn-shapes/getSpawnPosition';
import {DEFAULT_LIFE_TIME_CONFIG} from '../constants';
import {getLifeTimeBehavior, getLifeTimeNormalizedProgress} from './behaviors/life-time-behavior/life-time-behavior';
import {getScriptBehavior, getScriptBehaviorValue} from './base-behaviors/script-behavior/script-behavior';
import {
  getScalarBehavior,
  getScalarBehaviorValue,
  getStaticBehaviorValue,
} from './base-behaviors/scalar-behavior/scalar-behavior';
import {getDeltaBehavior, getDeltaBehaviorValue} from './base-behaviors/delta-behavior/delta-behavior';
import {getVectorBehavior, getVectorBehaviorValue} from './base-behaviors/vector-behavior/vector-behavior';

import {
  getColorStaticBehaviorValue,
  getColorDynamicBehaviorValue,
  getColorDynamicBehavior,
} from './behaviors/color-behavior/color-dynamic-behavior';
import {
  isDeltaBehavior,
  isScalarBehavior,
  isScriptBehavior,
  isVectorBehavior,
} from './base-behaviors/base-behaviors.typeguards';

function getInitialParticleState(): Omit<IParticle, 'view'> {
  return {
    speed: 0,
    deltaPath: {x: 0, y: 0},
    initialPosition: {x: 0, y: 0},
    direction: {x: 0, y: 0},
    speedBehavior: null,
    gravityBehavior: 0,
    pathFunc: null,
    usePathFunc: false,
    useGravity: false,

    next: null,
    prev: null,
    inUse: false,
    age: 0,
    lifeTime: 0,

    alphaBehavior: null,
    rotationBehavior: null,
    scaleBehavior: null,
    colorBehavior: null,
  };
}

export function createUnusedParticle(viewContainer: ViewContainer<ViewParticle>, view: ViewParticle): IParticle {
  viewContainer.addChild(view);
  view.visible = false;

  return {
    view,
    ...getInitialParticleState(),
  };
}

export function removeParticle(viewContainer: ViewContainer<ViewParticle>, particle: IParticle): void {
  viewContainer.removeChild(particle.view);
}

export function useParticle(particle: IParticle, config: ParticleConfig): void {
  Object.assign(particle, getInitialParticleState());

  particle.inUse = true;

  particle.view.visible = true;

  particle.lifeTime = getLifeTimeBehavior(config.lifeTime || DEFAULT_LIFE_TIME_CONFIG);
  particle.age = 0;

  particle.initialPosition = config.spawnShape
    ? getSpawnPosition(config.spawnShape, config.spawnPosition)
    : config.spawnPosition || {x: 0, y: 0};

  particle.view.x = particle.initialPosition.x;
  particle.view.y = particle.initialPosition.y;

  if (config.direction) {
    particle.direction = getDirection(config.direction);
  }

  if (config.speed) {
    if (isScalarStaticBehavior(config.speed)) {
      particle.speed = getStaticBehaviorValue(config.speed);
    } else if (isScriptBehaviorConfig(config.speed)) {
      particle.speedBehavior = getScriptBehavior(config.speed);
    } else if (isScalarBehaviorConfig(config.speed)) {
      particle.speedBehavior = getScalarBehavior(config.speed);
    }
  }

  if (config.alpha) {
    if (isScalarStaticBehavior(config.alpha)) {
      particle.view.alpha = getStaticBehaviorValue(config.alpha);
    } else if (isScriptBehaviorConfig(config.alpha)) {
      particle.alphaBehavior = getScriptBehavior(config.alpha);
    } else if (isScalarBehaviorConfig(config.alpha)) {
      particle.alphaBehavior = getScalarBehavior(config.alpha);
    }
  }

  if (config.rotation) {
    if (isScalarStaticBehavior(config.rotation)) {
      particle.view.angle = getStaticBehaviorValue(config.rotation);
    } else if (isDeltaBehaviorConfig(config.rotation)) {
      particle.rotationBehavior = getDeltaBehavior(config.rotation);
    } else if (isScalarBehaviorConfig(config.rotation)) {
      particle.rotationBehavior = getScalarBehavior(config.rotation);
    } else if (isScriptBehaviorConfig(config.rotation)) {
      particle.rotationBehavior = getScriptBehavior(config.rotation);
    }
  }

  if (config.scale) {
    if (isScalarStaticBehavior(config.scale)) {
      particle.view.scale.x = particle.view.scale.y = getStaticBehaviorValue(config.scale);
    } else if (isScalarBehaviorConfig(config.scale)) {
      particle.scaleBehavior = getScalarBehavior(config.scale);
    } else if (isScriptBehaviorConfig<Point2d>(config.scale)) {
      particle.scaleBehavior = getScriptBehavior<Point2d>(config.scale);
    } else if (isVectorBehaviorConfig(config.scale)) {
      particle.scaleBehavior = getVectorBehavior(config.scale);
    }
  }

  if (config.color) {
    if (isColorStaticBehaviorConfig(config.color)) {
      particle.view.tint = getColorStaticBehaviorValue(config.color);
    } else if (isColorDynamicBehaviorConfig(config.color)) {
      particle.colorBehavior = getColorDynamicBehavior(config.color);
    } else if (isColorScriptBehaviorConfig(config.color)) {
      particle.colorBehavior = getScriptBehavior<string>(config.color);
    }
  }

  if (config.gravity) {
    if (isScalarStaticBehavior(config.gravity)) {
      particle.gravityBehavior = getStaticBehaviorValue(config.gravity);
      particle.useGravity = true;
    } else if (isScalarDynamicBehavior(config.gravity)) {
      particle.gravityBehavior = getScalarBehavior(config.gravity);
      particle.useGravity = true;
    }
  }

  if (config.path) {
    particle.pathFunc = parsePath(config.path.path);
    particle.usePathFunc = true;
  }

  updateParticle(particle, 0, 0);
}

export function updateParticle(particle: IParticle, elapsedDelta: number, deltaMS: number): void {
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

export function noUseParticle(particle: IParticle): void {
  particle.view.visible = false;
  particle.inUse = false;
}

export function isParticleInUse(particle: IParticle): boolean {
  return particle.inUse;
}

export function createView(viewFactory: ViewRenderFn | ViewRenderFn[]): ViewParticle {
  return Array.isArray(viewFactory) ? realRandom.choice(viewFactory)() : viewFactory();
}

export function isParticleDead(particle: IParticle): boolean {
  return particle.age === particle.lifeTime;
}

export function wasParticleRemoved(particle: IParticle): boolean {
  return particle.view.destroyed;
}
