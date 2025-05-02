import {DEFAULT_LIFE_TIME_CONFIG} from '../../constants';
import {ViewParticle, IParticle, ParticleConfig, Point2d, InitialViewState} from '../../types';
import {parsePath} from '../../utils/parsePath';
import {getDeltaBehavior} from '../base-behaviors/delta-behavior/delta-behavior';
import {isDeltaBehaviorConfig} from '../base-behaviors/delta-behavior/delta-behavior.typeguards';
import {getStaticBehaviorValue, getScalarBehavior} from '../base-behaviors/scalar-behavior/scalar-behavior';
import {
  isScalarStaticBehaviorConfig,
  isScalarTransitionBehaviorConfig,
} from '../base-behaviors/scalar-behavior/scalar-behavior.typeguards';
import {isNumberScriptBehaviorConfig} from '../base-behaviors/script-behavior/number-script-behavior/number-script-behavior.typeguards';
import {isPoint2dScriptBehaviorConfig} from '../base-behaviors/script-behavior/point2d-script-behavior/point2d-script-behavior.typeguards';
import {getScriptBehavior} from '../base-behaviors/script-behavior/script-behavior';
import {isScriptBehaviorConfig} from '../base-behaviors/script-behavior/script-behavior.typeguards';
import {getVectorBehavior} from '../base-behaviors/vector-behavior/vector-behavior';
import {isVectorBehaviorConfig} from '../base-behaviors/vector-behavior/vector-behavior.typeguards';
import {
  isColorStaticBehaviorConfig,
  isColorDynamicBehaviorConfig,
} from '../behaviors/color-behavior/color-behavior.typeguards';
import {getColorStaticBehaviorValue, getColorDynamicBehavior} from '../behaviors/color-behavior/color-dynamic-behavior';
import {isColorScriptBehaviorConfig} from '../behaviors/color-behavior/color-script-behavior/color-script-behavior.typeguards';
import {getLifeTimeBehavior} from '../behaviors/life-time-behavior/life-time-behavior';
import {getDirection} from '../direction/getDirection';
import {ShapePointGenerator} from '../spawn-shapes/ShapePointGenerator';
import {getInitialParticleState} from './getInitialParticleState';
import {updateParticle} from './updateParticle';

// todo перенести
const scaleCache = {x: 0, y: 0};

export function useParticle<View extends ViewParticle>(
  particle: IParticle<View>,
  config: ParticleConfig,
  shapePointGenerator: ShapePointGenerator,
): void {
  const view = particle.view;
  const initialViewState = particle.initialViewState;

  resetParticleViewToInitialState(view, initialViewState);

  Object.assign(particle, getInitialParticleState());

  particle.inUse = true;

  particle.view.visible = true;

  particle.lifeTime = getLifeTimeBehavior(config.lifeTime || DEFAULT_LIFE_TIME_CONFIG);
  particle.age = 0;

  particle.initialPosition = config.spawnShape
    ? shapePointGenerator.getShapeRandomPoint(config.spawnShape.shape, config.spawnPosition)
    : config.spawnPosition || {x: 0, y: 0};

  view.x = particle.initialPosition.x;
  view.y = particle.initialPosition.y;

  if (config.direction) {
    const direction = getDirection(config.direction);
    particle.direction = direction.vector;
    particle.isRotateByDirection = config.direction.isRotateByDirection === true;

    if (particle.isRotateByDirection) {
      view.angle = particle.directionRotation = direction.angle;
    }
  }

  if (config.speed) {
    if (isScalarStaticBehaviorConfig(config.speed)) {
      particle.speed = getStaticBehaviorValue(config.speed);
    } else if (isScriptBehaviorConfig(config.speed)) {
      particle.speedBehavior = getScriptBehavior(config.speed);
    } else if (isScalarTransitionBehaviorConfig(config.speed)) {
      particle.speedBehavior = getScalarBehavior(config.speed);
    }
  }

  if (config.alpha) {
    if (isScalarStaticBehaviorConfig(config.alpha)) {
      view.alpha = getStaticBehaviorValue(config.alpha);
    } else if (isScriptBehaviorConfig(config.alpha)) {
      particle.alphaBehavior = getScriptBehavior(config.alpha);
    } else if (isScalarTransitionBehaviorConfig(config.alpha)) {
      particle.alphaBehavior = getScalarBehavior(config.alpha);
    }
  }

  if (config.rotation) {
    if (isDeltaBehaviorConfig(config.rotation)) {
      particle.rotationBehavior = getDeltaBehavior(config.rotation);
    } else if (isScalarStaticBehaviorConfig(config.rotation)) {
      view.angle += getStaticBehaviorValue(config.rotation);
    } else if (isScalarTransitionBehaviorConfig(config.rotation)) {
      particle.rotationBehavior = getScalarBehavior(config.rotation);
    } else if (isScriptBehaviorConfig(config.rotation)) {
      particle.rotationBehavior = getScriptBehavior(config.rotation);
    }
  }

  if (config.scale) {
    if (isScalarStaticBehaviorConfig(config.scale)) {
      scaleCache.x = scaleCache.y = getStaticBehaviorValue(config.scale);
      view.scale = scaleCache;
    } else if (isScalarTransitionBehaviorConfig(config.scale)) {
      particle.scaleBehavior = getScalarBehavior(config.scale);
    } else if (isNumberScriptBehaviorConfig(config.scale)) {
      particle.scaleBehavior = getScriptBehavior<number>(config.scale);
    } else if (isPoint2dScriptBehaviorConfig(config.scale)) {
      particle.scaleBehavior = getScriptBehavior<Point2d>(config.scale);
    } else if (isVectorBehaviorConfig(config.scale)) {
      particle.scaleBehavior = getVectorBehavior(config.scale);
    }
  }

  if (config.color) {
    if (isColorStaticBehaviorConfig(config.color)) {
      view.tint = getColorStaticBehaviorValue(config.color);
    } else if (isColorDynamicBehaviorConfig(config.color)) {
      particle.colorBehavior = getColorDynamicBehavior(config.color);
    } else if (isColorScriptBehaviorConfig(config.color)) {
      particle.colorBehavior = getScriptBehavior<string>(config.color);
    }
  }

  if (config.gravity) {
    if (isDeltaBehaviorConfig(config.gravity)) {
      particle.gravityBehavior = getDeltaBehavior(config.gravity);
    } else if (isScalarStaticBehaviorConfig(config.gravity)) {
      particle.gravityBehavior = getStaticBehaviorValue(config.gravity);
    } else if (isScalarTransitionBehaviorConfig(config.gravity)) {
      particle.gravityBehavior = getScalarBehavior(config.gravity);
    } else if (isScriptBehaviorConfig(config.gravity)) {
      particle.gravityBehavior = getScriptBehavior(config.gravity);
    }
  }

  if (config.path) {
    particle.pathFunc = parsePath(config.path.path);
  }

  updateParticle(particle, 0, 0);
}

function resetParticleViewToInitialState(view: ViewParticle, initialViewState: InitialViewState): void {
  view.scale = initialViewState.scale;
  view.alpha = initialViewState.alpha;
  view.tint = initialViewState.tint;
  view.angle = initialViewState.angle;
}
