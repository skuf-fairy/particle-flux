import {describe, expect, it} from 'vitest';
import {ParticleContainer} from '../../core/ParticleContainer';
import {TEST_CONFIG, TEST_VIEW_FACTORY} from '../constants';
import {ConfigManager} from '../../core/ConfigManager';
import {TestViewContainer} from '../TestViewContainer';

describe('ParticleContainer', () => {
  describe('Add in container', () => {
    const initialConfig = TEST_CONFIG();
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();
    const container = new ParticleContainer(viewContainer, configManager);

    const p = container.addParticle();

    it('Container has the particle', () => {
      expect(container.getParticlesCount()).toEqual(1);
      expect(container.getParticlesArray()).toEqual([p]);
      expect(p.next).toEqual(null);
      expect(container.headParticle).toEqual(p);
      expect(container.tailParticle).toEqual(p);
    });
  });

  describe('Linked list of particles is valid', () => {
    const initialConfig = TEST_CONFIG();
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();
    const container = new ParticleContainer(viewContainer, configManager);

    const p1 = container.addParticle();
    const p2 = container.addParticle();
    const p3 = container.addParticle();

    it('Container has every particle', () => {
      expect(container.getParticlesCount()).toEqual(3);
      expect(container.getParticlesArray()).toEqual([p1, p2, p3]);
      expect(p1.next).toEqual(p2);
      expect(p2.next).toEqual(p3);
      expect(p3.next).toEqual(null);
      expect(container.headParticle).toEqual(p1);
      expect(container.tailParticle).toEqual(p3);
    });

    it('First particle was destroyed', () => {
      p1.noUse();

      container.update(1, 1);

      expect(container.getParticlesCount()).toEqual(2);
      expect(container.getParticlesArray()).toEqual([p2, p3]);
      expect(p2.next).toEqual(p3);
      expect(container.headParticle).toEqual(p2);
      expect(container.tailParticle).toEqual(p3);
      expect(container.availableParticleHead).toEqual(p1);
      expect(container.availableParticleTail).toEqual(p1);
    });

    it('Second particle was destroyed', () => {
      p3.noUse();

      container.update(1, 1);

      expect(container.getParticlesCount()).toEqual(1);
      expect(container.getParticlesArray()).toEqual([p2]);
      expect(p2.next).toEqual(null);
      expect(container.headParticle).toEqual(p2);
      expect(container.tailParticle).toEqual(p2);
      expect(container.availableParticleHead).toEqual(p1);
      expect(container.availableParticleTail).toEqual(p3);
    });

    it('Last particle was destroyed', () => {
      p2.noUse();

      container.update(1, 1);

      expect(container.getParticlesCount()).toEqual(0);
      expect(container.getParticlesArray()).toEqual([]);
      expect(container.headParticle).toEqual(null);
      expect(container.tailParticle).toEqual(null);
      expect(container.availableParticleHead).toEqual(p1);
      expect(container.availableParticleTail).toEqual(p2);
    });

    it('Добавляем частицу', () => {
      const newParticle = container.addParticle();

      expect(container.getParticlesCount()).toEqual(1);
      expect(container.getParticlesArray()).toEqual([newParticle]);
      expect(container.headParticle).toEqual(newParticle);
      expect(container.tailParticle).toEqual(newParticle);
      expect(container.headParticle).toEqual(p1);
      expect(container.availableParticleHead).toEqual(p3);
      expect(container.availableParticleTail).toEqual(p2);
    });
  });

  describe('Middle particle of linked list was destroyed', () => {
    const initialConfig = TEST_CONFIG();
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();
    const container = new ParticleContainer(viewContainer, configManager);

    const p1 = container.addParticle();
    const p2 = container.addParticle();
    const p3 = container.addParticle();

    it('Middle particle was destroyed', () => {
      p2.noUse();

      container.update(1, 1);

      expect(container.getParticlesCount()).toEqual(2);
      expect(container.getParticlesArray()).toEqual([p1, p3]);
      expect(p1.next).toEqual(p3);
      expect(container.headParticle).toEqual(p1);
      expect(container.tailParticle).toEqual(p3);
      expect(container.availableParticleHead).toEqual(p2);
      expect(container.availableParticleTail).toEqual(p2);
    });
  });

  describe('Last particle of linked list was destroyed', () => {
    const initialConfig = TEST_CONFIG();
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();
    const container = new ParticleContainer(viewContainer, configManager);

    const p1 = container.addParticle();
    const p2 = container.addParticle();
    const p3 = container.addParticle();

    it('Last particle was destroyed', () => {
      p3.noUse();

      container.update(1, 1);

      expect(container.getParticlesCount()).toEqual(2);
      expect(container.getParticlesArray()).toEqual([p1, p2]);
      expect(p1.next).toEqual(p2);
      expect(container.headParticle).toEqual(p1);
      expect(container.tailParticle).toEqual(p2);
      expect(container.availableParticleHead).toEqual(p3);
      expect(container.availableParticleTail).toEqual(p3);
    });
  });

  describe('Clear the container', () => {
    const initialConfig = TEST_CONFIG();
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();
    const container = new ParticleContainer(viewContainer, configManager);

    const p1 = container.addParticle();
    const p2 = container.addParticle();
    const p3 = container.addParticle();

    container.clear();

    it('The container is empty', () => {
      expect(container.getParticlesCount()).toEqual(0);
      expect(container.getParticlesArray()).toEqual([]);
      expect(container.availableParticleHead).toEqual(p1);
      expect(container.availableParticleHead!.next).toEqual(p2);
      expect(container.availableParticleTail).toEqual(p3);
    });
  });

  describe('Fill the particle pool', () => {
    const initialConfig = TEST_CONFIG();
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();
    const container = new ParticleContainer(viewContainer, configManager);

    container.fillPool(5);
    const particles = container.getPoolParticlesArray();

    it('Пул частиц заполнился частицами в нужном количестве', () => {
      expect(particles.length).toEqual(5);
    });

    it('Частицы из пула не используются', () => {
      particles.forEach((p) => {
        expect(p.isInUse()).toEqual(false);
      });
    });

    it('Активных частиц еще нет', () => {
      expect(container.headParticle).toEqual(null);
      expect(container.tailParticle).toEqual(null);
    });
  });
});
