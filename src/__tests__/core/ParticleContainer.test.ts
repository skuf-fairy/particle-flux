import {describe, expect, it} from 'vitest';
import {ParticleContainer} from '../../core/ParticleContainer';
import {TEST_CONFIG, TEST_VIEW_FACTORY} from '../constants';
import {ConfigManager} from '../../core/ConfigManager';
import {TestViewContainer} from '../TestViewContainer';
import {IParticle, ViewParticle} from '../../types';
import {TestViewParticle} from '../TestViewParticle';
import {STANDARD_DELTA_MS} from '../../utils/Ticker';
import {isParticleInUse} from '../../core/particle/isParticleInUse';
import {noUseParticle} from '../../core/particle/noUseParticle';
import {ShapePointGenerator} from '../../core/spawn-shapes/ShapePointGenerator';

const testParticleLinkedList = (
  particleArray: IParticle<TestViewParticle>[],
  container: ParticleContainer<TestViewParticle>,
) => {
  it('Контейнер содержит правильное количество активных частиц', () => {
    expect(container.getParticlesCount()).toEqual(particleArray.length);
    // Проверяем, что массивы идентичны по ссылкам и порядку
    expect(container.getParticlesArray()).toEqual(particleArray); // Проверяет порядок и значения
    container.getParticlesArray().forEach((item, index) => {
      expect(item).toBe(particleArray[index]); // Проверяет ссылки
    });
  });

  if (particleArray.length === 1) {
    const p = particleArray[0];

    it('Первая частица не должна иметь ссылки на какие-либо частицы, если она единственная в контейнере', () => {
      expect(p.next).toEqual(null);
      expect(p.prev).toEqual(null);
    });

    return;
  }

  particleArray.forEach((p, i) => {
    if (i === 0) {
      it('Первая частица должна иметь следующую частицу и не иметь предыдущей', () => {
        expect(p.next).toBe(particleArray[i + 1]);
        expect(p.prev).toEqual(null);
      });
      it('Указатель на первую частицу в контейнере должен указывать на первую частицу', () => {
        expect(container.particleHead).toEqual(p);
      });
    } else if (i === particleArray.length - 1) {
      it('Последняя частица не должна иметь ссылки на следующую частицу и иметь ссылку на предыдущую', () => {
        expect(p.next).toEqual(null);
        expect(p.prev).toBe(particleArray[i - 1]);
      });
    } else {
      it('Частицы между первой и последней должны иметь ссылки на предыдущую и следующую частицы', () => {
        expect(p.next).toBe(particleArray[i + 1]);
        expect(p.prev).toBe(particleArray[i - 1]);
      });
    }
  });
};

