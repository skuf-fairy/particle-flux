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
  it('Создаем частицы через emitOnce', () => {
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

    expect(container.getActiveParticlesCount()).toEqual(5);
    expect(particleEmitter.isActive()).toEqual(true);

    particleEmitter.emitOnce(15);

    expect(container.getActiveParticlesCount()).toEqual(initialConfig.emitterConfig.maxParticles);
  });

  it('Создаем частицы через emitWave', () => {
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

    expect(container.getActiveParticlesCount()).toEqual(initialConfig.emitterConfig.spawnParticlesPerWave);
    expect(particleEmitter.isActive()).toEqual(true);

    particleEmitter.emitWave();

    expect(container.getActiveParticlesCount()).toEqual(initialConfig.emitterConfig.maxParticles);
  });

  // todo
  // it('', () => {
  //   const spawnTime = 200;
  //   const initialConfig: ParticleFluxConfig = {
  //     emitterConfig: {
  //       spawnInterval: 10,
  //       spawnTime,
  //     },
  //     particleBehaviorsConfig: {
  //       lifeTime: {
  //         value: 50,
  //       },
  //     },
  //   };
  //   const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
  //   const viewContainer = new TestViewContainer();
  //   const factory = new ParticleBehaviorFactory(viewContainer, configManager);
  //   const container = new ParticleContainer(factory);

  //   const particleEmitter = new ParticleEmitter(container, configManager, new TestTicker());

  //   particleEmitter.startEmit();

  //   let time = 0;
  //   while (time <= spawnTime) {
  //     particleEmitter.update(1, 10);
  //     time += 10;

  //     if (time % 10 === 0) {
  //     }
  //   }
  // });
});
