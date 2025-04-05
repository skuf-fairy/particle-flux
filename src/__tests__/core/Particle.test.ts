import {describe, expect, it} from 'vitest';
import {TEST_VIEW_FACTORY} from '../constants';
import {TestViewContainer} from '../TestViewContainer';
import {ParticleConfig} from '../../types';
import {TestViewParticle} from '../TestViewParticle';
import {createParticle, createView, isParticleInUse, updateParticle, useParticle} from '../../core/Particle';

describe('Particle', () => {
  describe('Creating a particle', () => {
    const viewContainer = new TestViewContainer();

    const particle = createParticle(viewContainer, createView(TEST_VIEW_FACTORY));

    it('The created particle is not active yet, it must be in the default state.', () => {
      expect(particle.view).instanceOf(TestViewParticle);
      expect(particle.inUse).toEqual(false);
      expect(particle.direction.x).toEqual(0);
      expect(particle.direction.y).toEqual(0);
      expect(particle.speed).toEqual(0);
      expect(particle.next).toEqual(null);
      expect(isParticleInUse(particle)).toEqual(false);
    });
  });

  describe('Инициализация частицы', () => {
    const particleConfig: ParticleConfig = {
      lifeTime: {
        value: 10,
      },
      alpha: {
        start: 0.2,
        end: 1,
      },
      speed: {
        value: 1,
      },
    };
    const viewContainer = new TestViewContainer();

    const particle = createParticle(viewContainer, createView(TEST_VIEW_FACTORY));
    useParticle(particle, particleConfig);

    it('The particle has been initialized correctly and is in a state of use.', () => {
      expect(particle.view).instanceOf(TestViewParticle);
      expect(particle.inUse).toEqual(true);
      expect(particle.direction.x).toEqual(0);
      expect(particle.direction.y).toEqual(0);
      expect(particle.speed).toEqual(1);
      expect(particle.next).toEqual(null);
      expect(particle.view?.alpha).toEqual(0.2);
      expect(isParticleInUse(particle)).toEqual(true);
    });
  });

  describe('Updating the particle', () => {
    const particleConfig: ParticleConfig = {
      lifeTime: {
        value: 10,
      },
      alpha: {
        start: 0,
        end: 1,
      },
    };
    const viewContainer = new TestViewContainer();

    const particle = createParticle(viewContainer, createView(TEST_VIEW_FACTORY));
    useParticle(particle, particleConfig);

    it('After updating the alpha particle, it changed correctly', () => {
      updateParticle(particle, 1, 5);
      expect(particle.view?.alpha).toEqual(0.5);
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

      const particle1 = createParticle(viewContainer, createView(TEST_VIEW_FACTORY));
      const particle2 = createParticle(viewContainer, createView(TEST_VIEW_FACTORY));

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

      const particle1 = createParticle(viewContainer, createView(TEST_VIEW_FACTORY));
      const particle2 = createParticle(viewContainer, createView(TEST_VIEW_FACTORY));

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

      const particle1 = createParticle(viewContainer, createView(TEST_VIEW_FACTORY));
      const particle2 = createParticle(viewContainer, createView(TEST_VIEW_FACTORY));

      useParticle(particle1, particleConfig);
      useParticle(particle2, particleConfig);

      updateParticle(particle1, 1, 5);
      updateParticle(particle2, 1 / 2, 5 / 2);
      updateParticle(particle2, 1 / 2, 5 / 2);

      expect(particle1.view?.x).toEqual(particle2.view?.x);
      expect(particle1.view?.y).toEqual(particle2.view?.y);
    });
  });

  describe('Dead of particle', () => {
    const particleConfig: ParticleConfig = {
      lifeTime: {
        value: 10,
      },
      alpha: {
        start: 0,
        end: 1,
      },
    };
    const viewContainer = new TestViewContainer();

    const particle = createParticle(viewContainer, createView(TEST_VIEW_FACTORY));
    useParticle(particle, particleConfig);
    updateParticle(particle, 1, 100);

    it('The particle is no longer in use, the display has been removed', () => {
      expect(isParticleInUse(particle)).toEqual(false);
      expect(particle.view.visible).toEqual(false);
      expect(particle.view).instanceOf(TestViewParticle);
    });
  });
});
