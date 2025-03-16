import {describe, expect, it} from 'vitest';
import {Particle} from '../../core/Particle';
import {TEST_VIEW_FACTORY} from '../constants';
import {TestParticleComponent} from '../TestParticleComponent';

describe('Particle', () => {
  describe('Creating a particle', () => {
    const view = TEST_VIEW_FACTORY();
    const particle = new Particle(view);

    it('The particle was created correctly without adding components', () => {
      expect(particle.view).toEqual(view);
      expect(particle.direction).toEqual({x: 0, y: 0});
      expect(particle.speed).toEqual(0);
      expect(particle.shouldDestroy).toEqual(false);
      expect(particle.componentsCount()).toEqual(0);
    });
  });

  describe('Adding a component', () => {
    const view = TEST_VIEW_FACTORY();
    const particle = new Particle(view);
    const testComponent = new TestParticleComponent();

    particle.addComponent(testComponent);

    it('The component is in the particle', () => {
      expect(particle.componentsCount()).toEqual(1);
    });

    it('A particle is attached to the component', () => {
      expect(testComponent.particle).toEqual(particle);
    });

    it('The component is initialized correctly', () => {
      expect(testComponent.isInitialized).toEqual(false);
      expect(testComponent.updateCount).toEqual(0);
      expect(testComponent.isDestroyed).toEqual(false);
    });

    it('You can get a component by class', () => {
      expect(particle.getComponent(TestParticleComponent)).toEqual(testComponent);
    });

    it('The component was added to the updated components because the update method is implemented.', () => {
      expect(particle.updatableComponentsMap.get(TestParticleComponent)).toEqual(testComponent);
    });
  });

  describe('Initialization of a particle, i.e. components', () => {
    const view = TEST_VIEW_FACTORY();
    const particle = new Particle(view);
    const testComponent = new TestParticleComponent();

    particle.addComponent(testComponent);
    particle.init();

    it('The component has been initialized', () => {
      expect(testComponent.isInitialized).toEqual(true);
    });
  });

  describe('Updating a particle and its components', () => {
    const view = TEST_VIEW_FACTORY();
    const particle = new Particle(view);
    const testComponent = new TestParticleComponent();

    particle.addComponent(testComponent);
    particle.init();
    particle.update(1, 10);
    particle.update(1, 10);
    particle.update(1, 10);

    it('The component has been updated too', () => {
      expect(testComponent.updateCount).toEqual(3);
    });
  });

  describe('Particle destructurization', () => {
    const view = TEST_VIEW_FACTORY();
    const particle = new Particle(view);
    const testComponent = new TestParticleComponent();

    particle.addComponent(testComponent);
    particle.init();
    particle.update(1, 10);
    particle.destroy();

    it('The particles were cleared of the components', () => {
      expect(particle.componentsCount()).toEqual(0);
    });

    it('Component destructuring', () => {
      expect(testComponent.isDestroyed).toEqual(testComponent.isDestroyed);
    });
  });
});
