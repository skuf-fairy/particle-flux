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

  describe('Creating particles at a constant interval', () => {
    const initialConfig: ParticleFluxConfig = {
      emitterConfig: {
        spawnInterval: 2,
        autoStart: true,
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

    it('When the emitter is updated for the first time, the first particle should be created, since autoStart is passed: true', () => {
      particleEmitter.update(0, 0);
      expect(container.getParticlesCount()).toEqual(1);
    });

    it('Enough time has passed to create a second particle.', () => {
      particleEmitter.update(1, 1);
      particleEmitter.update(1, 1);

      expect(container.getParticlesCount()).toEqual(2);
    });

    it('Enough time has passed to create a third particle.', () => {
      particleEmitter.update(1, 1);
      particleEmitter.update(1, 1);
      particleEmitter.update(1, 1);

      expect(container.getParticlesCount()).toEqual(3);
    });
  });

  describe('Creating particles with timeout in mind', () => {
    const initialConfig: ParticleFluxConfig = {
      emitterConfig: {
        spawnTimeout: 2,
        spawnInterval: 2,
        autoStart: true,
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

    it('There should not be any particles yet during the initial update.', () => {
      particleEmitter.update(1, 0);
      expect(container.getParticlesCount()).toEqual(0);
    });

    it('At the first real update, the particles should not be there yet.', () => {
      particleEmitter.update(1, 1);
      expect(container.getParticlesCount()).toEqual(0);
    });

    it('Timeout is exhausted, it"s time to create the first particle', () => {
      particleEmitter.update(1, 1);
      expect(container.getParticlesCount()).toEqual(1);
    });

    it('It"s time to create a second particle', () => {
      particleEmitter.update(1, 2);
      expect(container.getParticlesCount()).toEqual(2);
    });
  });
});
