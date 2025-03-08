// core
export {ParticleFlux} from './core/ParticleFlux';
export {
  ParticleFluxConfig,
  ParticleBehaviorConfig,
  EmitterConfig,
  ViewContainer,
  ViewParticle,
  Multiplier,
  Point2d,
  IParticle,
  IParticleComponent,
  IParticleContainer,
  RangeValue,
} from './types';

export {isRangeValue} from './typeguards';

// behaviors
export {ScalarBehavior} from './base-behaviors/ScalarBehavior/ScalarBehavior';
export {ScriptBehavior} from './base-behaviors/ScriptBehavior/ScriptBehavior';
export {VectorBehavior} from './base-behaviors/VectorBehavior/VectorBehavior';
export {DeltaBehavior} from './base-behaviors/DeltaBehavior/DeltaBehavior';

export {isScriptBehaviorConfig} from './base-behaviors/ScriptBehavior/ScriptBehavior.typeguards';
export {isVectorBehaviorConfig} from './base-behaviors/VectorBehavior/VectorBehavior.typeguards';
export {
  isScalarDynamicBehavior,
  isScalarStaticBehavior,
  isScalarBehaviorConfig,
} from './base-behaviors/ScalarBehavior/ScalarBehavior.typeguards';
export {isDeltaBehaviorConfig} from './base-behaviors/DeltaBehavior/DeltaBehavior.typeguards';

// configs
export {
  ScalarBehaviorConfig,
  ScalarDynamicBehaviorConfig,
  ScalarStaticBehaviorConfig,
} from './base-behaviors/ScalarBehavior/ScalarBehavior.types';
export {ScriptBehaviorConfig, TimeScriptConfig} from './base-behaviors/ScriptBehavior/ScriptBehavior.types';
export {VectorBehaviorConfig} from './base-behaviors/VectorBehavior/VectorBehavior.types';
export {DeltaBehaviorConfig} from './base-behaviors/DeltaBehavior/DeltaBehavior.types';

export {AlphaBehaviorConfig} from './behaviors/AlphaBehavior/AlphaBehavior.types';
export {
  ColorBehaviorConfig,
  ColorDynamicBehaviorConfig,
  ColorStaticBehaviorConfig,
} from './behaviors/ColorBehavior/ColorBehavior.types';
export {
  isColorStaticBehaviorConfig,
  isColorDynamicBehaviorConfig,
  isColorScriptBehaviorConfig,
} from './behaviors/ColorBehavior/ColorBehavior.typeguards';
export {
  DirectionBehaviorConfig,
  DirectionRangeBehaviorConfig,
  StaticDirectionBehaviorConfig,
} from './behaviors/DirectionBehavior/DirectionBehavior.types';
export {
  isStaticDirectionBehaviorConfig,
  isDirectionRangeBehaviorConfig,
} from './behaviors/DirectionBehavior/DirectionBehavior.typeguards';
export {GravityBehaviorConfig} from './behaviors/GravityBehavior/GravityBehavior.types';
export {
  LifeTimeBehaviorConfig,
  LifeTimeRangeBehaviorConfig,
  LifeTimeStaticBehaviorConfig,
} from './behaviors/LifeTimeBehavior/LifeTimeBehavior.types';
export {
  isLifeTimeStaticBehaviorConfig,
  isLifeTimeRangeBehaviorConfig,
} from './behaviors/LifeTimeBehavior/LifeTimeBehavior.typeguards';
export {PathBehaviorConfig} from './behaviors/PathBehavior/PathBehavior.types';
export {ScaleBehaviorConfig} from './behaviors/ScaleBehavior/ScaleBehavior.types';
export {SpeedBehaviorConfig} from './behaviors/SpeedBehavior/SpeedBehavior.types';
export {RotationBehaviorConfig} from './behaviors/RotationBehavior/RotationBehavior.types';

export {
  SpawnRectangleShape,
  SpawnTorusShape,
  SpawnPointShape,
  PolygonalChainShape,
  SpawnShapeBehavior,
  SpawnShapeType,
} from './behaviors/SpawnBehaviors/SpawnBehaviors.types';

export {EasingName, EasingFunction} from './utils/easing/easing.types';
export {EASING_FUNCTIONS} from './utils/easing/easing-functions';
