import {IParticle, IParticleComponent} from '../types';

export class TestParticleComponent implements IParticleComponent {
  public particle: IParticle;
  public isInitialized: boolean;
  public isDestroyed: boolean;
  public updateCount: number;

  constructor() {
    this.isInitialized = false;
    this.isDestroyed = false;
    this.updateCount = 0;
  }

  public init(): void {
    this.isInitialized = true;
  }

  public update(elapsedDelta: number, deltaMS: number): void {
    this.updateCount++;
  }

  public destroy(): void {
    this.isDestroyed = true;
  }

  public bindParticle(particle: IParticle): void {
    this.particle = particle;
  }
}
