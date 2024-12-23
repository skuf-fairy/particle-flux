import {ParticleBehaviorConfig, ParticleLifeTimeBehaviorConfig, ParticleViewPortBehaviorConfig} from './types';

export function isParticleViewPortBehaviorConfig(
  config: ParticleBehaviorConfig,
): config is ParticleViewPortBehaviorConfig {
  return 'viewportLife' in config;
}

export function isParticleLifeTimeBehaviorConfig(
  config: ParticleBehaviorConfig,
): config is ParticleLifeTimeBehaviorConfig {
  return 'lifeTime' in config;
}
