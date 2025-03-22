// core
export {ParticleFlux} from './core/ParticleFlux';
export {
  ParticleFluxConfig,
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

// behaviors

export {isScriptBehaviorConfig} from './core/base-behaviors/script-behavior/ScriptBehavior.typeguards';
export {isVectorBehaviorConfig} from './core/base-behaviors/vector-behavior/VectorBehavior.typeguards';
export {
  isScalarDynamicBehavior,
  isScalarStaticBehavior,
  isScalarBehaviorConfig,
} from './core/base-behaviors/scalar-behavior/ScalarBehavior.typeguards';
export {isDeltaBehaviorConfig} from './core/base-behaviors/delta-behavior/DeltaBehavior.typeguards';

// configs
export {
  ScalarBehaviorConfig,
  ScalarDynamicBehaviorConfig,
  ScalarStaticBehaviorConfig,
} from './core/base-behaviors/scalar-behavior/ScalarBehavior.types';
export {ScriptBehaviorConfig, TimeScriptConfig} from './core/base-behaviors/script-behavior/ScriptBehavior.types';
export {VectorBehaviorConfig} from './core/base-behaviors/vector-behavior/VectorBehavior.types';
export {DeltaBehaviorConfig} from './core/base-behaviors/delta-behavior/DeltaBehavior.types';

export {AlphaBehaviorConfig} from './core/behaviors/alpha-behavior/AlphaBehavior.types';
export {
  ColorBehaviorConfig,
  ColorDynamicBehaviorConfig,
  ColorStaticBehaviorConfig,
} from './core/behaviors/color-behavior/ColorBehavior.types';
export {
  isColorStaticBehaviorConfig,
  isColorDynamicBehaviorConfig,
  isColorScriptBehaviorConfig,
} from './core/behaviors/color-behavior/ColorBehavior.typeguards';
export {DirectionConfig, DirectionRangeConfig, StaticDirectionConfig} from './core/direction/direction.types';
export {isStaticDirectionBehaviorConfig, isDirectionRangeBehaviorConfig} from './core/direction/direction.typeguards';
export {GravityBehaviorConfig} from './core/behaviors/gravity-behavior/GravityBehavior.types';
export {
  LifeTimeBehaviorConfig,
  LifeTimeRangeBehaviorConfig,
  LifeTimeStaticBehaviorConfig,
} from './core/behaviors/life-time-behavior/LifeTimeBehavior.types';
export {
  isLifeTimeStaticBehaviorConfig,
  isLifeTimeRangeBehaviorConfig,
} from './core/behaviors/life-time-behavior/LifeTimeBehavior.typeguards';
export {PathConfig} from './core/path/path.types';
export {ScaleBehaviorConfig} from './core/behaviors/scale-behavior/ScaleBehavior.types';
export {SpeedBehaviorConfig} from './core/behaviors/speed-behavior/SpeedBehavior.types';
export {RotationBehaviorConfig} from './core/behaviors/rotation-behavior/RotationBehavior.types';

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
