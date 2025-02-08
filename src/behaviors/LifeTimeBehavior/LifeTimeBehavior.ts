import {LifeTimeBehaviorConfig} from './LifeTimeBehavior.types';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {RealRandom} from '../../utils/random/RealRandom';
import {isLifeTimeStaticBehaviorConfig} from './LifeTimeBehavior.typeguards';

export class LifeTimeBehavior extends ParticleBaseComponent {
  // particle life progress in the range [0, 1]
  public lifeTimeNormalizedProgress: number;
  // remaining lifetime in milliseconds
  public remainingLifeTime: number;
  // the lifetime of the particle in milliseconds after which it will be destroyed
  public lifeTime: number;

  constructor(private readonly config: LifeTimeBehaviorConfig) {
    super();
  }

  public init(): void {
    if (isLifeTimeStaticBehaviorConfig(this.config)) {
      this.lifeTime = this.config.value;
    } else {
      this.lifeTime = new RealRandom().generateIntegerNumber(this.config.min, this.config.max);
    }

    this.lifeTimeNormalizedProgress = 0;
    this.remainingLifeTime = this.lifeTime;
  }

  public update(_: number, deltaMS: number): void {
    this.remainingLifeTime = this.getRemainingLifeTime(deltaMS);
    this.lifeTimeNormalizedProgress = this.getLifeTimeNormalizedProgress();

    if (this.isDead()) {
      this.particle.shouldDestroy = true;
    }
  }

  private isDead(): boolean {
    return this.remainingLifeTime === 0;
  }

  private getRemainingLifeTime(deltaMS: number): number {
    return Math.max(0, this.remainingLifeTime - deltaMS);
  }

  private getLifeTimeNormalizedProgress(): number {
    return 1 - this.remainingLifeTime / this.lifeTime;
  }
}
