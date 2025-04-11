import {describe, expect, it} from 'vitest';
import {ParticleEmitter} from '../../core/ParticleEmitter';
import {TEST_VIEW_FACTORY} from '../constants';
import {TestViewContainer} from '../TestViewContainer';
import {ParticleEmitterConfig} from '../../types';

describe('ParticleEmitter', () => {
  it('Creating particles via emitOnce', () => {
    const initialConfig: ParticleEmitterConfig = {
      emitterConfig: {
        maxParticles: 10,
      },
      particleConfig: {
        lifeTime: {
          value: 100,
        },
      },
    };

    const particleEmitter = new ParticleEmitter(new TestViewContainer(), TEST_VIEW_FACTORY, initialConfig);

    particleEmitter.emitOnce(5);

    expect(particleEmitter.getParticlesCount()).toEqual(5);
    expect(particleEmitter.isEmitActive()).toEqual(true);

    particleEmitter.emitOnce(15);

    expect(particleEmitter.getParticlesCount()).toEqual(initialConfig.emitterConfig.maxParticles);
  });

  it('Creating particles via emitWave', () => {
    const initialConfig: ParticleEmitterConfig = {
      emitterConfig: {
        spawnParticlesPerWave: 10,
        maxParticles: 15,
      },
      particleConfig: {
        lifeTime: {
          value: 100,
        },
      },
    };

    const particleEmitter = new ParticleEmitter(new TestViewContainer(), TEST_VIEW_FACTORY, initialConfig);

    particleEmitter.emitWave();

    expect(particleEmitter.getParticlesCount()).toEqual(initialConfig.emitterConfig.spawnParticlesPerWave);
    expect(particleEmitter.isEmitActive()).toEqual(true);

    particleEmitter.emitWave();

    expect(particleEmitter.getParticlesCount()).toEqual(initialConfig.emitterConfig.maxParticles);
  });

  describe('Creating particles at a constant interval', () => {
    const initialConfig: ParticleEmitterConfig = {
      emitterConfig: {
        spawnInterval: 2,
        autoStart: true,
      },
      particleConfig: {
        lifeTime: {
          value: 100,
        },
      },
    };

    const particleEmitter = new ParticleEmitter(new TestViewContainer(), TEST_VIEW_FACTORY, initialConfig);

    it('When the emitter is updated for the first time, the first particle should be created, since autoStart is passed: true', () => {
      particleEmitter.update(0, 0);
      expect(particleEmitter.getParticlesCount()).toEqual(1);
    });

    it('Enough time has passed to create a second particle.', () => {
      particleEmitter.update(1, 1);
      particleEmitter.update(1, 1);

      expect(particleEmitter.getParticlesCount()).toEqual(2);
    });

    it('Enough time has passed to create a third particle.', () => {
      particleEmitter.update(1, 1);
      particleEmitter.update(1, 1);
      particleEmitter.update(1, 1);

      expect(particleEmitter.getParticlesCount()).toEqual(3);
    });
  });

  describe('Creating particles with timeout in mind', () => {
    const initialConfig: ParticleEmitterConfig = {
      emitterConfig: {
        spawnTimeout: 2,
        spawnInterval: 2,
        autoStart: true,
      },
      particleConfig: {
        lifeTime: {
          value: 100,
        },
      },
    };

    const particleEmitter = new ParticleEmitter(new TestViewContainer(), TEST_VIEW_FACTORY, initialConfig);

    it('There should not be any particles yet during the initial update.', () => {
      particleEmitter.update(1, 0);
      expect(particleEmitter.getParticlesCount()).toEqual(0);
    });

    it('At the first real update, the particles should not be there yet.', () => {
      particleEmitter.update(1, 1);
      expect(particleEmitter.getParticlesCount()).toEqual(0);
    });

    it('Timeout is exhausted, it"s time to create the first particle', () => {
      particleEmitter.update(1, 1);
      expect(particleEmitter.getParticlesCount()).toEqual(1);
    });

    it('It"s time to create a second particle', () => {
      particleEmitter.update(1, 2);
      expect(particleEmitter.getParticlesCount()).toEqual(2);
    });
  });
});
