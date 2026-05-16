// core
export {ParticleEmitter} from './core/ParticleEmitter';
export {
  ParticleEmitterConfig,
  ParticleConfig,
  EmitterConfig,
  ViewContainer,
  ViewParticle,
  Point2d,
  IParticle,
  IParticleContainer,
  RandomRange,
} from './types';

export {isParticleDead} from './core/particle/isParticleDead';
export {isParticleInUse} from './core/particle/isParticleInUse';
export {noUseParticle} from './core/particle/noUseParticle';

// configs

export {
  TimelapsesConfig,
  TimelapsesBehavior,
  TimelapsesArray,
  NumberTimelapsesConfig,
} from './core/behaviors/particle-value/timelapses.types';
export {START_SCRIPT_TIME, END_SCRIPT_TIME} from './core/behaviors/particle-value/timelapses.constants';

export {
  DirectionConfig,
  RangeDirectionConfig,
  StaticDirectionConfig,
  SpawnBurstDirectionConfig,
} from './core/behaviors/direction/direction.types';
export {
  isStaticDirectionBehaviorConfig,
  isDirectionRangeBehaviorConfig,
  isSpawnBurstDirectionBehaviorConfig,
} from './core/behaviors/direction/direction.typeguards';
export {
  LifeTimeBehaviorConfig,
  LifeTimeRangeBehaviorConfig,
  LifeTimeStaticBehaviorConfig,
} from './core/behaviors/life-time-behavior/life-time-behavior.types';
export {
  isLifeTimeStaticBehaviorConfig,
  isLifeTimeRangeBehaviorConfig,
} from './core/behaviors/life-time-behavior/life-time-behavior.typeguards';
export {PathConfig} from './core/behaviors/path/path.types';
export {SpawnPositionConfig} from './core/spawn-position/spawn-position.types';

export {
  SpawnRectangleShape,
  SpawnTorusShape,
  SpawnPointShape,
  SpawnChainShape,
  SpawnShapeBehavior,
  SpawnShapeType,
  Chain,
  SpawnShape,
} from './core/spawn-shapes/spawn-shapes.types';
export {
  isSpawnPointShape,
  isSpawnRectangleShape,
  isSpawnTorusShape,
  isSpawnChainShape,
} from './core/spawn-shapes/spawn-shapes.typeguards';
export {SPAWN_SHAPE_TYPES_LIST} from './core/spawn-shapes/spawn-shapes.constants';

export {EasingName, EasingFunction} from './utils/easing/easing.types';
export {EASING_FUNCTIONS} from './utils/easing/easing.functions';
export {EASING_NAME_LIST} from './utils/easing/easing.constants';
