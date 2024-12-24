import {
  NumberValue,
  ParticleBehaviorConfig,
  ParticleLifeTimeBehaviorConfig,
  ParticleViewPortBehaviorConfig,
  RangeValue,
} from './types';

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

export function isRangeValue(value: NumberValue): value is RangeValue {
  if (typeof value === 'number') return false;

  return 'min' in value && 'max' in value;
}
