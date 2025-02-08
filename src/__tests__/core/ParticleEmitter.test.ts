import {describe, expect, it} from 'vitest';
import {TestTicker} from '../TestTicker';
import {ParticleEmitter} from '../../core/ParticleEmitter';
import {ParticleContainer} from '../../core/ParticleContainer';
import {ConfigManager} from '../../core/ConfigManager';
import {ParticleBehaviorFactory} from '../../core/ParticleBehaviorFactory';
import {TEST_VIEW_FACTORY} from '../constants';
import {TestViewContainer} from '../TestViewContainer';
import {ParticleFluxConfig} from '../../types';

describe('ParticleEmitter', () => {
  it('Creating particles via emitOnce', () => {
    const initialConfig: ParticleFluxConfig = {
      emitterConfig: {
        maxParticles: 10,
      },
      particleBehaviorsConfig: {
        lifeTime: {
          value: 100,
        },
      },
    };
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();
    const factory = new ParticleBehaviorFactory(viewContainer, configManager);
    const container = new ParticleContainer(factory);

    const particleEmitter = new ParticleEmitter(container, configManager, new TestTicker());

    particleEmitter.emitOnce(5);

    expect(container.getParticlesCount()).toEqual(5);
    expect(particleEmitter.isActive()).toEqual(true);

    particleEmitter.emitOnce(15);

    expect(container.getParticlesCount()).toEqual(initialConfig.emitterConfig.maxParticles);
  });

  it('Creating particles via emitWave', () => {
    const initialConfig: ParticleFluxConfig = {
      emitterConfig: {
        spawnParticlesPerWave: 10,
        maxParticles: 15,
      },
      particleBehaviorsConfig: {
        lifeTime: {
          value: 100,
        },
      },
    };
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();
    const factory = new ParticleBehaviorFactory(viewContainer, configManager);
    const container = new ParticleContainer(factory);

    const particleEmitter = new ParticleEmitter(container, configManager, new TestTicker());

    particleEmitter.emitWave();

    expect(container.getParticlesCount()).toEqual(initialConfig.emitterConfig.spawnParticlesPerWave);
    expect(particleEmitter.isActive()).toEqual(true);

    particleEmitter.emitWave();

    expect(container.getParticlesCount()).toEqual(initialConfig.emitterConfig.maxParticles);
  });
});
