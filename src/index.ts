export {ParticleFlux} from './core/ParticleFlux';
export {ParticleBehaviorConfig, EmitterConfig, IVector2, ViewParticle} from './types';

// behaviors
export {ScalarBehavior} from './base-behaviors/ScalarBehavior/ScalarBehavior';
export {ScriptBehavior} from './base-behaviors/ScriptBehavior/ScriptBehavior';
export {VectorBehavior} from './base-behaviors/VectorBehavior/VectorBehavior';

// configs
export {ScalarBehaviorConfig} from './base-behaviors/ScalarBehavior/ScalarBehaviorConfig.types';
export {AlphaBehaviorConfig} from './behaviors/AlphaBehavior/AlphaBehavior.types';
export {ColorBehaviorConfig} from './behaviors/ColorBehavior/ColorBehavior.types';
export {DirectionBehaviorConfig} from './behaviors/DirectionBehavior/DirectionBehavior.types';
export {GravityBehaviorConfig} from './behaviors/GravityBehavior/GravityBehavior.types';
export {LifeTimeBehaviorConfig} from './behaviors/LifeTimeBehavior/LifeTimeBehavior.types';
export {PathBehaviorConfig} from './behaviors/PathBehavior/PathBehavior.types';
export {ScaleBehaviorConfig} from './behaviors/ScaleBehavior/ScaleBehavior.types';
export {SpawnShape} from './behaviors/SpawnBehaviors/SpawnBehaviors.types';
export {SpeedBehaviorConfig} from './behaviors/SpeedBehavior/SpeedBehavior.types';
export {ViewportLifeBehaviorConfig} from './behaviors/ViewportLifeBehavior/ViewportLifeBehavior.types';

// extra
export {
  SpawnRectangleShape,
  SpawnCircleShape,
  SpawnPointShape,
  PolygonalChainShape,
} from './behaviors/SpawnBehaviors/SpawnBehaviors.types';

export {
  GravityStaticBehaviorConfig,
  GravityRangeBehaviorConfig,
  isGravityStaticBehaviorConfig,
} from './behaviors/GravityBehavior/GravityBehavior.types';
