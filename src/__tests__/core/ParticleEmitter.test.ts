import {describe, expect, it} from 'vitest';
import {ParticleEmitter} from '../../core/ParticleEmitter';
import {TEST_VIEW_FACTORY} from '../constants';
import {TestViewContainer} from '../TestViewContainer';
import {ParticleEmitterConfig} from '../../types';
import {STANDARD_DELTA_MS} from '../../utils/Ticker';

describe('ParticleEmitter', () => {
  it('Creating particles via emitOnce', () => {
    const initialConfig: ParticleEmitterConfig = {
      emitterConfig: {
        maxParticles: 10,
        autoStart: false,
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
        autoStart: false,
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
        spawnInterval: 3,
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
      expect(particleEmitter.getParticlesCount()).toEqual(1); // первая частица создалась при создании эмиттера, так autoStart:true
    });

    it('Enough time has passed to create a second particle.', () => {
      const lastReport = {...particleEmitter.update(1, 3)};
      expect(lastReport.currentTime).toEqual(3);
      expect(lastReport.particleCreatedCount).toEqual(1);
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
        autoStart: false,
      },
      particleConfig: {
        lifeTime: {
          value: 100,
        },
      },
    };

    const particleEmitter = new ParticleEmitter(new TestViewContainer(), TEST_VIEW_FACTORY, initialConfig);

    it('Первая частица не должна быть создана, так как передан таймаут', () => {
      const report = {...particleEmitter.update(0, 0)};
      expect(report.currentTime).toEqual(-2);
      expect(report.particleCreatedCount).toEqual(0);
      expect(particleEmitter.getParticlesCount()).toEqual(0);
    });

    it('Timeout is exhausted, it"s time to create the first particle', () => {
      const report = {...particleEmitter.update(1, 2)};
      expect(report.currentTime).toEqual(0);
      expect(report.particleCreatedCount).toEqual(1);
      expect(particleEmitter.getParticlesCount()).toEqual(1);
    });

    it('It"s time to create a second particle', () => {
      const report = {...particleEmitter.update(1, 2)};
      expect(report.currentTime).toEqual(2);
      expect(report.particleCreatedCount).toEqual(1);
      expect(particleEmitter.getParticlesCount()).toEqual(2);
    });
  });

  describe('Создание частиц по интервалу', () => {
    describe('Интервал меньше дельты между кадрами', () => {
      const spawnInterval = 5;
      const initialConfig: ParticleEmitterConfig = {
        emitterConfig: {
          spawnInterval: spawnInterval,
          autoStart: false,
        },
        particleConfig: {
          lifeTime: {
            value: 100,
          },
        },
      };

      const particleEmitter = new ParticleEmitter(new TestViewContainer(), TEST_VIEW_FACTORY, initialConfig);

      const report0 = {...particleEmitter.update(1, STANDARD_DELTA_MS)};
      const report1 = {...particleEmitter.update(1, STANDARD_DELTA_MS)};
      const report2 = {...particleEmitter.update(1, STANDARD_DELTA_MS)};

      it('Cоздано верное количество частиц', () => {
        expect(report0.particleCreatedCount).toEqual(3);
        expect(report1.particleCreatedCount).toEqual(3);
        expect(report2.particleCreatedCount).toEqual(4); // успевает заспавниться еще одна
        expect(particleEmitter.getParticlesCount()).toEqual(10);
      });

      it('Верные временные интервалы', () => {
        expect(report0.currentTime).toEqual(STANDARD_DELTA_MS);
        expect(report0.spawnTimeDelta).toEqual(STANDARD_DELTA_MS - spawnInterval);
        expect(report1.currentTime).toEqual(STANDARD_DELTA_MS * 2);
        expect(report1.spawnTimeDelta).toEqual(STANDARD_DELTA_MS * 2 - (report0.prevSpawnTime + spawnInterval));
        expect(report1.prevSpawnTime).toEqual(report0.prevSpawnTime + spawnInterval * report0.particleCreatedCount);
        expect(report2.spawnTimeDelta).toEqual(STANDARD_DELTA_MS * 3 - (report1.prevSpawnTime + spawnInterval));
        expect(report2.currentTime).toEqual(STANDARD_DELTA_MS * 3);
        expect(report2.prevSpawnTime).toEqual(report1.prevSpawnTime + spawnInterval * report2.particleCreatedCount);
      });
    });

    describe('Интервал больше дельты между кадрами', () => {
      // 4 - просто константа, чтобы сдвинуть время спавна на промежуток после первого обновления
      const spawnInterval = STANDARD_DELTA_MS * 2 + 4;
      const initialConfig: ParticleEmitterConfig = {
        emitterConfig: {
          spawnInterval: spawnInterval,
          autoStart: false,
        },
        particleConfig: {
          lifeTime: {
            value: 100,
          },
        },
      };

      const particleEmitter = new ParticleEmitter(new TestViewContainer(), TEST_VIEW_FACTORY, initialConfig);

      const report0 = {...particleEmitter.update(1, STANDARD_DELTA_MS)};
      const report1 = {...particleEmitter.update(1, STANDARD_DELTA_MS)};
      const report2 = {...particleEmitter.update(1, STANDARD_DELTA_MS)};

      it('Cоздано верное количество частиц', () => {
        expect(report0.particleCreatedCount).toEqual(0);
        expect(report1.particleCreatedCount).toEqual(0);
        expect(report2.particleCreatedCount).toEqual(1);
        expect(particleEmitter.getParticlesCount()).toEqual(1);
      });

      it('Верные временные интервалы', () => {
        expect(report0.currentTime).toEqual(STANDARD_DELTA_MS);
        expect(report0.prevSpawnTime).toEqual(0);
        expect(report1.currentTime).toEqual(STANDARD_DELTA_MS * 2);
        expect(report1.spawnTimeDelta).toEqual(0);
        expect(report1.prevSpawnTime).toEqual(0);
        expect(report2.spawnTimeDelta).toEqual(STANDARD_DELTA_MS * 3 - spawnInterval);
        expect(report2.currentTime).toEqual(STANDARD_DELTA_MS * 3);
        expect(report2.prevSpawnTime).toEqual(spawnInterval);
      });
    });
  });
});
