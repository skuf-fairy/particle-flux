import {DEFAULT_LIFE_TIME_CONFIG} from '../../constants';
import {ViewParticle, IParticle, InitialViewState} from '../../types';
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
import {isScriptBehaviorConfig} from '../base-behaviors/script-behavior/script-behavior.typeguards';
import {getVectorBehavior} from '../base-behaviors/vector-behavior/vector-behavior';
import {isVectorBehaviorConfig} from '../base-behaviors/vector-behavior/vector-behavior.typeguards';
import {
  isColorStaticBehaviorConfig,
  isColorTransitionBehaviorConfig,
} from '../behaviors/color-behavior/color-behavior.typeguards';
import {
  getColorStaticBehaviorValue,
  getColorTransitionBehavior,
} from '../behaviors/color-behavior/color-transition-behavior';
import {isColorScriptBehaviorConfig} from '../behaviors/color-behavior/color-script-behavior/color-script-behavior.typeguards';
import {getLifeTimeBehavior} from '../behaviors/life-time-behavior/life-time-behavior';
import {ConfigManager} from '../ConfigManager';
import {isSpawnBurstDirectionBehaviorConfig} from '../direction/direction.typeguards';
import {SpawnParticleDirection} from '../direction/direction.types';
import {getDirection, getSpawnBurstDirection} from '../direction/getDirection';
import {ShapePointGenerator} from '../spawn-shapes/ShapePointGenerator';
import {getInitialParticleState} from './getInitialParticleState';
import {updateParticle} from './updateParticle';
import {GravityBehaviorConfig} from '../behaviors/gravity-behavior/gravity-behavior.types';
import {ColorBehaviorConfig} from '../behaviors/color-behavior/color-behavior.types';
import {ScaleBehaviorConfig} from '../behaviors/scale-behavior/scale-behavior.types';
import {RotationBehaviorConfig} from '../behaviors/rotation-behavior/rotation-behavior.types';
import {AlphaBehaviorConfig} from '../behaviors/alpha-behavior/alpha-behavior.types';
import {SpeedBehaviorConfig} from '../behaviors/speed-behavior/speed-behavior.types';
import {getNumberScriptBehavior} from '../base-behaviors/script-behavior/number-script-behavior/number-script-behavior';
import {getPoint2dScriptBehavior} from '../base-behaviors/script-behavior/point2d-script-behavior/point2d-script-behavior';
import {getColorScriptBehavior} from '../behaviors/color-behavior/color-script-behavior/color-script-behavior';

const scaleCache = {x: 0, y: 0};

export function useParticle<View extends ViewParticle>(
  particle: IParticle<View>,
  config: ConfigManager<View>,
  shapePointGenerator: ShapePointGenerator,
  waveParticleIndex: number,
): void {
  const view = particle.view;

  // нужно сбросить частицу в изначально состояние, так как конфиг мог измениться
  const initialViewState = particle.initialViewState;

  Object.assign(particle, {...getInitialParticleState(), initialViewState});

  resetParticleViewToInitialState(view, initialViewState);

  // частица теперь используется
  particle.inUse = true;
  // показываем ее
  particle.view.visible = true;

  particle.lifeTime = getLifeTimeBehavior(config.lifeTime || DEFAULT_LIFE_TIME_CONFIG);
  particle.age = 0;

  const initialPosition = config.spawnShape
    ? shapePointGenerator.getShapeRandomPoint(config.spawnShape.shape, config.spawnPosition)
    : config.spawnPosition;

  particle.initialPosition.x = initialPosition.x;
  particle.initialPosition.y = initialPosition.y;

  view.x = particle.initialPosition.x;
  view.y = particle.initialPosition.y;

  let direction: SpawnParticleDirection;

  if (isSpawnBurstDirectionBehaviorConfig(config.direction)) {
    direction = getSpawnBurstDirection(config.direction, waveParticleIndex);
  } else {
    direction = getDirection(config.direction);
  }

  particle.direction = direction.vector;
  particle.isRotateByDirection = config.direction.isRotateByDirection === true;

  if (particle.isRotateByDirection) {
    view.angle = particle.directionRotation = direction.angle;
  }

  if (config.speed) {
    setSpeed(particle, config.speed);
  }

  if (config.alpha) {
    setAlpha(particle, config.alpha);
  }

  if (config.rotation) {
    setRotation(particle, config.rotation);
  }

  if (config.scale) {
    setScaleConfig(particle, config.scale);
  }

  if (config.color) {
    setColor(particle, config.color);
  }

  if (config.gravity) {
    setGravity(particle, config.gravity);
  }

  if (config.path) {
    particle.pathFunc = parsePath(config.path.path);
  }

  updateParticle(particle, 0, 0);
}

