import {describe, expect, it} from 'vitest';
import {ParticleContainer} from '../../core/ParticleContainer';
import {TEST_CONFIG, TEST_VIEW_FACTORY} from '../constants';
import {ConfigManager} from '../../core/ConfigManager';
import {TestViewContainer} from '../TestViewContainer';
import {ParticleBehaviorFactory} from '../../core/ParticleBehaviorFactory';

describe('Add in container', () => {
  const initialConfig = TEST_CONFIG();
  const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
  const viewContainer = new TestViewContainer();
  const factory = new ParticleBehaviorFactory(viewContainer, configManager);
  const container = new ParticleContainer(factory);

  const p = container.addParticle();

  it('Container has the particle', () => {
    expect(container.getParticlesCount()).toEqual(1);
    expect(container.getParticles()).toEqual([p]);
    expect(p.next).toEqual(null);
    expect(container.headParticle).toEqual(p);
    expect(container.tailParticle).toEqual(p);
  });
});

describe('Linked list of particles is valid', () => {
  const initialConfig = TEST_CONFIG();
  const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
  const viewContainer = new TestViewContainer();
  const factory = new ParticleBehaviorFactory(viewContainer, configManager);
  const container = new ParticleContainer(factory);

  const p1 = container.addParticle();
  const p2 = container.addParticle();
  const p3 = container.addParticle();

  it('Container has every particle', () => {
    expect(container.getParticlesCount()).toEqual(3);
    expect(container.getParticles()).toEqual([p1, p2, p3]);
    expect(p1.next).toEqual(p2);
    expect(p2.next).toEqual(p3);
    expect(p3.next).toEqual(null);
    expect(container.headParticle).toEqual(p1);
    expect(container.tailParticle).toEqual(p3);
  });

  it('First particle was destroyed', () => {
    p1.shouldDestroy = true;

    container.update(1, 1);

    expect(container.getParticlesCount()).toEqual(2);
    expect(container.getParticles()).toEqual([p2, p3]);
    expect(p2.next).toEqual(p3);
    expect(container.headParticle).toEqual(p2);
    expect(container.tailParticle).toEqual(p3);
  });

  it('Second particle was destroyed', () => {
    p3.shouldDestroy = true;

    container.update(1, 1);

    expect(container.getParticlesCount()).toEqual(1);
    expect(container.getParticles()).toEqual([p2]);
    expect(p2.next).toEqual(null);
    expect(container.headParticle).toEqual(p2);
    expect(container.tailParticle).toEqual(p2);
  });

  it('Last particle was destroyed', () => {
    p2.shouldDestroy = true;

    container.update(1, 1);

    expect(container.getParticlesCount()).toEqual(0);
    expect(container.getParticles()).toEqual([]);
    expect(container.headParticle).toEqual(null);
    expect(container.tailParticle).toEqual(null);
  });
});

describe('Middle particle of linked list was destroyed', () => {
  const initialConfig = TEST_CONFIG();
  const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
  const viewContainer = new TestViewContainer();
  const factory = new ParticleBehaviorFactory(viewContainer, configManager);
  const container = new ParticleContainer(factory);

  const p1 = container.addParticle();
  const p2 = container.addParticle();
  const p3 = container.addParticle();

  it('Middle particle was destroyed', () => {
    p2.shouldDestroy = true;

    container.update(1, 1);

    expect(container.getParticlesCount()).toEqual(2);
    expect(container.getParticles()).toEqual([p1, p3]);
    expect(p1.next).toEqual(p3);
    expect(container.headParticle).toEqual(p1);
    expect(container.tailParticle).toEqual(p3);
  });
});

describe('Last particle of linked list was destroyed', () => {
  const initialConfig = TEST_CONFIG();
  const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
  const viewContainer = new TestViewContainer();
  const factory = new ParticleBehaviorFactory(viewContainer, configManager);
  const container = new ParticleContainer(factory);

  const p1 = container.addParticle();
  const p2 = container.addParticle();
  const p3 = container.addParticle();

  it('Last particle was destroyed', () => {
    p3.shouldDestroy = true;

    container.update(1, 1);

    expect(container.getParticlesCount()).toEqual(2);
    expect(container.getParticles()).toEqual([p1, p2]);
    expect(p1.next).toEqual(p2);
    expect(container.headParticle).toEqual(p1);
    expect(container.tailParticle).toEqual(p2);
  });
});

describe('Clear the container', () => {
  const initialConfig = TEST_CONFIG();
  const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
  const viewContainer = new TestViewContainer();
  const factory = new ParticleBehaviorFactory(viewContainer, configManager);
  const container = new ParticleContainer(factory);

  container.addParticle();
  container.addParticle();
  container.addParticle();

  container.clear();

  it('The container is empty', () => {
    expect(container.getParticlesCount()).toEqual(0);
    expect(container.getParticles()).toEqual([]);
  });
});
