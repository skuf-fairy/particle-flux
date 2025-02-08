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

  it('Added a few particles', () => {
    expect(container.getParticlesCount()).toEqual(2);
    expect(container.getParticles()).toEqual([p1, p2]);
  });

  it('The container has been updated', () => {
    container.update(1, 10);

    expect(container.getParticlesCount()).toEqual(2);
    expect(container.getParticles()).toEqual([p1, p2]);
    expect(p1.shouldDestroy).toEqual(false);
    expect(p2.shouldDestroy).toEqual(false);
  });

  it('One of the particles was destroyed', () => {
    p1.shouldDestroy = true;

    expect(container.getParticlesCount()).toEqual(1);
    expect(container.getParticles()).toEqual([p2]);
    expect(p1.shouldDestroy).toEqual(true);
    expect(p2.shouldDestroy).toEqual(false);
  });

  it('The container has been updated', () => {
    container.update(1, 10);

    expect(container.getParticlesCount()).toEqual(1);
    expect(container.getParticles()).toEqual([p2]);
    expect(p1.shouldDestroy).toEqual(true);
    expect(p2.shouldDestroy).toEqual(false);
  });

  it('Cleared the container', () => {
    container.clear();

    expect(container.getParticlesCount()).toEqual(0);
    expect(container.getParticles()).toEqual([]);
    expect(p1.shouldDestroy).toEqual(true);
    expect(p2.shouldDestroy).toEqual(false);
  });
});
