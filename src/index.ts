// core
export {ParticleEmitter} from './core/ParticleEmitter';
export {
  ParticleEmitterConfig,
  ParticleConfig,
  EmitterConfig,
  ViewContainer,
  ViewParticle,
  Multiplier,
  Point2d,
  IParticle,
  IParticleContainer,
  RangeValue,
} from './types';

export {isRangeValue} from './typeguards';
export {isParticleDead} from './core/particle/isParticleDead';
export {isParticleInUse} from './core/particle/isParticleInUse';
export {noUseParticle} from './core/particle/noUseParticle';

// behaviors

export {isScriptBehaviorConfig} from './core/base-behaviors/script-behavior/script-behavior.typeguards';
export {isVectorBehaviorConfig} from './core/base-behaviors/vector-behavior/vector-behavior.typeguards';
export {
  isScalarDynamicBehavior,
  isScalarStaticBehavior,
  isScalarBehaviorConfig,
} from './core/base-behaviors/scalar-behavior/scalar-behavior.typeguards';
export {isDeltaBehaviorConfig} from './core/base-behaviors/delta-behavior/delta-behavior.typeguards';

// configs
export {
  ScalarBehaviorConfig,
  ScalarDynamicBehaviorConfig,
  ScalarStaticBehaviorConfig,
} from './core/base-behaviors/scalar-behavior/scalar-behavior.types';
export {ScriptBehaviorConfig, TimeScriptConfig} from './core/base-behaviors/script-behavior/script-behavior.types';
export {VectorBehaviorConfig} from './core/base-behaviors/vector-behavior/vector-behavior.types';
export {DeltaBehaviorConfig} from './core/base-behaviors/delta-behavior/delta-behavior.types';

export {AlphaBehaviorConfig} from './core/behaviors/alpha-behavior/alpha-behavior.types';
export {
  ColorBehaviorConfig,
  ColorDynamicBehaviorConfig,
  ColorStaticBehaviorConfig,
} from './core/behaviors/color-behavior/color-behavior.types';
export {
  isColorStaticBehaviorConfig,
  isColorDynamicBehaviorConfig,
  isColorScriptBehaviorConfig,
} from './core/behaviors/color-behavior/color-behavior.typeguards';
export {DirectionConfig, DirectionRangeConfig, StaticDirectionConfig} from './core/direction/direction.types';
export {isStaticDirectionBehaviorConfig, isDirectionRangeBehaviorConfig} from './core/direction/direction.typeguards';
export {GravityBehaviorConfig} from './core/behaviors/gravity-behavior/gravity-behavior.types';
export {
  LifeTimeBehaviorConfig,
  LifeTimeRangeBehaviorConfig,
  LifeTimeStaticBehaviorConfig,
} from './core/behaviors/life-time-behavior/life-time-behavior.types';
export {
  isLifeTimeStaticBehaviorConfig,
  isLifeTimeRangeBehaviorConfig,
} from './core/behaviors/life-time-behavior/life-time-behavior.typeguards';
export {PathConfig} from './core/path/path.types';
export {ScaleBehaviorConfig} from './core/behaviors/scale-behavior/scale-behavior.types';
export {SpeedBehaviorConfig} from './core/behaviors/speed-behavior/speed-behavior.types';
export {RotationBehaviorConfig} from './core/behaviors/rotation-behavior/rotation-behavior.types';
export {SpawnPositionConfig} from './core/spawn-position/spawn-position.types';

export {
  SpawnRectangleShape,
  SpawnTorusShape,
  SpawnPointShape,
  PolygonalChainShape,
  SpawnShapeBehavior,
  SpawnShapeType,
  Chain,
  PolygonalChain,
} from './core/spawn-shapes/spawn-shapes.types';
export {
  isSinglePolygonalChain,
  isSpawnPointShape,
  isSpawnRectangleShape,
  isTorusShape,
  isPolygonalShape,
} from './core/spawn-shapes/spawn-shapes.typeguards';

export {EasingName, EasingFunction} from './utils/easing/easing.types';
export {EASING_FUNCTIONS} from './utils/easing/easing-functions';
