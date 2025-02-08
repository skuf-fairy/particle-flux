import {IParticle, IParticleComponent} from '../types';

export abstract class ParticleBaseComponent implements IParticleComponent {
  public particle: IParticle;

  // each component must be initialized with initial values
  // used instead of the constructor
  public abstract init(): void;

  // bind a component to a particle
  public bindParticle(particle: IParticle): void {
    this.particle = particle;
  }
}
