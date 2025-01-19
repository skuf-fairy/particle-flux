import {IParticle, IParticleComponent} from '../types';

export abstract class ParticleBaseComponent implements IParticleComponent {
  public particle: IParticle;

  // каждый компонент должен проинициазилизироваться начальными значениями
  // используется вместо конструктора
  public abstract init(): void;

  // привязать компонент к частице
  public bindParticle(particle: IParticle): void {
    this.particle = particle;
  }
}