describe('ParticleContainer', () => {
  const initialConfig = TEST_CONFIG();
  const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);

  describe('Add in container', () => {
    describe('Добавили 1 частицу в контейнер', () => {
      const viewContainer = new TestViewContainer();
      const shapePointGenerator = new ShapePointGenerator();
      const container = new ParticleContainer(viewContainer, configManager, shapePointGenerator);

      const particleArray: IParticle<TestViewParticle>[] = [];

      particleArray.unshift(container.createParticle(0));
      testParticleLinkedList(particleArray, container);

      it('Пул частиц должен быть пустой', () => {
        expect(container.availableParticleHead).toEqual(null);
      });
    });

    describe('Добавили много частиц в контейнер', () => {
      const viewContainer = new TestViewContainer();
      const shapePointGenerator = new ShapePointGenerator();
      const container = new ParticleContainer(viewContainer, configManager, shapePointGenerator);

      const particleArray: IParticle<TestViewParticle>[] = [];

      for (let i = 0; i < 5; i++) {
        particleArray.unshift(container.createParticle(i));
      }

      testParticleLinkedList(particleArray, container);

      it('Пул частиц должен быть пустой', () => {
        expect(container.availableParticleHead).toEqual(null);
      });
    });
  });

  describe('Перемещение неиспользуемых частиц в пул неактивных', () => {
    const viewContainer = new TestViewContainer();

    const shapePointGenerator = new ShapePointGenerator();
    const container = new ParticleContainer(viewContainer, configManager, shapePointGenerator);

    const particleArray: IParticle<TestViewParticle>[] = [];

    for (let i = 0; i < 10; i++) {
      particleArray.unshift(container.createParticle(i));
    }

    const firstParticle = particleArray.splice(particleArray.length - 1, 1)[0];
    const middleParticle = particleArray.splice(Math.floor(particleArray.length / 2), 1)[0];
    const lastParticle = particleArray.splice(0, 1)[0];

    noUseParticle(firstParticle);
    noUseParticle(middleParticle);
    noUseParticle(lastParticle);
    container.update(1, STANDARD_DELTA_MS);

    testParticleLinkedList(particleArray, container);

    it('Живые частицы должны быть в контейнере в правильном количестве', () => {
      expect(container.getParticlesCount()).toEqual(particleArray.length);
      expect(container.getParticlesArray()).toEqual(particleArray);
    });

    it('Указатель на первую живую частицу должен сместиться', () => {
      expect(container.particleHead).toEqual(particleArray[0]);
    });

    it('Удаленные частицы должны переместиться в пул', () => {
      expect(container.availableParticleHead).toBe(firstParticle);
      expect(container.getPoolParticlesArray()).toEqual([firstParticle, middleParticle, lastParticle]);
    });
  });

  describe('Clear the container', () => {
    const initialConfig = TEST_CONFIG();
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();
    const shapePointGenerator = new ShapePointGenerator();
    const container = new ParticleContainer(viewContainer, configManager, shapePointGenerator);

    const particleArray: IParticle<TestViewParticle>[] = [];

    for (let i = 0; i < 5; i++) {
      particleArray.unshift(container.createParticle(i));
    }

    container.clear();

    it('Нет активных частиц. Активные добавились в пул', () => {
      expect(container.getParticlesCount()).toEqual(0);
      expect(container.getParticlesArray()).toEqual([]);
      expect(container.particleHead).toEqual(null);
      expect(container.getPoolParticlesArray()).toEqual(particleArray.reverse());
    });
  });

  describe('Очистка от уничтоженных частиц', () => {
    const initialConfig = TEST_CONFIG();
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();
    const shapePointGenerator = new ShapePointGenerator();
    const container = new ParticleContainer(viewContainer, configManager, shapePointGenerator);

    const particleArray: IParticle<ViewParticle>[] = [];

    for (let i = 0; i < 10; i++) {
      particleArray.unshift(container.createParticle(i));
    }

    const destroyedParticle = particleArray.splice(2, 1)[0];
    destroyedParticle.view.destroyed = true;
    const unusedParticle = particleArray.splice(3, 1)[0];
    noUseParticle(unusedParticle);

    container.update(1, STANDARD_DELTA_MS);

    testParticleLinkedList(particleArray, container);

    it('Уничтоженных частиц нет ни в пуле, ни среди активных частиц', () => {
      expect(container.getParticlesArray()).not.contain(destroyedParticle);
      expect(container.getPoolParticlesArray()).not.contain(destroyedParticle);
    });

    it('Неиспользуемые частицы есть в пуле', () => {
      expect(container.getPoolParticlesArray()).contain(unusedParticle);
    });
  });

  describe('Fill the particle pool', () => {
    const initialConfig = TEST_CONFIG();
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();
    const shapePointGenerator = new ShapePointGenerator();
    const container = new ParticleContainer(viewContainer, configManager, shapePointGenerator);

    container.fillPool(5);
    const particles = container.getPoolParticlesArray();

    it('Пул частиц заполнился частицами в нужном количестве', () => {
      expect(particles.length).toEqual(5);
    });

    it('Частицы из пула не используются', () => {
      particles.forEach((p) => {
        expect(isParticleInUse(p)).toEqual(false);
        expect(p.view.visible).toEqual(false);
      });
    });

    it('Активных частиц еще нет', () => {
      expect(container.particleHead).toEqual(null);
    });
  });

  describe('Использование пула при создании новых частиц', () => {
    const initialConfig = TEST_CONFIG();
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();
    const shapePointGenerator = new ShapePointGenerator();
    const container = new ParticleContainer(viewContainer, configManager, shapePointGenerator);

    container.fillPool(5);
    const poolParticles = container.getPoolParticlesArray();
    const firstUnusedParticle = poolParticles[0];
    poolParticles.shift();

    const usedParticle = container.createParticle(0);

    container.update(1, STANDARD_DELTA_MS);

    it('Пул частиц должен уменьшиться на используемую частицу', () => {
      expect(container.getPoolParticlesArray()).toEqual(poolParticles);
    });

    it('Частица из пула должна быть первой в используемых частицах', () => {
      expect(container.particleHead).toBe(usedParticle);
      expect(firstUnusedParticle).toBe(usedParticle);
    });
  });

  describe('Изменение рендер функции в конфиге', () => {
    const initialConfig = TEST_CONFIG();
    const configManager = new ConfigManager(initialConfig, TEST_VIEW_FACTORY);
    const viewContainer = new TestViewContainer();
    const shapePointGenerator = new ShapePointGenerator();
    const container = new ParticleContainer(viewContainer, configManager, shapePointGenerator);

    const particleArray: IParticle<TestViewParticle>[] = [];

    container.fillPool(10);

    for (let i = 0; i < 5; i++) {
      particleArray.unshift(container.createParticle(i));
    }

    container.update(1, STANDARD_DELTA_MS);
    configManager.view = (): ViewParticle => new TestViewParticle();
    container.update(1, STANDARD_DELTA_MS);

    it('При смене рендер функции, пул частиц должен очиститься, так как старые инстансы отображений нельзя теперь переиспользовать', () => {
      expect(container.availableParticleHead).toEqual(null);
    });

    it('Активные частицы должны быть в таком же состоянии', () => {
      expect(container.getParticlesCount()).toEqual(5);
      expect(container.getParticlesArray()).toEqual(particleArray);
    });

    it('Частицам должен проставиться флаг isDestroyAfterDeath', () => {
      container.getParticlesArray().forEach((p) => {
        expect(p.isDestroyAfterDeath).toEqual(true);
      });
    });
  });
});
