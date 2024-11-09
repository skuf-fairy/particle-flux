import {IParticle, IParticleComponent} from '../types';

export abstract class ParticleBaseComponent implements IParticleComponent {
  public particle: IParticle;
  public tag: string;

  constructor() {
    this.tag = 'untagged';
  }

  public abstract init(): void;

  public bindParticle(particle: IParticle): void {
    this.particle = particle;
  }
}
