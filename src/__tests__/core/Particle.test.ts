import {describe, expect, it} from 'vitest';
import {TEST_VIEW_FACTORY} from '../constants';
import {TestViewContainer} from '../TestViewContainer';
import {IParticle, ParticleConfig} from '../../types';
import {TestViewParticle} from '../TestViewParticle';
import {createUnusedParticle, createView, isParticleInUse, updateParticle, useParticle} from '../../core/Particle';

const TEST_PARTICLE_CONFIG: ParticleConfig = {
  lifeTime: {
    value: 10,
  },
  alpha: {
    start: 0,
    end: 1,
  },
  speed: {
    start: 0,
    end: 1,
  },
};

const testUnusedParticle = (particle: IParticle, viewContainer: TestViewContainer) => {
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

const testUsedParticle = (particle: IParticle, viewContainer: TestViewContainer) => {
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
    useParticle(particle, TEST_PARTICLE_CONFIG);

    testUsedParticle(particle, viewContainer);

    it('The particle has been initialized correctly and is in a state of use.', () => {
      expect(particle.direction.x).toEqual(0);
      expect(particle.direction.y).toEqual(0);
      expect(particle.speed).toEqual(0);
    });
  });

  describe('updateParticle', () => {
    const viewContainer = new TestViewContainer();

    const particle = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));
    useParticle(particle, TEST_PARTICLE_CONFIG);

    it('Необходимо проверить, что после половины жизни частицы, ее параметры должны измениться на половину', () => {
      updateParticle(particle, 1, 5);
      expect(particle.view?.alpha).toEqual(0.5);
    });

    it('Время жизни частицы закончилось, все параметры должны перейти в конечно состояние', () => {
      updateParticle(particle, 1, 5);
      expect(particle.view?.alpha).toEqual(1);
    });
  });

  describe('Immutability of the update', () => {
    it('Both particles should have the same positions after updating', () => {
      const particleConfig: ParticleConfig = {
        lifeTime: {
          value: 10,
        },
        direction: {
          angle: 90,
        },
        speed: {
          value: 1,
        },
      };
      const viewContainer = new TestViewContainer();

      const particle1 = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));
      const particle2 = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));

      useParticle(particle1, particleConfig);
      useParticle(particle2, particleConfig);

      updateParticle(particle1, 1, 5);
      updateParticle(particle2, 1 / 2, 5 / 2);
      updateParticle(particle2, 1 / 2, 5 / 2);

      expect(particle1.view?.x).toEqual(particle2.view?.x);
      expect(particle1.view?.y).toEqual(particle2.view?.y);
    });

    it('Immutability for gravity', () => {
      const particleConfig: ParticleConfig = {
        lifeTime: {
          value: 10,
        },
        direction: {
          angle: 90,
        },
        speed: {
          value: 1,
        },
        gravity: {
          value: 0.1,
        },
      };
      const viewContainer = new TestViewContainer();

      const particle1 = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));
      const particle2 = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));

      useParticle(particle1, particleConfig);
      useParticle(particle2, particleConfig);

      updateParticle(particle1, 1, 5);
      updateParticle(particle2, 1 / 2, 5 / 2);
      updateParticle(particle2, 1 / 2, 5 / 2);

      expect(particle1.view?.x).toEqual(particle2.view?.x);
      expect(particle1.view?.y).toEqual(particle2.view?.y);
    });

    it('Immutability for path', () => {
      const particleConfig: ParticleConfig = {
        lifeTime: {
          value: 10,
        },
        path: {
          path: 'sin(x)',
        },
        speed: {
          value: 1,
        },
      };
      const viewContainer = new TestViewContainer();

      const particle1 = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));
      const particle2 = createUnusedParticle(viewContainer, createView(TEST_VIEW_FACTORY));

      useParticle(particle1, particleConfig);
      useParticle(particle2, particleConfig);

      updateParticle(particle1, 1, 5);
      updateParticle(particle2, 1 / 2, 5 / 2);
      updateParticle(particle2, 1 / 2, 5 / 2);

      expect(particle1.view?.x).toEqual(particle2.view?.x);
      expect(particle1.view?.y).toEqual(particle2.view?.y);
    });
  });
});
