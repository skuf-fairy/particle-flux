import {DEFAULT_LIFE_TIME_CONFIG} from '../../constants';
import {ViewParticle, IParticle, InitialViewState} from '../../types';
import {parsePath} from '../../utils/parsePath';
import {getLifeTimeBehavior} from '../behaviors/life-time-behavior/life-time-behavior';
import {ConfigManager} from '../ConfigManager';
import {isSpawnBurstDirectionBehaviorConfig} from '../direction/direction.typeguards';
import {SpawnParticleDirection} from '../direction/direction.types';
import {getDirection, getSpawnBurstDirection} from '../direction/getDirection';
import {ShapePointGenerator} from '../spawn-shapes/ShapePointGenerator';
import {getInitialParticleState} from './getInitialParticleState';
import {updateParticle} from './updateParticle';
import {getColorTimelapsesBehavior} from '../behaviors/color-timelapses/getColorTimelapsesBehavior';
import {lerp} from '../../utils/lerp';
import {getNumberTimelapsesBehavior} from '../behaviors/timelapses/getNumberTimelapsesBehavior';

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
    particle.speedBehavior = getNumberTimelapsesBehavior(config.speed);
  }

  if (config.alpha) {
    particle.alphaBehavior = getNumberTimelapsesBehavior(config.alpha);
  }

  if (config.rotation) {
    particle.rotationBehavior = getNumberTimelapsesBehavior(config.rotation);
  }

  if (config.scale) {
    particle.scaleBehavior = getNumberTimelapsesBehavior(config.scale);
  }

  if (config.color) {
    particle.colorBehavior = getColorTimelapsesBehavior(config.color);
  }

  if (config.gravity) {
    particle.gravityBehavior = getNumberTimelapsesBehavior(config.gravity);
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
