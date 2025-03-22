import {describe, expect, it} from 'vitest';
import {TEST_VIEW_FACTORY} from '../constants';
import {Particle} from '../../core/Particle';
import {TestViewContainer} from '../TestViewContainer';
import {ParticleConfig} from '../../types';

describe('Particle', () => {
  describe('Creating a particle', () => {
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

    const particle = new Particle(viewContainer, TEST_VIEW_FACTORY, particleConfig);

    it('Correct initialization', () => {
      expect(particle.view.alpha).toEqual(0);
      expect(particle.direction.x).toEqual(0);
      expect(particle.direction.y).toEqual(0);
      expect(particle.speed).toEqual(0);
      expect(particle.next).toEqual(null);
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

    const particle = new Particle(viewContainer, TEST_VIEW_FACTORY, particleConfig);

    it('After updating the alpha particle, it changed correctly', () => {
      particle.update(1, 5);
      expect(particle.view.alpha).toEqual(0.5);
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

      const particle1 = new Particle(viewContainer, TEST_VIEW_FACTORY, particleConfig);
      const particle2 = new Particle(viewContainer, TEST_VIEW_FACTORY, particleConfig);

      particle1.update(1, 5);
      particle2.update(1 / 2, 5 / 2);
      particle2.update(1 / 2, 5 / 2);

      expect(particle1.view.position).toEqual(particle2.view.position);
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

      const particle1 = new Particle(viewContainer, TEST_VIEW_FACTORY, particleConfig);
      const particle2 = new Particle(viewContainer, TEST_VIEW_FACTORY, particleConfig);

      particle1.update(1, 5);
      particle2.update(1 / 2, 5 / 2);
      particle2.update(1 / 2, 5 / 2);

      expect(particle1.view.position).toEqual(particle2.view.position);
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

      const particle1 = new Particle(viewContainer, TEST_VIEW_FACTORY, particleConfig);
      const particle2 = new Particle(viewContainer, TEST_VIEW_FACTORY, particleConfig);

      particle1.update(1, 5);
      particle2.update(1 / 2, 5 / 2);
      particle2.update(1 / 2, 5 / 2);

      expect(particle1.view.position).toEqual(particle2.view.position);
    });
  });

  describe('Particle destructurization', () => {
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

    const particle = new Particle(viewContainer, TEST_VIEW_FACTORY, particleConfig);
    particle.update(1, 100);

    it('The particle is subject to destructuring, so the lifetime is over.', () => {
      expect(particle.shouldDestroy).toEqual(true);
    });
  });
});
