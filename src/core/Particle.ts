import {IParticle, ParticleConfig, Point2d, ViewContainer, ViewParticle, ViewRenderFn} from '../types';
import {getLifeTimeBehavior} from './behaviors/life-time-behavior/LifeTimeBehavior';
import {getScalarBehavior} from './base-behaviors/scalar-behavior/ScalarBehavior';
import {isScalarBehaviorConfig} from './base-behaviors/scalar-behavior/ScalarBehavior.typeguards';
import {isScriptBehaviorConfig} from './base-behaviors/script-behavior/ScriptBehavior.typeguards';
import {getScriptBehavior} from './base-behaviors/script-behavior/ScriptBehavior';
import {getDirection} from './direction/getDirection';
import {realRandom} from '../utils/random/RealRandom';
import {Vector2Utils} from '../utils/Vector2Utils';
import {getDeltaBehavior} from './base-behaviors/delta-behavior/DeltaBehavior';
import {isDeltaBehaviorConfig} from './base-behaviors/delta-behavior/DeltaBehavior.typeguards';
import {isVectorBehaviorConfig} from './base-behaviors/vector-behavior/VectorBehavior.typeguards';
import {getVectorBehavior} from './base-behaviors/vector-behavior/VectorBehavior';
import {
  isColorDynamicBehaviorConfig,
  isColorScriptBehaviorConfig,
  isColorStaticBehaviorConfig,
} from '../core/behaviors/color-behavior/ColorBehavior.typeguards';
import {getColorDynamicBehavior} from '../core/behaviors/color-behavior/ColorDynamicBehavior/ColorDynamicBehavior';
import {getColorStaticBehavior} from '../core/behaviors/color-behavior/ColorStaticBehavior/ColorStaticBehavior';
import {parsePath} from '../utils/parsePath';
import {getSpawnPosition} from './spawn-shapes/getSpawnPosition';
import {DEFAULT_LIFE_TIME_CONFIG} from '../constants';

export const createParticle = (viewContainer: ViewContainer<ViewParticle>): IParticle => ({
  speed: 0,
  deltaPath: {x: 0, y: 0},
  initialPosition: {x: 0, y: 0},
  direction: {x: 0, y: 0},
  view: null,
  next: null,
  prev: null,
  inUse: false,
  lifeTimeBehavior: () => 0,
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

  particle.lifeTimeBehavior = getLifeTimeBehavior(config.lifeTime || DEFAULT_LIFE_TIME_CONFIG);

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
    if (isScriptBehaviorConfig(config.speed)) {
      particle.speedBehavior = getScriptBehavior(config.speed);
    } else if (isScalarBehaviorConfig(config.speed)) {
      particle.speedBehavior = getScalarBehavior(config.speed);
    }
  }

  if (config.alpha) {
    if (isScriptBehaviorConfig(config.alpha)) {
      particle.alphaBehavior = getScriptBehavior(config.alpha);
    } else if (isScalarBehaviorConfig(config.alpha)) {
      particle.alphaBehavior = getScalarBehavior(config.alpha);
    }
  }

  if (config.rotation) {
    if (isDeltaBehaviorConfig(config.rotation)) {
      particle.rotationBehavior = getDeltaBehavior(config.rotation);
    } else if (isScalarBehaviorConfig(config.rotation)) {
      particle.rotationBehavior = getScalarBehavior(config.rotation);
    } else if (isScriptBehaviorConfig(config.rotation)) {
      particle.rotationBehavior = getScriptBehavior(config.rotation);
    }
  }

  if (config.scale) {
    if (isScalarBehaviorConfig(config.scale)) {
      particle.scaleBehavior = (lifeTimeNormalizedProgress: number, elapsedDelta: number): Point2d => {
        // @ts-ignore
        const value = getScalarBehavior(config.scale)(lifeTimeNormalizedProgress, elapsedDelta);

        return {
          x: value,
          y: value,
        };
      };
    } else if (isScriptBehaviorConfig(config.scale)) {
      particle.scaleBehavior = (lifeTimeNormalizedProgress: number, elapsedDelta: number): Point2d => {
        // @ts-ignore
        const value = getScriptBehavior(config.scale)(lifeTimeNormalizedProgress, elapsedDelta);

        if (typeof value === 'number') {
          return {
            x: value,
            y: value,
          };
        } else {
          return value;
        }
      };
    } else if (isVectorBehaviorConfig(config.scale)) {
      particle.scaleBehavior = getVectorBehavior(config.scale);
    }
  }

  if (config.color) {
    if (isColorScriptBehaviorConfig(config.color)) {
      particle.colorBehavior = getScriptBehavior(config.color);
    } else if (isColorStaticBehaviorConfig(config.color)) {
      particle.colorBehavior = getColorStaticBehavior(config.color);
    } else if (isColorDynamicBehaviorConfig(config.color)) {
      particle.colorBehavior = getColorDynamicBehavior(config.color);
    }
  }

  if (config.gravity) {
    particle.gravityBehavior = getScalarBehavior(config.gravity);
  }

  if (config.path) {
    particle.pathFunc = parsePath(config.path.path);
  }

  updateParticle(particle, 0, 0);
}

export function updateParticle(particle: IParticle, elapsedDelta: number, deltaMS: number): void {
  if (!particle.inUse || particle.view === null) return;

  if (particle.view.destroyed) {
    noUseParticle(particle);
    return;
  }

  const lifeTimeNormalizedProgress = particle.lifeTimeBehavior(deltaMS);
  if (isDead(lifeTimeNormalizedProgress)) {
    noUseParticle(particle);
    return;
  }

  if (particle.speedBehavior !== null) {
    particle.speed = particle.speedBehavior(lifeTimeNormalizedProgress, elapsedDelta);
  }

  if (particle.alphaBehavior !== null) {
    particle.view.alpha = particle.alphaBehavior(lifeTimeNormalizedProgress, elapsedDelta);
  }

  if (particle.rotationBehavior !== null) {
    particle.view.angle = particle.rotationBehavior(lifeTimeNormalizedProgress, elapsedDelta);
  }

  if (particle.scaleBehavior !== null) {
    particle.view.scale = particle.scaleBehavior(lifeTimeNormalizedProgress, elapsedDelta);
  }

  if (particle.colorBehavior !== null) {
    particle.view.tint = particle.colorBehavior(lifeTimeNormalizedProgress, elapsedDelta);
  }

  const speed = particle.speed * elapsedDelta;

  if (particle.pathFunc !== null) {
    particle.deltaPath.x = particle.deltaPath.x + speed;
    particle.deltaPath.y = particle.pathFunc(particle.deltaPath.x);
    const delta = Vector2Utils.rotate(particle.deltaPath, -Math.PI / 2);

    particle.view.x = particle.initialPosition.x + delta.x;
    particle.view.y = particle.initialPosition.y + delta.y;
  } else {
    // todo наверное лучше накопление
    const gravityShift = particle.gravityBehavior
      ? particle.gravityBehavior(lifeTimeNormalizedProgress, elapsedDelta)
      : 0;

    particle.view.x += particle.direction.x * speed;
    particle.view.y += (particle.direction.y + gravityShift) * speed;
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

function isDead(lifeTimeNormalizedProgress: number): boolean {
  return lifeTimeNormalizedProgress === 1;
}
