// core
export {ParticleFlux} from './core/ParticleFlux';
export {ParticleBehaviorConfig, EmitterConfig, IVector2, ViewContainer, ViewParticle, Multiplicator} from './types';

// behaviors
export {ScalarBehavior} from './base-behaviors/ScalarBehavior/ScalarBehavior';
export {ScriptBehavior} from './base-behaviors/ScriptBehavior/ScriptBehavior';
export {VectorBehavior} from './base-behaviors/VectorBehavior/VectorBehavior';
export {
  isScalarBehaviorConfig,
  isScriptBehaviorConfig,
  isVectorBehaviorConfig,
} from './base-behaviors/base-behaviors.typeguards';

// configs
export {
  ScalarBehaviorConfig,
  ScalarDynamicBehaviorConfig,
  ScalarStaticBehaviorConfig,
} from './base-behaviors/ScalarBehavior/ScalarBehaviorConfig.types';
export {ScriptBehaviorConfig, TimeScriptConfig} from './base-behaviors/ScriptBehavior/ScriptBehavior.types';
export {VectorBehaviorConfig} from './base-behaviors/VectorBehavior/VectorBehavior.types';

export {AlphaBehaviorConfig} from './behaviors/AlphaBehavior/AlphaBehavior.types';
export {ColorBehaviorConfig} from './behaviors/ColorBehavior/ColorBehavior.types';
export {DirectionBehaviorConfig} from './behaviors/DirectionBehavior/DirectionBehavior.types';
export {GravityBehaviorConfig} from './behaviors/GravityBehavior/GravityBehavior.types';
export {LifeTimeBehaviorConfig} from './behaviors/LifeTimeBehavior/LifeTimeBehavior.types';
export {PathBehaviorConfig} from './behaviors/PathBehavior/PathBehavior.types';
export {ScaleBehaviorConfig} from './behaviors/ScaleBehavior/ScaleBehavior.types';
export {SpeedBehaviorConfig} from './behaviors/SpeedBehavior/SpeedBehavior.types';
export {ViewportLifeBehaviorConfig} from './behaviors/ViewportLifeBehavior/ViewportLifeBehavior.types';

// extra
export {
  SpawnRectangleShape,
  SpawnCircleShape,
  SpawnPointShape,
  PolygonalChainShape,
  SpawnShape,
  SpawnShapeType,
} from './behaviors/SpawnBehaviors/SpawnBehaviors.types';

export {
  GravityStaticBehaviorConfig,
  GravityRangeBehaviorConfig,
  isGravityStaticBehaviorConfig,
} from './behaviors/GravityBehavior/GravityBehavior.types';
