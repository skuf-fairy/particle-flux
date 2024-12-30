import {IParticle, IParticleComponent} from '../types';

export abstract class ParticleBaseComponent implements IParticleComponent {
  public particle: IParticle;
  public tag: string;

  constructor() {
    this.tag = 'untagged';
  }

  // каждый компонент должен проинициазилизироваться начальными значениями
  // используется вместо конструктора
  public abstract init(): void;

  // привязать компонент к частице
  public bindParticle(particle: IParticle): void {
    this.particle = particle;
  }
}