function setSpeed(particle: IParticle<ViewParticle>, config: SpeedBehaviorConfig) {
  if (isScalarStaticBehaviorConfig(config)) {
    particle.speed = getStaticBehaviorValue(config);
  } else if (isScriptBehaviorConfig(config)) {
    particle.speedBehavior = getNumberScriptBehavior(config);
  } else if (isScalarTransitionBehaviorConfig(config)) {
    particle.speedBehavior = getScalarBehavior(config);
  }
}

function setAlpha(particle: IParticle<ViewParticle>, config: AlphaBehaviorConfig) {
  if (isScalarStaticBehaviorConfig(config)) {
    particle.view.alpha = getStaticBehaviorValue(config);
  } else if (isScriptBehaviorConfig(config)) {
    particle.alphaBehavior = getNumberScriptBehavior(config);
  } else if (isScalarTransitionBehaviorConfig(config)) {
    particle.alphaBehavior = getScalarBehavior(config);
  }
}

function setRotation(particle: IParticle<ViewParticle>, config: RotationBehaviorConfig) {
  if (isDeltaBehaviorConfig(config)) {
    particle.rotationBehavior = getDeltaBehavior(config);
  } else if (isScalarStaticBehaviorConfig(config)) {
    particle.view.angle += getStaticBehaviorValue(config);
  } else if (isScalarTransitionBehaviorConfig(config)) {
    particle.rotationBehavior = getScalarBehavior(config);
  } else if (isScriptBehaviorConfig(config)) {
    particle.rotationBehavior = getNumberScriptBehavior(config);
  }
}

function setScaleConfig(particle: IParticle<ViewParticle>, config: ScaleBehaviorConfig) {
  if (isScalarStaticBehaviorConfig(config)) {
    scaleCache.x = scaleCache.y = getStaticBehaviorValue(config);
    particle.view.scale = scaleCache;
  } else if (isScalarTransitionBehaviorConfig(config)) {
    particle.scaleBehavior = getScalarBehavior(config);
  } else if (isNumberScriptBehaviorConfig(config)) {
    particle.scaleBehavior = getNumberScriptBehavior(config);
  } else if (isPoint2dScriptBehaviorConfig(config)) {
    particle.scaleBehavior = getPoint2dScriptBehavior(config);
  } else if (isVectorBehaviorConfig(config)) {
    particle.scaleBehavior = getVectorBehavior(config);
  }
}

function setGravity(particle: IParticle<ViewParticle>, config: GravityBehaviorConfig): void {
  if (isDeltaBehaviorConfig(config)) {
    particle.gravityBehavior = getDeltaBehavior(config);
  } else if (isScalarStaticBehaviorConfig(config)) {
    particle.gravityBehavior = getStaticBehaviorValue(config);
  } else if (isScalarTransitionBehaviorConfig(config)) {
    particle.gravityBehavior = getScalarBehavior(config);
  } else if (isScriptBehaviorConfig(config)) {
    particle.gravityBehavior = getNumberScriptBehavior(config);
  }
}

function setColor(particle: IParticle<ViewParticle>, config: ColorBehaviorConfig) {
  if (isColorStaticBehaviorConfig(config)) {
    particle.view.tint = getColorStaticBehaviorValue(config);
  } else if (isColorTransitionBehaviorConfig(config)) {
    particle.colorBehavior = getColorTransitionBehavior(config);
  } else if (isColorScriptBehaviorConfig(config)) {
    particle.colorBehavior = getColorScriptBehavior(config);
  }
}

function resetParticleViewToInitialState(view: ViewParticle, initialViewState: InitialViewState): void {
  view.scale = initialViewState.scale;
  view.alpha = initialViewState.alpha;
  view.tint = initialViewState.tint;
  view.angle = initialViewState.angle;
}
