import {describe, expect, it} from 'vitest';
import {TEST_VIEW_FACTORY} from '../constants';
import {TestViewContainer} from '../TestViewContainer';
import {IParticle, ParticleConfig} from '../../types';
import {TestViewParticle} from '../TestViewParticle';
import {STANDARD_DELTA_MS} from '../../utils/Ticker';
import {SpawnShapeType} from '../../core/spawn-shapes/spawn-shapes.types';
import {createUnusedParticle} from '../../core/particle/createUnusedParticle';
import {createView} from '../../core/particle/createView';
import {updateParticle} from '../../core/particle/updateParticle';
import {useParticle} from '../../core/particle/useParticle';
import {isParticleInUse} from '../../core/particle/isParticleInUse';
import {ShapePointGenerator} from '../../core/spawn-shapes/ShapePointGenerator';

const TEST_PARTICLE_CONFIG: ParticleConfig = {
  lifeTime: {
    value: STANDARD_DELTA_MS * 2,
  },
  alpha: {
    start: 0,
    end: 1,
  },
  speed: {
    start: 4,
    end: 8,
  },
};

const testUnusedParticle = (particle: IParticle<TestViewParticle>, viewContainer: TestViewContainer) => {
  it('Отображение страницы должно быть создано', () => {
    expect(particle.view).instanceOf(TestViewParticle);
  });

  it('Частица не должна использоваться', () => {
    expect(isParticleInUse(particle)).toEqual(false);
  });

  it('Частица должна быть в контейнере', () => {
    expect(viewContainer.children.includes(particle.view)).toEqual(true);
  });
};

const testUsedParticle = (particle: IParticle<TestViewParticle>, viewContainer: TestViewContainer) => {
  it('Отображение страницы должно быть создано', () => {
    expect(particle.view).instanceOf(TestViewParticle);
  });

  it('Частица должна использоваться', () => {
    expect(isParticleInUse(particle)).toEqual(true);
  });

  it('Частица должна быть в контейнере', () => {
    expect(viewContainer.children.includes(particle.view)).toEqual(true);
  });
};

describe('Particle', () => {
  describe('Creating a unused particle', () => {
    const viewContainer = new TestViewContainer();

    const particle = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));

    testUnusedParticle(particle, viewContainer);
  });

  describe('useParticle', () => {
    const viewContainer = new TestViewContainer();

    const particle = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));
    const shapePointGenerator = new ShapePointGenerator();

    useParticle(particle, TEST_PARTICLE_CONFIG, shapePointGenerator);

    testUsedParticle(particle, viewContainer);

    it('The particle has been initialized correctly and is in a state of use.', () => {
      expect(particle.direction.x).toEqual(0);
      expect(particle.direction.y).toEqual(0);
      expect(particle.speed).toEqual(4);
    });
  });

  describe('updateParticle', () => {
    const viewContainer = new TestViewContainer();

    const particle = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));
    const shapePointGenerator = new ShapePointGenerator();

    useParticle(particle, TEST_PARTICLE_CONFIG, shapePointGenerator);

    it('Необходимо проверить, что после половины жизни частицы, ее параметры должны измениться на половину', () => {
      updateParticle(particle, 1, STANDARD_DELTA_MS);

      expect(particle.view.alpha).toEqual(0.5);
    });

    it('Время жизни частицы закончилось, все параметры должны перейти в конечно состояние', () => {
      updateParticle(particle, 1, STANDARD_DELTA_MS);

      expect(particle.view.alpha).toEqual(1);
    });
  });

  describe('Immutability of the update', () => {
    it('Both particles should have the same positions after updating', () => {
      const viewContainer = new TestViewContainer();

      const particle1 = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));
      const particle2 = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));
      const shapePointGenerator = new ShapePointGenerator();

      useParticle(particle1, TEST_PARTICLE_CONFIG, shapePointGenerator);
      useParticle(particle2, TEST_PARTICLE_CONFIG, shapePointGenerator);

      // 60 FPS
      for (let i = 0; i < 60; i++) {
        updateParticle(particle1, 1, STANDARD_DELTA_MS);
      }

      // 30 FPS
      for (let i = 0; i < 30; i++) {
        updateParticle(particle2, 2, STANDARD_DELTA_MS * 2);
      }

      expect(particle1.view.x).toEqual(particle2.view.x);
      expect(particle1.view.y).toEqual(particle2.view.y);
    });

    it('Immutability for gravity', () => {
      const viewContainer = new TestViewContainer();

      const particle1 = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));
      const particle2 = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));
      const shapePointGenerator = new ShapePointGenerator();
      // todo проблема с динамической скоростью
      const particleConfig: ParticleConfig = {...TEST_PARTICLE_CONFIG, gravity: {value: 0.5}, speed: {value: 1000}};

      useParticle(particle1, particleConfig, shapePointGenerator);
      useParticle(particle2, particleConfig, shapePointGenerator);

      // 60 FPS
      for (let i = 0; i < 10; i++) {
        updateParticle(particle1, 1, STANDARD_DELTA_MS);
      }

      // 30 FPS
      for (let i = 0; i < 5; i++) {
        updateParticle(particle2, 2, STANDARD_DELTA_MS * 2);
      }

      expect(particle1.view.x).toEqual(particle2.view.x);
      expect(particle1.view.y).toEqual(particle2.view.y);
    });

    it('Immutability for path', () => {
      const viewContainer = new TestViewContainer();

      const particle1 = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));
      const particle2 = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));
      const shapePointGenerator = new ShapePointGenerator();

      const particleConfig: ParticleConfig = {...TEST_PARTICLE_CONFIG, path: {path: 'sin(x)'}, speed: {value: 1000}};

      useParticle(particle1, particleConfig, shapePointGenerator);
      useParticle(particle2, particleConfig, shapePointGenerator);

      // 60 FPS
      for (let i = 0; i < 10; i++) {
        updateParticle(particle1, 1, STANDARD_DELTA_MS);
      }

      // 30 FPS
      for (let i = 0; i < 5; i++) {
        updateParticle(particle2, 2, STANDARD_DELTA_MS * 2);
      }

      expect(particle1.view.x).toEqual(particle2.view.x);
      expect(particle1.view.y).toEqual(particle2.view.y);
    });
  });

  describe('Корректная установка начальных значений', () => {
    const particleConfig: ParticleConfig = {
      lifeTime: {
        value: 10,
      },
      direction: {
        minAngle: 0,
        maxAngle: 360,
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
    };
    const viewContainer = new TestViewContainer();
    const view = createView(TEST_VIEW_FACTORY);
    const initialAlpha = view.alpha;

    const particle = createUnusedParticle(viewContainer, view);
    const shapePointGenerator = new ShapePointGenerator();

    useParticle(particle, particleConfig, shapePointGenerator);

    const initX = particle.view.x;
    const initY = particle.view.y;

    updateParticle(particle, 1, STANDARD_DELTA_MS);

    it('После обновления значения частицы не из конфига не изменились', () => {
      expect(view.alpha).toEqual(initialAlpha);
      // позиция не должна изменяться, так как скорость 0
      expect(particle.view.x).toEqual(initX);
      expect(particle.view.y).toEqual(initY);
    });
  });
});
