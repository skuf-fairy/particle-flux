import {describe, expect, it} from 'vitest';
import {Particle} from '../../core/Particle';
import {TEST_VIEW_FACTORY} from '../constants';
import {TestParticleComponent} from '../TestParticleComponent';

describe('Particle', () => {
  describe('Создание частицы', () => {
    const view = TEST_VIEW_FACTORY();
    const particle = new Particle(view);

    it('Частица правильно создалась без добавления компонентов', () => {
      expect(particle.view).toEqual(view);
      expect(particle.direction).toEqual({x: 0, y: 0});
      expect(particle.speed).toEqual(0);
      expect(particle.shouldDestroy).toEqual(false);
      expect(particle.componentsCount()).toEqual(0);
    });
  });

  describe('Добавление компонента', () => {
    const view = TEST_VIEW_FACTORY();
    const particle = new Particle(view);
    const testComponent = new TestParticleComponent();

    particle.addComponent(testComponent);

    it('Компонент есть в частице', () => {
      expect(particle.componentsCount()).toEqual(1);
    });

    it('К компоненту привязана частица', () => {
      expect(testComponent.particle).toEqual(particle);
    });

    it('Компонент валидно проинициализирован', () => {
      expect(testComponent.isInitialized).toEqual(false);
      expect(testComponent.updateCount).toEqual(0);
      expect(testComponent.isDestroyed).toEqual(false);
    });

    it('Можно получить компонент по классу', () => {
      expect(particle.getComponent(TestParticleComponent)).toEqual(testComponent);
    });

    it('Компонент добавился в обновляемые компоненты, так как реализован метод update', () => {
      expect(particle.updatableComponentsMap.getValue(TestParticleComponent)).toEqual(testComponent);
    });
  });

  describe('Инициализация частицы, то есть компонентов', () => {
    const view = TEST_VIEW_FACTORY();
    const particle = new Particle(view);
    const testComponent = new TestParticleComponent();

    particle.addComponent(testComponent);
    particle.init();

    it('Компонент проинициализирован', () => {
      expect(testComponent.isInitialized).toEqual(true);
    });
  });

  describe('Обновление частицы и компонентов в ней', () => {
    const view = TEST_VIEW_FACTORY();
    const particle = new Particle(view);
    const testComponent = new TestParticleComponent();

    particle.addComponent(testComponent);
    particle.init();
    particle.update(1, 10);
    particle.update(1, 10);
    particle.update(1, 10);

    it('Компонент обновился тоже', () => {
      expect(testComponent.updateCount).toEqual(3);
    });
  });

  describe('Деструктуризация частицы', () => {
    const view = TEST_VIEW_FACTORY();
    const particle = new Particle(view);
    const testComponent = new TestParticleComponent();

    particle.addComponent(testComponent);
    particle.init();
    particle.update(1, 10);
    particle.destroy();

    it('Частицы очистилась от компонентов', () => {
      expect(particle.componentsCount()).toEqual(0);
    });

    it('Деструктуризация компонентов', () => {
      expect(testComponent.isDestroyed).toEqual(testComponent.isDestroyed);
    });
  });
});
