import {describe, expect, it} from 'vitest';
import {ParticleContainer} from '../../core/ParticleContainer';
import {TEST_CONFIG, TEST_VIEW_FACTORY} from '../constants';
import {ConfigManager} from '../../core/ConfigManager';
import {TestViewContainer} from '../TestViewContainer';
import {isParticleInUse, noUseParticle} from '../../core/Particle';
import {ViewParticle} from '../../types';
import {TestViewParticle} from '../TestViewParticle';

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
      expect(container.getParticlesArray()).toEqual([p3, p2, p1]);
      expect(p1.next).toEqual(null);
      expect(p1.prev).toEqual(p2);
      expect(p2.next).toEqual(p1);
      expect(p2.prev).toEqual(p3);
      expect(p3.next).toEqual(p2);
      expect(p3.prev).toEqual(null);
      expect(container.headParticle).toEqual(p3);
    });

    it('First particle was destroyed', () => {
      noUseParticle(p1);

      container.update(1, 1);

      expect(container.getParticlesCount()).toEqual(2);
      expect(container.getParticlesArray()).toEqual([p3, p2]);
      expect(p2.next).toEqual(null);
      expect(container.headParticle).toEqual(p3);
      expect(container.availableParticleHead).toEqual(p1);
    });

    it('Second particle was destroyed', () => {
      noUseParticle(p3);

      container.update(1, 1);

      expect(container.getParticlesCount()).toEqual(1);
      expect(container.getParticlesArray()).toEqual([p2]);
      expect(p2.next).toEqual(null);
      expect(container.headParticle).toEqual(p2);
      expect(container.availableParticleHead).toEqual(p3);
    });

    it('Last particle was destroyed', () => {
      noUseParticle(p2);

      container.update(1, 1);

      expect(container.getParticlesCount()).toEqual(0);
      expect(container.getParticlesArray()).toEqual([]);
      expect(container.headParticle).toEqual(null);
      expect(container.availableParticleHead).toEqual(p2);
    });

    it('Добавляем частицу', () => {
      const newParticle = container.addParticle();

      expect(container.getParticlesCount()).toEqual(1);
      expect(container.getParticlesArray()).toEqual([newParticle]);
      expect(container.headParticle).toEqual(newParticle);
      expect(newParticle).toEqual(p2);
      expect(container.availableParticleHead).toEqual(p3);
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
      noUseParticle(p2);

      container.update(1, 1);

      expect(container.getParticlesCount()).toEqual(2);
      expect(container.getParticlesArray()).toEqual([p3, p1]);
      expect(p3.next).toEqual(p1);
      expect(p3.prev).toEqual(null);
      expect(p1.next).toEqual(null);
      expect(p1.prev).toEqual(p3);
      expect(container.headParticle).toEqual(p3);
      expect(container.availableParticleHead).toEqual(p2);
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
      noUseParticle(p3);

      container.update(1, 1);

      expect(container.getParticlesCount()).toEqual(2);
      expect(container.getParticlesArray()).toEqual([p2, p1]);
      expect(p2.next).toEqual(p1);
      expect(container.headParticle).toEqual(p2);
      expect(container.availableParticleHead).toEqual(p3);
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

    it('Нет активных частиц. Активные добавились в пул', () => {
      expect(container.getParticlesCount()).toEqual(0);
      expect(container.getParticlesArray()).toEqual([]);
      expect(container.headParticle).toEqual(null);
      expect(container.availableParticleHead).toEqual(p1);
      expect(container.availableParticleHead!.next).toEqual(p2);
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
        expect(isParticleInUse(p)).toEqual(false);
      });
    });

    it('Активных частиц еще нет', () => {
      expect(container.headParticle).toEqual(null);
    });
  });

  describe('Изменение рендер функции в конфиге', () => {
    const initialConfig = TEST_CONFIG();
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();
    const container = new ParticleContainer(viewContainer, configManager);

    const p1 = container.addParticle();
    const p2 = container.addParticle();

    it('Изменяем рендер функцию в конфиге', () => {
      noUseParticle(p1);
      const p3 = container.addParticle();
      container.update(1, 1);
      configManager.view = (): ViewParticle => new TestViewParticle();

      expect(container.availableParticleHead).toEqual(null);
      expect(container.getParticlesCount()).toEqual(2);
      expect(container.getParticlesArray()).toEqual([p3, p2]);
    });
  });
});
