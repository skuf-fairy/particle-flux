import {SpawnShapeType} from '../core/spawn-shapes/spawn-shapes.types';
import {ParticleEmitterConfig, ViewParticle, ViewRenderFn} from '../types';
import {TestViewParticle} from './TestViewParticle';

// todo fixtures?
export const TEST_CONFIG = (): ParticleEmitterConfig => ({
  emitterConfig: {
    spawnInterval: 100,
    spawnTime: 10000,
    maxParticles: 10,
    spawnParticlesPerWave: 5,
  },
  particleConfig: {
    lifeTime: {
      value: 100,
    },
    scale: {
      value: 1,
    },
    alpha: {
      start: 0,
      end: 1,
    },
    color: {
      script: [
        {time: 0, value: '#ffffff'},
        {time: 100, value: '#000000'},
      ],
    },
    spawnShape: {
      shape: {
        type: SpawnShapeType.Rectangle,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
      },
    },
  },
});

export const TEST_VIEW_FACTORY: ViewRenderFn<ViewParticle> = (): ViewParticle => new TestViewParticle();
