import {describe, expect, it} from 'vitest';
import {ParticleContainer} from '../../core/ParticleContainer';
import {TEST_CONFIG, TEST_VIEW_FACTORY} from '../constants';
import {ConfigManager} from '../../core/ConfigManager';
import {TestViewContainer} from '../TestViewContainer';
import {ParticleBehaviorFactory} from '../../core/ParticleBehaviorFactory';

describe('ParticleContainer', () => {
  const initialConfig = TEST_CONFIG();
  const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
  const viewContainer = new TestViewContainer();
  const factory = new ParticleBehaviorFactory(viewContainer, configManager);
  const container = new ParticleContainer(factory);

  const p1 = container.addParticle();
  const p2 = container.addParticle();

  it('Добавили несколько частиц', () => {
    expect(container.getActiveParticlesCount()).toEqual(2);
    expect(container.getParticles()).toEqual([p1, p2]);
  });

  it('Контейнер обновился', () => {
    container.update(1, 10);

    expect(container.getActiveParticlesCount()).toEqual(2);
    expect(container.getParticles()).toEqual([p1, p2]);
    expect(p1.shouldDestroy).toEqual(false);
    expect(p2.shouldDestroy).toEqual(false);
  });

  it('Одна из частиц уничтожилась', () => {
    p1.shouldDestroy = true;

    expect(container.getActiveParticlesCount()).toEqual(1);
    expect(container.getParticles()).toEqual([p2]);
    expect(p1.shouldDestroy).toEqual(true);
    expect(p2.shouldDestroy).toEqual(false);
  });

  it('Контейнер обновился', () => {
    container.update(1, 10);

    expect(container.getActiveParticlesCount()).toEqual(1);
    expect(container.getParticles()).toEqual([p2]);
    expect(p1.shouldDestroy).toEqual(true);
    expect(p2.shouldDestroy).toEqual(false);
  });

  it('Очистили контейнер', () => {
    container.clear();

    expect(container.getActiveParticlesCount()).toEqual(0);
    expect(container.getParticles()).toEqual([]);
    expect(p1.shouldDestroy).toEqual(true);
    expect(p2.shouldDestroy).toEqual(false);
  });
});
